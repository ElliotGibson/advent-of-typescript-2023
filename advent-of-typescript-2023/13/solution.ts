type ToArray<TNum extends number, TArr extends any[] = []> = TNum extends TArr["length"] 
	? TArr
	: ToArray<TNum, [...TArr, ":)"]>

type SubOne<TInput extends number> = ToArray<TInput> extends [infer THead, ...infer TTail] 
	? TTail["length"]
	: never; 

type NumRange<TStart extends number, TEnd extends number> = TStart extends TEnd 
	? TStart
	: TEnd | DayCounter<TStart, SubOne<TEnd>>

export type DayCounter<TStart extends number, TEnd extends number> = NumRange<TStart, TEnd>