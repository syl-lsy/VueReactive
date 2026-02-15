// 触发器

import { TrackTypes, TriggerTypes } from '../type/type.js';
import { activeEffect, targetMap } from './effect.js';
import { ITERATE_KEY } from '../utils/utils.js';
const triggerTypeMap = {
  [TriggerTypes.SET]: [TrackTypes.GET],
  [TriggerTypes.ADD]: [TrackTypes.GET, TrackTypes.HAS, TrackTypes.ITERATE],
  [TriggerTypes.DELETE]: [TrackTypes.GET, TrackTypes.HAS, TrackTypes.ITERATE],
};
/**
 *
 * @param {*} target 对象
 * @param {*} type set,add,delete
 * @param {*} key 属性
 */
export function trigger(target, type, key) {
  const effectFns = getEffectFns(target, type, key);
  for (let effectFn of effectFns) {
    if (effectFn === activeEffect) continue;
    if (effectFn.options && effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  }
  // console.log("触发器: 原始对象为", target);
  // console.log(`触发器: 代理对象${key}属性上的${type}操作被拦截`);
}

// 定义一个辅助函数getEffectFns

function getEffectFns(target, type, key) {
  let propMap = targetMap.get(target);
  if (!propMap) return;
  const keys = [key];
  if (type === TriggerTypes.ADD || type === TriggerTypes.DELETE) {
    keys.push(ITERATE_KEY);
  }
  const effectFns = new Set();
  for (let key of keys) {
    let typeMap = propMap.get(key);
    if (!typeMap) continue;
    const trackTypes = triggerTypeMap[type];
    for (let trackType of trackTypes) {
      let deps = typeMap.get(trackType);
      if (!deps) continue;
      for (let effectFn of deps) {
        effectFns.add(effectFn);
      }
    }
  }
  return effectFns;
}
