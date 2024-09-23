import {Tmonitor, generateUniqueId} from '@web-tmonitor/utils';
import {record} from 'rrweb';
import pako from 'pako';
import { Base64 } from 'js-base64';
export function recordScreen(callback, recordTime) {
  let events= [];
  record({
    emit(event, isCheckout) {
      if (isCheckout) {
        if (Tmonitor.hasError) {
          const recordScreenId = Tmonitor.recordScreenId;
          Tmonitor.recordScreenId = generateUniqueId();
          callback({
            recordScreenId,
            time: Date.now(),
            events: zip(events)
          });
          events = [];
          Tmonitor.hasError = false;
        } else {
          // 不上报，清空录屏
          events = [];
          Tmonitor.recordScreenId = generateUniqueId();
        }
      }
      events.push(event);
    },
    recordCanvas: true,
    checkoutEveryNms: 1000 * recordTime
  });
}

function zip(data) {
  if (!data) return data;
  const dataJson =
        typeof data !== 'string' && typeof data !== 'number' ? JSON.stringify(data) : data;
  const str = Base64.encode(dataJson);
  const binaryString = pako.gzip(str);
  const arr = Array.from(binaryString);
  let s = '';
  arr.forEach((item) => {
    s += String.fromCharCode(item);
  });
  return Base64.btoa(s);
}
