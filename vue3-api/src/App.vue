<template>
  <test :title="title"/>
  <test2 :count="count" @plus="plus"/>
</template>

<script>
import {ref,toRef,toRefs, reactive,shallowRef,watchEffect, triggerRef} from 'vue'
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
    return {
      title,
      count,
      plus
    }
  }
}
</script>

<style>
</style>
