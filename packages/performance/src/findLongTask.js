
export function findLongTask(callback) {
  const entryHandler = list => {
    for (const long of list.getEntries()) {
      // 上报长任务详情
      callback({
        name: 'longTask',
        longTask: long
      });
    }
  };
  const observer = new PerformanceObserver(entryHandler);
  // 监听 layout-shift 类型的性能指标
  observer.observe({ entryTypes: ['longtask'] });
}
