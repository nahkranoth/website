<template>
    <div class="score">COMET CASH<div class="number">☄ {{score}}</div></div>
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
            let cash = window.localStorage.getItem('meteor_cash');
            if(cash) this.score = cash;
            document.addEventListener('mouseup', this.onClick);
        },
        methods:{
            onClick: function(){
                this.score++;
                window.localStorage.setItem('meteor_cash', this.score);
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