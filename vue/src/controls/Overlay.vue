<template>
	<i :class="className" />
</template>
<script lang='ts' >
	import { Vue, Component, Prop } from 'vue-property-decorator';
	import { overlayIconEnum, overlaySizeEnum } from '../utils';

	export interface IOverlayProps {
		icon: overlayIconEnum,
		size?: overlaySizeEnum,
	}

	@Component
	export default class Overlay
		extends Vue
		implements IOverlayProps
	{
		name = 'Overlay';
		@Prop({ required: true })
		icon!: overlayIconEnum;
		@Prop()
		size: overlaySizeEnum | undefined;
		get className() {
			let c = 'Overlay fa-fw ';
			let size = this.size;
			if (!size) {
				size = overlaySizeEnum.Size_0;
			}
			c += size + ' ' + this.icon;
			return c;
		}
	}
</script>
