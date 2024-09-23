import {recordScreen} from './record.js';

export class recordPlugin {
  recordTime;
  constructor(config) {
    this.recordTime=config.recordTime;
  }
  core({reportData}){
    recordScreen((res)=>{
      const data={
        type: 'record',
        ...res
      };
      reportData(data);
    },this.recordTime);
  }
}
