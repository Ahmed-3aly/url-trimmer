<template>
	<div
		v-if='p.isGrid'
		class='urlViewGrid'
	>
		<div
			v-for='(x, i) in p.list'
			:key='i'
		>
			<div
				class='urlViewLabel'
			>
				{{p.viewKeys[0]}}
			</div>
			<input
				type='text'
				readOnly='true'
				:value='x.address'
			/>
			<div
				class='urlViewLabel'
			>
				{{p.viewKeys[1]}}
			</div>
			<a
				class='urlViewLink'
				:href='x.trimmed'
			>
				{{x.trimmed}}
			</a>
		</div>
	</div>
</template>

<script lang='ts' >
	import { Vue, Component } from 'vue-property-decorator';
	import { Store } from '../../state';
	import { Observer } from 'mobx-vue';

	@Observer
	@Component
	export default class UriViewGrid
		extends Vue
	{
		name = 'UriViewGrid';
		p = Store.urlView;
	}
</script>
