import {
  eventBus,
  setConfig,
  catchError,
  lazyReportBatch as reportData,
  overWriteXhr,
  overWriteFetch
} from './core/index.js';
window.__Tmonitor__={

};

function report(type) {
  return function (res) {
    const data={
      type,
      ...res
    };
    reportData(data);
  };
}

export default {
  eventBus: new eventBus(),
  init(config){
    setConfig(config);
    catchError(report('error'));
    overWriteXhr(report('request'));
    overWriteFetch(report('request'));
  },
  use(plugin, config){
    const instance = new plugin(config);
    instance.core({
      eventBus: this.eventBus,
      reportData
    });
  },
  // 针对Vue项目的错误捕获
  install(Vue, options) {
    if (__Tmonitor__.vue) return;
    __Tmonitor__.vue = true;
    setConfig(options);
    const handler = Vue.config.errorHandler;
    // vue项目中 通过 Vue.config.errorHandler 捕获错误
    Vue.config.errorHandler = function (err, vm, info) {
      // 上报具体的错误信息
      const data = {
        info,
        error: err.stack,
        subType: 'vue',
        type: 'error',
        startTime: window.performance.now(),
        pageURL: window.location.href
      };
      reportData(data);
      if (handler) {
        handler.call(this, err, vm, info);
      }
    };
  },
  // 针对React项目的错误捕获
  errorBoundary(err, info) {
    if (__Tmonitor__.react) return;
    __Tmonitor__.react = true;
    // 上报具体的错误信息
    const data = {
      error: err?.stack,
      info,
      subType: 'react',
      type: 'error',
      startTime: window.performance.now(),
      pageURL: window.location.href
    };
    reportData(data);
  }
};


