import { IUrlViewPersistingState } from '../state';
import { Persist } from './IPersist';

const key = 'urlView';

export const urlViewPersist =
	new Persist<IUrlViewPersistingState>
(
	key
);
