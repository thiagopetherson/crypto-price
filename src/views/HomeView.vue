<template>
  <div class="home">
    <div v-if="!loading" class="home-item">
      <div class="home-item-title" v-if="coinValues.length === 4">
        <h1>Realtime Currency Values</h1>     
      </div>
      <div class="home-item-title" v-else>
        <h1>Exceeded Requests. Try again in 1 minute.</h1>     
      </div>
      <div class="home-item-content" v-if="coinValues.length === 4">        
        <div class="home-item-content-prices" v-for="coin in coinValues" :key="coin.id"> 
          <h2>{{ coin.name }}</h2>
          <img :src="coin.image" />          
          <router-link :to="`date/${coin.id}`">{{ brazilianCurrency(coin.current_price) }}</router-link>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <img src="@/assets/images/loading.gif">
    </div>
  </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'

export default {
  name: 'HomeView',
  mixins: [globalMixins],
  data () {
    return {
      coinValues: [],
      ethereum: null,
      atom: null,
      loading: false,
    }
  },
  methods: {    
    async getCoinValues () {
      this.loading = true

      await this.axios.get(`${this.baseUrl}/coins/markets?vs_currency=brl&ids=bitcoin%2Cethereum%2Ccosmos%2Cdacxi&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(response => {
        console.log(response.data)
        let bitcoin = response.data.find(element => element.id === 'bitcoin')            
        let ethereum = response.data.find(element => element.id === 'ethereum')    
        let atom = response.data.find(element => element.id === 'cosmos')
        let dacxi = response.data.find(element => element.id === 'dacxi')       
        this.coinValues = [bitcoin, ethereum, atom, dacxi]        
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {        
        this.loading = false
      })
    }
  },
  created () {   
    this.getCoinValues()   
  } 
}
</script>

<style scoped lang="sass">
@import "@/assets/sass/variables.sass"

.home
  width: 100%
  height: 92vh
  display: flex
  flex-direction: column
  
  .home-item
    width: 100%
    height: 70%
    display: flex
    flex-direction: column
    justify-content: space-around
    align-items: center   

    .home-item-title
      width: 40%    
      text-align: center

      h1
        font-size: $title-size
        font-weight: 400
        color: $secondary-color

    .home-item-content
      width: 60%
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center


      .home-item-content-prices
        width: 25%
        display: flex
        flex-direction: column
        align-items: center  

        h2
          font-size: 2.4rem
          font-weight: normal        

        img
          width: 70%
          margin-top: 10%
          margin-bottom: 10%

        a
          font-size: $option-text-size
          font-weight: normal
          color: $primary-color
          text-decoration: none

  .loading    
    width: 100vw
    height: 92vh 
    display: flex
    justify-content: center
    align-items: center

    img
      width: 150px
      height: 150px

</style>

