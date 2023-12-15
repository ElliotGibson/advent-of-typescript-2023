type FillArray<Fill, Size = 1, Arr extends any[] = []> = Arr["length"] extends Size 
	? Arr
	: FillArray<Fill, Size, [...Arr, Fill]>

export type BoxToys<Fill, UnionCount> = UnionCount extends (infer Count) 
	? FillArray<Fill, Count>
	: never
