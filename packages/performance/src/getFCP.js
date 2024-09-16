import {standardFCP} from './constant.js';
export function getFCP(callback) {
  const entryHandler = (list) => {
    let fcpValue = 0;
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        observer.disconnect();
        fcpValue = entry.startTime;
        callback({
          name: 'FCP',
          value: fcpValue,
          rating: fcpValue > standardFCP ? 'poor' : 'good'
        });
      }
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  observer.observe({ type: 'paint', buffered: true });
}
