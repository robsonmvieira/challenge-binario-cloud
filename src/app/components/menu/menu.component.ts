import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Select(AuthState.isLogged)
  userAuthenticated: Observable<boolean>
  constructor() { }

  ngOnInit(): void {  }

}
