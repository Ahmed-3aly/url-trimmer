<template>
	<div
		v-if='p.isList'
		class='urlViewList'
	>
		<div>
			<div
				class='urlViewLabel'
			>
				{{p.viewKeys[0]}}
			</div>
			<div
				class='urlViewLabel'
			>
				{{p.viewKeys[1]}}
			</div>
		</div>
		<div
			v-for='(x, i) in p.list'
			:key='i'
		>
			<input
				type='text'
				readOnly='true'
				:value='x.address'
			/>
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
	export default class UriViewList
		extends Vue
	{
		name = 'UriViewList';
		p = Store.urlView;
	}
</script>
