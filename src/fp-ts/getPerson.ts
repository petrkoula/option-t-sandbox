/* tslint:disable:no-submodule-imports */
import {Either, fold, left, right} from 'fp-ts/lib/Either'
import {HandlerResult, ServiceError} from "../types";

type GetPersonResult = Either<ServiceError, Person>;

export const handler = (name: string): HandlerResult => {
	const personResult = getPerson(name);
	const replyError = (e: ServiceError): HandlerResult => {
		switch (e) {
			case ServiceError.BadQuery:
				return {status: 400}
			case ServiceError.NotFound:
				return {status: 404}
			case ServiceError.ServiceDown:
				return {status: 503}
		}
	};
	const replyOk = (p: Person) => ({
		name: p.name,
		status: 200
	});
	return fold(replyError, replyOk)(personResult);
}

const getPerson = (name: string): GetPersonResult => {
	if (name == null) {
		left(ServiceError.BadQuery)
	}

	const person = findPerson(name)
	return !person
		? left(ServiceError.NotFound)
		: right(person);
}

export {getPerson}
