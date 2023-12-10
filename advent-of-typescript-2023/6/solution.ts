export type FilterChildrenBy<TType, TFilter> = TType extends TFilter 
  ? never 
  : TType;