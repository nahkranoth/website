<template>
    <div class="main-container">
        <div></div>
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
                document.addEventListener('OnImkerClicked', (e) => { console.log("heyo"); });
                document.addEventListener('OnGamesClicked', (e) => { console.log("heyo"); });
                document.addEventListener('OnVFXClicked', (e) => { console.log("heyo"); });
                document.addEventListener('OnMusicClicked', (e) => { console.log("heyo"); });
            }
        }
    }
</script>

<style scoped>
    
    
</style>