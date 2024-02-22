import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  _counter = signal<number>(0);

  counter = this._counter.asReadonly();


  increaseCounter(){
       this._counter.update((item: number) => item = item+1 )
  }


  decreaseCounter(){
       this._counter.update((item: number) => item = item-1 )
  }

  constructor() {

   }
}
