<template>
  <div>
      {{title}}
  </div>
</template>

<script>
import {watch,watchEffect} from 'vue'
export default {
    name:'Test',
    props:{
        title:String
    },
    setup(props){
        watch(() => {
            return props.title
        },(newValue)=>{
            console.log('newValue:',newValue)
        })
    }
}
</script>

<style>

</style>