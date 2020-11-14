<template>
<!-- Wrapper -->
  <div class="main-wrapper">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
    name: 'main-wrapper',
    data() {
        return {
            title: 'Main wrapper'
        }
    },
}
</script>

<style>
.main-wrapper {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    margin: 0 auto;
}
</style> 
