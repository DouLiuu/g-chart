<script>
	import GBase from './base/g-base'
	export default {
		extends: GBase,
		name: "g-bar",
		props: ['data', 'name', 'barMaxWidth', 'barWidth', 'itemStyle'],
		data(){
			return {
				options:{
					type: 'bar',
					...this.$props,
				}
			}
		},
		created(){
			if(!this.chartsOptions.series) this.chartsOptions.series = []
			this.chartsOptions.series.push(this.options)
		},
	}
</script>
