<template>
    <div class="chain-item-wrapper" :style="itemStyle">
        <Circlet></Circlet>
    </div>
</template>

<script>
    import Circlet from './interface/Circlet.vue'
    export default {
        name: "ChainItem",
        components:{Circlet},
        props:{
            left:{ type:Number, default:0 },
            top:{ type:Number, default:0 },
        },
        computed: {
            itemStyle(){
                return{
                    left:this.left+'px',
                    top:this.top+'px'
                }
            }
        },
    }
</script>

<style scoped>
    .chain-item-wrapper{
        display:inline-block;
        position:absolute;
    }
</style>