<script>
	import Emitter from '../../mixins/emitter'
	import resize from '../../utils/resize'

	export default {
		name: "g-base",
		mixins: [Emitter],
		props: {
			resize: {
				default: function () {
					return resize
				}
			},
			scaleProps: {
				default:function () {
					return ['left', 'right', 'top', 'bottom']
				}
			}
		},
		data() {
			return {
				options: {}
			}
		},
		inject: ['chartsOptions'],
		computed: {
			updateOptions() {
				return {...this.$props}
			}
		},
		watch: {
			'updateOptions'() {
				this.scaleProps.forEach(key => {
					if(typeof(this.options[key]) == 'Number')
						this.options[key] = this.options[key] * this.resize.scale
				})
				// this.dispatch('g-chart', 'update-options')
				this.$parent.render()
			}
		},
		created() {
			this.scaleProps.forEach(key => {
				if(typeof(this.options[key]) == 'Number')
					this.options[key] = this.options[key] * this.resize.scale
			})
		},
		render() {}
	}
</script>

