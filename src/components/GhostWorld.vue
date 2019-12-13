<template>
    <div>
        <GhostNode ref="nodeOne" class="ghost-node" ></GhostNode>
        <GhostChainController  v-on:onNote="onNote"></GhostChainController>
    </div>
</template>

<script>
    import Tone from 'tone'
    import GhostNode from "./GhostNode.vue"
    import GhostChainController from './GhostChainController.vue'
    //Todo: Make a Dial wrapper that can switch it's function making every GhostSynthNote just one Dial

    export default {
        name: "GhostWorld",
        mounted(){
          this.onStart();
        },
        data:function(){
          return {
          }
        },
        components: {GhostNode, GhostChainController},
        methods:{
            toggle(){
            },
            onStart(){
                Tone.Transport.start();
            },
            onNote(note){
                this.$refs.nodeOne.playNote(note);
            }
        }
    }
</script>

<style scoped>
    .dial-container{
        display:inline-flex;
        position:relative;
    }
</style>
