<template>
    <ul>
        <li v-for="item in chainItems">
            <ChainItem ref="chainItem" v-bind:left="item.x" v-bind:top="item.y"></ChainItem>
        </li>
    </ul>
</template>

<script>
    import ChainItem from "./ChainItem.vue"

    export default {
        name: "GhostChainController",
        components:{ChainItem},
        data:function(){
          return{
              chainItems:[]
          }
        },
        mounted(){
            this.onStart();
        },
        methods:{
            onStart(){
               this.createItems();
            },
            runSequencer(){
                var seq = new Tone.Sequence((time, note) => {
                    // this.$refs.nodeOne.playNote(note);
                }, [220, 220, 440, 440], "8n");
            },
            createItems(){
                let cX = window.innerWidth / 2;
                let cY = window.innerHeight / 2;
                let amount = 8;
                let radians = 120;
                let anglePart = 360/amount;

                for(var i=0;i<amount;i++){
                    let localX = radians*Math.cos( (anglePart*i) * Math.PI/180);
                    let localY = radians*Math.sin( (anglePart*i) * Math.PI/180);
                    let worldX = cX + localX;
                    let worldY = cY + localY;
                    this.createItem(worldX, worldY);
                }
            },
            createItem(x, y){
                this.chainItems.push({x:x,y:y});
            }
        }
    }
</script>

<style scoped>

</style>