import {standardTTFB} from './constant.js';
export function getTTFB(callback) {
  const entryHandler = (list) => {
    let ttfbValue;
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.entryType === 'navigation') {
        // TTFB = responseStart - requestStart
        ttfbValue = entry.responseStart - entry.requestStart;
        callback({
          name: 'TTFB',
          value: ttfbValue,
          rating: ttfbValue > standardTTFB ? 'poor' : 'good'
        });
      }
    });
  };
  // 统计和计算fp的时间
  const observer = new PerformanceObserver(entryHandler);
  // buffered: true 确保观察到所有paint事件
  observer.observe({ type: 'navigation', buffered: true });
}
