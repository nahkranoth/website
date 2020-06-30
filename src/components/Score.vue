<template>
    <div class="score">METEOR CASH<div class="number">{{score}}</div></div>
</template>

<script>
    export default {
        name: "Score",

        data:function(){
            return{
                score:0
            }
        },
        mounted:function(){
            document.addEventListener('mouseup', this.onClick);
        },
        methods:{
            onClick: function(){
                this.score++;
            }
        }
    }
</script>

<style scoped>
    .score{
        position:absolute;
        color:white;
        text-align: right;
        right:30px;
        top:30px;
        z-index:999;
    }
</style>