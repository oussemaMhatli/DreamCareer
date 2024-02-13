import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchEventService {
  searchInputChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
  updateSearchInput(searchInput: string) {
    this.searchInputChange.emit(searchInput);
    console.log(" hedhy service",searchInput)
  }
}
