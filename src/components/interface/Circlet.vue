<template>
        <svg class="chain-item disable-select" width="18" height="18" ref="fillerValue" @click="clickedButton">
            <circle
                    class="filler-value"
                    stroke="#FFF"
                    stroke-width="2"
                    fill="solid"
                    r="8"
                    cx="9"
                    cy="9" ref="fillerVal"/>
        </svg>
</template>

<script>
    export default {
        name: "Circlet",
        data:function(){
            return {
                color:0xFFFFFF
            }
        },
        methods:{
            clickedButton(){
                console.log("clicked me");
            }
        }
    }
</script>

<style scoped>

</style>