<template>
  <div class="home">
    <div class="home-item-title">
      <h1>Bitcoin Current Price</h1>     
    </div>
    <div class="home-item-content">
      <img src="@/assets/images/bitcoin.png" />
      <!--<h2>R$ 88.127,00 BRL</h2>-->
      <h2>{{ bitcoinPrice }} BRL</h2>
    </div>
    <div class="home-item-options">
      <div class="home-item-options-search" @click="this.$router.push({name: 'home'})">
        <p>Search for date</p>
      </div>
      <div class="home-item-options-other" @click="this.$router.push({name: 'home'})">
        <p>Other currencies</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView', 
  data () {
    return {
      bitcoinPrice: '',
    }
  },
  methods: {
    async getBitcointCurrentPrice () {
      await this.axios.get(`${this.baseUrl}/simple/price?ids=bitcoin&vs_currencies=BRL`)
      .then(response => {            
        let value = response.data.bitcoin.brl
        value = value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        this.bitcoinPrice = value        
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getBitcointCurrentPrice()
  }
}
</script>

<style scoped lang="sass">
@import "@/assets/sass/variables.sass"

.home
  width: 100%
  height: 100vh
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-around

  .home-item-title
    width: 40%    
    text-align: center
    
    h1
      font-size: $title-size
      font-weight: 400

  .home-item-content
    width: 40%    
    text-align: center

    img
      width: 20%
    
    h2
      margin-top: 2%
      font-size: $subtitle-size
      font-weight: 400

.home-item-options
  width: 40%
  height: 40%
  display: flex
  flex-direction: row
  justify-content: space-around

  div
    width: 30%
    height: 50%
    display: flex    
    justify-content: center
    align-items: center
    border-radius: 5%
    cursor: pointer

    p
      font-size: $option-text-size
      color: $light-color
      font-weight: bold

  .home-item-options-search
    background-color: $primary-color

  .home-item-options-other
    background-color: $secondary-color


</style>

