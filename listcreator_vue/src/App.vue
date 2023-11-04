<template>
  <div id="wrapper">
    <h3>Lustige Listen für das lustige Fachbegriffelotto</h3>
    <ListInput />
  </div>
</template>

<script>

import ListInput from './components/ListInput.vue'

export default {
  name: 'App',
  components: {
    ListInput
  }
}
</script>