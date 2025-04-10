import { getRandom } from './utils';

export default class Ball {
  constructor (index, img, canvas, ctx) {
    this.r = 30;//小球半径
    this.x = getRandom(0, canvas.width - this.r * 2);//小球初始横坐标
    this.y = getRandom(0, canvas.height - this.r * 2);//小球初始纵坐标
    this.color = index;//小球颜色，以下标表示
    this.img = img;//小球素材
    this.speedX = getRandom(5, 10); //小球横坐标改变速度
    this.speedY = getRandom(5, 10); //小球纵坐标改变速度
    this.canvas = canvas;
    this.ctx = ctx;
  }
  // 小球运动
  run () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.bounceOffEdges(this.canvas)
    this.ctx.drawImage(this.img, this.x, this.y, 60, 60);//绘制小球
  }
  // 小球反弹
  bounceOffEdges (canvas) {
    if (this.x > canvas.width - this.r * 2) {//小球碰到右边界，横坐标速度变为负
      this.speedX = -this.speedX;
    }
    if (this.x < 0) {//小球碰到左边界，横坐标速度变为正
      this.speedX = Math.abs(this.speedX);
    }
    if (this.y > canvas.height - this.r * 2) {//小球碰到下边界，纵坐标速度变为负
      this.speedY = -this.speedY;
    }
    if (this.y < 0) {//小球碰到上边界，纵坐标速度变为正
      this.speedY = Math.abs(this.speedY);
    }
  }
}