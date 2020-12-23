<template>
    <div>{{count}}</div>
    <button @click="plus">+100</button>
</template>

<script>
export default {
    name:'test2',
    emits:['plus'],
    props:{
        count:Number
    },
    setup(props,ctx){
        let plus = ()=>{
            ctx.emit('plus',100)
        }
        console.log(ctx)
        return {
            plus
        }
    }
}
</script>

<style>

</style>