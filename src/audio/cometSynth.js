import Tone from 'tone'

export default class CometSynth{
    constructor(fftSize){
        this.fft = new Tone.FFT(fftSize);
    }

    setHummGain(gain){
        this.fmGain.gain.value = Math.max(0, Math.min(2, gain));
    }

    getFFT(){
        return this.fft.getValue();
    }

    startAudioContext(){
        var noise = new Tone.Noise("pink").start();
        noise.volume.value = 0.1;
        var filter = new Tone.Filter(100, "lowpass");
        noise.connect(filter);

        var pingPong = new Tone.Chorus(0.001, 2.5, 0.7);
        filter.connect(pingPong);

        var gain = new Tone.Gain(0.3).toMaster();
        pingPong.connect(gain);

        //FM hummmm synth

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
                detune: 0.4
            } ,
            modulationEnvelope : {
                attack : 0.5 ,
                decay : 0 ,
                sustain : 1 ,
                release : 0.5
            }
        };

        var fmSynth = new Tone.FMSynth(settings);
        this.fmGain = new Tone.Gain(0.7);

        fmSynth.connect(this.fmGain);
        fmSynth.triggerAttack("C2");

        var filter = new Tone.Filter(80, "lowpass").toMaster();
        this.fmGain.connect(filter);

        filter.fan(this.fft);
    }
}