type FindInArray<Arr, Value = "🎅🏼", Checked extends any[]=[]> = Arr extends [infer THead, ...infer TTail] 
	? THead extends Value
		? [true, Checked["length"]]
		: FindInArray<TTail, Value, [...Checked, THead]>
	: [false, never]

type FindIn2DArray<Arr extends any[], Value ="🎅🏼", Checked extends any[]=[]> = Arr extends [infer THead, ...infer TTail] 
	? FindInArray<THead, Value> extends [true, infer Position]
		? [Checked["length"], Position]
		: FindIn2DArray<TTail, Value, [...Checked, THead]>
	: never;

export type FindSanta<Forest extends any[]> = FindIn2DArray<Forest>