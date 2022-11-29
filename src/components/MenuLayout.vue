<template>
  <header class="header-container">
    <div class="menu-items">
      <div class="nav-logo">
        <img src="@/assets/images/bitcoin.png" /> 
        <span>Crypto Price</span>          
      </div>      
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
  font-weight: 500

  .menu-items
    width: 100%
    height: 100%
    @include display-direction-justify-align($jus: center, $ali: center)       
    font-style: normal
    font-size: 2.8rem
    font-weight: bold

    .nav-logo
      @include display-direction-justify-align($jus: center, $ali: center)     

      img
        width: 6%

      span
        margin-left: 1% 

</style>