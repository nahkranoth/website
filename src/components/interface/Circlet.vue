<template>
    <div class="circlet-wrapper" :style="itemStyle">
        <svg class="circlet-item disable-select" width="18" height="18" ref="circle" @click="clickedButton">
            <circle
                    class="circle"
                    :stroke="color"
                    stroke-width="2"
                    :fill="colorStyle"
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
            color:{type:String, default:'#a2e5e7'},
            innerColor:{type:String, default:'#000'},
            left:{ type:Number, default:0 },
            top:{ type:Number, default:0 },
        },
        data:function(){
            return {
                iClr: "#000"
            }
        },
        computed: {
            itemStyle(){
                return{
                    left:this.left+'px',
                    top:this.top+'px'
                }
            },
            colorStyle(){
                return this.iClr
            }
        },
        methods:{
            setColor(clr){
              this.iClr = clr;
            },
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