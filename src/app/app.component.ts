import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { UserComponent } from './component/user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements DoCheck{



  ngDoCheck(): void {
    console.log("APP  called for check ")
  }
  title = 'v_17';
}
