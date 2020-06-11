/* tslint:disable:interface-name */
interface HandlerResult {
	status: number,
	name?: string,
	err?: string
}

enum ServiceError {
	BadQuery,
	ServiceDown,
	NotFound,
}

export {ServiceError, HandlerResult};
