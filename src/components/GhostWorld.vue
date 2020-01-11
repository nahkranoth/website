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
                this.fxChain = this.createFxChain();
                this.createSynths();
                let firstItem = this.$refs.sequencer.Init(this.synths);
                this.$refs.controlPanel.Set(firstItem);
                Tone.Transport.start();
            },
            stop(){
                this.$refs.sequencer.stop();
            },
            createFxChain(){
                var feedbackDelay = new Tone.FeedbackDelay("8n", .2);
                var chorus = new Tone.Chorus(4, 2.5, 0.5);
                feedbackDelay.connect(chorus);
                var pingPong = new Tone.PingPongDelay("4n", 0.1);
                chorus.connect(pingPong);
                var freeverb = new Tone.Freeverb({
                    roomSize : .8 ,
                    dampening : 200
                });
                pingPong.connect(freeverb);
                var reverb = new Tone.JCReverb(0.99);
                freeverb.connect(reverb);
                var lpFilter = new Tone.Filter(200, "lowpass");
                reverb.connect(lpFilter);
                var hpFilter = new Tone.Filter(200, "highpass");
                lpFilter.connect(hpFilter);
                var limiter = new Tone.Limiter(-44).toMaster();
                hpFilter.connect(limiter);

                return reverb;
            },

            createSynths(){
                for(var i=0;i<this.amount;i++){
                    this.synths.push(new GhostSynthNode(this.fxChain));
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
