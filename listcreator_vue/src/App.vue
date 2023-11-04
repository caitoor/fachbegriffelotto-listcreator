<template>
  <div id="wrapper">
    <h3>Lustige Listen für das lustige Fachbegriffelotto</h3>
    <ListInput />
    <h5>Beispielbegriffe</h5>
    <ul>
      <li>MQTT</li>
      <li>ESP32</li>
      <li>Websockets</li>
      <li>node.JS</li>
    </ul>
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