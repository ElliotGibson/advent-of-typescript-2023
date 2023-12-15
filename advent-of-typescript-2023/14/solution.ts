export type DecipherNaughtyList<NaughtyList extends string> = NaughtyList extends `${infer NaughtyItem}/${infer Rest}` 
	? NaughtyItem | DecipherNaughtyList<Rest>
	: NaughtyList