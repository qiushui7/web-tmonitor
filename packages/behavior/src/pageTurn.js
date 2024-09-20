import { generateUniqueId } from '@web-tmonitor/utils';
import {behaviorStack} from './behaviorStack';
export default function pageTurn(callback) {
  // hash history
  let oldUrl = '';
  window.addEventListener(
    'hashchange',
    function (event) {
      console.error('hashchange', event);
      const newUrl = event.newURL;
      const reportData = {
        form: oldUrl,
        to: newUrl,
        subType: 'hashchange',
        startTime: performance.now(),
        uuid: generateUniqueId()
      };
      behaviorStack.push(reportData);
      callback(reportData);
      oldUrl = newUrl;
    },
    true
  );

  let from = '';
  window.addEventListener(
    'popstate',
    function (event) {
      console.error('popstate', event);
      const to = window.location.href;
      const reportData = {
        form: from,
        to: to,
        subType: 'popstate',
        startTime: performance.now(),
        uuid: generateUniqueId()
      };
      behaviorStack.push(reportData);
      callback(reportData);
      from = to;
    },
    true
  );

}
