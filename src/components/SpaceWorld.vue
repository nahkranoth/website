<template>
    <canvas v-bind:class="{ active }" ref="webglContext" id="webglContext"></canvas>
</template>

<script>
    import World from '../webgl/world.js'
    import LinkWidget from './LinkWidget.vue'

    export default {
        name: 'SpaceWorld',
        components: {LinkWidget},
        data() {
            return {
                active : false
            }
        },
        mounted(){

            var world = new World(this.$refs.webglContext,
                () => {
                    this.$refs.webglContext.opacity = 0;
                    this.active = true;
                }
            );
        }
    }
</script>

<style>
    #webglContext{
        opacity:0;
        transition: opacity 2.6s;
    }
    #webglContext.active{
        opacity:0.6;
    }
</style>