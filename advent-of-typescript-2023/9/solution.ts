export type Reverse<TInput extends string, TOutput extends string = ""> = TInput extends `${infer THead}${infer TTail}` 
	? Reverse<TTail, `${THead}${TOutput}`>
	: TOutput