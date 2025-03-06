import { Component } from '@angular/core';
import * as _ from 'lodash';
import { CodeviewerModule } from "../../components/codeviewer/codeviewer.module";

@Component({
  selector: 'app-automigrations',
  standalone: true,
  imports: [CodeviewerModule],
  templateUrl: './automigrations.component.html',
  styleUrl: './automigrations.component.scss'
})
export class AutomigrationsComponent {

  result: string;

  constructor() { 

  }

  ngOnInit() {
    this.test();
  }

  test(): void {

    class NestedTestA {
      nested1: string;

      constructor() {
        this.nested1 = 'nested1';
      }
    }

    class NestedTestB {
      nested2: string;

      constructor() {
        this.nested2 = 'nested2';
      }
    }

    class NestedTestC {
      nested3: string;

      constructor() {
        this.nested3 = 'nested3';
      }
    }

    class ModelA {
      id: string;
      name: string;
      age: number;
      nestedTest: NestedTestA;

      constructor() {
        this.id = 'undefined';
        this.name = 'undefined';
        this.age = 47;
        this.nestedTest = new NestedTestA();
      }
    }

    class ModelB {
      id: string;
      name: string;
      age: number;
      firstname: string;
      lastname: string;
      disabled: NestedTestB

      constructor() {
        this.id = 'undefined';
        this.name = 'undefined';
        this.age = 47;
        this.firstname = 'undefined';
        this.lastname = 'undefined';
        this.disabled = new NestedTestB();
      }
    }

    class ModelC {
      id: string;
      name: string;
      age: number;
      firstname: string;
      lastname: string;
      behindert: NestedTestC;

      constructor() {
        this.id = 'undefined';
        this.name = 'undefined';
        this.age = 47;
        this.firstname = 'undefined';
        this.lastname = 'undefined';
        this.behindert = new NestedTestC();
      }
    }

    const exampleData = {
      id: 'fw124323',
      name: 'Mustermann',
      age: 47,
      firstname: 'Max',
      lastname: 'Mustermann',
      disabled: new NestedTestB()
    }

    const modelTracker = [
      {id: 1, version: 1, model: new ModelA()},
      {id: 2, version: 2, model: new ModelB()},
      {id: 3, version: 3, model: new ModelC()},
    ]

  const getAllKeys = (obj: any, prefix = ''): string[] => {
      return Object.keys(obj).reduce((res, el) => {
        const key = prefix ? `${prefix}.${el}` : el;
        if (typeof obj[el] === 'object' && obj[el] !== null) {
          res.push(...getAllKeys(obj[el], key));
        } else {
          res.push(key);
        }
        return res;
      }, []);
    }

    const deepCompareKeys = (obj1: any, obj2: any): boolean => {
      const keys1 = getAllKeys(obj1);
      const keys2 = getAllKeys(obj2);
      return _.isEqual(keys1, keys2);
    }

    modelTracker.forEach((model) => {
      if (deepCompareKeys(model.model, exampleData)) {
        this.result = `Model with Version ${model.version} is your model`;
      }
    })

  }


}