<template>
	<div
		class='pagingStyle'
	>
		<span>
			Style
		</span>
		<OverlayButton
			v-for='(x, i) in p.styleNames'
			:key='x'
			:disabled='x === p.style'
			:toolTip='x + " view"'
			:icon='p.styleIcons[i]'
			:onClick='() => onChange(x)'
		/>
	</div>
</template>

<script lang='ts' >
	import { Vue, Component } from 'vue-property-decorator';
	import { viewStyleEnum, Store } from '../state';
	import OverlayButton from './OverlayButton.vue';
	import { Observer } from 'mobx-vue';

	@Observer
	@Component({
		components: {
			OverlayButton,
		}
	})
	export default class PagingStyle
		extends Vue
	{
		name = 'PagingStyle';
		get p() {
			return Store.urlView;
		};
		onChange(
			v: viewStyleEnum,
		) {
			Store.urlView.setStyle(v);
		};
	}

</script>
