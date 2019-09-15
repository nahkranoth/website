import Tone from 'tone'

export default class CometSynth{
    constructor(fftSize){
        this.fft = new Tone.Waveform(fftSize);
    }

    setHummGain(gain){
        this.fmGain.gain.rampTo(Math.max(0, Math.min(1, gain))) ;
        this.noiseGain.gain.rampTo(Math.max(0, Math.min(1, gain)));
    }

    getFFT(){
        return this.fftNormalize(this.fft.getValue());
    }

    fftNormalize(fft){
        var result = [];
        for(var i=0;i<fft.length;i++){
            result[i] = fft[i]/8;
        }
        return result;
    }

    resume(){
        this.noise.mute = false;
        this.fmSynth.mute = false;
        this.fmSynth.triggerAttack("C2");
    }

    pause(){
        this.noise.mute = true;
        this.fmSynth.triggerRelease();
    }

    startAudioContext(){
        this.noise = new Tone.Noise("pink").start();
        this.noise.volume.value = 0.1;

        this.filter = new Tone.Filter(300, "lowpass");
        this.noise.connect(this.filter);

        this.pingPong = new Tone.Chorus(0.001, 2.5, 0.7);
        this.filter.connect(this.pingPong);

        this.noiseGain = new Tone.Gain(0.3).toMaster();
        this.pingPong.connect(this.noiseGain);

        this.noiseGain.fan(this.fft);

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

        this.fmSynth = new Tone.FMSynth(settings);
        this.fmGain = new Tone.Gain(0.7);
        this.fmSynth.connect(this.fmGain);

        this.fmSynth.triggerAttack("C2");

        this.fmFilter = new Tone.Filter(80, "lowpass").toMaster();
        this.fmGain.connect(this.fmFilter);

        this.fmFilter.fan(this.fft);
    }
}
