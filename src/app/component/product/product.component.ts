import { ChangeDetectionStrategy, Component, DoCheck, OnInit } from '@angular/core';
import { ProductlistComponent } from '../productlist/productlist.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductlistComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements DoCheck   {


  ngDoCheck(): void {
     console.log("product called for check ")
  }



  productlist = [
    { name:'nokia', price:2500},
    { name:'ihone13', age :890000},
    { name:'moto', age :23000}
   ]




}
