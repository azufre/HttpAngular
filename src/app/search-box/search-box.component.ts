import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, filter, debounceTime, tap, switchMap } from 'rxjs/operators';
import { SearchResult } from '../Model/search-result.model';
import { YoutubeSearchService } from '../Service/youtube.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YoutubeSearchService, private el: ElementRef) {

  }

  ngOnInit(): void {

    fromEvent(this.el.nativeElement, 'keyup')
    .pipe(map((e: any) => e.target.value))
    .pipe(filter((text: string) => text.length > 1))
    .pipe(debounceTime(250))
    .pipe(tap(() => this.loading.emit(true)))
    .pipe(map((query: string) => this.youtube.search(query)))
    .subscribe(
      (results: Observable<SearchResult[]>) => {
        this.loading.emit(false);
        results.subscribe(res => this.results.emit(res));        
      },
      (err: any) => {
        console.log(err);
        this.loading.emit(false);        
      },
      () => {
        this.loading.emit(false);  
      }
    );

  }

}
