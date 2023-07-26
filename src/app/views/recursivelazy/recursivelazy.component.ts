import { Component, OnInit } from '@angular/core';
import { ITreeData, INodeData } from './interface';
import { rndID } from '@app/shared/util/rndid'
import { RecursiveLazyDataService } from './recursivelazy-data.service';

@Component({
  selector: 'app-recursive-lazy',
  templateUrl: './recursivelazy.component.html',
  styleUrls: ['./recursivelazy.component.scss']
})

export class RecursiveLazyComponent implements OnInit {

  constructor(
    public recursiveLazyDataService: RecursiveLazyDataService
  ) {
  }

  //###################################################

  ngOnInit(): void {
    this.recursiveLazyDataService.renderNavigation();
  }

  //###################################################

}
