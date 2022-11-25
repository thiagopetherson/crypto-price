<template>
  <div class="date-filter">
    <h1>{{ id }}</h1>
  </div>
</template>

<script>

export default {
  name: 'DateFilterView',
  props: ['id'],
  mounted () {
    console.log(this.id)
  }
}

</script>

<style scoped lang="sass">

</style>