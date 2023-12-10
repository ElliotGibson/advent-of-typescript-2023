export type SantasList<
  TArrLeft extends readonly any[], 
  TArrRight extends readonly any[]
> = [...TArrLeft, ...TArrRight];