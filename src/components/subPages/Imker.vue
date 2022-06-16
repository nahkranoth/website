<template>
   <div class="info">
        <div class="logo"><img src="assets/images/logo.png" alt=""></div>
        <p>Imker is a programming language to procedurally generate and modify musical sequences in a live environment.</p>
        <h2>Download</h2>
        <div class="downloads">
            <div class="windows">Windows Download: <a id="win-click-link" href='assets/downloads/Imker_alpha_07_win.zip'> Windows alpha_07 </a> </div>
            <div class="mac">Mac Download: <a id="mac-click-link" href='assets/downloads/Imker/Imker_alpha_07_mac.zip'> Mac OSX alpha_07 </a> </div>
        </div>

        <h2>Roadmap</h2>
        <p><a href="https://trello.com/b/K5KVjIAV/imker">Roadmap</a> (anything is up for change)</p>

        <h2>Introduction</h2>
        <p>
            Imker tries to be a quick, extensive and visually pleasing live-coding
            environment to drive synthesizers, drum machines and other MIDI equipment.
            Imker provides you with tools to quickly modify values and generate algorithms that change values and keep them developing over time.<br><br>
            The word Imker comes from the Dutch word for beekeeper and seems fitting for the hexagon grid might remind some of a beehive.
            All those dancing values might remind others of bees dancing to communicate.<br><br>
        </p>
        <p>
            <iframe width="420" height="315" src="https://www.youtube.com/embed/r5CFBcy5ehM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </p>

        <h2>How To use Imker</h2>
        <p>
            When you start Imker up you are greeted by a honeycomb (or a grid of hexagons).<br>
            You can navigate the grid by clicking, or by using the arrow keys. This will select a single cell, or multiple on dragging.<br>
            Whenever you're ready to give Imker some unput, go ahead. Note that Imker needs 2 values for a cell to confirm it.<br>
            A cell only fills itself with the value if it's correct. This means that it's either a value between 0 and255 in hexadecimal format (00-ff).<br>
            Or, that it's a existing operator. See operator list for valid operators.<br>
            Okey here is where it can become difficult depending on who you are.<br>
            Imker uses OPERATORS like "ma" (Math Add); think of it like the + sign. <br>
            Imker also uses VALUES, like 69. Imker is hexadecimal based, that means that there are only 256 values ranging from 0 to 255.<br>
            A hexagon in a grid has neighbours. These neighbours are friendly towards each other.<br>
            Neighbours know each other by these names:<br>
            <br>
            <img src="assets/images/info_neighbours.png"><br><br>
            Note that OPERATORS usually have input and output neighbours. One of those input neighbours or PORTS is [T] - or Top.  [T] can be either a clock or a value input depending on the OPERATOR. A clock bangs {ON} on 1 and {OFF} on 0.
            Banging means that the OPERATOR executes it's function. Not all OPERATORS need a bang to execute their functionality. OPERATORS without a clock input PORT update every tick of the BPM clock.<br>
            Also Note that in some instances [TR] functions as an extra input port.
            <br><br>
            
        </p>
        <h2>Operators</h2>

        <p>
            <ul>
                    <li class="c">ma : Adds input ports [T, TL, BL] and outputs result in [B]</li>
                    <li class="c">ms : Subtracts input ports [T, TL, BL] and outputs result in [B]</li>
                    <li class="c">mm : Multiplies input ports [T, TL] and outputs result in [B]</li>
                    <li class="c">md : Divides input ports [T, TL] and outputs result in [B]</li>
                    <li class="c">mo : Modulo input ports [TL] over [TR] and outputs result in [B]</li>
                    <li class="c">mr : Generates a random value on every bang from [T] between [TL] and [BL] and outputs result in [B]</li>
                    <li class="c">if : Compares if input ports [T] and [TL] are the same and outputs result in [B]</li>
                    <li class="c">no : Compares if input ports [T] and [TL] are NOT the same and outputs result in [B]</li>
                    <li class="c">bi : Compares if input ports [T] is bigger than [TL], outputs result in [B]</li>
                    <li class="c">sm : Compares if input ports [T] is smaller than [TL], outputs result in [B]</li>
                    <li class="c">fl : Either takes input [TL] or [TR] and output it in [B] on every bang [T]</li>
                    <li class="c">wr : Writes value [T] on X coordinate [TL] and Y coordinate [BL]</li>
                    <li class="c">rw : Read Value from X coordinate [TL] and Y coordinate [TR] and output in [B]</li>
                    <li class="c">ra : Store a value until update</li>
                    <li class="c">wn : Repeats itself on [T] (North)</li>
                    <li class="c">cl : Increases value on [B] every [T] divisions of a beat (BPM) upto [TL]</li>
                    <li class="c">ec : Pulses on [B] every [T] divisions of the total [TL]</li>
                    <li class="c">dl : Bangs [B] every [T] divisions of a beat (BPM) modulo by [TL]</li>
                    <li class="c">jv : Jump vertical from [T] to [B]</li>
                    <li class="c">jt : Jump horizontal from Top [TL] to [TR]</li>
                    <li class="c">jb : Jump horizontal from Bottom [BL] to [BR]</li>
                    <li class="c">jd : Jump diagonal from Top [TL] to [BR]</li>
                    <li class="c">je : Jump diagonal from Bottom [BL] to [TR]</li>
                    <li class="c">:m : Fires midi note on bang! [T] with note [TL], [BL] as velocity and channel [TR].</li>
                    <li class="c">:c : Fires midi cc on clock [T] on channel [TL] and control channel [BL] with value [TR]</li>
                    <li class="c">## : Comment from here</li>
                <li class="c">Set notes full notes with !a,!c,!d,etc or sharp notes with #a, #c, #d, etc</li>
                <li class="c">Set input variables with i0, i1, i2, i3, ... , i9</li>
                <li class="c">Set output variables with o0, o1, o2, o3, ... , o9</li>
            </ul>
        </p>
        <h2>Controls</h2>
        <p>
            <ul>
                <li>SPACE Start or stop the clock.</li>
                    <li class="c">Control+Key_S: Save File</li>
                    <li class="c">Control+Key_L: Load File</li>
                    <li class="c">Control+Key_Z: Undo Action</li>
                    <li class="c">Control+Key_Q: Quit Application</li>
                    <li class="c">Control+Key_C: Copy Selection</li>
                    <li class="c">Control+Key_X: Cut Selection</li>
                    <li class="c">Control+Key_V: Paste Clipboard Selection</li>
                    <li class="c">Control+Key_I: Info/Help</li>
                    <li class="c">Control+Key_F: Fullscreen</li>
                    <li class="c">Control+Key_Period: Increase Midi Port</li>
                    <li class="c">Control+Key_Comma: Decrease Midi Port</li>
                    <li class="c">Control+Key_H: Increase BPM +1</li>
                    <li class="c">Control+Key_G: Decrease BPM -1</li>
                    <li class="c">Shift+Key_H: Increase BPM +10</li>
                    <li class="c">Shift+Key_G: Decrease BPM -10</li>
                    <li class="c">Shift+Key_O: Zoom Out</li>
                    <li class="c">Shift+Key_I: Zoom In</li>
                    <li class="c">Shift+Key_W: Scroll Up</li>
                    <li class="c">Shift+Key_S: Scroll Down</li>
                    <li class="c">Shift+Key_A: Scroll Left</li>
                    <li class="c">Shift+Key_D: Scroll Right</li>
            </ul>
        </p>
        <h2>Config</h2>
        <p>
            In the assets folder you can find the config.txt
            You can change the keybinding from here.
            You can also change the grid radius from here, note that the radius influences the performance of Imker.
        </p>
        <h2>Other</h2>
        <p>Imker is inspired by <a href="https://github.com/hundredrabbits/Orca">Orca</a></p>
    </div>
</template>

<script>
    export default {
        name: "Imker",
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