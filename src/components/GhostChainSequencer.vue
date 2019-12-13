<template>
    <ul>
        <li v-for="item in chainItems">
            <ChainItem :ref="item.ref" v-bind:left="item.x" v-bind:top="item.y" v-on:SelectMe = "selectItem"></ChainItem>
        </li>
    </ul>
</template>

<script>
    import ChainItem from "./ChainItem.vue"
    import Tone from 'tone'

    export default {
        name: "GhostChainSequencer",
        components:{ChainItem},
        props:{
            amount:{ type:Number, default:0 },
        },
        data:function(){
          return{
              chainItems:[]
          }
        },
        methods:{
            Init(synths){
                this.amount = synths.length;
                this.createItems(synths);
                this.runSequencer();
            },
            runSequencer(){
                var active = 0;
                if(this.chainItems.length === 0) return;
                var seq = new Tone.Sequence(() => {

                    let item = this.chainItems[active];
                    item.synth.note(item.freq);
                    this.$refs[item.ref][0].pulse();

                    active = (active + 1) % this.amount;//increase and restrain
                }, [0], "8n");//I do not use the note value that comes with the sequencer
                seq.start(0);
            },
            createItems(synths){
                let cX = window.innerWidth / 2;
                let cY = window.innerHeight / 2;
                let radians = 120;
                let anglePart = 360/this.amount;

                for(var i=0;i<this.amount;i++){
                    let localX = radians*Math.cos( (anglePart*i) * Math.PI/180);
                    let localY = radians*Math.sin( (anglePart*i) * Math.PI/180);
                    let worldX = cX + localX;
                    let worldY = cY + localY;
                    this.createItem(i, worldX, worldY, synths[i]);
                }
            },
            createItem(index, x, y, synth){
                this.chainItems.push({x:x,y:y, freq:220, synth:synth, ref:"item_"+index});
            },
            selectItem(){
                this.deselectAllItems();
            },
            deselectAllItems(){
                for(var i=0;i<this.chainItems.length;i++){
                    let ref = this.chainItems[i].ref;
                    this.$refs[ref][0].deselect();
                }
            }
        }
    }
</script>

<style scoped>

</style>