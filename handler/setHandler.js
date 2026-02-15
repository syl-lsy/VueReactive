import { trigger } from '../effect/trigger.js';
import TotalType from '../type/type.js';
import { hasChanged } from '../utils/utils.js';

export default function setHandler(target, key, value) {
  const type = target.hasOwnProperty(key) ? TotalType.SET : TotalType.ADD;
  // 缓存原始值
  let oldValue = target[key];
  // 数组的话需要缓存原始数组长度length;
  let oldLen = Array.isArray(target) ? target.length : undefined;
  // 1.判断是否是新增属性
  // 2.判断是否设置的值是与原来值相同，如果相同则不进行响应式处理
  const result = Reflect.set(target, key, value);

  if (hasChanged(oldValue, value)) {
    trigger(target, type, key);
    if (Array.isArray(target) && oldLen !== target.length) {
      // 如果是数组，并且数组长度发生变化，则触发隐式length响应式，例如proxyArr[5] = 1
      if (key !== 'length') {
        trigger(target, TotalType.SET, 'length');
      } else {
        // 触发数组的显示length响应式 例如proxyArr.length = 1
        for (let i = target.length; i < oldLen; i++) {
          trigger(target, TotalType.DELETE, i.toString());
        }
      }
    }
  }

  return result;
}
