import {replace} from '@web-tmonitor/utils';

export function overWriteXhr(callback){
  const originalXhrProto = XMLHttpRequest.prototype;
  replace(originalXhrProto, 'open',function(originalOpen){
    return function (...args) {
      this.url = args[1];
      this.method = args[0];
      originalOpen.apply(this, args);
    };
  });
  replace(originalXhrProto,'send',function (originalSend) {
    return function (...args) {
      this.startTime = Date.now();
      const onLoaded = () => {
        this.endTime = Date.now();
        this.duration = this.endTime - this.startTime;
        const { url, method , startTime, endTime, duration, status} = this;
        const res = {
          status,
          duration,
          startTime,
          endTime,
          url,
          method: method.toUpperCase(),
          success: status >= 200 && status < 300,
          subType: 'xhr'
        };
        callback(res);
        this.removeEventListener('loadend', onLoaded, true);
      };
      this.addEventListener('loadend', onLoaded, true);
      originalSend.apply(this, args);
    };
  });
}

export function overWriteFetch(callback) {
  if (!('fetch' in window)) {
    return;
  }
  replace(window,'fetch',function (originalFetch) {
    return function (url, config) {
      const startTime = Date.now();
      const reportData = {
        subType: 'fetch',
        url,
        startTime,
        method: config.method
      };
      return originalFetch.apply(window, [url, config]).then(
        (res) => {
          const endTime = Date.now();
          reportData.endTime = endTime;
          reportData.duration = endTime - startTime;
          const data = res.clone();
          reportData.status = data.status;
          reportData.success = data.ok;
          callback(reportData);
          return res;
        },
        // 接口报错
        (err) => {
          const endTime = Date.now();
          reportData.endTime = endTime;
          reportData.duration = endTime - startTime;
          reportData.status = 0;
          reportData.success = false;
          callback(reportData);
          throw err;
        }
      );
    };
  });
}
