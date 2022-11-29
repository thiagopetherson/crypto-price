<template>
  <div class="home">
    <div v-if="!loading" class="home-item">
      <div class="home-item-title" v-if="coinValues.length > 0">
        <h1>Realtime Currency Values</h1>
        <input type="text" v-model="otherCoin" />
        <button @click="() => getOtherCoinValue()">Search Other Coin</button>
        <h5>click on a coin to search by date</h5>   
      </div>     
      <div class="home-item-title" v-else>
        <h1>Exceeded Requests. Try again in 1 minute.</h1>     
      </div>      
      <div class="home-item-content" v-if="coinValues.length > 0">        
        <div class="home-item-content-prices" v-for="coin in coinValues" :key="coin.id"> 
          <router-link :to="`date/${coin.id}`">{{ coin.name }}</router-link>
          <img :src="coin.image" />          
          <router-link :to="`date/${coin.id}`">{{ brazilianCurrency(coin.current_price) }}</router-link>
        </div>
      </div>
      <div class="home-item-button-home" v-if="coinValues.length === 1">
        <button @click="() => getCoinValues()">Home</button>     
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
      otherCoin: ''
    }
  },
  methods: {    
    async getCoinValues () {
      this.loading = true

      await this.axios.get(`${this.baseUrl}/coins/markets?vs_currency=brl&ids=bitcoin%2Cethereum%2Ccosmos%2Cdacxi&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(response => {       
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
    },
    async getOtherCoinValue () {
      this.loading = true

      await this.axios.get(`${this.baseUrl}/coins/markets?vs_currency=brl&ids=${this.otherCoin.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(response => {   
        
        if ( this.otherCoin === '' || response.data.length === 0 ) {
          this.loading = false          
          alert('Use a valid coin')
          return 
        }       
        
        let coin = response.data[0]
        this.coinValues = []
        this.coinValues.push(coin)     
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
@import "@/assets/sass/mixins.sass"

.home
  width: 100%
  height: 90%
  margin-top: 5%
  @include display-direction-justify-align($dir: column)  
  
  .home-item
    width: 100%
    height: 70%
    @include display-direction-justify-align($dir: column, $jus: space-around, $ali: center)

    .home-item-title
      width: 40%    
      text-align: center

      h1
        font-size: $title-size
        font-weight: 400
        color: $secondary-color
      
      input
        padding: 0.2%
        font-size: 1.4rem       
      
      button
        margin-left: -2px
        padding: 0.2%      
        font-size: 1.4rem
        background-color: $secondary-color
        color: $light-color       
        font-weight: 500
        cursor: pointer

        &:hover
          background-color: $primary-color          
      
      h5
        margin-top: 2%
        font-size: 2rem
        font-weight: 400
        color: $secondary-color   

    .home-item-content
      width: 60%
      @include display-direction-justify-align($jus: center, $ali: center)

      .home-item-content-prices
        width: 25%
        @include display-direction-justify-align($dir: column, $ali: center)       

        a
          font-size: $option-text-size
          font-weight: normal
          color: $primary-color
          text-decoration: none

        img
          width: 70%
          margin-top: 10%
          margin-bottom: 10%

    .home-item-button-home
      width: 60%
      @include display-direction-justify-align($jus: center, $ali: center)    

      button
        padding: 1% 5% 1% 5%       
        font-size: 1.8rem
        background-color: $secondary-color
        color: $light-color
        border-radius: 5px
        font-weight: 500
        cursor: pointer
      
        &:hover
          background-color: $primary-color          

  .loading    
    width: 100vw
    height: 92vh
    @include display-direction-justify-align($jus: center, $ali: center)    

    img
      width: 150px
      height: 150px 

</style>

