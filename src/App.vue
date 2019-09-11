<template>
    <div id="app">
        <LinkWidget></LinkWidget>
        <BackgroundCanvas></BackgroundCanvas>
    </div>
</template>

<script>
    import Vue from "vue" // you can nest components by registering them here and adding to the parent components in the component object
    import BackgroundCanvas from './components/SpaceWorld.vue'
    import LinkWidget from './components/LinkWidget.vue'
    import AudioHost from './components/AudioHost.vue'

    export default {
        name: 'App',
        components: {LinkWidget, BackgroundCanvas, AudioHost}
    }
</script>
