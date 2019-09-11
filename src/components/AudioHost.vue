<template>
    <div id="audio-host">audioHost</div>
</template>

<script>
    import Tone from 'tone'

    export default {
        name: "audio-host",

        created () {
            window.addEventListener('wheel', this.onScroll);

        },
        destroyed () {

        },

        methods :{
            onScroll(event){
                //Control Humm gain with scrollwheel
                var scrollVal = Math.sign(event.deltaY) * 0.1;
                var newGain =  this.prevGain - scrollVal;
                this.prevGain = newGain;
                this.fmGain.gain.value = Math.max(0, Math.min(2,newGain));
            }
        },

        mounted(){
            var noise = new Tone.Noise("pink").start();
            noise.volume.value = 0.1;
            var filter = new Tone.Filter(100, "lowpass");
            noise.connect(filter);

            var pingPong = new Tone.Chorus(0.001, 2.5, 0.7);
            filter.connect(pingPong);

            var gain = new Tone.Gain(0.3).toMaster();
            pingPong.connect(gain);

            //FM HUMM SYNTH

            var fmSynth = new Tone.FMSynth();
            fmSynth.envelope.release = 1;
            this.fmGain = new Tone.Gain(0.7);

            fmSynth.connect(this.fmGain);
            fmSynth.triggerAttack("C2");

            var filter = new Tone.Filter(80, "lowpass").toMaster();
            this.fmGain.connect(filter);

            this.prevGain = this.fmGain.gain.value;


        }

    }
</script>

<style scoped>
    #audio-host{
        position:absolute;
        z-index:2;
    }
</style>
