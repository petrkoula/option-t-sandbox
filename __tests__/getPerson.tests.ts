import {getPerson, PersonError} from "../src/getPerson";

describe('getPerson', () => {
	test("returns ok", () => {
		const person = getPerson("andy");

		expect(person.ok).toBe(true)
		expect(person.val).toEqual({name: 'andy'})
	})

	test("returns not found", () => {
		const person = getPerson("_");

		expect(person.ok).toBe(false)
		expect(person.err).toBe(PersonError.NotFound)
	})

})
