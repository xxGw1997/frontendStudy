let currentEffect
class Dep {
    constructor(val) {
        this.effects = new Set()
        this._value = val
    }

    get value() {
        dep.depend()
        return this._value
    }

    set value(newVal) {
        this._value = newVal
        dep.notice()
    }

    //1.收集依赖
    depend() {
        if (currentEffect) {
            this.effects.add(currentEffect)
        }
    }

    //2.触发依赖
    notice() {
        this.effects.forEach(effect => effect())
    }
}

//ref

function effectWatch(effect) {
    //收集依赖
    currentEffect = effect
    effect()
    currentEffect = null
}

const dep = new Dep(10)

let b
effectWatch(() => {
    b = dep.value + 10
    console.log('🐖🐖', b)
})

dep.value = 20


//reactive

const targetMap = new Map()

function getDep(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Dep()
        depsMap.set(key, dep)
    }

    return dep
}


function reactive(raw) {
    return new Proxy(raw, {
        get(target, key) {
            const dep = getDep(target,key)
            dep.depend()
            return Reflect.get(target, key)
        },
        set(target, key, value) {
            const dep = getDep(target,key)
            const result = Reflect.set(target, key, value)
            dep.notice()
            return result
        }
    })
}

const user = reactive({
    name: 'xxgw'
})

let double
effectWatch(()=>{
    console.log('-----------')
    double = user.name
    console.log(double)
})

user.name = 'zzw'