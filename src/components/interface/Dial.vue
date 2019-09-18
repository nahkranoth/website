<template>
  <div class="dial-wrapper">
    <div class="filler-base"></div>

    <svg class="filler-progress" width="42" height="42">
      <circle
              class="progress-ring_circle"
              stroke="white"
              stroke-width="1"
              fill="transparent"
              r="19"
              cx="21"
              cy="20"/>
    </svg>

    <div v-on:mousedown="onMouseDown" :style="dial_style" v-on:mouseup="onMouseUp" class="rotpot" ref="body">
      <div class="dot-indicator"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "interfaceDial",
        data:function(){
            return{
                startY: 0,
                dialRotation: 0,
                stopRotation: 0
            }
        },
        computed: {
            dial_style () {
                return { transform: 'rotate(' + this.dialRotation + 'deg)'}
            }
        },
        mounted:function(){
            this.onStart();
        },
        methods:{
            onStart(){
                this.startOffset = -45; //start offset of pot rotation in degrees
                this.minRot = 0;
                this.maxRot = 180;
                this.setDialRotation(0);
            },
            updateFiller(percent){
                const offset = circumference - percent / 100 * circumference;
                circle.style.strokeDashoffset = offset;
            },
            getValue(){
                return Math.min(this.maxRot, this.dialRotation - this.startOffset);
            },
            setDialRotation(val){
                const rotation = this.startOffset + this.stopRotation + val;
                this.dialRotation = Math.max(this.minRot + this.startOffset, Math.min(this.maxRot - this.startOffset, rotation));
            },
            onMove(evt){
                const current = evt.screenY;
                const delta = -(current - this.startY);
                this.setDialRotation(delta);
            },
            onMouseUp(){
                document.removeEventListener('mouseup', this.onMouseUp);
                document.removeEventListener('mousemove', this.onMove);
                this.stopRotation = this.dialRotation;
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
  .dial-wrapper{
    position:absolute;
    top:50%;
    left:50%;
  }

  .filler-base{
    top:0;
    left:0;
    width:42px;
    height:42px;
    border-radius:50%;
    border: 1px solid #a2e5e7;
    z-index:-1;
  }

  .filler-progress{
    position:absolute;
    top:1px;
    left:2px;
    transition: 0.35s stroke-dashoffset;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

  .rotpot{
    position:absolute;
    left:calc(50% - 17px);
    top:calc(50% - 17px);
    width:32px;
    height:32px;
    border-radius:50%;
    border: 1px solid #a2e5e7;
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
    background-color: #a2e5e7;
  }



</style>
