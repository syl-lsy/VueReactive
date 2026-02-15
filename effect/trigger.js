// 触发器
/**
 * 
 * @param {*} target 对象
 * @param {*} type set,add,delete
 * @param {*} key 属性
 */
export function trigger(target,type, key) {
    console.log("触发器: 原始对象为", target);
    console.log(`触发器: 代理对象${key}属性上的${type}操作被拦截`);
    
}