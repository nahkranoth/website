<template>
    <div class="circlet-wrapper" :style="itemStyle">
        <svg class="circlet-item disable-select" width="18" height="18" ref="circle" @click="clickedButton">
            <circle
                    class="circle"
                    stroke="#FFF"
                    stroke-width="2"
                    fill="solid"
                    r="8"
                    cx="9"
                    cy="9" ref="circle"/>
        </svg>
    </div>
</template>

<script>
    export default {
        name: "Circlet",
        props:{
            left:{ type:Number, default:0 },
            top:{ type:Number, default:0 },
        },
        data:function(){
            return {
                color:0xFFFFFF
            }
        },
        computed: {
            itemStyle(){
                return{
                    left:this.left+'px',
                    top:this.top+'px'
                }
            }
        },
        methods:{
            clickedButton(){
                console.log("clicked me");
            }
        }
    }
</script>

<style scoped>
    .circlet-wrapper{
        display:inline-block;
        position:absolute;
    }
</style>