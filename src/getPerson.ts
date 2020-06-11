// tslint:disable-next-line:no-submodule-imports
import {createErr as err, createOk as ok, Result} from "option-t/lib/PlainResult";

interface Person {
	name: string,
}
type GetPersonResult = Result<Person, PersonError>;
enum PersonError {
	NotFound,
	QueryEmpty,
}
const people: Person[] = [
	{name: "andy"},
	{name: "johny"},
]

const getPerson = (name: string): GetPersonResult => {
	if(name == null){
		return err(PersonError.QueryEmpty)
	}

	const person = people.find(p => p.name===name);
	return !!person
		? err(PersonError.NotFound)
		: ok(person);
}

const getStatus = (string:name) => {
	const person = getPerson(name)
};

export {getPerson, PersonError}

