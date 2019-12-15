<template>
        <Circlet ref="circlet" v-bind:left="left" v-bind:top="top" v-on:onClick="onSelect"></Circlet>
</template>

<script>
    import Circlet from './interface/Circlet.vue'
    export default {
        name: "ChainItem",
        components:{Circlet},
        props:{
            left:{ type:Number, default:0 },
            top:{ type:Number, default:0 }
        },
        mounted:function(){
            this.onStart();
        },
        methods:{
            onStart(){
                this.selected = false;
            },
            pulse(){
                if(this.selected) return;
                this.$refs.circlet.setColor("#fff");
            },
            dePulse(){
                if(this.selected) return;
                this.$refs.circlet.setColor("#000");
            },
            onSelect(){
                this.$emit("SelectMe");
                this.selected = true;
                this.$refs.circlet.setColor("#00ff00");
            },
            deselect(){
                this.selected = false;
                this.$refs.circlet.setColor("#000");
            }
        }
    }
</script>

<style scoped>

</style>