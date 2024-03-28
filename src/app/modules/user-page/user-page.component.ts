import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/services/api.service';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { NavbarComponent } from 'src/app/components';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  options: String[] = ["2323", "2323", "22323"];
  isAuthenticated: boolean = false;
  isPurchasePeriod: boolean = true;

  constructor(private auth: AuthService, private router: Router, private api:ApiService, private navbar: NavbarComponent) {

  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      if (!this.isAuthenticated) {
        //this.router.navigate(['/home']);
        //toDoEliminar el desactivar navbar aqui
        this.navbar.showNavbar = false;
      } else {
        this.navbar.showNavbar = false;
        var exist = false;
        this.api.getAllUsers().pipe(
          catchError(error => {
            if (error.status === 404) {
              this.auth.user$.subscribe(user => {
                this.api.createUser({sub: user?.sub, email: user?.email, username: user?.nickname}).subscribe();
              });
              return of([]);
            } else {
              return throwError(error);
            }
          })
        ).subscribe((data) => {
          this.auth.user$.subscribe(user => {
            var sub = user?.sub;
            data.forEach(element => {
              if(element.sub == sub) {
                exist = true;
              }
            });
            if(!exist) {
              this.api.createUser({sub: user?.sub, email: user?.email, username: user?.nickname}).subscribe();
            }
          });
        });
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
