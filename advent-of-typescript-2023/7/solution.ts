export type MapKey<TKey, TPrefix extends string> = TKey extends string 
  ? `${TPrefix}_${TKey}` 
  : never;

export type AppendGood<TBehaviorList> = {
	[TKey in keyof TBehaviorList as MapKey<TKey, "good">
  ] : TBehaviorList[TKey]
};