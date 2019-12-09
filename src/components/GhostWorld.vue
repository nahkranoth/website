<template>
    <div>
        <GhostNode ref="nodeOne" class="ghost-node" ></GhostNode>
    </div>
</template>

<script>
    import Tone from 'tone'
    import GhostNode from "./GhostNode.vue"

    //Todo: Make a Dial wrapper that can switch it's function making every GhostSynthNote just one Dial

    export default {
        name: "GhostWorld",
        mounted(){
          this.onStart();
        },
        data:function(){
          return {
          }
        },
        components: {GhostNode},
        methods:{
            toggle(){
            },
            onStart(){
                var seq = new Tone.Sequence((time, note) => {
                    this.$refs.nodeOne.playNote(note);
                }, [220, 220, 120, 120, 120], "8n");

                seq.start(0);
                Tone.Transport.start();
            }
        }
    }
</script>

<style scoped>
    .dial-container{
        display:inline-flex;
        position:relative;
    }
</style>
