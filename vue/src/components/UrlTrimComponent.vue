<template>
	<div
		class='urlTrim'
	>
		<input
			type='text'
			:placeholder="p.labels[0]"
			:value='p.text'
			:disabled='p.disableEdit'
			:title='p.labels[1].toUpperCase()'
			@input='textChange'
		/>
		<button
			type='submit'
			:disabled='p.disableTrim'
			@click='trimAsync'
		>
			Trim
		</button>
		<a
			v-if='p.showTrim'
			:href='p.trim'
		>
			{{ p.trim }}
		</a>
		<button
			v-if='p.showTrim'
			@click='onReset'
		>
			Clear
		</button>
	</div>
</template>

<script lang='ts'>
	import { Vue, Component, Prop } from 'vue-property-decorator';
	import { trimUrlApi } from '../api';
	import { IStoreBind, Store, ajaxStateEnum, IUrlTrimState } from '../state';
	import { log } from '../utils';
	import { Observer } from 'mobx-vue';
	import { toJS, action } from 'mobx';

	@Observer
	@Component
	export default class UrlTrimComponent
		extends Vue
	{
		name = 'UrlTrimComponent'
		get p() {
			const s = (this as any).$store as IStoreBind;
			return s.urlTrim;
		};
		onReset() {
			Store.ajax.init();
			const s = (this as any).$store as IStoreBind;
			s.urlTrim.setText('');
		};
		async trimAsync() {
			const s = (this as any).$store as IStoreBind;
			const api = trimUrlApi(s);
			await api.trimUriAsync();
		};
		textChange(
			e: any,
		) {
			let text = e.target.value;
			if (!text.trim()) {
				text = '';
			}
			Store.urlTrim.setText(text);
		};
	}

</script>
