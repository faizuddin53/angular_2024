import { ChangeDetectionStrategy, Component, DoCheck, inject, input, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductlistComponent implements DoCheck  {


  counterservice = inject(CounterService);

  counter = this.counterservice.counter;
  ngDoCheck(): void {
    console.log("product list  called for check ")
  }
  productlist = input<any>('productlist');



 productcalled(){

 }
}
