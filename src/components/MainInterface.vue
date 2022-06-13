<template>
    <div class="main-container" v-if="imkerView">
        <div class="content-wrapper">
            <div class="top-wrapper">
                <div v-on:mousedown="onClose" class="close-btn">X</div>
                <span class="title">Imker</span>
            </div>
            <div class="scroll-wrapper">
                <Imker  class="content"></Imker>
            </div>
        </div>
    </div>
</template>

<script>
    import Imker from "./subPages/Imker.vue";

    export default {
        name: "MainInterface",
        components: {Imker},
        mounted(){
            this.onStart();
        },
        data:function(){
          return {
             imkerView:false
          }
        },
        methods:{
            onClose(){
                this.imkerView=false;
            },
            onStart(){
                document.addEventListener('OnImkerClicked', (e) => { 
                    this.imkerView = true; 
                    });
                document.addEventListener('OnGamesClicked', (e) => { console.log("heyo"); });
                document.addEventListener('OnVFXClicked', (e) => { console.log("heyo"); });
                document.addEventListener('OnMusicClicked', (e) => { console.log("heyo"); });
            }
        }
    }
</script>

<style scoped>
    .main-container{
        position:absolute;
        z-index:100;
        top: 16%;
        left: 0; 
        right: 0; 
        margin-left: auto; 
        margin-right: auto;
    }

    .content-wrapper{
        left: 0; 
        right: 0; 
        margin-left: auto; 
        margin-right: auto;
    }

    .scroll-wrapper{
        overflow-y:scroll;
        left: 0; 
        right: 0; 
        margin-left: auto; 
        margin-right: auto;
        height:700px;
    }

    .top-wrapper{
        background-color: black;
        text-align: left;
        padding:10px;
        user-select: none;
    }

    .close-btn{
        border-color: white;
        border-width: 1px;
        border-style: solid;
        padding:4px;
        display: inline;
        user-select: none;
    }

    .content{
        width:20%;
        padding:20px;
    }

    a{
        color: hotpink;
    }

    .logo{
        padding-bottom: 64px;
    }

    .info{
        background-color: #372f56;
    }

    ul{
        background-color: #4b3b7a;
        color: #ded6d2;
        padding:20px 40px;
    }

    
</style>