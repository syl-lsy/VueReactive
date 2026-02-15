// 收集器
/**
 *
 * @param {*} target 对象
 * @param {*} type get,has,ownkeys属性
 * @param {*} key 属性
 */

// 判断是否要依赖收集
let shouldDepend = true;
export function pauseDepend() {
  shouldDepend = false;
}
export function resumeDepend() {
  shouldDepend = true;
}
export function track(target, type, key) {
  if (!shouldDepend) return; // 如果不收集依赖直接返回
  if (type === 'iterate') {
    console.log('收集器: 原始对象为', target);
    console.log(`收集器: 代理对象${type}操作被拦截`);
  } else {
    console.log('收集器: 原始对象为', target);
    console.log(`收集器: 代理对象${key}属性上的${type}操作被拦截`);
  }
}
