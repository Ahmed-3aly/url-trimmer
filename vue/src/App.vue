<template>
	<div id='app' >
		<keep-alive>
			<AjaxState />
		</keep-alive>
		<keep-alive>
			<div
				class='nav'
			>
				<router-link
					v-for="route in routes"
					:key="route.path"
					:to="route.path"
				>
					{{ route.name }}
				</router-link>
			</div>
		</keep-alive>
		<div
			class='navContent'
		>
			<router-view />
		</div>
	</div>
</template>

<script lang='ts' >
	import { routes } from './components';
	import AjaxState from './controls/AjaxState.vue';
	import { Vue, Component } from 'vue-property-decorator';

	@Component({
		components: {
			AjaxState,
		}
	})
	export default class App extends Vue {
		name = 'App';
		get routes() {
			return routes;
		}
	};
</script>

<style>
	@import './styles/ajaxState.css';
	@import './styles/pagingIndex.css';
	@import './styles/pagingSize.css';
	@import './styles/pagingStyle.css';
	@import './styles/nav.css';
	@import './styles/urlTrim.css';
	@import './styles/urlView.css';
	@import './styles/urlViewEmpty.css';
	@import './styles/urlViewGrid.css';
	@import './styles/urlViewList.css';
	@import './styles/appRoot.css';
	@import './styles/index.css';
</style>
