
export class eventBus {
  constructor() {
    this.subscribers = {}; // 用来存储事件及其对应的订阅者列表
  }

  // 订阅事件
  subscribe(event, callback) {
    if(!event) return false;
    if (!this.subscribers[event]) {
      this.subscribers[event] = []; // 如果事件不存在，初始化为空数组
    }
    this.subscribers[event].push(callback); // 将订阅者的回调函数加入列表
    return true;
  }

  // 发布事件
  publish(event, data) {
    if (!this.subscribers[event] || this.subscribers[event].length === 0) {
      return; // 如果没有订阅者，直接返回
    }
    this.subscribers[event].forEach(callback => callback(data)); // 调用所有订阅者的回调函数并传递数据
  }

}


