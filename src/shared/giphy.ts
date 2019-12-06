export class GiphyPagination {
  count: number;
  offset: number;
  total_count: number;
};

export class GiphyItem {
  constructor(
    public url: string,
    public title: string
  ) { }
}

export class Giphy {
  data: Array<any>;
  pagination: GiphyPagination;
};

