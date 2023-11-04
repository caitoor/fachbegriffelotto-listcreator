<template>
    <div>
        <h3>{{ title }}</h3>
        <ul>
            <li v-for="(expression, index) in expressions" :key="index">
                <input type="radio" :id="expression" :value="expression" v-model="selectedExpression" :name="name">
                <label :for="expression">{{ expression }}</label>
            </li>
          <!--   <li>
                <input type="radio" id="none" value="" v-model="selectedExpression" :name="name">
                <label for="none">None</label>
            </li> -->
        </ul>
    </div>
</template>
  
<script>
export default {
    props: {
        expressions: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: 'Expressions'
        },
        name: {
            type: String,
            required: true
        }
    },
    computed: {
        computedTitle() {
            return this.title;
        }
    },
    data() {
        return {
            selectedExpression: ''
        };
    }

};
</script>
  