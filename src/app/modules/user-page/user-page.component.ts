import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  options: String[] = ["2323", "2323", "22323"]

  constructor() { }

  ngOnInit() { }

}
