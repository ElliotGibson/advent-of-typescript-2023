export type StreetSuffixTester<TString, TSuffix extends string> = TString extends `${infer THead}${TSuffix}` 
  ? true 
  : false;