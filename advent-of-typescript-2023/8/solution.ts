export type ExcludeKey<TKey, TPrefix extends string> = TKey extends `${TPrefix}_${infer TTail}` ? never : TKey;

export type RemoveNaughtyChildren<TSantasList> = {
	[TKey in keyof TSantasList as ExcludeKey<TKey, "naughty">] : TSantasList[TKey]
}