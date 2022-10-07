import axios from "axios";
import Web3 from "web3";
import configs from "./config";
import {BaseChains, ChainAddress} from "./utils/chains";
import {Errors} from "./errors";
import {Contract} from 'web3-eth-contract';
import {Paginator} from "./utils/pagination";
import {AtcryptoRequest, requestFactory, requestIpfsJson} from "./utils/request";
import {UserAddress} from "./utils/types";
import {nftResponseParser} from "./utils/parsers";

export class AtcryptoProvider {
    web3: Web3
    contract: Contract
    storeContract: Contract
    static contractAddress: string
    static contractAbi: any
    static marketPlaceAddress: string
    static marketPlaceAbi: any
    static isInitialized: boolean = false

    static async init() {
        const response = await axios.get(configs.contractUrl)
        const data = response.data
        AtcryptoProvider.contractAddress = data.address
        AtcryptoProvider.contractAbi = data.atcryptoIdContractAbi
        AtcryptoProvider.marketPlaceAddress = data.market
        AtcryptoProvider.marketPlaceAbi = data.marketAbi
        AtcryptoProvider.isInitialized = true
    }


    constructor() {
        this.web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.v2b.testnet.pulsechain.com"))
        this.contract = new this.web3.eth.Contract(AtcryptoProvider.contractAbi, AtcryptoProvider.contractAddress)
        this.storeContract = new this.web3.eth.Contract(AtcryptoProvider.marketPlaceAbi, AtcryptoProvider.marketPlaceAddress)
        // this.smartcontract=new SmartContract(this.contract)
    }


    async getAddresses(username: string): Promise<Array<ChainAddress>> {
        const chains = BaseChains.map(e => e.chain)
        const response: Array<any> = await this.contract.methods['getAddr'](chains, username).call()
        const contractAddresses = response.filter(e => e.addr !== "")
        const addresses: Array<ChainAddress> = []
        for (const address of contractAddresses) {
            const chain = BaseChains.find(e => e.chain === address.chain)
            if (chain) {
                addresses.push({
                    ...chain,
                    address: address.addr
                })
            }
        }
        return addresses
    }

    async getProfile(username: string) {
        const ipfs = await this.contract.methods['getProfileData'](username).call()
        if (ipfs === "") {
            throw Errors.PROFILE_NOT_FOUND
        }
        return axios.get("https://cache.volentix.io/https://ipfs.filebase.io/ipfs/" + ipfs).then(response => response.data.profile)
    }


    async getTplsNft(address: string, index: Number = 0) {
        try {
            const response = await this.storeContract.methods['uriByOwnerByIndex'](address, index).call()
            const data = await requestIpfsJson(response[0])
            const price = this.web3.utils.fromWei(response[2].price, 'ether')
            return {
                name: data.title,
                chain: "tpls",
                amount: price,
                image: data.properties.image.description,
                token_id: response[2].tokenId,
                token_uri: "https://ipfs.io/ipfs" + response[2].tokenHash,
                nft: {
                    ...response[2],
                    ipfs: data
                }
            }
        } catch (e) {
            // console.log(Object.keys(e))
            throw e
        }

    }

    async getTplsNfts(address: string) {
        let index = 0
        const nfts = []
        while (true) {
            try {
                const nft = await this.getTplsNft(address, index)
                nfts.push(nft)
                index++
            } catch (e) {
                // @ts-ignore
                if (e.message.includes("ERC721Enumerable: owner index out of bounds")) {
                    break
                }
                console.log(e)
            }

        }
        return nfts

    }


    async getNfts(address: string, chain: string, limit = 100) {
        const request: AtcryptoRequest = {
            type: "get",
            url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
            params: {
                chain: chain,
                limit: limit,
            },
            headers: {
                accept: 'application/json',
                'X-API-Key': 'izaCymD1csWac0y27mvEtrPHaxYWEcmtafgIqCaaIu9I1nsQWIetnv64YRUK7ZMq'
            }
        }
        const response = await requestFactory(request)
        return new Paginator(
            request,
            response,
            (response: any) => {
                request.params['cursor'] = response.cursor
                return request
            },
            (response: any) => {
                return response.result.map((e: any) => nftResponseParser(e, chain))
            },
            (response: any) => response.cursor !== null)
    }

    async allNfts(addresses: Array<UserAddress>, onNftReceived?:Function) {

        // addresses = addresses.filter(e=>{
        //     return SupportedEvms.find(f=>f.chain==e.chain)
        // })
        // console.log(addresses)

        const nfts: Array<any> = [];
        for await (const address of addresses) {
            const data = []
            try {
                if (address.chain === 'tpls') {
                    const response = await this.getTplsNfts(address.address)
                    if(onNftReceived){
                        onNftReceived(response)
                    }
                    nfts.push(...response)
                } else {
                    const paginator = await this.getNfts(address.address, address.chain)
                    if(onNftReceived){
                        onNftReceived(paginator.data)
                    }
                    data.push(...paginator.data)
                    while (paginator.hasNextPage()) {
                        const currentPageData = await paginator.nextPage()
                        if(onNftReceived){
                            onNftReceived(currentPageData)
                        }
                        data.push(...currentPageData)
                    }
                    nfts.push(...data)
                }
            } catch (e) {
                console.log(e)
            }
        }
        return nfts
    }


}
