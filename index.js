// 这是Vue响应式的测试文件
import reactive from './reactive.js';
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
};

const arr = [1, obj, 3];
const proxyArr = reactive(arr);
// console.log(proxyArr.includes(obj));
proxyArr.push(5);
