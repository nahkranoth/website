<template>
    <div id="app">
        <LinkWidget></LinkWidget>
        <CometWorld></CometWorld>
    </div>
</template>

<script>
    import CometWorld from './components/CometWorld.vue'
    import LinkWidget from './components/LinkWidget.vue'

    export default {
        name: 'App',
        components: {LinkWidget, CometWorld}
    }
</script>
