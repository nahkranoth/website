<template>
    <div id="app">
       <BackgroundCanvas></BackgroundCanvas>
    </div>
</template>

<script>
    import BackgroundCanvas from './components/BackgroundCanvas.vue'

    export default {
        name: 'App',
        components: {BackgroundCanvas}
    }
</script>