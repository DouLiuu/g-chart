import Vue from 'vue'

let instance

class PopupManager {
	constructor() {
		this.pool = {}
	}

	static getInstance() {
		if (!instance) {
			instance = new PopupManager()
		}
		return instance
	}

	init(options) {
		let container = document.createElement('div');
		let target = document.querySelector('body');

		const {
			uid,
			parent,
			components,
			wrapper
		} = options
		let vm = this.pool[uid]
		if (vm) {
			if (vm.show) return
			vm.show = true
			return
		}

		try {
			if (!wrapper.extends || wrapper.extends.name !== 'base-wrapper') throw "弹出容器必须继承base-wrapper"
		} catch (error) {
			console.error(error)
		}
		let VueComponent = Vue.extend({
			...wrapper,
			components: {
				...wrapper.components,
				...components
			}
		})
		vm = new VueComponent({
			parent,
			data: {
				show: true
			},
			propsData: {
				uid: uid,
				...parent.$props
			}
		}).$mount()
		//标记
		this.pool[uid] = vm
		// 插入
		vm.$el.parentElement === null && target.appendChild(vm.$el);

	}

	popup(options) {
		this.init(options)
	}

	close(uid) {
		let vm = this.pool[uid]
		if (!vm) return
		if(vm.$el.parentElement){
			vm.$el.parentElement.removeChild(vm.$el)
		}
		vm.$destroy()
		this.pool[uid] = null
		delete this.pool[uid];
	}
}

export default PopupManager