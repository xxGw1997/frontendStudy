<template>
  <div>
    <my-select
      :data="data"
      :currentIndex="curIdx"
      :callback="setOption"
    />
    <my-link
      href="http://www.baidu.com"
      type="primary"
      target="_blank">百度</my-link>
      <my-link
      href="http://www.bilibili.com"
      type="success"
      target="_blank">bilibili</my-link>
  </div>
</template>

<script>
import {ref} from 'vue'
// import MySelect from '../modules/my-ui/Select'
// import MyLink from '../modules/my-ui/Link'
export default {
  name: 'App',
  components:{
    // MySelect,
    // MyLink
  },
  setup(){
    const curIdx = ref(1)
    const data = [
      {
        id:1,
        value:'orange',
        text:'橙子'
      },
      {
        id:2,
        value:'apple',
        text:'苹果'
      },
      {
        id:3,
        value:'pear',
        text:'梨'
      },
    ]

    const setOption = (index,item)=>{
      console.log(index,item)
    }

    return {
      data,
      curIdx,
      setOption
    }
  }
}
</script>

<style lang="scss">

</style>
