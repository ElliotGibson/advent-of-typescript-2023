type Letters = {
	A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
	B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
	C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
	E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
	H: ["█ █ ", "█▀█ ", "▀ ▀ "];
	I: ["█ ", "█ ", "▀ "];
	M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
	N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
	P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
	R: ["█▀█ ", "██▀ ", "▀ ▀ "];
	S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
	T: ["▀█▀ ", "░█ ░", "░▀ ░"];
	Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
	W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
	" ": ["░", "░", "░"];
	":": ["#", "░", "#"];
	"*": ["░", "#", "░"];
};

type Line = {
	0: string;
	1: string;
	2: string;
};

type AddLetter<TLine extends Line, TLetter extends string> = TLetter extends keyof Letters
	? {
			0: `${TLine[0]}${Letters[TLetter][0]}`;
			1: `${TLine[1]}${Letters[TLetter][1]}`;
			2: `${TLine[2]}${Letters[TLetter][2]}`;
		}
	: TLine;

type TransformLine<
	TLine,
	TOutput extends Line = {
		0: "";
		1: "";
		2: "";
	},
> = TLine extends `${infer THead}${infer TTail}`
	? THead extends keyof Letters
		? TransformLine<TTail, AddLetter<TOutput, THead>>
		: [TOutput[0], TOutput[1], TOutput[2]]
	: [TOutput[0], TOutput[1], TOutput[2]];

type Transform<TLines, TResult extends any[] = []> = TLines extends [infer THead, ...infer TTail]
	? Transform<TTail, [...TResult, ...TransformLine<THead>]>
	: TResult;

type Lines<
	TInput,
	TResult extends any[] = [],
	TLine extends string = "",
> = TInput extends `${infer THead}${infer TTail}`
	? THead extends `\n`
		? Lines<TTail, [...TResult, TLine]>
		: Lines<TTail, TResult, `${TLine}${THead}`>
	: [...TResult, TLine];

export type ToAsciiArt<TInput extends string> = Transform<Lines<Uppercase<TInput>>>;
