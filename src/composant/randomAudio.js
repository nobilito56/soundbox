export class RandomAudio{
    constructor(){
      this.canvas = document.getElementById("canvas");
      this.buttonPlay = document.querySelector(".js-play");
      this.buttonPause = document.querySelector(".js-pause");
      this.initSound();
    }
  
    initSound(){
      this.sound1 = new Audio('/audio/sound1.wav');
      this.sound2 = new Audio('/audio/sound2.wav');
      this.sound3 = new Audio('/audio/sound3.wav');
      this.sounds = [this.sound1,this.sound2,this.sound3];
    }
  }