<template>
    <div id="app">
        <BackgroundCanvas></BackgroundCanvas>
        <LinkWidget></LinkWidget>
    </div>
</template>

<script>
    import BackgroundCanvas from './components/BackgroundCanvas.vue'
    import LinkWidget from './components/LinkWidget.vue'

    export default {
        name: 'App',
        components: {BackgroundCanvas, LinkWidget}
    }
</script>