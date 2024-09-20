import {behaviorStack} from './behaviorStack';
export default function onClick(callback) {
  ['mousedown', 'touchstart'].forEach((eventType) => {
    window.addEventListener(eventType, (e) => {
      const target = e.target;
      console.log('click', target);
      if (target.tagName) {
        const reportData = {
          // scrollTop: document.documentElement.scrollTop,
          subType: 'click',
          target: target.tagName,
          startTime: e.timeStamp,
          innerHtml: target.innerHTML,
          outerHtml: target.outerHTML,
          with: target.offsetWidth,
          height: target.offsetHeight,
          eventType,
          path: e.path
        };
        behaviorStack.push(reportData);
        callback(reportData);
      }
    });
  });
}
