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

startBtn.addEventListener('click', play);

const loadImages = (urls) => {
  return Promise.all(urls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`图片${url}加载失败`));
    })
  }))
}

const initImg = async () => {
  const ballUrls = [ball1Url, ball2Url, ball3Url, ball4Url]; //图片对象集合
  ballList.push(...await loadImages(ballUrls));
}

function initAwardList () {
  for (let i = 0; i < BALL_NUM; i++) {//随机生成各色小球
    const index = Math.floor(4 * Math.random());
    awardList[i] = new Ball(index, ballList[index], canvas, ctx);//新建小球对象
  }
}

function startAnimation () {
  clearInterval(timer);//清除计时器
  timer = setInterval(drawFrame, 15);
}

function drawFrame () {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
  awardList.forEach(ball => ball.run()); // 使小球运动
}

async function init() {//初始化
  try {
    await initImg()
    isLoading = false;
    initAwardList();
    startAnimation();
  } catch (e) {
    console.error('初始化失败:', e);
  }
}

function play() {
  if (isLoading) {
    if (awardList.length === BALL_NUM) {
      alert('正在加载，请稍后！');
    } else {
      alert('正在出球，请稍后！');
    }
    return;
  }
  if (awardList.length === 0) {//奖池中没有小球
    alert('重新开始！');
    initAwardList();
    message.innerText = '点击抽奖';
  } else {
    clearInterval(timer);//清除计时器
    let r = awardList.pop();//将奖池中的小球减少
    startAnimation();
    showWinningBall(r);
  }
}

//小球掉落动画
const showWinningBall = (ball) => {
  isLoading = true;
  award.setAttribute('class', COLOR_DICT[ball.color].class)
  setTimeout(function () {//扭蛋成功提示
    award.setAttribute('class', '');
    message.innerText = COLOR_DICT[ball.color].text;
    isLoading = false;
  }, 1100);
}

init();