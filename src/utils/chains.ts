export interface ChainAddress {
    chain: string,
    icon: string,
    address: string,
    label: string,
    name: string,
}

export const BaseChains: Array<ChainAddress> = [
    {
        chain: "eth",
        icon: "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png",
        address: "",
        label: "Ethereum",
        name: "Ethereum"
    },
    {
        chain: "btc",
        icon: "https://files.coinswitch.co/public/coins/btc.png",
        address: "",
        label: "Bitcoin",
        name: "Bitcoin"
    },
    {
        chain: "eos",
        icon: "https://files.coinswitch.co/public/coins/eos.png",
        address: "",
        label: "EOS",
        name: "EOS"
    },
    {
        chain: "bsc",
        icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
        address: "",
        label: "BSC",
        name: "BSC"
    },
    {
        chain: "matic",
        icon: "https://cdnwp-s3.benzinga.com/wp-content/uploads/2021/04/29083434/polygon.png",
        address: "",
        label: "Polygon",
        name: "Polygon"
    },
    {
        chain: "ftm",
        icon: "https://assets.coingecko.com/coins/images/4001/large/Fantom.png?1558015016",
        address: "",
        label: "Fantom",
        name: "Fantom"
    },
    {
        chain: "tpls",
        icon: "https://pulsechain.com/img/favicon128.png",
        address: "",
        label: "PulseChain",
        name: "PulseChain"
    },
    {
        chain: "avaxc",
        icon: "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png",
        address: "",
        label: "Avalanche C-Chain",
        name: "Avalanche C-Chain"
    },
    {
        chain: "ltc",
        icon: "https://files.coinswitch.co/public/coins/ltc.png",
        address: "",
        label: "Litecoin",
        name: "Litecoin"
    },
    {
        chain: "dash",
        icon: "https://files.coinswitch.co/public/coins/dash.png",
        address: "",
        label: "DASH",
        name: "DASH"
    },
    {
        chain: "avax",
        icon: "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png",
        address: "",
        label: "Avalanche X-Chain",
        name: "Avalanche X-Chain"
    },
    {
        chain: "dot",
        icon: "https://files.coinswitch.co/public/coins/dot.png",
        address: "",
        label: "Polkadot",
        name: "Polkadot"
    },
    {
        chain: "terra",
        icon: "https://verto.volentix.io/statics/img/terra.png",

        address: "",
        label: "Terra",
        name: "Terra"
    },
    {
        chain: "ksm",
        icon: "https://assets.coingecko.com/coins/images/9568/small/m4zRhP5e_400x400.jpg",

        address: "",
        label: "Kusama",
        name: "Kusama"
    },
    {
        chain: "xlm",
        icon: "https://files.coinswitch.co/public/coins/xlm.png",

        address: "",
        label: "Stellar Lumens",
        name: "Stellar Lumens"
    },
    {
        chain: "sol",
        icon: "https://assets.coingecko.com/coins/images/4128/small/coinmarketcap-solana-200.png",
        address: "",
        label: "Solana",
        name: "Solana"
    },
    {
        chain: "xtz",
        icon: "https://files.coinswitch.co/public/coins/xtz.png",
        address: "",
        label: "Tezos",
        name: "Tezos"
    },
]

export const SupportedEvms=[
    {
        "name": "Ethereum",
        "chain": "eth",
        "net1": "ropsten",
        "net": "mainnet",
        "nativeToken": "eth",
        "icon": "https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png",
        "provider": "https://mainnet.infura.io/v3/0dd5e7c7cbd14603a5c20124a76afe63",
        "provider1": "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        "explorer": "https://etherscan.io/tx/",
        "gas": "https://ethgas.watch/api/gas",
        "network_id": 1,
        "network_id1": 1,
        "coinGeckoId": "ethereum"
    },

    {
        "name": "BSC",
        "chain": "bsc",
        "nativeToken": "bnb",
        "icon": "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
        "provider1": "https://bsc-dataseed1.binance.org:443",
        "provider": "https://data-seed-prebsc-1-s1.binance.org:8545",
        "explorer": "https://bscscan.com/tx/",
        "gas": "https://api.bscscan.com/api?module=proxy&action=eth_gasPrice&apikey=JK2Z5XQYR1FMCAQFQDBFNS5FJM6XC7ETTB",
        "network_id1": 56,
        "network_id": 97,
        "coinGeckoId": "binancecoin"
    },


    {
        "name": "Polygon",
        "chain": "matic",
        "nativeToken": "matic",
        "icon": "https://cdnwp-s3.benzinga.com/wp-content/uploads/2021/04/29083434/polygon.png",
        "provider1": "https://rpc-mainnet.maticvigil.com/v1/08e234538a11a966248fd358b3b135c4aeb6924b",
        "provider": "https://rpc-mumbai.maticvigil.com/",
        "explorer": "https://explorer-mainnet.maticvigil.com/tx/",
        "explorer1": "https://explorer-mumbai.maticvigil.com/tx/",
        "gas": "https://gasstation-mainnet.matic.network/",
        "network_id": 80001,
        "network_id1": 137,
        "coinGeckoId": "matic-network"
    },
    {
        "name": "Avalanche C-Chain",
        "chain": "avaxc",
        "nativeToken": "avax",
        "icon": "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png",
        "provider1": "https://api.avax.network/ext/bc/C/rpc",
        "provider": "https://api.avax-test.network/ext/bc/C/rpc",
        "explorer": "https://cchain.explorer.avax.network/tx/",
        "gas": "",
        "network_id1": 43114,
        "network_id": 43113,
        "coinGeckoId": "avalanche-2"
    },
    {
        "name": "PulseChain",
        "chain": "tpls",
        "nativeToken": "tpls",
        "icon": "https://pulsechain.com/img/favicon128.png",
        "provider": "https://rpc.v2b.testnet.pulsechain.com",
        "explorer": "https://scan.v2b.testnet.pulsechain.com/tx/",
        "gas": "",
        "network_id": 941,
        "testnet": true
    },
    {
        "name": "Fantom",
        "chain": "ftm",
        "nativeToken": "ftm",
        "icon": "https://assets.coingecko.com/coins/images/4001/large/Fantom.png?1558015016",
        "provider1": "https://rpcapi.fantom.network/",
        "provider": "https://xapi.testnet.fantom.network/lachesis",
        "explorer1": "https://ftmscan.com/tx/",
        "explorer": "https://testnet.ftmscan.com",
        "gas": "",
        "network_id": 250,
        "network_id1": 4002,
        "coinGeckoId": "fantom"
    }
]

