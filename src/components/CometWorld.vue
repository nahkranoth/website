<template>
    <div>
        <GhostWorld v-on:onFFT="onFFT" ref="ghostWorld" class="ghostWorld"></GhostWorld>
        <canvas v-bind:class="{ active }" ref="webglContext" id="webglContext" v-on:mousedown="onMouseDown"></canvas>
    </div>
</template>

<script>
    import World from '../webgl/world.js'
    import MSDFText from '../webgl/MSDFText.js'
    import GhostWorld from './GhostWorld.vue'
    import {Renderer, Transform} from 'ogl/src/index.mjs';

    export default {
        name: 'CometWorld',
        components: {GhostWorld},
        data() {
            return {
                active : false,
                lastTextIdx:0,
                words: [
                    "click around",
                    "click some more",
                ]
            }
        },
        mounted(){
            this.onStart();
        },
        methods:{
            newRandom(){
                let result = 0;
                while(this.lastTextIdx === result){
                    result = Math.floor(Math.random()*this.words.length);
                }
                this.lastTextIdx = result;
                return result;
            },
            onMouseDown(){
                let rn = this.newRandom();
                this.text.setText(this.words[rn]);
            },
            onStart(){
                this.scene = new Transform();
                this.renderer = new Renderer({dpr: 2, canvas: this.$refs.webglContext, webgl:2});
                this.gl = this.renderer.gl;
                this.gl.getExtension('OES_standard_derivatives');

                this.world = new World(
                    () => {
                        this.$refs.webglContext.opacity = 0;
                        this.active = true;
                    },
                    this.renderer,
                    this.scene
                );

                this.text = new MSDFText(this.renderer, this.scene)
            },

            //fft is an array with the size of 4096
            onFFT(fft){
                if(this.active){
                    this.world.setFFT(fft);
                }
            },

            toggle(){
                this.active = !this.active;
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
    .ghostWorld{
        position:absolute;
    }
</style>
