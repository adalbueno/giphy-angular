import { Component, OnInit, Input } from '@angular/core';
import { Search } from '../../shared/search';
import { GiphyItem, GiphyPagination } from '../../shared/giphy';
import { GiphyService } from '../services/giphy.service';
import { SWEAR_WORDS } from '../../shared/mock/swear-words';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.scss']
})
export class GiphyComponent implements OnInit {

  search: Search = { term: '' };
  list: GiphyItem[];
  pagination: GiphyPagination;

  currentPage: number = 1;
  totalPages: number = 0;
  firstPage: number = 1;
  lastPage: number;
  paginationPages: number[] = [];

  lastSearchTerm: string = '';

  hasSwearWords: Boolean = false;

  constructor(private giphyService: GiphyService) { }

  ngOnInit() {
  }

  onSearchFormSubmit(search: Search): void {
    this.lastSearchTerm = search.term;

    this.hasSwearWords = false;

    if (this.checkSwearWord(search.term)) {
      this.hasSwearWords = true;
      return;
    }

    this.getGiphyResults(search.term);
  }

  checkSwearWord(term: string) {
    return !!SWEAR_WORDS.filter(word => word === term).length;
  }

  getGiphyResults(term: string, page: number = 1) {
    this.giphyService.get(term, page)
      .subscribe(response => {
        this.list = response.data.map(item => new GiphyItem(
          item.images.original.url,
          item.title
        ));

        this.pagination = response.pagination;

        this.updatePagination();
      });
  }

  getPage(page: number) {
    this.getGiphyResults(this.lastSearchTerm, page);
  }

  updatePagination() {
    const pageSize = this.giphyService.pageSize;

    this.totalPages = Math.ceil(this.pagination.total_count / pageSize);
    this.currentPage = (this.pagination.offset / pageSize) + 1;
    this.paginationPages = this.getPaginationPages();
    this.lastPage = this.paginationPages[this.paginationPages.length - 1];
  }

  getPaginationPages(): number[] {
    if (!this.totalPages) { return [1]; }

    const MAX_PAGES = 10;
    const SETTINGS = {
      length: this.totalPages,
    };
    const mapPages = (page: number, index: number) => page = index + 1;
    const allPages = Array.from(SETTINGS, mapPages);
    const currentPageIndex = allPages.findIndex(page => page === this.currentPage);

    let initialIndex;
    let endIndex;
    const min = MAX_PAGES / 2;
    const max = allPages.length - (MAX_PAGES / 2);

    if (currentPageIndex < min) {
      initialIndex = 0;
      endIndex = MAX_PAGES;
    } else if (currentPageIndex > max || currentPageIndex === -1) {
      endIndex = allPages.length;
      initialIndex = endIndex - MAX_PAGES;
    } else {
      initialIndex = currentPageIndex - Math.floor((MAX_PAGES / 2));
      endIndex = initialIndex + MAX_PAGES;
    }

    return allPages.slice(initialIndex, endIndex);
  }
}
