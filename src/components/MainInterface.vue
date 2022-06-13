<template>
    <div>
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

        <div class="main-container" v-if="gameView">
            <div class="content-wrapper">
                <div class="top-wrapper">
                    <div v-on:mousedown="onClose" class="close-btn">X</div>
                    <span class="title">Games</span>
                </div>
                <div class="scroll-wrapper">
                    <Games  class="content"></Games>
                </div>
            </div>
        </div>

         <div class="main-container" v-if="vfxView">
            <div class="content-wrapper">
                <div class="top-wrapper">
                    <div v-on:mousedown="onClose" class="close-btn">X</div>
                    <span class="title">Shaders</span>
                </div>
                <div class="scroll-wrapper">
                    <VFX  class="content"></VFX>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Imker from "./subPages/Imker.vue";
    import Games from "./subPages/Games.vue";
    import VFX from "./subPages/VFX.vue";

    export default {
        name: "MainInterface",
        components: {Imker, Games, VFX},
        mounted(){
            this.onStart();
        },
        data:function(){
          return {
             imkerView:false,
             gameView:false,
             vfxView:false
          }
        },
        methods:{
            onClose(){
                this.imkerView=false;
                this.gameView=false;
                this.vfxView=false;
            },
            onStart(){
                document.addEventListener('OnImkerClicked', (e) => { 
                    this.imkerView = true; 
                    });
                document.addEventListener('OnGamesClicked', (e) => { 
                    this.gameView = true;
                 });
                document.addEventListener('OnVFXClicked', (e) => { 
                    this.vfxView = true;
                });
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
        width:80%;
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
        padding:20px;
    }
    
</style>