import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StateBaseService } from "./state.base.class";

interface IDemo {
  id: number;
  label: string;
}

interface IDemoState {
  demos: IDemo[];
  selectedDemoId: number;
}

const initialState: IDemoState = {
  demos: [],
  selectedDemoId: undefined
};

@Injectable({
  providedIn: 'root'
})
export class DemoStateService extends StateBaseService<IDemoState>{
  demos_: Observable<IDemo[]> = this.select(state => state.demos);

  selectedTodo$: Observable<IDemo> = this.select((state) => {
    return state.demos.find((item) => item.id === state.selectedDemoId);
  });

  constructor() {
    super(initialState);
  }

  addDemo(demo: IDemo) {
    this.setState({demos: [...this.state.demos, demo]})
  }

  selectDemo(demo: IDemo) {
    this.setState({ selectedDemoId: demo.id });
  }
}
