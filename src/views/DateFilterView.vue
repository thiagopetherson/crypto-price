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
    <div class="date-filter-alert">
      <MessageLayout :msg="alertMsg" v-if="alertMsg" @clearMessage="alertMsg = null" /> 
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
import MessageLayout from '@/components/MessageLayout.vue'

export default {
  name: 'DateFilterView',
  components: { DataFilterCardLayout, MessageLayout },
  props: ['coinId'],
  data () {
    return {
      form: {
        date: "",
        time: "",        
      },
      searchedCoinValue: "",
      showresult: false,
      alertMsg: null,
    }    
  },
  methods: {
    async getCoinByDate () {

      if (this.form.date === "") {
        this.alertMsg = 'Select a date'        
        return
      }

      let sdt = Math.floor(+new Date(`${this.form.date} ${this.form.time}`) / 1000) // Searched Date Timestamp   
      let cdt = Math.floor(+new Date() / 1000) // Current Date Timestamps    
      
      await this.axios.get(`${this.baseUrl}/coins/${this.coinId}/market_chart/range?vs_currency=brl&from=${sdt}&to=${cdt}`)
      .then(response => {        
        this.searchedCoinValue = response.data.prices[0][1]        
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
      text-transform: uppercase
      @media only screen and (min-width: 1px) and (max-width: 290px)
        font-size: 2.3rem
      @media only screen and (min-width: 291px) and (max-width: 500px)
        font-size: 3rem
      @media only screen and (min-width: 501px) and (max-width: 1000px)
        font-size: 5rem

    h3      
      font-size: 2.2rem
      font-weight: normal
    @media only screen and (min-width: 1px) and (max-width: 290px) 
      font-size: 1.4rem
    @media only screen and (min-width: 291px) and (max-width: 500px)
      font-size: 1.6rem

  .date-filter-img
    margin: 2% 0 2% 0
    width: 10%
    @media only screen and (min-width: 1px) and (max-width: 290px)
      width: 20%
    @media only screen and (min-width: 291px) and (max-width: 500px)
      width: 30%
    @media only screen and (min-width: 501px) and (max-width: 1000px)
      width: 20%

    img
      width: 100%
    

  .date-filter-search    
    width: 22%
    @include display-direction-justify-align($jus: center, $ali: center)
    margin-bottom: 2%
    @media only screen and (min-width: 1px) and (max-width: 500px)
      width: 95%
      margin-top: 5%
      margin-bottom: 7%
    @media only screen and (min-width: 501px) and (max-width: 1000px)
      width: 60%
      margin-top: 2%
      margin-bottom: 3%
    @media only screen and (min-width: 1001px) and (max-width: 1281px)
      width: 40%
    
    input
      padding: 1% 5% 1% 5%
      margin-top: 2%
      font-size: 1.8rem
      border: none
      @media only screen and (min-width: 1px) and (max-width: 281px)
        padding: 1% 1% 1% 1%
        font-size: 1.4rem
      @media only screen and (min-width: 282px) and (max-width: 500px)
        padding: 1% 1% 1% 1%

    button
      padding: 1% 5% 1% 5%
      margin-top: 3%
      @include default-button($bg: $primary-color, $color: $light-color, $fs: 1.8rem, $fw: 600)      
      border-radius: 5px
      @media only screen and (min-width: 1px) and (max-width: 281px)
        padding: 1% 2% 1% 2%
        font-size: 1.4rem

      &:hover
        @include button-hover($bg: $secondary-color, $tran: 0s, $sca: 1)

  .date-filter-alert
    width: 20%
    text-align: center
    @media only screen and (min-width: 1px) and (max-width: 500px)
      width: 50%

  .date-filter-link
    width: 40%
    @include display-direction-justify-align($dir: column, $ali: center)     

    button
      padding: 0.8% 3% 0.8% 3%
      margin-top: 2%
      @include default-button($bg: $primary-color, $color: $light-color, $fs: 1.8rem, $fw: 600)      
      border-radius: 5px

      &:hover
        @include button-hover($bg: $primary-color, $tran: 0.2s, $sca: 1.1)

</style>