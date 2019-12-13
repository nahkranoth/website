<template>
    <div>
        <GhostControlPanel ref="controlPanel" class="ghost-node"></GhostControlPanel>
        <GhostChainSequencer v-on:onNote="onNote" v-bind:amount=8></GhostChainSequencer>
    </div>
</template>

<script>
    import Tone from 'tone'
    import GhostControlPanel from "./GhostControlPanel.vue"
    import GhostChainSequencer from './GhostChainSequencer.vue'
    import GhostSynthNode from '../audio/ghostSynthNode.js'

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
        components: {GhostControlPanel, GhostChainSequencer},
        methods:{
            onStart(){
                this.synth = new GhostSynthNode();
                this.$refs.controlPanel.Init(this.synth);
                Tone.Transport.start();
            },
            onNote(note){
                this.synth.note(note);
            }
        }
    }
</script>

<style scoped>

</style>
