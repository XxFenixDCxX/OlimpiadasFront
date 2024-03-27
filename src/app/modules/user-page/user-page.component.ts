import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  options: String[] = ["2323", "2323", "22323"];
  isAuthenticated: boolean = false; // Variable para almacenar el estado de autenticación

  constructor(private auth: AuthService, private router: Router, private api:ApiService) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      if (!this.isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        this.api.getAllUsers().subscribe((data: any) => {
          console.log(data);
        });
      }
    });
  }
}
