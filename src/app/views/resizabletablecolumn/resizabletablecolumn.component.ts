import { Component, inject } from '@angular/core';
import { UserDataService } from '@app/services/user.data.service';
import { IUser } from '@app/services/user.repository.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-resizabletablecolumn',
  templateUrl: './resizabletablecolumn.component.html',
  styleUrls: ['./resizabletablecolumn.component.scss'],
  providers: [UserDataService]
})
export class ResizabletablecolumnComponent {

  userDataService = inject(UserDataService);
  displayedColumns: string[] = ['firstname', 'lastname', 'city', 'country', 'actions'];
  dataSource: IUser[] = [];
  tableColumnElements: HTMLElement[] = []

  constructor() {

  }

  ngOnInit(): void {
    this.userDataService.getRandomUsers(10);
    this.handleDataSource();
  }

  resizeTablecolumn(e) {
    e.el.style.width = e.resizedTo + 'px';
  }

  setTableColumnElements(e): void {
    this.tableColumnElements.push(e);
  }

  saveTableColumnWidth(): void {
    localStorage.setItem(`tablecolumnresize-${this.constructor.name}`, JSON.stringify(this.tableColumnElements));
  }

  loadTableColumnWidth(): void {
    const elements = <HTMLElement>JSON.parse(localStorage.getItem(`tablecolumnresize-${this.constructor.name}`));
    console.log(elements[0])
  }

  handleDataSource(): void {
    this.userDataService.userState_.pipe(untilDestroyed(this)).subscribe({
      next: (users: IUser[]) => {
        this.dataSource = users;
      }
    })
  }


}