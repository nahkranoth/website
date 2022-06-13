<template>
    <div class="info">
        <div class="info">
            <h1>Shadertoy Examples</h1>
            <p>Click the shadertoy link in the player to see the code</p>
            <div><a href="https://www.shadertoy.com/user/dude">My shadertoy account</a></div>
            <div><br></div>
            <iframe width="640" height="360" frameborder="0" src="https://www.shadertoy.com/embed/MdjBzd?gui=true&t=10&paused=false&muted=false" allowfullscreen></iframe>
            <div><br></div>
            <iframe width="640" height="360" frameborder="0" src="https://www.shadertoy.com/embed/wltBDl?gui=true&t=10&paused=false&muted=false" allowfullscreen></iframe>
            <div><br></div>
            <iframe width="640" height="360" frameborder="0" src="https://www.shadertoy.com/embed/7djXWh?gui=true&t=10&paused=false&muted=false" allowfullscreen></iframe>
            <div><br></div>
        </div>
        <div class="info">
            <h1>Unity VFX</h1>
            <p><a href="https://github.com/nahkranoth/Unity-VFX">Github repository Link</a></p>
            <div><br></div>
            <video loop muted autoplay>
                <source src="assets/rain.mp4" type="video/mp4">
            </video>
            <div><br></div>
            <video loop muted autoplay>
                <source src="assets/SurfaceFollower.mp4" type="video/mp4">
            </video>
            <div><br></div>
            <video loop muted autoplay>
                <source src="assets/ParticleCollision.mp4" type="video/mp4">
            </video>
            <div><br></div>
            <video loop muted autoplay>
                <source src="assets/vapor.mp4" type="video/mp4">
            </video>
            <div><br></div>
            <video loop muted autoplay>
                <source src="assets/fx_electricity.mov" type="video/mp4">
            </video>
            <div><br></div>
            <video loop muted autoplay>
                <source src="assets/point cache.mov" type="video/mp4">
            </video>
            <div><br></div>
            <video loop muted autoplay>
                <source src="assets/spiderball.mp4" type="video/mp4">
            </video>

        </div>
    </div>
</template>

<script>
    export default {
        name: "VFX",
        mounted(){
        },
        data:function(){
          return {
             
          }
        },
        components: {},
        methods:{
          
        }
    }
</script>

<style scoped>
 ul{
        background-color: #4b3b7a;
        color: #ded6d2;
        padding:20px 40px;
        list-style-type: none;
        
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

    h2{
        padding-top:30px;
        padding-bottom:10px;
    }

</style>