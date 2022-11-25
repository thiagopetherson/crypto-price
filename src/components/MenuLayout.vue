<template>
  <header class="header-container">
    <div class="menu-items">
      <div class="nav-logo">
        <img src="@/assets/images/bitcoin.png" /> 
        <span>Crypto Price</span>          
      </div>
      <div class="nav-items">
        <div class="" @click="this.$router.push({ name: 'home' })">            
          Home           
        </div>
        <div>
          Other currencies
        </div>
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

.header-container
  background-color: $primary-color
  width: 100%
  height: 8vh
  display: flex
  justify-content: center  
  color: $light-color
  font-weight: 500

  .menu-items
    width: 67%
    height: 100%
    display: flex
    justify-content: space-between
    align-items: center        
    font-style: normal
    font-size: 1.8rem
    font-weight: bold

    .nav-logo
      display: flex     
      align-items: center

      img
        width: 6%

      span
        margin-left: 1%
       
    .nav-items     
      display: flex

      div
        cursor: pointer
        a
          color: $light-color
          text-decoration: none  

      div:first-child
        margin-right: 2em        
</style>