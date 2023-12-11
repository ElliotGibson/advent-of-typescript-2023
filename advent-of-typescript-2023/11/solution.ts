export type DeepReadonly<TInput> = TInput extends Record<PropertyKey, unknown>
	? ReadonlyObj<TInput>
	: ReadonlyArr<TInput>;

type ReadonlyObj<TInput> = TInput extends Record<PropertyKey, unknown>
	? { readonly [TKey in keyof TInput] : DeepReadonly<TInput[TKey]> }
	: TInput;

type ReadonlyArr<TInput> = TInput extends [infer THead, ...infer TTail] 
	? readonly [DeepReadonly<THead>, ...DeepReadonly<TTail>]
	: TInput;

export type SantaListProtector<TInput> = DeepReadonly<TInput>