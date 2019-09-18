<template>
    <div>
        <Dial></Dial>
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
                console.log("Ghostworld toggle");
            },
            onStart(){
                console.log("Ghostworld start");
                var ghostSynth = new GhostSynth();
            }
        }
    }
</script>

<style scoped>

</style>
