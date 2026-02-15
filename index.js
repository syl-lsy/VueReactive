// 这是Vue响应式的测试文件
import reactive from './reactive.js';
import { effect } from './effect/effect.js';
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
};

const state = reactive(obj);
function fn() {
  console.log('fn');
  state.a = state.a + 1;
}
let isRun = false;
const effectFn = effect(fn, {
  lazy: true,
  scheduler: eff => {
    // 由我用户来决定如何处理依赖的函数
    Promise.resolve().then(() => {
      if (!isRun) {
        isRun = true;
        eff();
      }
    });
  },
});
effectFn(); // 只有在执行了这个函数之后，才会建立依赖关系
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
