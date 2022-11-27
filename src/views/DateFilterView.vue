<template>
  <div class="date-filter">
    <div class="date-filter-title">
      <h1>{{ coinId }}</h1>
      <h2>Choose the period</h2>
    </div>
    <DataFilterCardLayout :coin="coinId" :date="form.date" :time="form.time" :coinValue="searchedCoinValue"  />
    <div class="date-filter-search">
        <input class="date-filter-search-date" type="date" v-model="form.date" />
        <input class="date-filter-search-time" type="time" v-model="form.time" />
        <button class="date-filter-search-submit" @click="getCoinByDate()">Search</button>
    </div>  
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

      let sdt = Math.floor(+new Date(`${this.form.date}T${this.form.time}`) / 1000) // Searched Date Timestamp   
      let cdt = Math.floor(+new Date() / 1000) // Current Date Timestamps    
      
      await this.axios.get(`${this.baseUrl}/coins/${this.coinId}/market_chart/range?vs_currency=brl&from=${sdt}&to=${cdt}`)
      .then(response => {
        this.searchedCoinValue = response.data.prices[0][1]
      })
      .catch(error => {
        console.log(error)
      })      
      
    }
  },
  mounted () {
    console.log(this.coinId)
  }
}

</script>

<style scoped lang="sass">
@import "@/assets/sass/variables.sass"

.date-filter
  width: 100%
  height: 60vh
  display: flex
  flex-direction: column
  justify-content: space-around
  align-items: center
  
  .date-filter-title
    width: 40%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
       
    h1      
      font-size: $title-size
      font-weight: 400
      color: $secondary-color
      text-transform: uppercase

    h2      
      font-size: 2.4rem
      font-weight: normal

  .date-filter-search
    width: 40%  
    display: flex
    align-items: center
    justify-content: center

</style>