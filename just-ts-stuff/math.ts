import { Equal, Expect } from "type-testing";

type ToArray<TNum extends number, TArr extends any[] = [], MaxDepth = 50> = 
  TNum extends TArr["length"] 
    ? TArr
    : TArr["length"] extends MaxDepth
      ? never
      : ToArray<TNum, [...TArr, ":)"]>

type SubOne<TArr extends any[]> = TArr extends [infer THead, ...infer TTail] 
  ? TTail
  : []

type AddOne<TArr extends any[]> = [...TArr, ":)"];

type _Add<TArr extends any[], TCount extends any[]> = TCount extends [infer THead, ...infer TTail] 
  ? _Add<AddOne<TArr>, TTail>
  : TArr;

type _Sub<TArr extends any[], TCount extends any[]> = TCount extends [infer THead, ...infer TTail] 
  ? _Sub<SubOne<TArr>, TTail>
  : TArr

type Add<TNumA extends number, TNumB extends number> = _Add<ToArray<TNumA>, ToArray<TNumB>>["length"];
type Sub<TNumA extends number, TNumB extends number> = _Sub<ToArray<TNumA>, ToArray<TNumB>>["length"];

type TestAdd = Expect<Equal<Add<3, 5>, 8>>;
type TestSub = Expect<Equal<Sub<5, 3>, 2>>;