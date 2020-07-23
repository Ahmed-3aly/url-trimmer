<template>
  <div
    class='urlView'
  >
    <PagingStyle />
    <PagingSize />
    <PagingIndex />
    <UrlViewEmpty />
    <UrlViewList />
    <UrlViewGrid />
  </div>
</template>

<script lang='ts' >
	import { Vue, Component } from 'vue-property-decorator';
	import { Store, viewStyleEnum } from '../state';
  import { trimUrlApi } from '../api';
  import { Observer } from 'mobx-vue';
  import PagingIndex from '../controls/PagingIndex.vue';
  import PagingSize from '../controls/PagingSize.vue';
  import PagingStyle from '../controls/PagingStyle.vue';
  import UrlViewEmpty from '../controls/templates/UrlViewEmpty.vue';
  import UrlViewGrid from '../controls/templates/UrlViewGrid.vue';
  import UrlViewList from '../controls/templates/UrlViewList.vue';

	@Observer
	@Component({
		components: {
			PagingIndex,
			PagingSize,
      PagingStyle,
      UrlViewEmpty,
      UrlViewGrid,
      UrlViewList,
		}
  })
  export default class UrlViewComponent
		extends Vue
	{
    name = 'UrlViewComponent'
    p = Store.urlView;
    mounted()
    {
			const api = trimUrlApi(Store);
      api.getPageAsync();
    }
  }
</script>
