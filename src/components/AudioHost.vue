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
                this.fftSize = 4096; // we need to fill the eventual verts up untill 5982
                this.prevScrollDist = 0.7;
                this.frameStepSize = 1;
                this.elapsedFrames = 0;

                this.cometSynth = new CometSynth(this.fftSize);
            },
            onScroll(event){
                if(!this.audioActive) return;
                var scrollVal = Math.sign(event.deltaY) * 0.1;
                var newScroll =  this.prevScrollDist - scrollVal;
                this.prevScrollDist = newScroll;
                //Control Humm gain with scrollwheel
                this.cometSynth.setHummGain(newScroll);
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
