import { Request } from 'express';
import { log } from './log';

export function logHttp(
	A: Request,
) {
	const method = A.method;
	let request: any = {};
	switch (method.toLowerCase()) {
		case 'get':
			request.query = A.query;
			break;
		case 'post':
			request.body = A.body;
			break;
		default:
			//
			break;
	}
	log(A.path + ' -> ' + A.method, request);
}
