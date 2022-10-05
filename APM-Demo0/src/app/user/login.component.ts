import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<any>
    ) { }

  ngOnInit(): void {
    // Get the username from the store
    this.store.select('users').subscribe(
      users => this.maskUserName = users.maskUserName
    );
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    // this.maskUserName = !this.maskUserName;
    /* dispatch an action */
    this.store.dispatch(
      { type: '[User] Toggle Mask Username' }
    );

  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
