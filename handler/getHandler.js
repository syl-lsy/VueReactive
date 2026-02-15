// get函数处理器
import { track, pauseDepend, resumeDepend } from '../effect/track.js';
import { isObject, RAW } from '../utils/utils.js';
import TotalType from '../type/type.js';
import reactive from '../reactive.js';

// 如果是数组中的对象需要先找代理对象上的，如果找不到则在原始对象中查找
// 用于存储代理数组中的方法
const arrayFunctionStore = {};
const arrFunc = ['includes', 'indexOf', 'lastIndexOf'];
arrFunc.forEach(key => {
  arrayFunctionStore[key] = function (...args) {
    const res = Array.prototype[key].apply(this, args);
    // 如果include则代理对象返回false,indexOf和lastIndexOf返回代理对象中的索引
    if (res < 0 || res === false) {
      const res = Array.prototype[key].apply(this[RAW], args);
      return res;
    }
  };
});

const arrayMethod = ['push', 'pop', 'shift', 'unshift', 'splice'];
arrayMethod.forEach(key => {
  arrayFunctionStore[key] = function (...args) {
    pauseDepend();
    const res = Array.prototype[key].apply(this, args);
    resumeDepend();
    return res;
  };
});

export default function getHandler(target, key) {
  // 如果是唯一的RAW属性，则返回原始对象
  if (key === RAW) {
    return target;
  }
  if (Array.isArray(target) && arrayFunctionStore.hasOwnProperty(key)) {
    return arrayFunctionStore[key];
  }
  // 收集依赖
  track(target, TotalType.GET, key);
  const result = Reflect.get(target, key);
  // 判断是不是对象，如果是对象则递归代理
  if (isObject(result)) {
    return reactive(result);
  }
  return result;
}
