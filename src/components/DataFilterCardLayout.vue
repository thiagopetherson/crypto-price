<template>   
  <div class="date-filter-card">
    <h3>Your search...</h3>
    <span class="date-filter-card-coin">{{ coin }}: <span>{{ coinValue }}</span></span>
    <span class="date-filter-card-date">Date: <span>{{ date }}</span></span>
    <span class="date-filter-card-time">Time: <span>{{ time }}</span></span>
  </div>
</template>

<script>

export default {
  name: 'DateFilterCardLayout',
  props: ['coin', 'date', 'time', 'coinValue'],  
}

</script>

<style scoped lang="sass">
.date-filter-card
  width: 60%
  display: flex
  flex-direction: column
  align-items: center 

  h3
    font-size: 2.4rem
    font-weight: normal
    
  .date-filter-card-coin
    text-transform: capitalize
    font-size: 2rem
    
  .date-filter-card-date
    font-size: 2rem

  .date-filter-card-time
    font-size: 2rem

</style>