export const nftResponseParser= (nft:any,chain:string) => {
    const metaData = JSON.parse(nft.metadata)
    if (!metaData) {
        return {
            chain: chain,
            amount: nft.amount,
            name: nft.name,
            image: null,
            token_id: nft.token_id,
            token_uri: nft.token_uri,
            nft: nft
        }
    }
    let image = metaData.image
    if (image&&image.startsWith('ipfs:/')) {
        image = image.replace('ipfs:/', 'https://ipfs.io/ipfs')
    }
    return {
        chain: 'eth',
        amount: nft.amount,
        name: metaData.name,
        image: image,
        token_id: nft.token_id,
        token_uri: nft.token_uri,
        nft: nft
    }
}
