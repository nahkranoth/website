<template>
    <ul>
        <li v-for="item in chainItems">
            <ChainItem ref="chainItem" v-bind:left="item.x" v-bind:top="item.y"></ChainItem>
        </li>
    </ul>
</template>

<script>
    import ChainItem from "./ChainItem.vue"
    import Tone from 'tone'

    export default {
        name: "GhostChainController",
        components:{ChainItem},
        data:function(){
          return{
              chainItems:[],
              amount:8
          }
        },
        mounted(){
            this.onStart();
        },
        methods:{
            onStart(){
               this.createItems();
               this.runSequencer();
            },
            runSequencer(){
                var active = 0;
                var seq = new Tone.Sequence(() => {

                    let item = this.chainItems[active];
                    this.$emit('onNote', item.freq);

                    active = (active + 1) % this.amount;//increase and restrain
                }, [0], "8n");//I do not use the note value that comes with the sequencer
                seq.start(0);
            },
            createItems(){
                let cX = window.innerWidth / 2;
                let cY = window.innerHeight / 2;
                let radians = 120;
                let anglePart = 360/this.amount;

                for(var i=0;i<this.amount;i++){
                    let localX = radians*Math.cos( (anglePart*i) * Math.PI/180);
                    let localY = radians*Math.sin( (anglePart*i) * Math.PI/180);
                    let worldX = cX + localX;
                    let worldY = cY + localY;
                    this.createItem(worldX, worldY);
                }
            },
            createItem(x, y){
                this.chainItems.push({x:x,y:y, freq:220});
            }
        }
    }
</script>

<style scoped>

</style>