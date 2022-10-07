### To use atcrypto provider in you package use following code snippet

```javascript
    import {AtcryptoProvider} from "atcrypto-provider"
    ...
    AtcryptoProvider.init()
```

!> *Note* You need to call init method before creating instance of provider as it is used to get contract addres and abi array

## Creating instance

```javascript
const provider = new AtcryptoProvider()
```

## Available methods on instance

- getAddresses

- getProfile

- getNfts

- allNefts

#### getAddresses

```javascript
/**
 * @param username {string} crypto username like berthony
 * @return [
     
 ]
 */
provider.getProfile('0x000')
```



#### getProfile

```javascript
/**
 * @param username {string} crypto username like berthony
 * @return {
        avatar {Base64 image string}
        bio {string}
        cover {Base64 image string}
        cryptoId {string}
        email {string}
        location {string}
        name {string}
        socials {string}
        website {string}
     }
 */
provider.getProfile('user')
```