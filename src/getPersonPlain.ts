// tslint:disable-next-line:no-submodule-imports
import {createNone as none, createSome as some, Option} from "option-t/esm/PlainOption";
import {createErr as err, createOk as ok, Result} from "option-t/esm/PlainResult";

interface Person {
	name: string,
}

enum ServiceError {
	BadQuery,
}

const people: Person[] = [
	{name: "andy"},
	{name: "johny"},
]

type GetPersonResult = Result<Option<Person>, ServiceError>;

const getPersonPlain = (name: string): GetPersonResult => {
	if (name == null) {
		return err(ServiceError.BadQuery)
	}

	const person = people.find(p => p.name === name);
	return !person
		? ok(none())
		: ok(some(person));
}

export {getPersonPlain, ServiceError}

