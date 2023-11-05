import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dragdroptabs',
  templateUrl: './dragdroptabs.component.html',
  styleUrls: ['./dragdroptabs.component.scss']
})
export class DragdroptabsComponent implements OnInit {

  tabs = new Array(15).fill(0).map((_, index) => ({Name: { Value: `Tab ${index}` } }));

  constructor() {

  }

  ngOnInit(): void {
    console.log();
  }

  dropTab(event: CdkDragDrop<string[]>) {
    const previousIndex = parseInt(event.previousContainer.id.replace("list-",""));
    const currentIndex = parseInt(event.container.id.replace("list-",""));
    
    if(!Number.isNaN(previousIndex) && !Number.isNaN(currentIndex) && previousIndex != undefined && currentIndex != undefined && previousIndex != currentIndex){
      moveItemInArray(this.tabs, previousIndex, currentIndex);
    }

  }

  getTabConnections(index): any[]{
    const connections: string[] = [];
    
    for(let i=0; i < this.tabs.length; i++){
      if(i != index) {
        connections.push("list-"+i);
      }
    }

    return connections;
  }

}
