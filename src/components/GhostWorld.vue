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
            onStart(){
                var ghostSynth = new GhostSynth();

            }
        }
    }
</script>

<style scoped>

</style>