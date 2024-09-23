import {Tmonitor} from '@web-tmonitor/utils';

export function catchError(callback) {
  // 捕获资源加载失败的错误： js css img
  window.addEventListener(
    'error',
    function (e) {
      const target = e.target;
      if (target.src || target.href) {
        const url = target.src || target.href;
        const reportData = {
          subType: 'resource',
          url,
          html: target.outerHTML,
          pageUrl: window.location.href,
          paths: e.path
        };
        Tmonitor.hasError=true;
        callback(reportData);
      }
    },
    true
  );
  // 捕获js错误
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    const reportData = {
      subType: 'js',
      msg,
      url,
      lineNo,
      columnNo,
      stack: error.stack,
      pageUrl: window.location.href,
      startTime: performance.now()
    };
    Tmonitor.hasError=true;
    callback(reportData);
  };
  // 捕获promise错误  async await
  window.addEventListener(
    'unhandledrejection',
    function (e) {
      const reportData = {
        subType: 'promise',
        reason: e.reason?.stack,
        pageUrl: window.location.href,
        startTime: e.timeStamp
      };
      Tmonitor.hasError=true;
      callback(reportData);
    },
    true
  );
}
