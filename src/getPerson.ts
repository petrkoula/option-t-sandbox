// tslint:disable-next-line:no-submodule-imports
import {isNotNullAndUndefined} from "option-t/lib/Maybe";
import {createNone as none, createSome as some, Option} from "option-t/lib/PlainOption";
import {createErr as err, createOk as ok, Result} from "option-t/lib/PlainResult";

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

const getPerson = (name: string): GetPersonResult => {
	if(name == null){
		return err(ServiceError.BadQuery)
	}

	const person = people.find(p => p.name===name);
	return !person
		? ok(none())
		: ok(some(person));
}

const getStatus = (name:string) => {
	const result = getPerson(name)


};

export {getPerson, ServiceError}

