let activeEffectFn = null;
const depsMap = new Map(); // 存储代理对象属性与函数的映射
const effectStack = []; // 存储环境函数栈
function track(target, key) {
  // 收集依赖
  if (activeEffectFn) {
    let deps = depsMap.get(key);
    if (!deps) {
      deps = new Set(); // 函数是集合，因为属性依赖可能不止一个函数，所以用集合存储
      depsMap.set(key, deps); // 设置属性与函数的映射
    }
    deps.add(activeEffectFn); // 将当前函数添加到集合中
    activeEffectFn.deps.push(deps); // 将当前函数的依赖添加到当前函数的依赖集合中
  }
  console.log(depsMap);
}
function trigger(target, key) {
  // 派发更新
  const deps = depsMap.get(key);
  if (deps) {
    //   复制一份集合
    const activeFn = new Set(deps);
    activeFn.forEach(effect => effect());
  }
}

const obj = {
  a: 1,
  b: 2,
  c: 3,
};

const state = new Proxy(obj, {
  get(target, key) {
    track(target, key);
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
    trigger(target, key);
    return true;
  },
});

function cleanUp(environment) {
  let deps = environment.deps; // 获取当前环境函数的依赖
  console.log(deps);

  if (deps.length) {
    deps.forEach(dep => {
      dep.delete(environment); // 从依赖集合中删除当前环境函数
      if (dep.size === 0) {
        for (let [key, value] of depsMap) {
          if (value === dep) {
            depsMap.delete(key);
          }
        }
      }
    });
    deps.length = 0; // 清空当前环境函数的依赖
  }
}
function effect(fn) {
  /**
   * 创建一个环境函数，用于管理副作用函数的执行
   * 该函数使用闭包来维护 activeEffectFn 的状态
   */
  const environment = () => {
    // 在执行副作用函数前，将当前环境函数设置为活动效果函数
    activeEffectFn = environment;
    effectStack.push(environment); // 将当前环境函数添加到环境函数栈中
    cleanUp(environment); //   在执行函数之前需要清除没有用到的依赖
    // 执行传入的函数 fn
    fn();
    effectStack.pop(); // 执行完毕后，将当前环境函数从环境函数栈中移除
    activeEffectFn = effectStack[effectStack.length - 1];
  };
  environment.deps = []; // 存储当前环境函数的依赖
  environment();
}
effect(() => {
  state.b;
  effect(() => {
    state.a;
  });
});
state.a = 2;
