let activeEffect = null; // 默认没有激活的effect函数
const depsMap = new Map(); // 存储函数和对象属性的映射关系
const effectStack = []; // 函数栈存储

function track(target, key) {
  if (activeEffect) {
    let deps = depsMap.get(key); // 获取当前属性的依赖函数
    if (!deps) {
      deps = new Set();
      depsMap.set(key, deps);
    }
    activeEffect.deps.push(deps);
    deps.add(activeEffect); // 将当前激活的effect函数添加到依赖函数中
  }
}

function trigger(target, key) {
  let deps = depsMap.get(key);
  if (deps) {
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
  },
});

function effect(fn) {
  const environment = () => {
    try {
      activeEffect = environment;
      effectStack.push(environment);
      cleanUp(environment);
      return fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  };
  environment.deps = [];
  environment();
}

function cleanUp(environment) {
  let deps = environment.deps;
  if (deps.length) {
    deps.forEach(dep => {
      dep.delete(environment);
    });
  }
  deps.length = 0;
}
effect(() => {
  state.b;
  effect(() => {
    state.a;
  });
});
state.a = 2;
