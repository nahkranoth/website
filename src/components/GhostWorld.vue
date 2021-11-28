<template>
    <div>
        <GhostControlPanel ref="controlPanel" class="ghost-node"></GhostControlPanel>
        <GhostChainSequencer ref="sequencer" class="ghost-chain-sequencer" v-bind:amount="amount" v-on:OnSelectedNode="setControlPanel"></GhostChainSequencer>
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
            document.addEventListener('click', this.onStartAudio);
        },
        data:function(){
          return {
              amount: 8,
              synths:[],
              active: false
          }
        },
        components: {GhostControlPanel, GhostChainSequencer},
        methods:{
            onStartAudio(){
                if(this.active) return;
                Tone.Transport.start();
                this.updateLoop();
                this.active = true;

            },
            onStart(){
                this.fftSize = 4096; //TODO: Centralize it's also used in audiohost
                this.fft = this.FFT();
                let fxChain = this.fxChain(this.fft);
                let synths = this.getSynths(fxChain);
                let firstItem = this.$refs.sequencer.Init(synths);
                this.$refs.controlPanel.Set(firstItem);
            },
            stop(){
                this.$refs.sequencer.stop();
            },
            FFT(){
                return new Tone.Waveform(this.fftSize);
            },
            updateLoop(){
                this.$emit('onFFT', this.fftNormalize(this.fft.getValue()));
                this.animFrame = window.requestAnimationFrame(() => {this.updateLoop()})
            },
            fftNormalize(fft){
                var result = [];
                for(var i=0;i<fft.length;i++){
                    result[i] = fft[i]/8;
                }
                return result;
            },
            fxChain(fft){
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
                hpFilter.fan(fft);

                return reverb;
            },

            getSynths(fxChain){
                let result = [];
                for(var i=0;i<this.amount;i++){
                    result.push(new GhostSynthNode(fxChain));
                }
                return result;
            },
            setControlPanel(model){
                this.$refs.controlPanel.Set(model);
            }
        }
    }
</script>

<style scoped>
    .ghost-node{
        position:relative;
        top:30px;
    }
    .ghost-chain-sequencer{
        left: 50%;
        top: 50%;
        position: absolute;
    }
</style>
