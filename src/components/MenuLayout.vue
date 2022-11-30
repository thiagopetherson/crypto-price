<template>
  <header class="header-container">
    <div class="menu-items">      
      <span>CP</span> 
      <span>Crypto Price</span>
    </div>    
  </header>
</template>

<script>
export default {
  name: 'MenuLayout',  
}
</script>

<style scoped lang="sass">
@import "@/assets/sass/variables.sass"
@import "@/assets/sass/mixins.sass"

.header-container
  background-color: $primary-color
  width: 100%
  height: 10%
  @include display-direction-justify-align($jus: center)  
  color: $light-color  

  .menu-items
    width: 100%
    height: 100%
    @include display-direction-justify-align($jus: center, $ali: center)
    font-size: 2.6rem
    @media only screen and (min-width: 1px) and (max-width: 500px)
      font-size: 1.6rem
    @media only screen and (min-width: 501px) and (max-width: 1024px)
      font-size: 1.8rem    

    span:first-child    
      border: 3px solid $light-color
      border-radius: 50%
      padding: 5px 11px 0px 11px   

    span:last-child
      margin-left: 5px        
      font-weight: bold

</style>