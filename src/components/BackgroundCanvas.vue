<template>
</template>

<script>
    import World from '../webgl/world.js'
    export default {
        name: 'BackgroundCanvas',
        mounted(){
            var world = new World();
        }
    }
</script>