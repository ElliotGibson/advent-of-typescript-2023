type Filter<TArr, TItem, TResult extends any[] = []> = TArr extends [infer THead, ...infer TTail] 
	? THead extends TItem 
		? Filter<TTail, TItem, [...TResult, THead]>
		: Filter<TTail, TItem, TResult>
	: TResult;

export type Count<Sack, Item> = Filter<Sack, Item>["length"]
