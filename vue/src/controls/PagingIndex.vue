<template>
	<div
		v-if='!(p && p.count > 1 && p.pagingBinding)'
		class='pagingIndex'
	/>
	<div
		v-else
		class='pagingIndex'
	>
		<OverlayButton
			toolTip='first'
			:disabled='!p.pagingBinding.canPrev'
			:icon='p.pagingIcons[0]'
			:onClick='() => navigate(1)'
		/>
		<OverlayButton
			toolTip='previous'
			:disabled='!p.pagingBinding.canPrev'
			:icon='p.pagingIcons[1]'
			:onClick='() => navigate(p.pagingBinding.prev)'
		/>
		<span>
			{{p.pagingBinding.label}}
		</span>
		<OverlayButton
			toolTip='next'
			:disabled='!p.pagingBinding.canNext'
			:icon='p.pagingIcons[2]'
			:onClick='() => navigate(p.pagingBinding.next)'
		/>
		<OverlayButton
			toolTip='last'
			:disabled='!p.pagingBinding.canNext'
			:icon='p.pagingIcons[3]'
			:onClick='() => navigate(p.count)'
		/>
	</div>
</template>

<script lang='ts' >
	import { Vue, Component } from 'vue-property-decorator';
	import OverlayButton from './OverlayButton.vue';
	import { Observer } from 'mobx-vue';
	import { Store } from '../state';
	import { trimUrlApi } from '../api';

	@Observer
	@Component({
		components: {
			OverlayButton,
		}
	})
	export default class PagingIndex
		extends Vue
	{
		name = 'PagingIndex';
		get p() {
			return Store.urlView;
		};
		navigate(
			i: number,
		) {
			const api = trimUrlApi(Store);
			api.getPageAsync(i);
		}
	}
</script>
