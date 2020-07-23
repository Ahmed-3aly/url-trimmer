<template>
	<div
		:class='p.rootName'
	>
		<div
			class='blur'
		/>
		<div
			:class='p.className'
			v-if='p.shouldRender'
		>
			<div>
				{{p.state}}
			</div>
			<div
				v-if='p.hasError'
			>
				{{p.error}}
			</div>
		</div>
	</div>
</template>

<script lang='ts' >
	import { Vue, Component } from 'vue-property-decorator';
	import { Observer } from 'mobx-vue';
	import { Store } from '../state';
	
	@Observer
	@Component
	export default class AjaxState
		extends Vue
	{
		name = 'AjaxState'
		p = Store.ajax;
	}

</script>
