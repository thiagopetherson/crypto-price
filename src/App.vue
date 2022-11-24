<template>
   <div id="app">
    <MenuLayout />
    <router-view :key="$route.fullPath"></router-view>    
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
  display: flex
  flex-direction: column
</style>