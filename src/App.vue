<template>
   <div id="app">
    <MenuLayout />
    <router-view :key="$route.path"></router-view>    
  </div> 
</template>

<script>
import MenuLayout from '@/components/MenuLayout.vue'

export default {
  name: 'App',
  components: { MenuLayout }
}
</script>

<style scope lang="sass">
#app 
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
</style>