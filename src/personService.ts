/* tslint:disable:interface-name */
interface Person {
	name: string,
}

const people: Person[] = [
	{name: "andy"},
	{name: "johny"},
]

const findPerson = (name: string) => people.find(p => p.name === name);
