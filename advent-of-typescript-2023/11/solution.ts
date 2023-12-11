type NonAccessible = Function | boolean | number | string;

export type SantaListProtector<TInput> = TInput extends NonAccessible
	? TInput
	: { readonly [TKey in keyof TInput] : SantaListProtector<TInput[TKey]>}