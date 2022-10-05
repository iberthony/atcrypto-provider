import axios from "axios";
import Web3 from "web3";
import configs from "./config";
import {BaseChains, ChainAddress} from "./utils/chains";
import {Errors} from "./errors";
import {Contract} from 'web3-eth-contract';
import {Paginator} from "./utils/pagination";
import {AtcryptoRequest, requestFactory} from "./utils/request";

export class AtcryptoProvider {
    web3: Web3
    contract: Contract
    static contractAddress: string
    static contractAbi: any
    static marketPlaceAddress: string
    static marketPlaceAbi: any
    static isInitialized: boolean = false

    static async init({}) {
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


    async getNfts(address: string, chain: string, limit = 100) {
        const request:AtcryptoRequest={
            type:"get",
            url:`https://deep-index.moralis.io/api/v2/${address}/nft`,
            params:{
                chain: chain,
                limit: limit,
            },
            headers: {
                accept: 'application/json',
                'X-API-Key': 'izaCymD1csWac0y27mvEtrPHaxYWEcmtafgIqCaaIu9I1nsQWIetnv64YRUK7ZMq'
            }
        }
        const response = await requestFactory(request)
        return new Paginator(request,response, (response: any) => {
            request.params['cursor']=response.cursor
            return request
        }, (response: any) => response.result,(response:any)=>response.cursor!==null)
    }


}
