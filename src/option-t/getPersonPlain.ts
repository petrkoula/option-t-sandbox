/* tslint:disable:no-submodule-imports interface-name */
// tslint:disable-next-line:no-submodule-imports
import {isNone, Option, unwrap} from "option-t/esm/PlainOption";
import {mapOrElse, Result} from "option-t/esm/PlainResult";
import {HandlerResult, ServiceError} from "../types";
import {err, none, ok, some} from "./types";

export const handler = (name: string): HandlerResult => {
	const result = getPersonPlain(some(name));

	const mapError = (error: ServiceError): HandlerResult => {
		const map = {
			[ServiceError.BadQuery]: {status: 400, err: error.toString()},
			[ServiceError.ServiceDown]: {status: 503, err: error.toString()}
		}
		return map[error]
	};

	return mapOrElse(result,
		mapError,
		person => ({status: 200, name: person.val.name})
	)
}

const getPersonPlain = (name: Option<string>): Result<Option<Person>, ServiceError> => {
	if (isNone(name)) {
		return err(ServiceError.BadQuery)
	}

	const person = findPerson(unwrap(name))
	return !person
		? ok(none())
		: ok(some(person));
}

export {getPersonPlain, ServiceError}

