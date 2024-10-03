import {Component, OnInit} from '@angular/core';
import {HomeComponent} from "../home/home.component";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {CommonModule, NgSwitchCase} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  segment: string | undefined;
  token: string | null = null;
  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.segment = this.router.url;
    this.token = localStorage.getItem("token") as string;
    if (this.token) {
      this.router.navigate(["/nav"]);
    }
  }

  logout() {
    localStorage.removeItem("token");
  }

}
