<template>
    <div id="app">
        <LinkWidget></LinkWidget>
        <CometWorld ref="cometWorld"></CometWorld>
        <GhostWorld ref="ghostWorld"></GhostWorld>
        <div v-on:click="next"> >> </div>
    </div>
</template>

<script>
    import CometWorld from './components/CometWorld.vue'
    import LinkWidget from './components/LinkWidget.vue'
    import GhostWorld from './components/GhostWorld.vue'

    export default {
        name: 'App',
        components: {LinkWidget, CometWorld, GhostWorld},
        methods:{
            next:function(){
                this.$refs.cometWorld.destroy();
                console.log(this.$refs);
            }
        }
    }
</script>
