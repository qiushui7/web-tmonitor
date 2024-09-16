export function getFP(callback) {
  const entryHandler = (list) => {
    let fpValue = 0;
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-paint') {
        observer.disconnect();
        fpValue = entry.startTime;
        callback({
          name: 'FP',
          value: fpValue
        });
      }
    }

  };
  // 统计和计算fp的时间
  const observer = new PerformanceObserver(entryHandler);
  // buffered: true 确保观察到所有paint事件
  observer.observe({type: 'paint', buffered: true});


}
