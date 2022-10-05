<script setup lang="ts">
import {AtcryptoProvider} from "atcrypto-provider"
import {ref, onBeforeMount} from "vue";

const username = ref("")
const addresses = ref<any>([])
const profile = ref<any>({})
let provider: AtcryptoProvider
let paginator:Paginator=null

const getNfts=()=>{
  provider.getNfts("0x2670564fba3ab966da74b08abecb84eae6ecaab3","eth",20).then(pag=>{
    paginator=pag
    console.log(pag)
  })
}
const getNextPage=()=>{
  paginator.nextPage().then((result:Array<any>)=>{
    console.log(result)
  })
}


const getUserData = () => {
  provider.getProfile(username.value).then((response: any) => {
    console.log(response)
    profile.value = response
  })
  provider.getAddresses(username.value).then((response: any) => {
    addresses.value = response as Array<any>
  })

}
onBeforeMount(() => {
  AtcryptoProvider.init({}).then(async () => {
    provider = new AtcryptoProvider()
    // const username="kylezorfi2"
    // const addresses=await provider.getAddresses(username)
    // console.log(addresses)
    // const profile=await provider.getProfile(username)
    // console.log(profile)
  })
})
</script>

<template>
  <header>
    <div>
      <input class="tw-bg-red" v-model="username"/>
      <button @click="getUserData">Get Profile</button>
    </div>
    <div v-if="profile">
      <div>
        Username:{{ profile.name }}
      </div>
      <div>
        Email:{{ profile.email }}
      </div>
      <div>
        Bio:{{ profile.bio }}
      </div>
      <div>
        Cover:{{ profile.cover }}
      </div>
      <div>
        Location:{{ profile.location }}
      </div>
      <div>
        Website:{{ profile.website }}
      </div>
      <div>
        <div v-for="social in profile.socials" :key="social.type">
          <span>{{ social.type }} :  {{ social.url }}</span>
        </div>
      </div>
      <div style="width: 50px">
        Avatar:<img style="width: 100%" :src="profile.avatar">
      </div>
    </div>
    <div v-if="addresses">
      <div v-for="address in addresses">
        <div style="display: flex">
          <img width="40" :src="address.icon">
          <span style="padding-left: 20px;padding-right: 20px">{{address.name}}</span>
          <div>{{address.address}}</div>
        </div>
      </div>
    </div>
    <button @click="getNfts">Get Profile</button>
    <button @click="getNextPage">Next Page</button>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
