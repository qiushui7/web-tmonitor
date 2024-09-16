import {getWebVitals} from './collect.js';

export class performancePlugin {
  constructor() {
  }
  core({reportData}){
    getWebVitals((res)=>{
      const data = {
        type: 'performance',
        ...res
      };
      reportData(data);
    });
  }
}
