import Ball from './Ball.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ball1 = document.getElementById('ball1');//图片对象
const ball2 = document.getElementById('ball2');//图片对象
const ball3 = document.getElementById('ball3');//图片对象
const ball4 = document.getElementById('ball4');//图片对象
const ballList = [ball1, ball2, ball3, ball4];//图片对象数组
const BALL_NUM = 4;//扭蛋机里面的小球数
const awardList = [];//扭蛋机中的小球集合
let timer;//计时器
const award = document.getElementById('awardBall');
const message = document.getElementById('message');
const startBtn = document.getElementById('start');

startBtn.addEventListener('click', () => {
  play()
})

function init() {//初始化
  for (let i = 0; i < BALL_NUM; i++) {//随机生成各色小球
    let index = Math.floor(4 * Math.random());
    awardList[i] = new Ball(index, ballList[index], canvas, ctx);//新建小球对象
  }
  window.clearInterval(timer);//清除计时器
  timer = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);//清空画布
    for (let i = 0; i < awardList.length; i++) {
      awardList[i].run();
    }//使小球运动
  }, 15);
}

function play() {
  if (awardList.length === 0) {//奖池中没有小球
    alert('重新开始！');
    init();
    message.innerText = '点击抽奖';
  } else {
    window.clearInterval(timer);//清除计时器
    let r = awardList.pop();//将奖池中的小球减少
    timer = setInterval(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);//清空画布
      for (let i = 0; i < awardList.length; i++) {
        awardList[i].run();
      }//使小球运动
    }, 15);
    switch (r.color) {//小球掉落动画
      case 0:
        award.setAttribute('class', 'dropBall1');
        break;
      case 1:
        award.setAttribute('class', 'dropBall2');
        break;
      case 2:
        award.setAttribute('class', 'dropBall3');
        break;
      case 3:
        award.setAttribute('class', 'dropBall4');
        break;
    }
    setTimeout(function () {//扭蛋成功提示
      award.setAttribute('class', '');
      switch (r.color) {
        case 0:
          message.innerText = '紫球！';
          break;
        case 1:
          message.innerText = '绿球！';
          break;
        case 2:
          message.innerText = '黄球！';
          break;
        case 3:
          message.innerText = '红球！';
          break;
      }
    }, 1100);
  }
}

init();