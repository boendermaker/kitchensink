import { Injectable, signal, WritableSignal } from '@angular/core';
import * as _ from 'lodash';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SortDirection } from '@angular/material/sort';
import { catchError, combineLatest, filter, map, merge, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { DatagridTableService } from './datagridtable.service';
import { EDatagridTableStateChangeEvents } from './interfaces/statechangetypes.enum';


export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

@Injectable()
export class TestDataService {

  datagridTableService: DatagridTableService;
  isLoadingResults: WritableSignal<boolean> = signal(false);
  dataLength: WritableSignal<number> = signal(0);

  constructor(
    private httpClient: HttpClient
  ) {
  }

//###########################

init(tableService: DatagridTableService): void {
  this.datagridTableService = tableService;
  this.handleDataChange();
}

//###########################

  getData(
    sort: string,
    order: SortDirection,
    page: number,
    pageSize: number,
    query = ''
  ): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=${encodeURIComponent(
      query + ' ' + 'repo:angular/components'
    )}&sort=${sort}&order=${order}&page=${page + 1}&per_page=${pageSize}`;

    return this.httpClient.get<GithubApi>(requestUrl);
  }

//###########################

  handleDataChange() {

    this.datagridTableService.stateChange_.pipe(
      tap(() => this.datagridTableService.setShowMessageOverlay(false)),
        filter((event) => event === EDatagridTableStateChangeEvents.CHANGE_PAGE),
        startWith({}),
        switchMap(() => {
          this.datagridTableService.setLoading(true);
          return this.getData(
            this.datagridTableService.state.sort.active,
            this.datagridTableService.state.sort.direction,
            this.datagridTableService.state.$pageIndex(),
            this.datagridTableService.state.$pageSize()
        ).pipe(
          catchError((errorResponse: HttpErrorResponse) => {
            console.error('Error fetching data:', errorResponse.error.message);
            this.datagridTableService.setLoading(false);

            this.datagridTableService.clearMessages();
            this.datagridTableService.addMessage('error', `Verbindungsfehler: ${errorResponse.error.message}`);
            setTimeout(() => {
              this.datagridTableService.addMessage('warning', `Handkäse ist illegal`);
            }, 5000);
            this.datagridTableService.setShowMessageOverlay(true);

            this.datagridTableService.setPageIndex(0);
            return of({ items: [], total_count: 0 }); // Return a default value
          }),
          map((data) => {
            console.log(data)
            return data
          }),
        )
      })
    ).subscribe({
      next: (data: GithubApi) => {
        this.datagridTableService.setDataSource(data.items);
        this.datagridTableService.setTotalRows(data.total_count);
        this.datagridTableService.setLoading(false);
      },
      error: (error) => {

      },
    })

  }

//###########################<


}
