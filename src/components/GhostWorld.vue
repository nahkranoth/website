<template>
    <div>
        <Dial v-on:onValue="onVolumeChange"></Dial>
    </div>
</template>

<script>
    import GhostSynth from "../audio/ghostSynth.js"
    import Dial from "./interface/Dial.vue"

    export default {
        name: "GhostWorld",
        mounted(){
          this.onStart();
        },
        components: {Dial},
        methods:{
            toggle(){
            },
            onStart(){
                var ghostSynth = new GhostSynth();
            },
            onVolumeChange(val){
                console.log(val);
            }
        }
    }
</script>

<style scoped>

</style>
