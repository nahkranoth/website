<template>
    <div class="project-panel">
        <a href='http://joeyvanderkaaij.com/sharing/Imker/' class="item click disable-select"><div class="imker-logo"></div></a>
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
        color:white;
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
    }
    .imker-logo{
        background-image: url("/assets/images/logo.png");
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