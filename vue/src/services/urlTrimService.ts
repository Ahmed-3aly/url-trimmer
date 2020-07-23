import { IUrlViewModel, IUrlViewPage } from '../state';
import { config } from '../utils';
import { generatorService } from './generatorService';

const list: IUrlViewModel[] = [];

export const urlTrimService = {
    trimUrl,
    getPage,
};

// eslint-disable-next-line
const validUrlExpression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

function isValidURL(
    v: string,
) {
    return v.match(validUrlExpression) !== null;
};

function trimUrl(
    address: string,
) {
    if (!(
        address &&
        address.trim()
    )) {
        return;
    }
    address = address.toLowerCase();
    if (!isValidURL(address)) {
        return;
    }
    const find = list
        .find(x => x.address === address);
    if (find) {
        return find;
    }
    let trimmed = '';
    const vals = list
        .map(x => x.trimmed.toLowerCase());
    do {
        trimmed = config.URL_PREFIX +
            generatorService.generate(
                config.URL_SUFFIX
            );
    } while (
        vals.includes(
            trimmed,
        )
    );
    let result: IUrlViewModel = {
        address,
        trimmed,
    };
    list.push(result);
    return result;
}

function getPage(
    index: number,
    perPage: number,
) {
    if (index < 1) {
        return;
    }
    const n = list.length;
    const limit = n;
    const count = Math.ceil(n / perPage);
    let from = (index - 1) * perPage;
    let to = from + perPage;
    if (to > limit) {
        to = limit;
    }
    let pageList: IUrlViewModel[] = [];
    for (let i = from; i < to; i++) {
        const v = list[i];
        pageList.push(v);
    }
    const page: IUrlViewPage = {
        index,
        count,
        list: pageList,
    }
    return page;
}
