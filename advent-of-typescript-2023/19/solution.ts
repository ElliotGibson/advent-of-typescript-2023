export type Fill<Item, Length, Arr extends any[] = []> = Arr["length"] extends Length
	? Arr
	: Fill<Item, Length, [...Arr, Item]>;

export type SequencePairs = {
	"🛹": "🚲";
	"🚲": "🛴";
	"🛴": "🏄";
	"🏄": "🛹";
};

export type Rebuild<Arr, Item extends keyof SequencePairs = "🛹"> = Arr extends [
	infer THead,
	...infer TTail,
]
	? [...Fill<Item, THead>, ...Rebuild<TTail, SequencePairs[Item]>]
	: [];
