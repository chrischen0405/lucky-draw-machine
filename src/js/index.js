import Ball from './Ball.js';
import ball1Url from '../img/1.png'
import ball2Url from '../img/2.png'
import ball3Url from '../img/3.png'
import ball4Url from '../img/4.png'
import { COLOR_DICT } from './constant.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const ballList = [];//图片对象数组
const BALL_NUM = 4;//扭蛋机里面的小球数
const awardList = [];//扭蛋机中的小球集合
let timer;//计时器
const award = document.getElementById('awardBall');
const message = document.getElementById('message');
const startBtn = document.getElementById('start');
let isLoading = true;

startBtn.addEventListener('click', () => {
  play()
})

const loadImages = (urls) => {
  return Promise.all(urls.map(url => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
    })
  }))
}

const initImg = async () => {
  const ballUrls = [ball1Url, ball2Url, ball3Url, ball4Url]; //图片对象集合
  ballList.push(...await loadImages(ballUrls));
}

const start = () => {
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

async function init() {//初始化
  await initImg()
  isLoading = false;
  start()
}

function play() {
  if (isLoading) {
    alert('正在加载，请稍后！');
    return;
  }
  if (awardList.length === 0) {//奖池中没有小球
    alert('重新开始！');
    start();
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
    //小球掉落动画
    award.setAttribute('class', COLOR_DICT[r.color].class)
    setTimeout(function () {//扭蛋成功提示
      award.setAttribute('class', '');
      message.innerText = COLOR_DICT[r.color].text;
    }, 1100);
  }
}

init();