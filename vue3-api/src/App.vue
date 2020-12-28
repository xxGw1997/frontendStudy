<template>
  <test :title="title"/>
  <test2 :count="count" @plus="plus"/>
  <button @click="change">change</button>
</template>

<script>
import {ref,toRef,toRefs, reactive,shallowRef,watchEffect, triggerRef,computed,watch, toRaw, markRaw,getCurrentInstance,
       onBeforeMount,onMounted } from 'vue'
import Test from '@/components/Test'
import Test2 from '@/components/Test2'
export default {
  name: 'App',
  components:{
    Test,
    Test2
  },
  setup(){
    let title = ref('ywx')
    let count = ref(100)

    const state = reactive({
      name:'xxgw',
      age:23
    })

    //浅响应式
    const info = shallowRef({
      name:'ywx',
      age:23
    })

    const nameRef = toRef(state,'name')
    const nameRefs = toRefs(state)
    console.log('nameRef:',nameRef)
    console.log('nameRefs:',nameRefs)

    state.family = {
      father:'yang',
      mother:'deng'
    }

    info.family = {
      father:'yang',
      mother:'deng'
    }

    
    watchEffect(()=>{
      let name1 = info
      // console.log("name:",state.name)
      console.log("name1:",name1.value.name)
    })

    info.value.name = '杨文轩'
    state.name = 'yyywwwxxx'
    triggerRef(info)


    console.log('family:',state.family)
    console.log('shallowRef--->family:',info.family)

    const plus = num =>{
      count.value += num
    }
    setTimeout(() => {
      title.value = 'xxgw'
    }, 2000);

    //computed
    const sentence = ref('欢迎来到召唤师峡谷')

    const superSentence = computed(()=>{
      return '杨文轩:' + sentence.value
    })

    console.log(superSentence.value)

    //watchEffect
    const countEffect = ref(0)
    setTimeout(() => {
      countEffect.value = 1
    }, 1000);

    setTimeout(() => {
      countEffect.value = 2
    },3000);

    const stop = watchEffect(onInvalid=>{
      console.log('watch:',countEffect.value)
      onInvalid(()=>{
        console.log('onInvalid is triggered')
      })
    })

    setTimeout(() => {
      stop()
      console.log('WatchEffect is stopped')
    }, 2000);


    //watch
    const watchCount = ref('old value')
    const watchName = ref('old Name')
    setTimeout(() => {
        watchCount.value = 'new value'
        watchName.value = 'new name'
    }, 2000);

    // watch(
    //   () => {return watchCount.value},
    //   (newValue,oldValue)=>{
    //     console.log(`watch: ${oldValue} -> ${newValue}`)
    //   })
    
    // watch(() => {
    //   return [watchCount.value,watchName.value]
    // },([newCount,newName],[oldCount,oldName])=>{
    //   console.log(`watch: ${oldCount} -> ${newCount}`)
    //   console.log(`watch: ${oldName} -> ${newName}`)
    // })

    const change = ()=>{
      watchCount.value += '-'
    }

    const watchStop = watch(watchCount,(newValue,oldValue,onInvalid)=>{
      console.log(newValue,oldValue)
      onInvalid(()=>{
        console.log('onInvalid is triggered')
      })
    })

    setTimeout(() => {
      console.log('点也没用')
      watchStop()
    }, 5000);
    

    //toRaw   将响应式对象变为普通对象
    const obj = {
      a:1,
      b:2
    }
    //将普通对象变为代理对象
    const proxyObj = reactive(obj)
    //将代理对象变为普通对象
    const newObj = toRaw(proxyObj)
    //经过代理和toRaw后新的newObj 和 obj 是同一个引用
    console.log(newObj === obj)

    //markRaw   标记某个对象不被响应式
    const proxyMarkObj = reactive(obj)
    const markObj = markRaw(obj)
    console.log('markObj:',markObj)
    console.log('proxyMarkObj:',proxyMarkObj)


    //getCurrentInstance  获取当前实例

    const instance = getCurrentInstance()
    console.log("instance:",instance)

    //生命周期
    onBeforeMount(()=>{
      console.log('生命周期:onBeforeMount')
    })

    onMounted(()=>{
      console.log('生命周期:onMounted')
    })
    
    return {
      title,
      count,
      plus,
      change
    }
  }
}
</script>

<style>
</style>
