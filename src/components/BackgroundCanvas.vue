<template>
    <canvas ref="webglContext" id="webglContext"></canvas>
</template>

<script>
    import World from '../webgl/world.js'
    export default {
        name: 'BackgroundCanvas',
        mounted(){
            var world = new World(this.$refs.webglContext);
        }
    }
</script>