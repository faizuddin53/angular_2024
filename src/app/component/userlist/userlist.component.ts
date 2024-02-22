import { ChangeDetectionStrategy, Component, DoCheck, inject, input, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserlistComponent implements DoCheck, OnInit {



  counterservice = inject(CounterService)
  ngDoCheck(): void {
    console.log("User list  called for check ")
  }

   userlist = input<any>('userlist');



   ngOnInit(): void {
     setTimeout(() => {
      this.counterservice.increaseCounter();
     }, 8000);
   }


}
