import TotalType from '../type/type.js';
import { trigger } from '../effect/trigger.js';
export default function deleteHandler(target, key) {
  if (target.hasOwnProperty(key)) {
    trigger(target, TotalType.DELETE, key);
  }
  const result = Reflect.deleteProperty(target, key);
  return result;
}
