export type TicTacToeChip = "❌" | "⭕";
export type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
export type TicTacToeState = TicTacToeChip | TicTacToeEndState;
export type TicTacToeEmptyCell = "  ";
export type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
export type TicTacToeYPositions = "top" | "middle" | "bottom";
export type TicTacToeXPositions = "left" | "center" | "right";
export type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
export type TicTactToeBoard = TicTacToeCell[][];
export type TicTacToeGame = {
	board: TicTactToeBoard;
	state: TicTacToeState;
};

export type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

export type NewGame = {
	board: EmptyBoard;
	state: "❌";
};

type Every<TArr extends any[], TCheck> = TArr extends [infer THead, ...infer TTail]
	? THead extends TCheck
		? Every<TTail, TCheck>
		: false
	: true;

type Some<TArr extends any[], TCheck> = TArr extends [infer THead, ...infer TTail]
	? THead extends TCheck
		? true
		: Some<TTail, TCheck>
	: false;

type First<TArr extends any[], TValue, NotFound = never> = TArr extends [
	infer THead,
	...infer TTail,
]
	? THead extends TValue
		? THead
		: First<TTail, TValue, NotFound>
	: NotFound;

type NumberTypeSwitch<
	Value extends number,
	Type extends string | number = string,
> = Type extends string ? `${Value}` : Value;

// ------ Positions ------
type PositionMap = {
	top: 0;
	left: 0;
	middle: 1;
	center: 1;
	bottom: 2;
	right: 2;
};

type TranslatePosition<
	Position,
	Type extends string | number = string,
> = Position extends keyof PositionMap ? NumberTypeSwitch<PositionMap[Position], Type> : never;

// Validity Checks

type CheckOccupied<
	Board extends TicTactToeBoard,
	YPosition extends TicTacToeYPositions,
	XPosition extends TicTacToeXPositions,
> = Board[TranslatePosition<YPosition, number>][TranslatePosition<
	XPosition,
	number
>] extends TicTacToeChip
	? true
	: false;

type ValidMove<
	Game extends TicTacToeGame,
	Move extends TicTacToePositions,
> = Move extends `${infer YPosition}-${infer XPosition}`
	? Game["state"] extends TicTacToeChip
		? YPosition extends TicTacToeYPositions
			? XPosition extends TicTacToeXPositions
				? CheckOccupied<Game["board"], YPosition, XPosition> extends false
					? true
					: false
				: false
			: false
		: false
	: false;

// Board state

type AddMoveToLine<
	Line extends TicTacToeCell[],
	XPosition extends TicTacToeXPositions,
	State extends TicTacToeChip,
> = {
	[TKey in keyof Line]: TKey extends TranslatePosition<XPosition> ? State : Line[TKey];
};

type AddMoveToBoard<
	Board extends TicTactToeBoard,
	YPosition,
	XPosition,
	State extends TicTacToeChip,
> = YPosition extends TicTacToeYPositions
	? XPosition extends TicTacToeXPositions
		? {
				[TKey in keyof Board]: TKey extends TranslatePosition<YPosition>
					? AddMoveToLine<Board[TKey], XPosition, State>
					: Board[TKey];
			}
		: Board
	: Board;

type AddMove<
	Game extends TicTacToeGame,
	Move extends TicTacToePositions,
> = Move extends `${infer YPosition}-${infer XPosition}`
	? Game["state"] extends TicTacToeChip
		? AddMoveToBoard<Game["board"], YPosition, XPosition, Game["state"]>
		: Game["board"]
	: Game["board"];

type TestWinState<Items = TicTacToeCell[]> = Items extends [infer THead, ...infer TTail]
	? THead extends TicTacToeChip
		? `${THead} Won`
		: TestWinState<TTail>
	: " ";

type TestRow<Row extends TicTacToeCell[]> = Every<Row, Row[0]> extends true
	? Row[0] extends TicTacToeChip
		? `${Row[0]} Won`
		: " "
	: " ";

type GetColumn<Board extends TicTactToeBoard, Column extends keyof Board[0]> = [
	Board[0][Column],
	Board[1][Column],
	Board[2][Column],
];

type TestColumn<
	Board extends TicTactToeBoard,
	Column extends keyof Board[0],
	FirstCell = Board[0][Column],
> = Every<GetColumn<Board, Column>, FirstCell> extends true
	? FirstCell extends TicTacToeChip
		? `${FirstCell} Won`
		: " "
	: " ";

type TestXAxis<Board extends TicTactToeBoard> = First<
	[TestRow<Board[0]>, TestRow<Board[1]>, TestRow<Board[2]>],
	TicTacToeEndState,
	" "
>;

type TestYAxis<Board extends TicTactToeBoard> = First<
	[TestColumn<Board, 0>, TestColumn<Board, 1>, TestColumn<Board, 2>],
	TicTacToeEndState,
	" "
>;

type TestDiagonals<Board extends TicTactToeBoard> = TestWinState<[]>;

type IsFilled<Board extends TicTactToeBoard> = Every<
	[Every<Board[0], TicTacToeChip>, Every<Board[1], TicTacToeChip>, Every<Board[2], TicTacToeChip>],
	true
>;

type GetState<
	Game extends TicTacToeGame,
	XAxisResult = TestXAxis<Game["board"]>,
	YAxisResult = TestYAxis<Game["board"]>,
	DiagonalResult = TestDiagonals<Game["board"]>,
	WinResult = First<[XAxisResult, YAxisResult, DiagonalResult], TicTacToeEndState, " ">,
	IsFull = IsFilled<Game["board"]>,
	NextState = Game["state"] extends "❌" ? "⭕" : "❌",
> = Game["state"] extends TicTacToeEndState
	? Game["state"]
	: WinResult extends TicTacToeEndState
		? WinResult
		: IsFull extends false
			? NextState
			: "Draw";

type GetGameState<
	Game extends TicTacToeGame,
	Board extends TicTactToeBoard = Game["board"],
	State extends TicTacToeState = Game["state"],
> = {
	board: Board;
	state: State;
};

export type TicTacToe<
	Game extends TicTacToeGame,
	Move extends TicTacToePositions,
	IsValid extends boolean = ValidMove<Game, Move>,
	NextBoard extends TicTactToeBoard = AddMove<Game, Move>,
	NextState extends TicTacToeState = GetState<GetGameState<Game, NextBoard>>,
> = IsValid extends true ? GetGameState<Game, NextBoard, NextState> : Game;
