/* tslint:disable:interface-name no-submodule-imports */
import {unwrap} from "option-t/esm/PlainOption";
import {unwrapErr} from "option-t/esm/PlainResult";
import {getPersonPlain, ServiceError} from "./getPersonPlain";

interface HandlerResult {
	status: number,
	name?: string,
	err?: string
}

export const handler = (name: string): HandlerResult => {
	const res = getPersonPlain(name);
	if (res.ok) {
		const person = unwrap(res)
		if (person.ok) {
			return {status: 200, name: unwrap(person).name}
		} else {
			return {status: 404, err: 'not found'}
		}
	}

	const error = unwrapErr(res)
	switch (error) {
		case ServiceError.BadQuery:
			return {status: 400, err: error.toString()}
		case ServiceError.ServiceDown:
			return {status: 503, err: error.toString()}
	}
}
