<template>
    <div class="ghost-node-wrapper">
        <div class="dial-container"><Dial ref="volDial" v-on:onValue="onVolumeChange" v-bind:label="'Volume'"></Dial></div>
        <div class="dial-container"><Dial ref="pitchDial" v-on:onValue="onFreqChange" v-bind:label="'Frequency'" v-bind:color="'#ff6c4e'"></Dial></div>

        <div class="dial-container">
            <StepDial
                    ref="oscStepDial"
                    v-on:onValue="onOscillatorChange"
                    v-bind:label="'Oscillator'"
                    v-bind:color="'#fff536'"
                    v-bind:settings="['sine','triangle','sawtooth','square']"
            />
        </div>

        <div class="dial-container">
            <StepDial
                    ref="oscModulatorDial"
                    v-on:onValue="onModulatorChange"
                    v-bind:label="'Modulator'"
                    v-bind:color="'#ff4e35'"
                    v-bind:settings="['sine','triangle','sawtooth','square']"
            />
        </div>

    </div>
</template>

<script>
    import Dial from "./interface/Dial.vue"
    import StepDial from "./interface/StepDial.vue"

    export default {
        name: "GhostControlPanel",
        components:{Dial,StepDial},
        data: function () {
            return {
            }
        },
        methods:{
            Init(synth){
                this.synth = synth;
                this.$refs.volDial.setDial(0.2);
                this.onOscillatorChange(this.$refs.oscStepDial.state);
                this.onModulatorChange(this.$refs.oscModulatorDial.state);
            },

            Set(model){
                console.log(model);
                this.synth = model.synth;

                this.$refs.volDial.setDial(model.volume);
                this.$refs.pitchDial.setDial(model.freq);
                this.$refs.oscStepDial.setDial(model.oscillator);
                this.$refs.oscModulatorDial.setDial(model.modulator);

                this.onVolumeChange(model.volume);
                this.onFreqChange(model.freq);
                this.onOscillatorChange(model.oscillator);
                this.onModulatorChange(model.modulator);
            },

            onVolumeChange(vol){
                this.synth.setVolume(vol);
            },
            onFreqChange(freq){
                this.synth.setFrequency(freq);
            },
            onOscillatorChange(osc){
                this.synth.setOscillatorType(osc);
            },
            onModulatorChange(osc){
                this.synth.setModulatorType(osc);
            }
        }
    }
</script>

<style scoped>
    .dial-container{
        display: inline-flex;
    }
    .ghost-node-wrapper{
        display:inline-block;
    }
</style>