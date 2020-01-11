<template>
        <Circlet ref="circlet" id="circlet" v-bind:left="model.x" v-bind:top="model.y" v-on:onClick="onSelect"></Circlet>
</template>

<script>
    import Circlet from './interface/Circlet.vue'
    import ChainItemModel from "./ChainItemModel";
    export default {
        name: "ChainItem",
        components:{Circlet},
        props:{
            model:{ type:ChainItemModel}
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
                this.$emit("SelectMe", this.model);
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
        #circlet{
                z-index:2;
        }
</style>