<template>
    <canvas v-show="awesome" ref="webglContext" id="webglContext"></canvas>
</template>

<script>
    import World from '../webgl/world.js'
    export default {
        name: 'BackgroundCanvas',
        data() {
            return {
                awesome : false
            }
        },
        mounted(){

            var world = new World(this.$refs.webglContext,
                () => {
                    console.log(this.$refs);
                    this.awesome = true;
                }
            );


        }
    }
</script>