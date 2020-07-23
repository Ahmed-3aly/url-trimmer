import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { appRoutes, IRenderers } from '../utils';
import UriTrimComponent from './UrlTrimComponent.vue';
import UrlViewComponent from './UrlViewComponent.vue';

const renderers: IRenderers = {
    urlTrim: UriTrimComponent,
    urlView: UrlViewComponent,
};

Vue.use(VueRouter);

export let routes: RouteConfig[] = [];
for (let i = 0; i < appRoutes.length; i++) {
    const j = appRoutes[i];
    const render = renderers[j.href];
    const href = '/' + j.href;
    let path = href;
    routes.push(
        {
            path,
            name: j.label,
            component: render,
        }
    );
}

let bindRoutes: RouteConfig[] = [];
for (let i = routes.length - 1; i > -1; i--) {
    const isFirst = i === 0;
    let j = {
        ...routes[i],
    }
    bindRoutes.push(j);
    if (!isFirst) {
        continue;
    }
    j = {
        ...j,
        name: 'defaultRedirect',
        path: '/',
        redirect: j.path,
    };
    bindRoutes.push(j);
}

export const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: bindRoutes,
});
