import {
  createRef, h,
} from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import {
  BackgroundGenericProps, BackgroundMediaVisibility,
} from './BackgroundMedia';
import * as s from './BackgroundMedia.css';

enum ProgressionDirection {
  Increacing = 1,
  Decreacing = -1,
}

const getRandomDirection = (): ProgressionDirection => (Math.random() > 0.5 ? -1 : 1);

// based on https://codepen.io/desandro/pen/BzJkQv
class Pixel {
  private readonly x: number;

  private readonly y: number;

  private hue: number;

  private saturation: number;

  private brightness: number;

  private saturationDirection: ProgressionDirection;

  private brightnessDirection: ProgressionDirection;

  private readonly velocity: number;

  constructor(
    x: number,
    y: number,
  ) {
    this.x = x;
    this.y = y;

    this.hue = Math.floor(Math.random() * 360);
    this.saturation = Math.floor(Math.random() * 75);
    this.brightness = Math.floor(Math.random() * 75);

    this.saturationDirection = getRandomDirection();
    this.brightnessDirection = getRandomDirection();

    this.velocity = ((Math.random() * 30 + 20) * 0.01 * getRandomDirection()) / 5;
  }

  update = () => {
    this.hue += this.velocity;

    const absoluteVelocity = Math.abs(this.velocity);

    if (this.saturationDirection === ProgressionDirection.Increacing) {
      if (this.saturation + absoluteVelocity < 75) {
        this.saturation += absoluteVelocity;
      } else {
        this.saturationDirection = ProgressionDirection.Decreacing;
      }
    } else if (this.saturation - absoluteVelocity > 0) {
      this.saturation -= absoluteVelocity;
    } else {
      this.saturationDirection = ProgressionDirection.Increacing;
    }

    if (this.brightnessDirection === ProgressionDirection.Increacing) {
      if (this.brightness + absoluteVelocity < 75) {
        this.brightness += absoluteVelocity;
      } else {
        this.brightnessDirection = ProgressionDirection.Decreacing;
      }
    } else if (this.brightness - absoluteVelocity > 0) {
      this.brightness -= absoluteVelocity;
    } else {
      this.brightnessDirection = ProgressionDirection.Increacing;
    }
  };

  render = (
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
  ) => {
    const hue = Math.round(this.hue);
    const { saturation } = this;
    const { brightness } = this;

    const gradient = ctx.createRadialGradient(this.x, this.y, 1, this.x, this.y, Math.max(canvasWidth, canvasHeight) * 1.5);

    gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${brightness}%, .9)`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };
}

const animateCanvasGradient = (
  canvas: HTMLCanvasElement,
  canvasWidth: number,
  canvasHeight: number,
) => {
  const ctx = canvas.getContext('2d');

  if (ctx === null) {
    throw new Error('Can not get canvas 2d context to initialize gradient animation');
  }

  const pixels = [
    new Pixel(0, 0),
    new Pixel(canvasWidth - 1, 0),
    new Pixel(0, canvasHeight - 1),
    new Pixel(canvasWidth - 1, canvasHeight - 1),
  ];

  const animate = () => {
    pixels.forEach((pixel) => {
      pixel.update();
      pixel.render(ctx, canvasWidth, canvasHeight);
    });

    requestAnimationFrame(animate);
  };

  animate();
};

const canvasElement = createRef();

export const FourDotsAnimatedGradient = (props: BackgroundGenericProps) => {
  const context = useContext(BackgroundMediaVisibility);

  useEffect(() => {
    animateCanvasGradient(
      canvasElement.current,
      props.width,
      props.height,
    );

    context.makeVisible();

    // TODO: Add unmounting, it leaks memory and CPU on Options page!
  });

  return <canvas ref={canvasElement} className={s.backgroundMedia} height={props.height} width={props.width} />;
};
