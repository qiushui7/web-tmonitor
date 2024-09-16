import {standardFID} from './constant.js';
export function getFID(callback) {
  const entryHandler = (list) => {
    let fidValue = 0;
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.entryType === 'first-input') {
        observer.disconnect();
        // FID 是处理输入事件的延迟时间
        fidValue = entry.processingStart - entry.startTime;
        callback({
          name: 'FID',
          value: fidValue,
          rating: fidValue > standardFID ? 'poor' : 'good'
        });
      }
    });
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'first-input', buffered: true });
}
