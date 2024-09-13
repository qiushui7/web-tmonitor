import {eventBus,setConfig,lazyReportBatch as reportData} from './core/index.js';

const TMonitor = {
  eventBus: new eventBus(),
  init(config){
    setConfig(config);
  },
  use(plugin, config){
    const instance = new plugin(config);
    instance.core({
      eventBus: this.eventBus,
      reportData
    });
  }
};
