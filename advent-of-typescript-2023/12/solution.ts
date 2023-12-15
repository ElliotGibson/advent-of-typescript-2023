type FindIndex<TInput, TTerm, TIndex extends readonly any[] = []> =
 TInput extends [infer THead, ...infer TTail] 
	?	THead extends TTerm 
		? TIndex["length"]
		: FindIndex<TTail, TTerm, [...TIndex, THead]>
	: never;


export type FindSanta<TInput> = FindIndex<TInput, '🎅🏼'>