<template>
    <div class="project-panel">
        <div class="item disable-select">pROjEcTS</div>
        <div class="item disable-select">______</div>
        <div class="item click disable-select">Immelman ✈</div>

    </div>
</template>

<script>
    export default {
        name: "Projects"
    }
</script>

<style scoped>
    .project-panel{
        position:absolute;
        background:white;
        color:black;
        padding: 10px;
        text-align: right;
        width:90px;
        height:100px;
        right:30px;
        bottom:90px;
        z-index:999;
    }
    .item{
        cursor:default;
    }
    .item.click{
        cursor: crosshair;
        font-weight:bold;
    }
</style>