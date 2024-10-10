import {Component, OnInit} from '@angular/core';
import {RoleService} from "../../service/role.service";

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit{


  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.roleService.getRolesAndPermission().subscribe({
      next: (res: any) => {
        console.log('roles', res);
      }
    })
  }


}
