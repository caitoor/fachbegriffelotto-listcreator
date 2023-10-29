<template>
  <div>
    <input type="text" v-model="filename" placeholder="Enter filename" />
    <textarea v-model="expressions" rows="10" cols="30"></textarea>
    <button @click="processExpressions">Process</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      expressions: '',
      filename: '',
    };
  },
  methods: {
    processExpressions() {
      axios.post('http://localhost:3000/process-expressions/', {
        prompt: this.expressions,
      }).then(response => {
        const result = JSON.parse(response.data.result);
        console.log(result);
        const jsonStr = JSON.stringify(result);
        const dataBlob = new Blob([jsonStr], { type: 'application/json' });
        const url = window.URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.filename + '.json' || 'expressions.json');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(error => {
        console.error(error);
      });
    },
  },
};
</script>