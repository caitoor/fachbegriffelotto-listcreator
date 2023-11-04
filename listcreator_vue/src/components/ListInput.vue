<template>
  <div id="list-creator">
    <div id="input-interface">
      <input type="text" v-model="filename" placeholder="Enter filename" /><br>
      <textarea v-model="expressions" rows="10" cols="30"></textarea><br>
      <button @click="getEasyExpressions">easy</button>
      <br>
      <button @click="processExpressions">Download JSON</button>

    </div>
    <div id="additional-listitems-interface">
      <ExpressionSelector v-if="Array.isArray(easyExpressions) && easyExpressions.length > 0"
        :expressions="easyExpressions" ref="expressionSelector" />
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
      easyExpressions: []
    };
  },
  components: {
    ExpressionSelector
  },
  methods: {
    processExpressions() {
      // Get the selected expression from the ExpressionSelector component
      const selectedExpression = this.$refs.expressionSelector?.selectedExpression;
      // If there's a selected expression, prepend it to the expressions string
      const fullExpressions = selectedExpression ? `${this.expressions}\n${selectedExpression}` : this.expressions;

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
    }
  },
};
</script>

<style scoped>
div {
  border: 1px solid black;
}

#list-creator {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>