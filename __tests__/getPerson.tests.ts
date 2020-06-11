import {createNone} from "option-t/lib/PlainOption";
import {getPerson, ServiceError} from "../src/getPerson";

describe('getPerson', () => {
	test("returns person", () => {
		const result = getPerson("andy");

		expect(result.ok).toBe(true)
		expect(result.val.val.name).toEqual('andy')
	})

	test("returns none", () => {
		const result = getPerson("_");

		expect(result.ok).toBe(true)
		expect(result.val).toEqual(createNone())
	})

	test("returns bad query", () => {
		const result = getPerson(null);

		expect(result.ok).toBe(false)
		expect(result.err).toBe(ServiceError.BadQuery)
	})

})
