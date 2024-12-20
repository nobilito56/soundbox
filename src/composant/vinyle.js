export class Vinyle {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.buttonPlay = document.querySelector(".js-play");
    this.buttonPause = document.querySelector(".js-pause");
    this.initdraw(0);

    this.isAnimating = false; // Indique si l'animation est en cours
    this.startAngle = 0; // Garde une trace de l'angle actuel
    this.lastTimestamp = null; // Dernier timestamp connu
    this.sound = new Audio('/audio/music.wav');
    this.clickEvent();
  }

  drawRoundedRect(ctx, x, y, width, height, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  initdraw(angle) {
    // Nettoyer le canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Fond ombré
    this.drawRoundedRect(this.ctx, 15, 15, 480, 480, 30, "#2F579F");

    // Fond principal
    this.drawRoundedRect(this.ctx, 5, 5, 480, 480, 30, "#6495ED");

    // Grand cercle noir ombré
    this.ctx.fillStyle = "#2F579F";
    this.bigCirleShadow = new Path2D();
    this.bigCirleShadow.arc(255, 255, 200, 0, 2 * Math.PI);
    this.ctx.fill(this.bigCirleShadow);

    // Grand cercle noir
    this.ctx.fillStyle = "black";
    this.bigCirle = new Path2D();
    this.bigCirle.arc(250, 250, 200, 0, 2 * Math.PI);
    this.ctx.fill(this.bigCirle);

    // Cercle blanc
    this.ctx.fillStyle = "#F07391";
    this.middleCircle = new Path2D();
    this.middleCircle.arc(250, 250, 50, 0, 2 * Math.PI);
    this.ctx.fill(this.middleCircle);

    // Petit cercle noir
    this.ctx.fillStyle = "black";
    this.smallCircle = new Path2D();
    this.smallCircle.arc(250, 250, 10, 0, 2 * Math.PI);
    this.ctx.fill(this.smallCircle);

    // Reflet blanc animé
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 20;
    this.bigReflect = new Path2D();
    this.ctx.beginPath();
    this.ctx.arc(250, 250, 150, angle, angle + Math.PI / 2);
    this.ctx.stroke();

    // Aiguille
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 3;
    this.drawRoundedRect(this.ctx, 350, 240, 150, 20, 10, "#2F579F");
  }

  animation(timestamp) {
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    // Mettre à jour l'angle en fonction du temps écoulé
    this.startAngle += (deltaTime / 1000) * Math.PI; // Ajuster le facteur pour la vitesse

    // Dessiner l'animation
    this.initdraw(this.startAngle);

    // Continuer l'animation si nécessaire
    if (this.isAnimating) {
      requestAnimationFrame(this.animation.bind(this));
    }
  }

  clickEvent() {
    this.buttonPlay.addEventListener("click", () => {
      this.buttonPlay.classList.add("disable");
      this.buttonPause.classList.remove("disable");
      this.sound.play();

      if (!this.isAnimating) {
        this.isAnimating = true; // Démarre l'animation
        this.lastTimestamp = null; // Réinitialise le timestamp pour éviter les sauts
        requestAnimationFrame(this.animation.bind(this));
      }
    });

    this.sound.addEventListener("ended", () => {
      this.buttonPlay.classList.remove("disable");
      this.buttonPause.classList.add("disable");
      this.isAnimating = false; 
    })
    // console.log(this.sound);

    this.buttonPause.addEventListener("click", () => {
      this.buttonPlay.classList.remove("disable");
      this.buttonPause.classList.add("disable");
      this.sound.pause();
      this.isAnimating = false; // Arrête l'animation
    });
  }
}
