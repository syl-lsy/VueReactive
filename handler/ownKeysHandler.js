import { track } from '../effect/track.js';
import { TrackTypes } from '../type/type.js';
export default function ownKeysHandler(target) {
  track(target, TrackTypes.ITERATE);
  const result = Reflect.ownKeys(target);
  return result;
}
