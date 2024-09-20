import {Tmonitor} from '@web-tmonitor/utils';

export class BehaviorStack {
  capacity = 20; // 用户行为存放的最大长度
  stack;
  constructor() {
    this.stack = [];
  }
  push(data) {
    data.time || (data.time = Date.now());
    if (this.stack.length >= this.capacity) {
      this.shift();
    }
    this.stack.push(data);
    this.stack.sort((a, b) => a.time - b.time);
  }
  shift() {
    return this.stack.shift() !== undefined;
  }
  clear() {
    this.stack = [];
  }
  getStack() {
    return this.stack;
  }
  setConfig(config){
    const {capacity} = config;
    this.capacity=capacity;
  }
}
export const behaviorStack = Tmonitor.behaviorStack || (Tmonitor.behaviorStack = new BehaviorStack());

