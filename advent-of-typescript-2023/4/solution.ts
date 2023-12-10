export type Address = { address: string; city: string };

export type PresentDeliveryList<TBehaviorList> = {
	[TKey in keyof TBehaviorList]: Address
}