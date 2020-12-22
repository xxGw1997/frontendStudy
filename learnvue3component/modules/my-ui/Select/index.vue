<template>
  <div class="my-select">
    <div class="result" 
        @click="openOptions"
    >{{ data[curIdx].text }}</div>
    <div class="options" v-show="optionsShow">
      <div
        class="option"
        v-for="(item, index) of data"
        :key="index"
        @click="setOption(index, item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
export default {
    name:"MySelect",
    props:{
        data:Array,
        currentIndex:{
            type:Number,
            default:0
        },
        callback:Function
    },
    setup(props){
        const state = reactive({
            curIdx:props.currentIndex,
            optionsShow:false
        })

        const setOption = (index,item) =>{
            state.curIdx = index,
            state.optionsShow = false
            props.callback(index,item)
        }
        
        const openOptions = () => {
            console.log('ad')
            state.optionsShow = !state.optionsShow
        }

        return {
            ...toRefs(state),
            setOption,
            openOptions
        }
    }
};
</script>

<style>
</style>