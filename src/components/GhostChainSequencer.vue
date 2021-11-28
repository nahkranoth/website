<template>
    <ul>
        <li class="list-item" v-for="model in chainItems">
            <ChainItem :ref="model.ref" :model="model" v-on:SelectMe = "selectItem"></ChainItem>
        </li>
    </ul>
</template>

<script>
    import ChainItem from "./ChainItem.vue"
    import ChainItemModel from "./ChainItemModel.js"
    import Tone from 'tone'

    export default {
        name: "GhostChainSequencer",
        components:{ChainItem},
        props:{
            amount:{ type:Number, default:0 },
        },
        data:function(){
          return{
              chainItems:[],
              sequencer:undefined
          }
        },
        methods:{
            Init(synths){
                this.amount = synths.length;
                this.createItems(synths);
                this.runSequencer();
                this.$nextTick(()=>{
                    this.$refs[this.chainItems[0].ref][0].onSelect();
                });
                return this.chainItems[0];
            },
            runSequencer(){
                var active = 0;
                var previous = 0;
                if(this.chainItems.length === 0) return;

                this.sequencer = new Tone.Sequence(() => {
                    let previousItem = this.chainItems[previous];
                    let item = this.chainItems[active];

                    if(item !== previousItem) this.$refs[previousItem.ref][0].dePulse();
                    this.$refs[item.ref][0].pulse();

                    item.synth.emit(item.freq);

                    previous = active;
                    active = (active + 1) % this.amount;//increase and restrain
                }, [0, 0, 0, 0], 2.5);//I do not use the note value that comes with the sequencer - I do had to choose more than 1 to avoid a bug
                this.sequencer.start(0);
            },
            stop(){
                this.sequencer.stop();
            },
            createItems(synths){
               
                let radians = 120;
                let anglePart = 360/this.amount;

                for(var i=0;i<this.amount;i++){
                    let localX = radians*Math.cos( (anglePart*i - 90) * Math.PI/180);//minus 90 to start at the 1 o clock position
                    let localY = radians*Math.sin( (anglePart*i - 90) * Math.PI/180);
                    this.createItem(i, localX, localY, synths[i]);
                }
            },
            createItem(index, x, y, synth){
                this.chainItems.push(new ChainItemModel({
                    x:x,
                    y:y,
                    freq:Math.random(),
                    vol:Math.random(),
                    oscillator:"square",
                    modulator:"triangle",
                    synth:synth,
                    ref:"item_"+index
                }));
            },
            selectItem(model){
                this.deselectAllItems();
                this.$emit("OnSelectedNode", model);
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
    .list-item{
        list-style-type: none;
    }
</style>