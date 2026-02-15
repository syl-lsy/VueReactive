import { track } from '../effect/track.js';
import TotalType from '../type/type.js';
export default function ownKeysHandler(target) {
  track(target, TotalType.ITERATE);
  const result = Reflect.ownKeys(target);
  return result;
}
