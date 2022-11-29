<template>   
  <div class="date-filter-card" @click.stop.self="this.$emit('actionCloseModal')">
    <div class="date-filter-card-item">      
      <div class="date-filter-card-item-content">       
        <div class="date-filter-card-item-content-coin">
          <h5>{{ coin }}</h5>
          <h4>{{ brazilianCurrency(coinValue) }}</h4>
        </div>
        <div class="date-filter-card-item-content-date">
          <h5>Date</h5>
          <h4>{{ date }}</h4>
        </div>
        <div class="date-filter-card-item-content-time">
          <h5>Time</h5>
          <h4>{{ time }}</h4>
        </div>
      </div>
      <div class="date-filter-card-item-close">      
        <span class="close-modal" @click="this.$emit('actionCloseModal')">close</span>
      </div>
    </div>
  </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'

export default {
  name: 'DateFilterCardLayout',
  props: ['coin', 'date', 'time', 'coinValue'],
  mixins: [globalMixins],
}

</script>

<style scoped lang="sass">
@import "@/assets/sass/variables.sass"

.date-filter-card
  top: 0
  bottom: 0
  position: absolute
  width: 100%
  display: flex
  flex-direction: column
  align-items: center 
  justify-content: center
  background: rgba(0, 0, 0, 0.6)
  z-index: 10

  .date-filter-card-item
    width: 22%
    height: 44%
    display: flex
    flex-direction: column  
    justify-content: center
    background-color: $primary-color-opacity
    border-radius: 50%

    .date-filter-card-item-close 
      width: 100%
      display: flex
      justify-content: center

      .close-modal   
        font-size: 2rem             
        color: $light-color        
        cursor: pointer
        text-decoration: underline

        &:hover
          color: $secondary-color

    .date-filter-card-item-content
      width: 100%
      display: flex
      flex-direction: column
      align-items: center
      padding: 2%
      color: $grey-color

      div
        text-align: center
        margin: 3% 0 3% 0

        h3
          font-size: 2.8rem
          font-weight: normal         

        h4          
          font-weight: 500
          font-size: 2.5rem
        
        h5         
          text-transform: capitalize
          font-weight: normal
          font-size: 2.2rem
          
      .date-filter-card-item-content-coin
        
      .date-filter-card-item-content-date     

      .date-filter-card-item-content-time

</style>