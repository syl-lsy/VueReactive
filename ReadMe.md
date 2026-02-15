### 触发器和收集器
收集器（get,has,for...in） 触发器（set,deleteProperty,add）
1.收集器主要是针对函数和响应式数据建立依赖关系
2.触发器主要是针对响应式数据发生变化的时候，被监控的函数重新执行。
1.获取属性
2.设置属性
3.新增属性
4.删除属性
5.判断属性是否存在
6.遍历属性

git checkout main
# 切换到分支 'main'
# 您的分支与上游分支 'origin/main' 一致
git branch
# * main
#  master
git merge master --allow-unrelated-histories
# 将master分支合并到main上
# Merge made by the 'recursive' strategy
git pull origin main
git push origin main