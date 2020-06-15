/* tslint:disable:no-submodule-imports */

import {err, ok, Result} from 'neverthrow'
import {HandlerResult, ServiceError} from "../types";

type GetPersonResult = Result<Person, ServiceError>;

export const handler = (name: string): HandlerResult => {
	const personResult = getPerson(name);
	const replyOk = (p: Person) => ({
		name: p.name,
		status: 200
	});
	const replyError = (e: ServiceError) => {
		switch (e) {
			case ServiceError.BadQuery:
				return {status: 400}
			case ServiceError.NotFound:
				return {status: 404}
			case ServiceError.ServiceDown:
				return {status: 503}
		}
	};
	return personResult.match(replyOk, replyError)
}

const getPerson = (name: string): GetPersonResult => {
	if (name == null) {
		err(ServiceError.BadQuery)
	}

	const person = findPerson(name)
	return !person
		? err(ServiceError.NotFound)
		: ok(person);
}

export {getPerson}
