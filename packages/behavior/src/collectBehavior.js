import onClick from './click';
import pageTurn from './pageTurn';
import {whiteScreen} from './whiteScreen';

export function collectBehavior(callback) {
  onClick((res)=>{
    callback(res);
  });
  pageTurn((res)=>{
    callback(res);
  });
  whiteScreen((res)=>{
    callback(res);
  });
}
