// 收集器
import { activeEffect, targetMap } from './effect.js';
import { TrackTypes } from '../type/type.js';
import { ITERATE_KEY } from '../utils/utils.js';
// 判断是否要依赖收集
let shouldDepend = true;
/**
 * 暂停依赖函数
 * 该函数用于设置 shouldDepend 变量为 false，从而暂停依赖关系
 */
export function pauseDepend() {
  shouldDepend = false; // 将 shouldDepend 标志设置为 false，暂停依赖
}
/**
 * 恢复依赖关系的函数
 * 该函数用于重新启用依赖跟踪功能
 */
export function resumeDepend() {
  shouldDepend = true; // 将依赖跟踪标志设置为true，表示启用依赖关系
}
/**
 *
 * @param {*} target 对象
 * @param {*} type get,has,ownkeys属性
 * @param {*} key 属性
 */
export function track(target, type, key) {
  if (!shouldDepend || !activeEffect) return; // 如果不收集依赖直接返回
  // // 1.找到对象属性映射
  // let propsMap = targetMap.get(target);
  // if (!propsMap) {
  //   propsMap = new Map();
  //   targetMap.set(target, propsMap);
  // }
  // if (type === TrackTypes.ITERATE) {
  //   key = ITERATE_KEY;
  // }
  // // 2.找到类型映射
  // let typeProps = propsMap.get(key);
  // if (!typeProps) {
  //   typeProps = new Map();
  //   propsMap.set(key, typeProps);
  // }
  // // 3.找到depsSet依赖函数
  // let depsSet = typeProps.get(type);
  // if (!depsSet) {
  //   depsSet = new Set();
  //   typeProps.set(type, depsSet);
  // }
  // // 找到依赖函数直接添加
  // if (!depsSet.has(activeEffect)) {
  //   depsSet.add(activeEffect);
  //   activeEffect.deps.push(depsSet);
  // }
  // if (type === 'iterate') {
  //   console.log('收集器: 原始对象为', target);
  //   console.log(`收集器: 代理对象${type}操作被拦截`);
  // } else {
  //   console.log('收集器: 原始对象为', target);
  //   console.log(`收集器: 代理对象${key}属性上的${type}操作被拦截`);
  // }
  // 1.找到propMap
  let propMap = targetMap.get(target);
  if (!propMap) {
    propMap = new Map();
    targetMap.set(target, propMap);
  }
  // 判断是否是迭代操作
  if (type === TrackTypes.ITERATE) {
    key = ITERATE_KEY;
  }
  // 2.找到typeMap
  let typeMap = propMap.get(key);
  if (!typeMap) {
    typeMap = new Map();
    propMap.set(key, typeMap);
  }
  // 3.找到depsSet
  let depsSet = typeMap.get(type);
  if (!depsSet) {
    depsSet = new Set();
    typeMap.set(type, depsSet);
  }
  // 4.添加依赖
  if (!depsSet.has(activeEffect)) {
    depsSet.add(activeEffect);
    activeEffect.deps.push(depsSet);
  }
}
