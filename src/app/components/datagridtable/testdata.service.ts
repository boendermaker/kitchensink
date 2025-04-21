import { Injectable, signal, WritableSignal } from '@angular/core';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { SortDirection } from '@angular/material/sort';
import { catchError, combineLatest, map, merge, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { DatagridTableService } from './datagridtable.service';


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
        startWith({}),
        switchMap(() => {
          this.datagridTableService.setLoading(true);
          return this.getData(
            this.datagridTableService.state.sort.active,
            this.datagridTableService.state.sort.direction,
            this.datagridTableService.state.$pageIndex(),
            this.datagridTableService.state.$pageSize()
        ).pipe(
          map((data) => {
            console.log(data)
            return data
          }),
        )
      })
    ).subscribe({
      next: (data: GithubApi) => {
        this.datagridTableService.state.dataSource.data = data.items;
        this.datagridTableService.setDataLength(data.total_count);
        this.datagridTableService.setLoading(false);
      }
    })

  }

//###########################


}
