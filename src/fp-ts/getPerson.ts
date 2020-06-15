/* tslint:disable:no-submodule-imports */
import {Either, fold, left, right} from 'fp-ts/lib/Either'
import {fromNullable, isNone, Option,toNullable} from 'fp-ts/lib/Option';
import {HandlerResult, ServiceError} from "../types";

type GetPersonResult = Either<ServiceError, Person>;

export const handler = (name: string): HandlerResult => {
	const personResult = getPerson(fromNullable(name));
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

const getPerson = (name: Option<string>): GetPersonResult => {
	if (isNone(name)) {
		left(ServiceError.BadQuery)
	}

	const person = findPerson(toNullable(name))
	return !person
		? left(ServiceError.NotFound)
		: right(person);
}

export {getPerson}
