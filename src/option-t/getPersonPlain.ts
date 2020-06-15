/* tslint:disable:no-submodule-imports interface-name */
// tslint:disable-next-line:no-submodule-imports
import {createNone as none, createSome as some, isNone, Option, unwrap} from "option-t/esm/PlainOption";
import {createErr as err, createOk as ok, Result, unwrapErr} from "option-t/esm/PlainResult";
import {HandlerResult, ServiceError} from "../types";

type GetPersonResult = Result<Option<Person>, ServiceError>;

export const handler = (name: string): HandlerResult => {
	const result = getPersonPlain(some(name));
	if (result.ok) {
		const person = unwrap(result)
		return person.ok
			? {status: 200, name: unwrap(person).name}
			: {status: 404, err: 'not found'};
	}

	const error = unwrapErr(result)
	switch (error) {
		case ServiceError.BadQuery:
			return {status: 400, err: error.toString()}
		case ServiceError.ServiceDown:
			return {status: 503, err: error.toString()}
	}
}

const getPersonPlain = (name: Option<string>): GetPersonResult => {
	if (isNone(name)) {
		return err(ServiceError.BadQuery)
	}

	const person = findPerson(unwrap(name))
	return !person
		? ok(none())
		: ok(some(person));
}

export {getPersonPlain, ServiceError}

