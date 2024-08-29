import {Component, OnInit} from '@angular/core';
import {HomeComponent} from "../home/home.component";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {CommonModule, NgSwitchCase} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  segment: string | undefined;
  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.segment = this.router.url;
    console.log('segment', this.segment)
  }

}
