import {standradCLS} from './constant.js';
export function getCLS(callback) {
  const entryHandler = (list) => {
    let clsValue = 0;
    const entries = list.getEntries();
    entries.forEach((entry) => {
      // 累积所有的布局偏移值
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
    observer.disconnect();
    callback({
      name: 'CLS',
      value: clsValue,
      rating: clsValue > standradCLS ? 'poor' : 'good'
    });
  };
  const observer = new PerformanceObserver(entryHandler);
  // 监听 layout-shift 类型的性能指标
  observer.observe({ type: 'layout-shift', buffered: true });
}
