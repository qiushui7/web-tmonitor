import {behaviorStack} from './behaviorStack';
import {collectBehavior} from './collectBehavior';
export class behaviorPlugin {
  getUserId;
  hasSkeleton = false;
  checkElements=['html', 'body', '#app', '#root'];
  constructor(config) {
    behaviorStack.setConfig(config);
    this.getUserId=config.getUserId;
    this.hasSkeleton=config.hasSkeleton;
    this.checkElements=config.checkElements;
  }
  core({reportData}){
    collectBehavior((res)=>{
      const data={
        type: 'behavior',
        stack: behaviorStack.getStack(),
        userInfo: this.getUserId()||null,
        ...res
      };
      reportData(data);
    });
  }
}
