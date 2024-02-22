import { ChangeDetectionStrategy, Component, DoCheck } from '@angular/core';
import { UserlistComponent } from '../userlist/userlist.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserlistComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements DoCheck{


  ngDoCheck(): void {
    console.log("User  called for check ")
  }

  userlist = [
    { name:'mack', age :34, email:'mack@gmail.com'},
    { name:'john', age :27, email:'john@gmail.com'},
    { name:'alex', age :23, email:'alex@gmail.com'}
   ]
}
