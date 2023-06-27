import { html, css, LitElement } from 'lit';
import { fabric } from 'fabric';

class FabricImg extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    canvas {
      border: 1px solid black;
    }
  `;

  static properties = {
    url: { type: String },
    w: { type: Number },
    h: { type: Number }
  };

  constructor() {
    super();
    this.url = '';
    this.w = 100;
    this.h = 100;
    this.canvas = null;
  }

  firstUpdated() {
    const canvasElement = this.shadowRoot.querySelector('canvas');
    this.canvas = new fabric.Canvas(canvasElement);
    this.loadImage();
  }

  loadImage() {
    fabric.Image.fromURL(this.url, (img) => {
      img.scaleToWidth(this.w);
      img.scaleToHeight(this.h);
      this.canvas.add(img);
      this.canvas.renderAll();
    });
  }

  render() {
    return html`
      <canvas width="${this.w}" height="${this.h}"></canvas>
    `;
  }
}

customElements.define('fabric-img', FabricImg);
