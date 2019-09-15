<template>
    <div id="app">
        <LinkWidget></LinkWidget>
        <CometWorld v-if="cometWorldActive" ref="cometWorld"></CometWorld>
        <GhostWorld v-if="ghostWorldActive" ref="ghostWorld"></GhostWorld>
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
        data() {
            return {
                ghostWorldActive : false,
                cometWorldActive : true
            }
        },
        methods:{
            next:function(){
                this.ghostWorldActive = true;
                this.cometWorldActive = false;
                this.$refs.cometWorld.toggle();
            }
        }
    }
</script>
