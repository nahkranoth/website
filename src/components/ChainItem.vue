<template>
        <Circlet v-bind:left="left" v-bind:top="top"></Circlet>
</template>

<script>
    import Circlet from './interface/Circlet.vue'
    export default {
        name: "ChainItem",
        components:{Circlet},
        props:{
            left:{ type:Number, default:0 },
            top:{ type:Number, default:0 }
        },
    }
</script>

<style scoped>

</style>