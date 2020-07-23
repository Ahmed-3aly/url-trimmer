import { IUrlTrimPersistingState } from '../state';
import { Persist } from './IPersist';

const key = 'urlTrim';

export const urlTrimPersist =
	new Persist<IUrlTrimPersistingState>
(
	key
);
