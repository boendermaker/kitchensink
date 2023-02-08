import { Component } from '@angular/core';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss']
})
export class TreeviewComponent {

  readonly items: any[] = [
    'Hello',
    [
      'here', 
      'is', 
      [
        'some', 'structured'
      ], 
      'Data'
    ],
    'Bye'
  ];

  readonly stringifyService = (service: any) => `${service.title} ($ ${service.price})`;

  
}
