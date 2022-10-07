<template>
  <div>
    <div class="tw-flex">
      <input class="tw-bg-gray-800 tw-text-white tw-py-1 tw-px-2 tw-outline-0 tw-border tw-border-gray-500 tw-rounded"
             placeholder="Enter crypto username" v-model="username"/>
      <div class="tw-ml-3">
        <button @click="getProfile" class="tw-bg-indigo-500 tw-py-2 tw-px-4 tw-rounded">Get Profile</button>
        <button @click="fetchAddresses" class="tw-bg-indigo-500 tw-py-2 tw-px-4 tw-rounded">Get Addresses</button>
        <button @click="fetchNfts" class="tw-bg-indigo-500 tw-py-2 tw-px-4 tw-rounded">Get Nfts</button>
      </div>
    </div>
    <div v-if="!(loading||success||error)">
      Enter a crypto username like keikiri
    </div>
    <div v-if="loading">
      <div>Fetching Profile</div>
    </div>
    <div v-if="success">
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
      <div class="tw-flex">
        <div v-for="social in profile.socials" :key="social.type">
          <span>{{ social.type }} :  {{ social.url }}</span>
        </div>
      </div>
      <div style="width: 50px">
        Avatar:<img style="width: 100%" :src="profile.avatar">
      </div>
    </div>
    <div v-if="error">
      <div>
        {{ errorMessage }}
      </div>
    </div>
    <div >
      <div v-if="loadingAddresses">
        <div>Fetching Addresses</div>
      </div>
      <div v-if="successAddresses">
        <div v-for="address in addresses">
          <div style="display: flex">
            <img width="40" :src="address.icon">
            <span style="padding-left: 20px;padding-right: 20px">{{ address.name }}</span>
            <div>{{ address.address }}</div>
          </div>
        </div>
      </div>
      <div v-if="errorAddresses">
        <div>
          {{ errorMessageAddresses }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {AtcryptoProvider} from "atcrypto-provider"

const username = ref("")
const loading = ref(false)
const success = ref(false)
const error = ref(false)
const errorMessage = ref(false)
const loadingAddresses = ref(false)
const successAddresses = ref(false)
const errorAddresses = ref(false)
const errorMessageAddresses = ref("")
const addresses = ref([])

const profile = ref({})
const provider = new AtcryptoProvider()
const getProfile = () => {
  error.value = false
  errorMessage.value = ""
  loading.value = true
  success.value = false
  provider.getProfile(username.value).then(response => {
    console.log(response)
    profile.value = response
    success.value = true
  }).catch(e => {
    console.log(e)
    error.value = true
    errorMessage.value = e.message
  }).finally(() => {
    loading.value = false
  })
}

const fetchAddresses = () => {
  errorAddresses.value = false
  errorMessageAddresses.value = ""
  loadingAddresses.value = true
  successAddresses.value = false
  provider.getAddresses(username.value).then((response) => {
    console.log(response)
    addresses.value = response
    successAddresses.value = true
  }).catch(e => {
    errorAddresses.value = true
    errorMessageAddresses.value = e.message
  }).finally(() => {
    loadingAddresses.value = false
  })
}

const fetchNfts=()=>{
  const chainAddresses= addresses.value.filter(e=>['matic'].includes(e.chain))
  const parsedChainAddresses=chainAddresses.map(e=>{
    return {
      chain:e.chain,
      address:e.chain==='tpls'?e.address:"0x2670564fba3ab966da74b08abecb84eae6ecaab3"//e.address
    }
  })
  console.log(parsedChainAddresses)
  provider.allNfts(parsedChainAddresses,(data=>{
    console.log(data)
    console.log("nfts received")
  })).then(response=>{
    console.log(response)
  })
}
</script>

<style scoped>

</style>
