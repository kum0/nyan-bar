import { NyanOption } from './api';

export class NyanBar {
  static New(opt: NyanOption): NyanBar {
    return new NyanBar(opt);
  }

  private readonly _imgRate = 623 / 320;
  private readonly _imgSrc = 'assets/nyan.png';
  private readonly _rainDiff = 16;
  private _option: NyanOption = {
    width: 1000,
    height: 64
  };
  private _img: HTMLImageElement = {} as HTMLImageElement;
  private _cvs: HTMLCanvasElement = {} as HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  private _rainbowW = 0;
  private _rainbowData: ImageData = {} as ImageData;
  private _catData: ImageData = {} as ImageData;
  private _i = 0;

  constructor(opt: NyanOption) {
    this._option = opt;
    this._i = opt.len || 0;
    this._img = new Image(opt.height * this._imgRate, opt.height);
    this._img.src = this._imgSrc;
  }

  create(e: HTMLElement, target: HTMLElement) {
    this._img.onload = () => {
      this._cvs = document.createElement('canvas');
      this._ctx = this._cvs.getContext('2d')!;

      this._cvs.width = this._option.width;
      this._cvs.height = this._option.height;
      e.appendChild(this._cvs);

      this._parseImg();

      target.onscroll = e => {
        if (e.target) {
          const { scrollTop, scrollHeight, clientHeight } = e.target as Element;
          const count = scrollTop / (scrollHeight - clientHeight);

          this._i = count >> 0;
          this._draw();
        }
      };
    };
  }

  private _parseImg() {
    this._ctx.drawImage(this._img, 0, 0);

    const imgData = this._ctx.getImageData(0, 0, this._img.width, this._img.height);
    this._rainbowW = this._rainbowWidth(imgData);

    this._rainbowData = this._ctx.getImageData(0, 0, this._rainbowW, this._img.height);
    this._catData = this._ctx.getImageData(this._rainbowW, 0, this._img.width, this._img.height);
  }

  private _rainbowWidth(img: ImageData): number {
    for (let i = 0; i < img.data.length; i++) {
      if (img.data[i] > 0) {
        return (i / 4) >> 0;
      }
    }
    return 0;
  }

  private _draw() {
    if (this._i < 0) {
      this._i = 0;
      return;
    }

    this._ctx.clearRect(0, 0, this._cvs.width, this._cvs.height);

    this._ctx.putImageData(this._catData, this._rainbowW * this._i, 0);
    let x = this._i;

    if (this._i % 2 === 0) {
      while (x--) {
        this._ctx.putImageData(this._rainbowData, x * this._rainbowW, x % 2 === 0 ? this._rainDiff : 0);
      }
    } else {
      while (x--) {
        this._ctx.putImageData(this._rainbowData, x * this._rainbowW, x % 2 === 0 ? 0 : this._rainDiff);
      }
    }

    if (this._i * this._rainbowW + this._img.width >= this._cvs.width) {
      this._i = -1;
    }
  }
}
