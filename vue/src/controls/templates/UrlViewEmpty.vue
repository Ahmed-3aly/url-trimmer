<template>
	<div
		v-if='p.isEmpty'
		class='urlViewEmpty'
	>
		<span
			class='urlViewEmptyLabel'
		/>
	</div>
</template>

<script lang='ts' >
	import { Vue, Component } from 'vue-property-decorator';
	import { Store } from '../../state';
	import { Observer } from 'mobx-vue';

	@Observer
	@Component
	export default class UrlViewEmpty
		extends Vue
	{
		name = 'UrlViewEmpty';
		p = Store.urlView;
	}
</script>
