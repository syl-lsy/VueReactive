import getHandler from './getHandler.js';
import setHandler from './setHandler.js';
import deleteHandler from './deleteHandler.js';
import hasHandler from './hasHandler.js';
import ownKeysHandler from './ownKeysHandler.js';
// 总的处理代理对象的配置项
export default {
  get: getHandler,
  set: setHandler,
  deleteProperty: deleteHandler,
  has: hasHandler,
  ownKeys: ownKeysHandler,
};
