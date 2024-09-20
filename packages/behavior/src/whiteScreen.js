import {Tmonitor} from '@web-tmonitor/utils';

export function whiteScreen(callback, hasSkeleton, checkElements) {

  let _whiteLoopNum = 0;
  let _skeletonInitList = []; // 存储初次采样点
  let _skeletonNowList = []; // 存储当前采样点

  // 项目有骨架屏
  if (hasSkeleton) {
    if (document.readyState !== 'complete') {
      check();
    }
  } else {
    // 页面加载完毕
    if (document.readyState === 'complete') {
      check();
    } else {
      window.addEventListener('load', check);
    }
  }

  function getSelector(element) {
    if (element.id) {
      return '#' + element.id;
    } else if (element.className) {
      // div home => div.home
      return (
        '.' +
                element.className
                  .split(' ')
                  .filter((item) => !!item)
                  .join('.')
      );
    } else {
      return element.nodeName.toLowerCase();
    }
  }

  function isContainer(element) {
    const selector = getSelector(element);
    if (hasSkeleton) {
      _whiteLoopNum ? _skeletonNowList.push(selector) : _skeletonInitList.push(selector);
    }
    return checkElements.indexOf(selector) !== -1;
  }

  function blankWhite(){
    let point = 10;
    let empty = 0;
    function isWarp (ele){
      if(isContainer(ele)){
        empty+=1;
      }
    }
    for (let i = 1; i < point; i++) {
      let x = document.elementsFromPoint(i / point * window.innerWidth,  window.innerHeight / 2);
      let y = document.elementsFromPoint( window.innerWidth / 2, i / point * window.innerHeight);
      let k2 = document.elementsFromPoint(i/point * window.innerWidth, i / point * window.innerHeight);
      let k1 = document.elementsFromPoint( (point-i)/point * window.innerWidth, (point-i)/point*window.innerHeight);
      isWarp(x);
      isWarp(y);
      isWarp(k2);
      isWarp(k1);
    }

    if(empty !== 36){
      if (hasSkeleton) {
        // 第一次不比较
        if (!_whiteLoopNum) return openWhiteLoop();
        // 比较前后dom是否一致
        if (_skeletonNowList.join() === _skeletonInitList.join())
          return callback({
            subType: 'whiteScreen',
            status: 'error',
            time: Date.now()
          });
      }
      if (Tmonitor._loopTimer) {
        clearTimeout(Tmonitor._loopTimer);
        Tmonitor._loopTimer = null;
      }
    }else{
      if (!Tmonitor._loopTimer) {
        openWhiteLoop();
      }
    }
    callback({
      subType: 'whiteScreen',
      status: empty === 17 ? 'error' : 'ok',
      time: Date.now()
    });
  }

  function openWhiteLoop() {
    if (Tmonitor._loopTimer) return;
    Tmonitor._loopTimer = setInterval(() => {
      if (hasSkeleton) {
        _whiteLoopNum++;
        _skeletonNowList = [];
      }
      check();
    }, 1000);
  }

  function check(){
    if ('requestIdleCallback' in window) {
      requestIdleCallback(deadline => {
        // timeRemaining：表示当前空闲时间的剩余时间
        if (deadline.timeRemaining() > 0) {
          blankWhite();
        }
      });
    } else {
      blankWhite();
    }
  }

}
