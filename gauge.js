class GaugeWidget extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.height = "100%";

    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 150;
    container.appendChild(canvas);
    shadow.appendChild(container);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.value = 0;
  }

  set valor(v) {
    this.value = v;
    this.drawGauge(v);
  }

  drawGauge(val) {
    const ctx = this.ctx;
    const centerX = 150;
    const centerY = 150;
    const radius = 100;

    ctx.clearRect(0, 0, 300, 150);

    // fundo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#eee";
    ctx.stroke();

    // ponteiro
    const angle = Math.PI + (val / 100) * Math.PI;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#4CAF50";
    ctx.stroke();

    // texto
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(`${val.toFixed(1)}%`, centerX, centerY - 20);
  }
}

customElements.define("gauge-widget", GaugeWidget);
