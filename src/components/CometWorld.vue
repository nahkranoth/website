<template>
    <div>
        <AudioHost v-on:onFFT="onFFT" ref="audioHost"></AudioHost>
        <canvas v-bind:class="{ active }" ref="webglContext" id="webglContext"></canvas>
    </div>
</template>

<script>
    import World from '../webgl/world.js'
    import AudioHost from './AudioHost.vue'

    export default {
        name: 'CometWorld',
        components: {AudioHost},
        data() {
            return {
                active : false
            }
        },
        mounted(){
            this.onStart();
        },
        methods:{
            onStart(){
                this.world = new World(this.$refs.webglContext,
                    () => {
                        this.$refs.webglContext.opacity = 0;
                        this.active = true;
                    }
                );
            },

            //fft is an array with the size of 4096
            onFFT(fft){
                if(this.active){
                    this.world.setFFT(fft);
                }
            },

            toggle(){
                this.active = !this.active;
                this.$refs.audioHost.toggle(this.active);
                this.world.toggle(this.active);
            }
        }
    }
</script>

<style scoped>
    #webglContext{
        opacity:0;
        transition: opacity 2.6s;
    }
    #webglContext.active{
        opacity:0.6;
    }
</style>
