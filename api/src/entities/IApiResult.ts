
export interface IApiResult<T> {
	ok: boolean,
	error?: string,
	payload?: T,
}
