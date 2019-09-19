<template>
    <div id="link-widget" class="disable-select">
        <div class="text">Joey van der Kaaij</div>
        <div class="link-widget-item"><a target="_blank" href="https://github.com/nahkranoth">Github</a></div>
        <div class="link-widget-item"><a target="_blank" href="https://www.linkedin.com/in/joey-van-der-kaaij-3862652b/">LinkedIn</a></div>
    </div>
</template>

<script>
    export default {
        name: 'LinkWidget',
        mounted(){

        }
    }
</script>

<style scoped>

    #link-widget{
        position:absolute;
        right:30px;
        bottom:30px;
        z-index:2;
    }

    .link-widget-item{
        color:#fff;
        display:inline;
    }

</style>