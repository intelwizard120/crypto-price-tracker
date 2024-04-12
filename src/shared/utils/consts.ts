export enum WALLET_TRACKER_TYPE{
    BALANCE = 'Balance',
    NFT = 'NFT',
    TRANSACTION =  'TRANSACTION',
}

export enum WALLET_OWNER {
    MIME = "Me",
    OTHER = "Other",
}

export enum PLAN_TYPE {
    FREE = 'Free',
    PRO = 'Pro'
}

export const CHAINS = {
    ether: {name:'ether', id:'0x1'},
    goerli: {name:'goerli', id:'0x5'},
    polygon: {name:'polygon', id:'0x89'},
    bsc: {name:'bsc', id:'0x38'},
    gnosis: {name:'gnosis', id:'0x64'}
}
