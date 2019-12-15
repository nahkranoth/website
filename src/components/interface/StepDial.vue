<template>
    <div class="stepdial-wrapper">
        <div class="dial-container"><Dial ref="dial" v-on:onValue="onDialChange" v-bind:label="label" v-bind:color="color"></Dial></div>
        <div class="txt-selection" :style="text_style">{{state}}</div>
    </div>
</template>

<script>

    import Dial from "./Dial.vue"

    export default {
        name: "interfaceStepDial",
        props:{
            label:{ type:String, default:'Value' },
            color:{ type:String, default:'#a2e5e7' },
            settings:{ type:Array, default:[]},
        },
        components:{Dial},
        data:function(){
            return{
                state:this.settings[0]
            }
        },
        computed: {
            text_style () {
                return {
                    color:this.color
                }
            },
        },
        methods:{
            onDialChange(val){
                let partIndex = Math.round((this.settings.length-1)*val);
                let part = this.settings[partIndex];
                this.state = part;
                this.$emit('onValue', part);
            },
            setDial(state){
                let stateIndex = this.settings.indexOf(state);
                let position = (stateIndex)/(this.settings.length-1);
                console.log(position);
                this.$refs.dial.setDial(position);
                this.state = state;
            }
        }
    }
</script>

<style scoped>
    .dial-container{
    }
    .txt-selection{
        font-size:10px;
    }

</style>
