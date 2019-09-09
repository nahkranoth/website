<template>
    <div id="audio-host">audioHost</div>
</template>

<script>
    import Tone from 'tone'

    export default {
        name: "audio-host",

        mounted(){
            var noise = new Tone.Noise("pink").start();

            var filter = new Tone.Filter(100, "lowpass");
            noise.connect(filter);

            var limiter = new Tone.Limiter(-70);
            filter.connect(limiter);

            limiter.toMaster();
        }
    }
</script>

<style scoped>
    #audio-host{
        position:absolute;
        z-index:2;
    }
</style>