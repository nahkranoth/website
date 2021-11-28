<template>
    <div class="project-panel">
        <div class="item disable-select">pROjEcTS</div>
        <div class="item disable-select">______</div>
        <div><a href='http://joeyvanderkaaij.com/sharing/Imker/' class="item click disable-select">⬡ Imker ⬡</a></div>
        <div class="imker-logo"></div>
        <div class="imker">Live coding hexagon music generator</div>
    </div>
</template>

<script>
    export default {
        name: "Projects",
        methods:{}
    }
</script>

<style scoped>
    .project-panel{
        position:absolute;
        background:white;
        color:black;
        text-align: right;
        width:350px;
        height:500px;
        top:120px;
        left: 0; 
        right: 0;
        margin-left: auto; 
        margin-right: auto;
        z-index:999;
        padding-top:20px;
        text-align: center;
    }
    .item{
        cursor:default;
    }
    .item.click{
        cursor: crosshair;
        font-weight:bold;
        color: black;
    }
    .imker-logo{
        background-image: url("/assets/logo.png");
        background-size: 230px 230px;
        width:230px;
        height:230px;
        position: absolute;
        top:120px;
        left:0;
        right:0;
        margin-left:auto;
        margin-right:auto;
    }
</style>