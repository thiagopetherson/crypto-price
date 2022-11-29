<template>
  <div class="date-filter">
    <div class="date-filter-title">
      <h1>{{ coinId }}</h1>
      <h3>Choose the period</h3>
    </div>
    <div class="date-filter-img">
      <img src="@/assets/images/bitcoin.png" /> 
    </div>
    <div class="date-filter-search">
        <input class="date-filter-search-date" type="date" v-model="form.date" />
        <input class="date-filter-search-time" type="time" v-model="form.time" />
        <button class="date-filter-search-submit" @click="getCoinByDate()">Search</button>   
    </div>
    <div class="date-filter-link">
      <button class="date-filter-link-button" @click="this.$router.push({ name: 'home' })">Home</button> 
    </div>
    <DataFilterCardLayout v-if="showresult" :coin="coinId" :date="form.date" 
    :time="form.time" :coinValue="searchedCoinValue" @actionCloseModal="closeModal"  />  
  </div>
</template>

<script>
import DataFilterCardLayout from '@/components/DataFilterCardLayout.vue'

export default {
  name: 'DateFilterView',
  components: { DataFilterCardLayout },
  props: ['coinId'],
  data () {
    return {
      form: {
        date: "",
        time: "",
      },
      searchedCoinValue: "",
      showresult: false   
    }    
  },
  methods: {
    async getCoinByDate () {

      if (this.form.date === "") {
        alert('Select a date')
        return
      }

      let sdt = Math.floor(+new Date(`${this.form.date} ${this.form.time}`) / 1000) // Searched Date Timestamp   
      let cdt = Math.floor(+new Date() / 1000) // Current Date Timestamps    
      
      await this.axios.get(`${this.baseUrl}/coins/${this.coinId}/market_chart/range?vs_currency=brl&from=${sdt}&to=${cdt}`)
      .then(response => {        
        this.searchedCoinValue = response.data.prices[0][1]
        console.log(this.searchedCoinValue)
        this.showresult = true
      })
      .catch(error => {
        console.log(error)
      })      
      
    },
    closeModal () {
      this.form.date = ""
      this.form.time = ""
      this.searchedCoinValue = ""
      this.showresult = false
    }
  },
  mounted () {
    console.log(this.coinId)
  }
}

</script>

<style scoped lang="sass">
@import "@/assets/sass/variables.sass"
@import "@/assets/sass/mixins.sass"

.date-filter  
  width: 100%
  height: 90vh
  @include display-direction-justify-align($dir: column, $jus: center, $ali: center) 
   
  .date-filter-title
    width: 40%    
    @include display-direction-justify-align($dir: column, $jus: center, $ali: center)    
       
    h1      
      font-size: 4rem
      font-weight: 400
      color: $secondary-color
      text-transform: uppercase

    h3      
      font-size: 2.2rem
      font-weight: normal

  .date-filter-img
    margin: 2% 0 2% 0
    width: 10%

    img
      width: 100%

  .date-filter-search    
    width: 40%
    @include display-direction-justify-align($dir: column, $ali: center) 
    
    input
      padding: 1% 5% 1% 5%
      margin-top: 2%
      font-size: 1.8rem
      border: none

    button
      padding: 1% 5% 1% 5%
      margin-top: 3%
      font-size: 1.8rem
      background-color: $primary-color
      color: $light-color
      border-radius: 5px
      font-weight: 500
      cursor: pointer

  .date-filter-link
    width: 40%
    @include display-direction-justify-align($dir: column, $ali: center)     

    button
      padding: 1% 5% 1% 5%
      margin-top: 2%
      font-size: 1.8rem
      background-color: $secondary-color
      color: $light-color
      border-radius: 5px
      font-weight: 500
      cursor: pointer

</style>