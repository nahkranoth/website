<template>
    <div>
        <GhostWorld v-if="!deepView" v-on:onFFT="onFFT" ref="ghostWorld" class="ghostWorld float"></GhostWorld>

        <MainInterface class="float"></MainInterface>

        <canvas v-bind:class="{ active }" ref="webglContext" id="webglContext" v-on:mousedown="onMouseDown"></canvas>
        <div v-if="deepView" v-on:click="onBack" class="back-button">BACK</div>
    </div>
</template>

<script>
    import World from '../webgl/world.js'
    import GhostWorld from './GhostWorld.vue'
    import MainInterface from './MainInterface.vue'
    import Projects from './Projects.vue'
    import {Renderer, Transform, Vec3} from 'ogl/src/index.mjs';

    export default {
        name: 'CometWorld',
        components: {Projects, MainInterface, GhostWorld},
        data() {
            return {
                active : false,
                deepView : false,
                lastTextIdx:0
            }
        },
        mounted(){
            this.onStart();
        },
        methods:{
            onMouseDown(){
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
                    this.scene,
                    () => {
                        this.onSwitchPage();
                    },
                );
            },

            //fft is an array with the size of 4096
            onFFT(fft){
                if(this.active){
                    //this.world.setFFT(fft);
                }
            },

            toggle(){
                this.active = !this.active;
                this.world.toggle(this.active);
            },

            onSwitchPage(){
                this.deepView = true;
            },
            onBack(){
                this.deepView = false;
                this.world.onBackToRoot();
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
    .float{
        position:absolute;
        width:100%;
        height:100%;
    }
    .back-button{
        position: absolute;
        left:10px;
        top:10px;
        user-select: none;
    }
</style>
