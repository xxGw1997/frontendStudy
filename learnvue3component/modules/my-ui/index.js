import Select from './Select'
import Link from './Link'


//全局注册
const MyUI = {}
MyUI.install = function(Vue){
    Vue.component(Select.name,Select)
    Vue.component(Link.name,Link)
}

//按需注册
export const MySelect = {}
export const MyLink = {}
MySelect.install = Vue => Vue.component(Select.name,Select)
MyLink.install = Vue => Vue.component(Link.name,Link)

export default MyUI