<template>
    <div id="app">
        <Score></Score>
        <LinkWidget></LinkWidget>
        <CometWorld ref="cometWorld"></CometWorld>
        <!--<Projects></Projects>-->
    </div>
</template>

<script>
    import CometWorld from './components/CometWorld.vue'
    import LinkWidget from './components/LinkWidget.vue'
    import GhostWorld from './components/GhostWorld.vue'
    import Projects from "./components/Projects.vue";
    import Score from "./components/Score.vue";

    export default {
        name: 'App',
        components: {Score, Projects, LinkWidget, CometWorld, GhostWorld},
    }
</script>
