import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {ROLEConstant} from "../../constant/APIConstant";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  segment: string | undefined;
  token: string | null = null;
  username: string | null = null;
  roleType: string | null = null;
  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.segment = this.router.url;
    this.token = localStorage.getItem("token") as string;
    this.username = localStorage.getItem("username") as string;
    this.roleType = localStorage.getItem("roleType") as string;
    if (this.token ) {
      if(this.roleType == ROLEConstant.APPLICANT) {
        console.log("app")
        this.router.navigate(["/my-dashboard"]);
      } else {
        this.router.navigate(["/nav"]);
      }
    }
  }

  logout() {
    localStorage.removeItem("token");
  }

  showApplications() {
    this.router.navigate(["/my-dashboard/my-applications"]);
  }

}
