import TotalType from '../type/type.js';
import { track } from "../effect/track.js";
export default function hasHandler(target, key) {
  track(target,TotalType.HAS, key);
  const result = Reflect.has(target, key);
  return result
}
