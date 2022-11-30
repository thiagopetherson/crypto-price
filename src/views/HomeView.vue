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
          <img :src="coin.image" @click="this.$router.push({ path: `date/${coin.id}` })" />          
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
      this.coinValues = []

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
          this.getCoinValues()
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
    },
    refreshCoinValue () {
      setInterval(() => {
        if ( this.coinValues.length === 1 )
          this.getOtherCoinValue()
        else
          this.getCoinValues()          
      }, 600000000)
    }
  },
  created () {   
    this.getCoinValues()
  },
  mounted () {
    this.refreshCoinValue()
  },
  beforeUnmount() {
    clearInterval(this.refreshCoinValue())
  },
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
  @media only screen and (min-width: 1px) and (max-width: 500px)
    margin-top: 0%
  
  .home-item
    width: 100%
    height: 70%
    @include display-direction-justify-align($dir: column, $jus: center, $ali: center)
    @media only screen and (min-width: 1px) and (max-width: 500px)  
      height: 100%

    .home-item-title
      width: 40% 
      text-align: center
      @media only screen and (min-width: 1px) and (max-width: 290px)
        width: 100%    
      @media only screen and (min-width: 291px) and (max-width: 500px)
        width: 90%
      @media only screen and (min-width: 501px) and (max-width: 1000px)
        width: 80%
       

      h1
        font-size: 4rem
        font-weight: 400
        color: $secondary-color 
        @media only screen and (min-width: 1px) and (max-width: 290px)
          font-size: 2.3rem
        @media only screen and (min-width: 291px) and (max-width: 500px)
          font-size: 3rem
        @media only screen and (min-width: 501px) and (max-width: 1100px)
          font-size: 3rem
                
      input
        padding: 0.2%
        font-size: 1.4rem
        border-top-left-radius: 3px
        border-bottom-left-radius: 3px      
      
      button
        margin-left: -2px
        padding: 0.2%
        @include default-button($bg: $primary-color, $color: $light-color, $fs: 1.4rem, $fw: 500)        
        border-top-right-radius: 3px
        border-bottom-right-radius: 3px        

        &:hover
          @include button-hover($bg: $secondary-color, $tran: 0.5s)          
                
      input, button 
        @media only screen and (min-width: 1px) and (max-width: 290px) 
          padding: 0.2%
          font-size: 0.9rem 
        @media only screen and (min-width: 291px) and (max-width: 500px)          
          font-size: 1.2rem                  
      
      h5
        margin-top: 2%
        font-size: 2rem
        font-weight: 400
        color: $secondary-color
        @media only screen and (min-width: 1px) and (max-width: 290px) 
          font-size: 1.4rem
        @media only screen and (min-width: 291px) and (max-width: 500px)
          font-size: 1.6rem

    .home-item-content
      width: 60%      
      @include display-direction-justify-align($jus: center, $ali: center)
      @media only screen and (min-width: 1px) and (max-width: 500px)
        width: 100%
        @include display-direction-justify-align($dir: row, $jus: center)
        flex-wrap: wrap
      @media only screen and (min-width: 501px) and (max-width: 1000px)
        width: 90%
      @media only screen and (min-width: 1025px)
        margin-top: 2%

      .home-item-content-prices
        width: 25%
        @include display-direction-justify-align($dir: column, $ali: center)
        @media only screen and (min-width: 1px) and (max-width: 500px)
          width: 50%
          margin-top: 15%
        @media only screen and (min-width: 501px) and (max-width: 1000px)   
          margin-top: 15%
        @media only screen and (min-width: 1001px) and (max-width: 1281px)
          margin-top: 5%

        a
          font-size: 2.5rem
          font-weight: normal
          color: $secondary-color
          text-decoration: none
          @media only screen and (min-width: 1px) and (max-width: 290px)
            font-size: 1.8rem
          @media only screen and (min-width: 291px) and (max-width: 500px)
            font-size: 2.2rem
          @media only screen and (min-width: 501px) and (max-width: 600px)
            font-size: 1.8rem

        a:first-child        
          &:hover
            color: $primary-color

        a:last-child           
          @include animate-text($dur: 2s, $color: $secondary-color, $otherColor: $primary-color)

        img
          width: 70%
          margin-top: 7%
          margin-bottom: 7%
          cursor: pointer
          @media only screen and (min-width: 1px) and (max-width: 290px)
            width: 45%
          @media only screen and (min-width: 291px) and (max-width: 500px)
            width: 50%
            margin-top: 5%
            margin-bottom: 5%
        
          &:hover
            transition: 1s
            transform: scale(1.1)

    .home-item-button-home
      margin-top: 2%
      width: 60%
      @include display-direction-justify-align($jus: center, $ali: center)    

      button
        padding: 1% 5% 1% 5%
        @include default-button($bg: $secondary-color, $color: $light-color, $fs: 1.8rem, $fw: 500)
        border-radius: 5px       
      
        &:hover
          @include button-hover($bg: $primary-color)              

  .loading    
    width: 100vw
    height: 92vh
    @include display-direction-justify-align($jus: center, $ali: center)    

    img
      width: 150px
      height: 150px 

</style>

