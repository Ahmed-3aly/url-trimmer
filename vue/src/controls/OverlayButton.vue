<template>
	<button
		:title="toolTip"
		:disabled="disabled"
		:class="className"
        @click="onClick()"
	>
		<Overlay
			:icon="icon"
			:size="size"
		/>
	</button>
</template>

<script lang='ts' >
	import { Vue, Component, Prop } from 'vue-property-decorator';
	import { IButtonProps } from './Button.vue';
	import Overlay, { IOverlayProps } from './Overlay.vue';
	import { overlayIconEnum, overlaySizeEnum } from '../utils';

	interface IProps extends
		IButtonProps,
		IOverlayProps
	{

	}

	@Component({
		components: {
			Overlay,
		}
	})
	export default class OverlayButton
		extends Vue
		implements IProps
	{
		name = 'OverlayButton';
		@Prop({ required: true })
		icon!: overlayIconEnum;
		@Prop()
		size: overlaySizeEnum | undefined;
		@Prop()
		className: string | undefined;
		@Prop({ required: true })
		toolTip!: string;
		@Prop()
		disabled: boolean | undefined;
		@Prop({ required: true })
		onClick!: any;
		get renderClassName() {
			let n = [];
			if (this.className) {
				n.push(this.className);
			}
			if (this.disabled) {
				n.push('disabled');
			}
			return n.join(' ');
		}
	};
</script>
