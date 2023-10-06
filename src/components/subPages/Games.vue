<template>
<div class="info">
    <div class="info"><h1>Games</h1></div>
    <div class="info">
        <h2>Sammy's Toys</h2>
        <iframe frameborder="0" src="https://itch.io/embed/2041871" width="552" height="167"><a href="https://hobscure.itch.io/sammys-toys">Sammy's Toys by hobscure</a></iframe>
        <p>Sammy the cat lost his toys. Can you help him find them? Those toys can be heavy and you are not strong enough to jump while holding one.</p>
    </div>

    <div class="info">
        <h2>Hybrid Magic Gone Wrong</h2>
        <iframe frameborder="0" src="https://itch.io/embed/334854" width="552" height="167"><a href="https://hobscure.itch.io/hybrid-magic">Hybrid Magic - gone wrong by hobscure</a></iframe>
        <p>You had been warned by the Warlich Warlock Society and even the Wugonian Wizards not to fool around with hybrid magic. But ... that idea! That bright idea of combining ice and fire magic into an amazing Hybrid Magic. You couldn't resist it any longer. It lingered and pressed upon your curiosity like a million pounds of Galgonium dead matter - that horrible urgance for you - out of all wizards - to be the one to make this a reality.
          A bittersweet reality so it seems now. For the Hybrid Magic Gone Wrong! Made for Github Gamejam 2018</p>
    </div>
    <div class="info">
        <h2>Immelman</h2>
        <video loop muted controls autoplay>
            <source src="assets/videos/immelman.mp4" type="video/mp4">
        </video>
        <p>Online Multiplayer dogfight game.</p>

        <p><a href="https://github.com/nahkranoth/Immelman">Github Repository</a></p>
        <p><a href="assets/downloads/Immelman_win.zip">Windows Download</a></p>
        <p><a href="assets/downloads/Immelman_mac.zip">Mac Download</a></p>
        <div><h2>Controls</h2>
        <ul>
            <li>Roll: A & D</li>
            <li>Elevator: W & S</li>
            <li>Rudder: Q & E</li>
            <li>Throttle: Z & X</li>
            <li>FreeLook: C</li>
            <li>Fire: L-Mouse</li>
            <li>Boost: R-Mouse</li>
            <li>Brake: B</li>
        </ul>
        </div>

    </div>

    <div class="info">
        <h2>Finger Flip Skateboarding</h2>
        <video loop muted controls autoplay>
            <source src="assets/videos/Fingerflip.mp4" type="video/mp4">
        </video>
        <p>Mobile Skateboarding game</p>
        <p><a href="https://github.com/nahkranoth/Skateboard">Github Repository</a></p>
        <p><a href="assets/downloads/FingerFlipSkateboarding.zip">Windows Download</a></p>
        <div><h2>Controls</h2>
        <ul>
            <li>Swipe for tricks</li>
        </ul>
        </div>
    </div>

    <div class="info">
        <h2>Dark Tourism</h2>
        <p>The enemy knows where you are! Better make that bunker sturdy.</p>
        <div>
            <video width="640" height="360" loop controls muted autoplay>
                <source src="assets/videos/DarkTourism.mp4" type="video/mp4">
            </video>
        </div>
        <div>
            <video width="640" height="360" loop controls muted autoplay>
                <source src="assets/videos/DarkTourism2.mp4" type="video/mp4">
            </video>
        </div>
    </div>

    <div class="info">
        <h2>Modeling/Lighting</h2>
        <div>
            <video width="640" height="360" loop controls muted autoplay>
                <source src="assets/videos/Submarine_Game.mp4" type="video/mp4">
            </video>
        </div>
        <div><br></div>
        <div>
            <video width="640" height="360" loop controls muted autoplay>
                <source src="assets/videos/Jungle.mp4" type="video/mp4">
            </video>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "Games",
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
