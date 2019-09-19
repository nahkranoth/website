<template>
    <div>
        <div class="dial-container"><Dial ref="volDial" v-on:onValue="onVolumeChange" v-bind:label="'Volume'"></Dial></div>
        <!--<div class="dial-container"><Dial ref="panDial" v-on:onValue="onVolumeChange" v-bind:label="'Pan'" v-bind:color="'#fff'"></Dial></div>-->
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
        data:function(){
          return {
          }
        },
        components: {Dial},
        methods:{
            toggle(){
            },
            onStart(){
                this.$refs.volDial.setDial(0.2);
                //this.$refs.panDial.setDial(0.5);
                var ghostSynth = new GhostSynth();
            },
            onVolumeChange(val){
                console.log(val);
            }
        }
    }
</script>

<style scoped>
    .dial-container{
        display:inline-flex;
        position:relative;
    }
</style>
