<template>
  <div class="dial-wrapper">
    <div class="dial-label disable-select" :style="label_style">{{label}}</div>

    <div class="filler-outline disable-select" :style="outline_style"></div>

    <svg class="filler-graphic disable-select" width="62" height="62" ref="fillerValue">

      <defs>
        <filter id="white-glow" x="-5000%" y="-5000%" width="10000%" height="10000%">
          <feFlood result="flood" :flood-color="color" flood-opacity="0.5"></feFlood>
          <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
          <feMorphology in="mask" result="dilated" operator="dilate" radius="2"></feMorphology>
          <feGaussianBlur in="dilated" result="blurred" stdDeviation="2"></feGaussianBlur>
          <feMerge>
            <feMergeNode in="blurred"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>

      <circle
              class="filler-value"
              :stroke="color"
              stroke-width="2"
              fill="transparent"
              filter="url(#white-glow)"
              r="18"
              cx="37"
              cy="24" ref="fillerVal"/>
    </svg>

    <div v-on:mousedown="onMouseDown" :style="dial_style" v-on:mouseup="onMouseUp" class="rotpot disable-select" ref="body">
      <div class="dot-indicator" :style="dot_style"></div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "interfaceDial",
        props:{
            label:{ type:String, default:'Value' },
            color:{ type:String, default:'#a2e5e7' },
            },
        data:function(){
            return{
                _value:0,
                startY: 0,
                dialRotation: 0,
                stopRotation: 0
            }
        },
        computed: {
            dial_style () {
                return {
                    transform: 'rotate(' + this.dialRotation + 'deg)',
                    border: "1px solid "+this.color,
                    boxShadow: "0 0 1px 0 "+this.color+" inset, 0 0 1px 0 "+this.color
                }
            },
            outline_style(){
                return{
                    border: "1px solid "+this.color,
                    boxShadow: "0 0 1px 0 "+this.color+" inset, 0 0 1px 0 "+this.color
                }
            },
            dot_style(){
                return{
                    backgroundColor: this.color
              }
            },
            label_style(){
                return{
                    color: this.color
                }
            }
        },
        mounted:function(){
            this.onStart();
        },
        methods:{
            onStart(){
                this._valuestore = 0;
                this.startOffset = 45; //start offset of pot rotation in degrees
                this.endOffset = 45;
                this.setDialRotation(0);
                this.updateFiller(0);
            },
            updateFiller(val){
                var offsetRad = this.startOffset + this.endOffset * Math.PI / 180 * 2;
                var circumference = 19 * 2 * Math.PI;
                this.$refs.fillerValue.style.strokeDasharray = circumference + " " + circumference;
                this.$refs.fillerValue.style.strokeDashoffset = circumference;
                this.$refs.fillerValue.style.strokeDashoffset = circumference - val * (circumference - offsetRad) * 1.12;
            },
            getNValue(){
                return this._value;
            },
            setNValue(val){
                this._value = this._valuestore + (val / 100);
                this._value = Math.min(1, Math.max(0, this._value));
                this.$emit('onValue', this._value);
                return this._value;
            },
            setDialRotation(val){
                var rotationDelta = 360 - this.startOffset - this.endOffset;
                this.dialRotation = (rotationDelta * val) - this.startOffset;
            },
            setDialDelta(val){
                var nVal = this.setNValue(val);
                this.setDialRotation(nVal);
                this.updateFiller(nVal);
            },
            setDial(val){
                this.setDialDelta(val*100);
                this._valuestore = val;
            },
            onMove(evt){
                const current = evt.screenY;
                const delta = -(current - this.startY);
                this.setDialDelta(delta);
            },
            onMouseUp(){
                document.removeEventListener('mouseup', this.onMouseUp);
                document.removeEventListener('mousemove', this.onMove);
                this._valuestore = this._value;
            },
            onMouseDown(evt){
                document.addEventListener('mouseup', this.onMouseUp);
                document.addEventListener('mousemove', this.onMove);
                this.startY = evt.screenY;
            }
        }
    }
</script>

<style scoped>

  .dial-label{
    width: 100%;
    position:absolute;
    font-size:12px;
  }

  .dial-wrapper{
    position:relative;
    display:inline-block;
    width:64px;
    height:64px;
  }

  .filler-outline{
    position:absolute;
    transform: rotate(180deg);
    top: calc(50% - 14px);
    left: calc(50% - 22px);
    width:42px;
    height:42px;
    border-radius:50%;
  }

  .filler-graphic{
    position:absolute;
    left: 0;
    transform: rotate(135deg);
    transform-origin: 50% 50%;
  }

  .rotpot{
    position:relative;
    left:calc(50% - 17px);
    top:calc(50% - 9px);
    width:32px;
    height:32px;
    border-radius:50%;
    background-color:#000000;
    z-index:2;
  }

  .dot-indicator{
    position:relative;
    top:calc(50% - 1.5px);;
    left:4px;
    width:3px;
    height:3px;
    border-radius:50%;
  }

</style>
