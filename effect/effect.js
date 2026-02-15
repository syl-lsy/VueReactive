export let activeEffect = undefined;
export const targetMap = new WeakMap();
const effectStack = [];

export const effect = (fn, options) => {
  const { lazy = false } = options;
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
  environment.options = options;
  if (!lazy) {
    environment();
  }
  return environment;
};

export const cleanUp = environment => {
  let deps = environment.deps;
  if (deps.length) {
    deps.forEach(dep => dep.delete(environment));
  }
  deps.length = 0;
};
