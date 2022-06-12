<template>
    <div class="main-container">
        <div class="console disable-select">
            raʊnd trɪp /ə'rʌivel/ iminənt <br>
            /kənˌtamiˈneiʃ(ə)n/ @ 80% <br>
            $ <span class="cursor">_</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainInterface",
        mounted(){
            this.onStart();
            
        },
        data:function(){
          return {
             
          }
        },
        components: {},
        methods:{
            onStart(){
               
            }
        }
    }
</script>

<style scoped>
    .main-container{
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .console{
        margin-left:20px;
        margin-top:20px;
        padding: 10px;
        text-align: left;
        font: 1.3rem Inconsolata, monospace;
        text-shadow: 0 0 5px #C8C8C8;
        background-image: radial-gradient(
            rgba(0, 150, 0, 0.75), black 120%
        );
        display:inline-block;
    }

    .cursor{
        animation: cursor-blink 1.5s steps(2) infinite;
    }

    @keyframes cursor-blink {
        0% {
            opacity: 0;
        }
    }
    
</style>