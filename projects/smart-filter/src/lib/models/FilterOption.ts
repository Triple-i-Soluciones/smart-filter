export class FilterOption {
    public constructor(init?: Partial<FilterOption>) {
      Object.assign(this, init);
    }
    _id: string = '';
    displayName: string = '';
  }