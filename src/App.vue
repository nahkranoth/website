<template>
    <div id="app">
        <LinkWidget></LinkWidget>
        <CometWorld ref="cometWorld"></CometWorld>
    </div>
</template>

<script>
    import CometWorld from './components/CometWorld.vue'
    import LinkWidget from './components/LinkWidget.vue'
    import GhostWorld from './components/GhostWorld.vue'
    import Projects from "./components/Projects.vue";

    export default {
        name: 'App',
        components: {Projects, LinkWidget, CometWorld, GhostWorld}
    }
</script>
