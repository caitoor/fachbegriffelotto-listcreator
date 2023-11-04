<template>
    <div>
        <ul>
            <li v-for="(expression, index) in expressions" :key="index">
                <input type="radio" :id="expression" :value="expression" v-model="selectedExpression" name="expression">
                <label :for="expression">{{ expression }}</label>
            </li>
            <li>
                <input type="radio" id="none" value="" v-model="selectedExpression" name="expression">
                <label for="none">None</label>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    props: ['expressions'],
    data() {
        return {
            selectedExpression: ''
        };
    }
};
</script>
  