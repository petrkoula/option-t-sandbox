import {createNone} from "option-t/lib/PlainOption";
import {getPersonPlain, ServiceError} from "../src/option-t/getPersonPlain";

describe('getPerson', () => {
	test("returns person", () => {
		const result = getPersonPlain("andy");

		expect(result.ok).toBe(true)
		expect(result.val.val.name).toEqual('andy')
	})

	test("returns none", () => {
		const result = getPersonPlain("_");

		expect(result.ok).toBe(true)
		expect(result.val).toEqual(createNone())
	})

	test("returns bad query", () => {
		const result = getPersonPlain(null);

		expect(result.ok).toBe(false)
		expect(result.err).toBe(ServiceError.BadQuery)
	})

})
