<template>
  <header class="header-container">
    <div class="menu-items">
      <div class="nav-logo">        
        Bitcoin Price           
      </div>
      <div class="nav-items">
        <div class="">            
          Option One            
        </div>
        <div>
          Option One 2
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