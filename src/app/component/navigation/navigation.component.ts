import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../service/navigation.service";
import {Router, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {RoleService} from "../../service/role.service";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{

  items: Array<any> = new Array<any>();
  showFiller = false;
  constructor(
    private roleService: RoleService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    this.roleService.getAllNavPermissionByRole().subscribe({
      next : (res: any) => {
        this.items = res.body;
        console.log("items", this.items);
      }
    })
  }

  redirect(name: any) {
    name = name.toLowerCase();
    this.router.navigate([`/nav/${name}`]);
  }
}
