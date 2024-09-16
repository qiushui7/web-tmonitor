import {standradLCP} from './constant.js';
export function getLCP(callback) {
  const entryHandler = (list) => {
    let lcpValue = 0;
    if (observer) {
      observer.disconnect();
    }
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        // 获取 LCP 的时间戳（单位是毫秒）
        lcpValue = entry.startTime;
        callback({
          name: 'LCP',
          value: lcpValue,
          rating: lcpValue > standradLCP ? 'poor' : 'good'
        });
      }
    }

  };
  // 统计和计算lcp的时间
  const observer = new PerformanceObserver(entryHandler);
  // buffered: true 确保观察到所有paint事件
  observer.observe({type: 'largest-contentful-paint', buffered: true});
}
