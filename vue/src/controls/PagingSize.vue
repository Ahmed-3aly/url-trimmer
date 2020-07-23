<template>
	<div
		class='pagingSize'
	>
		<span>
			Size
		</span>
		<Button
			v-for='x in p.pagingSizes'
			:key='x'
			:disabled='x === p.perPage'
			:onClick='() => onChange(x)'
			:toolTip='print(x) + " items per page"'
		>
			{{print(x)}}
		</Button>
	</div>
</template>

<script lang='ts' >
	import { Vue, Component } from 'vue-property-decorator';
	import { Store } from '../state';
	import Button from './Button.vue';
  	import { Observer } from 'mobx-vue';
	import { trimUrlApi } from '../api';

	@Observer
	@Component({
		components: {
			Button,
		}
	})
	export default class PagingSize
		extends Vue
	{
		name = 'PagingSize';
		get p() {
			return Store.urlView;
		};
		onChange(
			v: number,
		) {
			const api = trimUrlApi(Store);
			Store.urlView.setPerPage(api, true, v);
		};
		print(
			v: number,
		) {
			return (v.toString().length < 2 ? "0" : "") + v;
		};
	}

</script>
