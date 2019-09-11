<template>
    <div>
        <AudioHost v-on:onFFT="onFFT"></AudioHost>
        <canvas v-bind:class="{ active }" ref="webglContext" id="webglContext"></canvas>
    </div>
</template>

<script>
    import World from '../webgl/world.js'
    import LinkWidget from './LinkWidget.vue'
    import AudioHost from './AudioHost.vue'

    export default {
        name: 'SpaceWorld',
        components: {LinkWidget, AudioHost},
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
            onFFT(fft){
                console.log(fft);
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
