<template>   
  <div class="message">
    <p>{{ msg }}</p>
  </div>
</template>

<script>

export default {
  name: 'MessageLayout',
  props: ['msg'],
  created () {    
    setTimeout(() => this.$emit('clearMessage'), 3000)
  }
}

</script>

<style scoped lang="sass">
@import "@/assets/sass/variables.sass"

.message
  font-size: 1.6rem
  color: $light-color
  font-weight: bold
  background-color: $danger-color
  border-radius: 2px  
  padding: 5px  
  margin: 1% auto
  
  @media only screen and (min-width: 1px) and (max-width: 376px)
    width: 90%
    font-size: 1.2rem 
    padding: 0px
                    
</style>