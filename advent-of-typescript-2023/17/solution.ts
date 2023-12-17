type RPS = '👊🏻' | '🖐🏾' | '✌🏽';

type WinConditionLookup<POpChoice extends RPS> = {
	'👊🏻': POpChoice extends '🖐🏾' ? "lose" : "win"
	'🖐🏾': POpChoice extends '✌🏽' ? "lose" : "win"
	'✌🏽': POpChoice extends '👊🏻' ? "lose" : "win"
}

export type WhoWins<
	POpChoice extends RPS, 
	PChoice extends RPS
> = POpChoice extends PChoice 
	? "draw"
	: WinConditionLookup<POpChoice>[PChoice]