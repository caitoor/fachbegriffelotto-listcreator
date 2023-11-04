<template>
  <div id="list-creator">
    <div id="input-interface">
      <input type="text" v-model="filename" placeholder="Enter filename" /><br>
      <textarea v-model="expressions" rows="10" cols="30"></textarea><br>
      <button @click="getEasyExpressions">easy</button>
      <button @click="getComplexExpressions">complex</button>
      <br>
      <button @click="processExpressions">Download JSON</button>

    </div>
    <div id="additional-listitems-interface">
      <ExpressionSelector v-if="Array.isArray(easyExpressions) && easyExpressions.length > 0"
        :expressions="easyExpressions" ref="easyExpressionSelector" title="Easy Expressions" name="easyExpressions" />


      <ExpressionSelector v-if="Array.isArray(complexExpressions) && complexExpressions.length > 0"
        :expressions="complexExpressions" ref="complexExpressionSelector" title="Complex Expressions"
        name="complexExpressions" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ExpressionSelector from './ExpressionSelector.vue';

export default {
  data() {
    return {
      expressions: '',
      filename: '',
      easyExpressions: [],
      complexExpressions: []
    };
  },
  components: {
    ExpressionSelector
  },
  methods: {
    processExpressions() {
      const selectedEasyExpression = this.$refs.easyExpressionSelector?.selectedExpression;
      const selectedComplexExpression = this.$refs.complexExpressionSelector?.selectedExpression;
      let fullExpressions = this.expressions;
      if (selectedEasyExpression) {
        fullExpressions += `\n${selectedEasyExpression}`;
      }
      if (selectedComplexExpression) {
        fullExpressions += `\n${selectedComplexExpression}`;
      }
      axios.post('http://localhost:3000/process-expressions/', {
        prompt: fullExpressions,
      }).then(response => {
        console.log("test");
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
    getEasyExpressions() {
      // Call to the new endpoint to get easy expressions
      axios.post('http://localhost:3000/get-easy-expressions/', {
        prompt: this.expressions,
      }).then(response => {
        console.log(response.data.result);
        this.easyExpressions = JSON.parse(response.data.result);
      }).catch(error => {
        console.error(error);
      });
    },
    getComplexExpressions() {
      axios.post('http://localhost:3000/get-complex-expressions/', {
        prompt: this.expressions,
      }).then(response => {
        this.complexExpressions = JSON.parse(response.data.result);
      }).catch(error => {
        console.error(error);
      });
    }
  },
};
</script>

<style scoped>
#list-creator {
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  max-width: 600px;
  background-color:aliceblue;
}
</style>