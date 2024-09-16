import { onLCP, onFID, onCLS, onFCP, onTTFB } from 'web-vitals';
import { isSafari } from '@web-tmonitor/utils';
import {getLCP} from './getLCP.js';
import {getCLS} from './getCLS.js';
import {getTTFB} from './getTTFB.js';
import {getFCP} from './getFCP.js';
import {getFID} from './getFID.js';
import {getFP} from './getFP.js';
import {findLongTask} from './findLongTask.js';

export function getWebVitals(callback) {
  // web-vitals 不兼容safari浏览器
  if (isSafari()) {
    getFID(res => {
      callback(res);
    });
    getFCP(res => {
      callback(res);
    });
    getLCP(res => {
      callback(res);
    });
    getCLS(res => {
      callback(res);
    });
    getTTFB(res => {
      callback(res);
    });
  } else {
    onLCP(res => {
      callback(res);
    });
    onFID(res => {
      callback(res);
    });
    onCLS(res => {
      callback(res);
    });
    onFCP(res => {
      callback(res);
    });
    onTTFB(res => {
      callback(res);
    });
  }

  getFP(res => {
    callback(res);
  });
  findLongTask(res=>{
    callback(res);
  });
}
