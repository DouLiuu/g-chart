<template lang='pug'>
	g-chart
		g-graphic(:elements="group")
</template>

<script>
	import GChart from '../../g-chart/g-chart'
	import GGraphic from '../../g-chart/g-graphic'
	import resize from '../../utils/resize'

	export default {
		name: "g-chart-percent",
		components: {GChart, GGraphic},
		props: {
			backgroundColor: {
				default: '#000E2D'
			},
			color: {
				default: '#9CCAF0'
			},
			borderColor:{
				default: '#04418A'
			},
			percent: {
				default: .4
			},
			maxR: {
				default: 70
			},
			minR: {
				default: 55
			}
		},
		data() {
			return {
				group: [{
					type: 'group',
					silent: true,
					left: 'center',
					top: 'middle',
					width: 1,
					height: 1,
					children: [
						{
							type: 'ring',
							silent: true,
							left: 'center',
							top: 'middle',
							shape: {
								r: (this.maxR + 4) * resize.scale,
								r0: (this.minR - 4) * resize.scale,
							},
							style: {
								fill: null,
								stroke: this.borderColor,
								lineWidth: 2 * resize.scale
							}
						}, {
							type: 'sector',
							silent: true,
							rotation: Math.PI * .5,
							shape: {
								r: this.maxR * resize.scale,
								r0: this.minR * resize.scale,
								startAngle: 0,
								endAngle: 2 * Math.PI * this.percent
							},
							style: {
								fill: this.color
							}
						}, {
							type: 'text',
							silent: true,
							left: 'center',
							top: 'middle',
							style: {
								text: '660',
								fill: '#52B8DF',
								stroke: 'rgba(156,202,240,0.30)',
								font: `${32 * resize.scale}px "Microsoft YaHei", sans-serif`
							}
						}
					]
				}]
			}
		}
	}
</script>

<style lang="stylus" scoped>

</style>
