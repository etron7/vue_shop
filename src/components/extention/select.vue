<template>
  <div class="select">
    <span>Категории: </span>
      <p class="title-select" @click="OptionsVisible = !OptionsVisible" > {{selected}}</p>
        <div class="options" v-if="OptionsVisible">
            <p
                v-for="option in options"
                :key="option.value"
                @click="selectOption(option)"
            >
                {{option.name}}
            </p>
        </div>
  </div>
</template>

<script>
export default {
    name:"select",
    props: {
        options: {
            type: Array,
            default() {
                return []
            }
        },
        selected: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            OptionsVisible: false
        }
    },
    methods: {
        selectOption(option) {
            this.$emit('select', option)
            this.OptionsVisible = false;
        },
        hideSelect() {
            this.OptionsVisible = false;
        }
    }
}
</script>

<style scoped>
.select {
    position: relative;
    width: 200px;
    cursor: pointer;
    text-align: left;
}
.title-select {
    border: 1px solid lightgray;
    padding: 8px;
}
.select p {
    margin: 0;
    padding: 0.3rem;
}
.select p:hover {
    background: teal;
    color: white;
}
.options {
    border: 1px solid teal;
    background: white;
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    padding: 8px;
}
</style>