<template>
    <div>GhostSynth</div>
</template>

<script>
    import GhostSynth from "../audio/ghostSynth.js"

    export default {
        name: "GhostWorld",
        mounted(){
          this.onStart();
        },
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