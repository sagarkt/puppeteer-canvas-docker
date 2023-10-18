import { createCanvas, close } from 'puppet-canvas';

(async() => {

  const canvas = await createCanvas(400, 400);
  const ctx = await canvas.getContext('2d');

  ctx.lineWidth = 1;
  ctx.moveTo(50, 140);
  ctx.lineTo(150, 60);
  ctx.lineTo(250, 140);
  ctx.closePath();
  ctx.stroke();

  // Get the image as a data url
  const dataUrl = await canvas.toDataURL();

  console.log("Base64:   ", dataUrl);

  await close();

})();
