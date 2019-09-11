<template>
    <div id="audio-host"></div>
</template>

<script>
    import CometSynth from '../audio/cometSynth.js'

    export default {
        name: "audio-host",

        created () {
            this.onStart();
        },
        destroyed () {

        },

        methods :{
            onStart(){
                window.addEventListener('wheel', this.onScroll);
                window.addEventListener('mousedown', this.onMouseClick);
                this.audioActive = false;
                this.fftSize = 128;
                this.prevScrollDist = 0.7;
                this.frameStepSize = 10;
                this.elapsedFrames = 0;

                this.cometSynth = new CometSynth(this.fftSize);
            },
            onScroll(event){
                if(!this.audioActive) return;
                //Control Humm gain with scrollwheel
                var scrollVal = Math.sign(event.deltaY) * 0.1;
                var newScroll =  this.prevScrollDist - scrollVal;
                this.prevScrollDist = newScroll;
                this.cometSynth.setGain(newScroll);
            },
            onMouseClick(){
                if(!this.audioActive) {
                    this.cometSynth.startAudioContext();
                }
                this.audioActive = true;
            },
            updateLoop(){
                this.elapsedFrames++;
                if(this.elapsedFrames >= this.frameStepSize && this.audioActive){
                    this.$emit('onFFT', this.cometSynth.getFFT());
                    this.elapsedFrames = 0 ;
                }

                window.requestAnimationFrame(() => {this.updateLoop()})
            }
        },

        mounted(){
            window.requestAnimationFrame(() => {this.updateLoop()})
        }

    }
</script>

<style scoped>
    #audio-host{
        position:absolute;
        z-index:2;
    }
</style>
