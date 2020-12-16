<template>
 <div class="app">
   <router-link :to="{name: 'catalog'}">
     <h1 class="header v-block">Vue shop</h1>
   </router-link>
   <Wrapper/>
 </div>
</template>

<script>
import Wrapper from './components/main-wrapper'

export default {
  name: 'App',

  components: {
    Wrapper,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
.header {
  background: teal;
  height: 100px;
  color: white;
  padding: 1.5rem;
  text-align: center;
  font-size: 2.3rem;
}
/* Headers */
.title {
    text-align: center; 
    color: teal;
}
</style>
