export interface FullListState {
  list: ItemType[],
}

export interface ItemType {
  id: string,
}

export interface FullListResponse {
  count: number,
  list: ItemType[],
}
