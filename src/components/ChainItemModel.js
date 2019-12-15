export default class ChainItemModel{
    constructor(params){
        this.x = params.x;
        this.y = params.y;
        this.synth = params.synth;
        this.ref = params.ref;
        this.freq = params.x;
        this.volume = params.vol;
        this.oscillator = params.oscillator;
        this.modulator = params.modulator;
    }
}