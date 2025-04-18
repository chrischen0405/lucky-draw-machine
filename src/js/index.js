import Ball from './Ball.js';
import ball1Url from '../img/1.png'
import ball2Url from '../img/2.png'
import ball3Url from '../img/3.png'
import ball4Url from '../img/4.png'

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let ball1 = null;//图片对象
let ball2 = null;//图片对象
let ball3 = null;//图片对象
let ball4 = null;//图片对象
const ballList = [];//图片对象数组
const BALL_NUM = 4;//扭蛋机里面的小球数
const awardList = [];//扭蛋机中的小球集合
let timer;//计时器
const award = document.getElementById('awardBall');
const message = document.getElementById('message');
const startBtn = document.getElementById('start');

startBtn.addEventListener('click', () => {
  play()
})

const loadImg = (imgUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      resolve(img)
    }
  })
}

const initImg = async () => {
  ball1 = await loadImg(ball1Url)
  ball2 = await loadImg(ball2Url)
  ball3 = await loadImg(ball3Url)
  ball4 = await loadImg(ball4Url)
  ballList.push(ball1, ball2, ball3, ball4);
}

async function init() {//初始化
  await initImg()
  for (let i = 0; i < BALL_NUM; i++) {//随机生成各色小球
    const index = Math.floor(4 * Math.random());
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