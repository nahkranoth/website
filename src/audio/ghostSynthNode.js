import Tone from 'tone'
import {Hz} from '../tools/utils.js'

export default class GhostSynthNode{
    constructor(){
        this.startAudioContext();
    }

    startAudioContext(){

        var settings = {
            harmonicity : 1 ,
            modulationIndex : 10 ,
            detune : 0 ,
            oscillator : {
                type : "sine"
            } ,
            envelope : {
                attack : 0.01 ,
                decay : 0.01 ,
                sustain : 1 ,
                release : 0.5
            } ,
            modulation : {
                type : "square",
                detune: 2
            } ,
            modulationEnvelope : {
                attack : 0 ,
                decay : 0 ,
                sustain : 1 ,
                release : 0.5
            }
        };

        this.fmSynth = new Tone.FMSynth(settings);
        this.fmGain = new Tone.Gain(1).toMaster();
        this.fmSynth.connect(this.fmGain);
    }

    setFrequency(freq){
        this.fmSynth.detune.rampTo(freq  * Hz.A5);
    }

    setVolume(vol){
        this.fmGain.gain.rampTo(vol) ;
    }

    setOscillatorType(type){
        this.fmSynth.oscillator.type = type;
    }

    setModulatorType(type){
        this.fmSynth.modulation.type = type;
    }

    emit(freq){
        let note = freq * Hz.A5;
        this.fmSynth.triggerAttackRelease(note, 0.2);
    }
}
