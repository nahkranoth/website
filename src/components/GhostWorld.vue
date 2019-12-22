<template>
    <div>
        <GhostControlPanel ref="controlPanel" class="ghost-node"></GhostControlPanel>
        <GhostChainSequencer ref="sequencer" v-bind:amount="amount" v-on:OnSelectedNode="setControlPanel"></GhostChainSequencer>
    </div>
</template>

<script>
    import Tone from 'tone'
    import GhostControlPanel from "./GhostControlPanel.vue"
    import GhostChainSequencer from './GhostChainSequencer.vue'
    import GhostSynthNode from '../audio/ghostSynthNode.js'

    export default {
        name: "GhostWorld",
        mounted(){
          this.onStart();
        },
        data:function(){
          return {
              amount: 8,
              synths:[]
          }
        },
        components: {GhostControlPanel, GhostChainSequencer},
        methods:{
            onStart(){
                this.createSynths();
                this.$refs.sequencer.Init(this.synths);
                this.$refs.controlPanel.Init(this.synths[0]);
                Tone.Transport.start();
            },
            createSynths(){
                for(var i=0;i<this.amount;i++){
                    this.synths.push(new GhostSynthNode());
                }
            },
            setControlPanel(model){
                this.$refs.controlPanel.Set(model);
            }
        }
    }
</script>

<style scoped>

</style>
