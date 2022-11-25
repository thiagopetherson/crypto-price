<template>
  <div class="date-filter">
    <div class="date-filter-item-title">
      <h1>{{ id }}</h1>
      <h2>Choose the period</h2>
    </div>
    <div class="date-filter-item-result">
      <span class="date-filter-item-result-coin">{{ id }}: aa<span></span></span>
      <span class="date-filter-item-result-date">Date: aa<span></span></span>
      <span class="date-filter-item-result-time">Time: aa<span></span></span>
    </div>  
    <div class="date-filter-item-search">
        <input class="date-filter-item-search-date" type="date" />
        <input class="date-filter-item-search-time" type="time" />
        <button class="date-filter-item-search-submit">Search</button>
    </div>  
  </div>
</template>

<script>

export default {
  name: 'DateFilterView',
  props: ['id'],
  data () {
    return {
      result: null,
    }    
  },
  mounted () {
    console.log(this.id)
  }
}

</script>

<style scoped lang="sass">
@import "@/assets/sass/variables.sass"

.date-filter
  width: 100%
  height: 92vh
  display: flex
  flex-direction: column

  .date-filter-item-title
    width: 100%
    display: flex
    flex-direction: column
    align-items: center    
   
    h1
      font-size: $title-size
      font-weight: 400
      color: $secondary-color
      text-transform: uppercase

    h2
      font-size: 2.4rem
      font-weight: normal  
  
  .date-filter-item-result
    width: 100%
    display: flex
    flex-direction: column
    align-items: center    
    
    .date-filter-item-result-coin
        text-transform: capitalize
        font-size: 2rem
    
    .date-filter-item-result-date
        font-size: 2rem

    .date-filter-item-result-time
        font-size: 2rem

  .date-filter-item-search
    width: 100%
    display: flex
    flex-direction: row
    justify-content: center



</style>