<template>   
  <div class="date-filter-card" @click.stop.self="this.$emit('actionCloseModal')">
    <div class="date-filter-card-item">      
      <div class="date-filter-card-item-content">       
        <div class="date-filter-card-item-content-coin">
          <h5>{{ coin }}</h5>
          <h4 class="date-filter-card-item-content-coin-value">{{ brazilianCurrency(coinValue) }}</h4>
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
@import "@/assets/sass/mixins.sass"

.date-filter-card
  top: 0
  bottom: 0
  position: absolute
  width: 100%
  @include display-direction-justify-align($dir: column, $jus: center, $ali: center) 
  background: rgba(0, 0, 0, 0.6)
  z-index: 10

  .date-filter-card-item
    width: 22%
    padding-top: 2%
    padding-bottom: 2%    
    @include display-direction-justify-align($dir: column, $jus: center)    
    background-color: $primary-color-opacity
    border-radius: 5%
    @media only screen and (min-width: 1px) and (max-width: 290px)
      width: 90%
      padding-top: 10%
      padding-bottom: 10%
    @media only screen and (min-width: 291px) and (max-width: 1000px)
      width: 70%
      padding-top: 10%
      padding-bottom: 10%
    @media only screen and (min-width: 1023px) and (max-width: 1281px)
      width: 50%
      padding-top: 10%
      padding-bottom: 10% 

    .date-filter-card-item-close 
      width: 100%
      @include display-direction-justify-align($jus: center)      

      .close-modal   
        font-size: 2rem             
        color: $light-color        
        cursor: pointer
        text-decoration: underline

        &:hover
          color: $secondary-color

    .date-filter-card-item-content
      width: 100%
      @include display-direction-justify-align($dir: column, $ali: center)     
      padding: 2%
      color: $grey-color

      div
        text-align: center
        margin: 3% 0 3% 0

        h3
          font-size: 2.8rem
          font-weight: normal         

        h4          
          color: $light-color
          font-weight: 500
          font-size: 2.5rem

        h5         
          text-transform: capitalize
          font-weight: normal
          font-size: 2.2rem

        .date-filter-card-item-content-coin-value
          @include animate-text($dur: 1s, $color: $light-color, $otherColor: $warning-color)
                    
</style>