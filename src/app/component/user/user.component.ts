import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../service/user.service";
import {AddUserComponent} from "./add-user/add-user.component";
import {ROLEConstant} from "../../constant/APIConstant";
import {UserModel} from "../../model/user.model";
import {NgIf} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-user',
  standalone: true,
    imports: [
        MatTableModule, MatPaginatorModule, NgIf, MatMenu, MatMenuItem, MatMenuModule
    ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit{
  displayedColumns: string[] = ['id', 'username', 'role', 'emailAddress', 'contactNumber'];
  dataList: Array<UserModel> = new Array<UserModel>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  hasHrOrDirector = {
    hasHr: false,
    hasDirector: false
  };
  roleType = localStorage.getItem("roleType");
  protected readonly ROLEConstant = ROLEConstant;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private modalService: NgbModal,
    private userService: UserService,) {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.fetchAllUser();
  }

  openForm() {
    const dialogRef = this.modalService.open(AddUserComponent,);
    dialogRef.componentInstance.hasHrOrDirector = this.hasHrOrDirector;
    dialogRef.result.then(
      (res: any) => {
        //to refresh again
        this.fetchAllUser();
      }).catch(() => {
      // dismissed/closed without saving
    });
  }

  fetchAllUser() {
    this.userService.getAll(true).subscribe({
      next: (res: any) => {
        this.dataList = res.body;
        this.dataSource.data = this.dataList;

        if (this.roleType == ROLEConstant.RECRUITER
          && this.dataList.length > 0) {
          this.filterRoleForRecruiter();
        }

        if(this.roleType == ROLEConstant.RECRUITER || this.roleType == ROLEConstant.ADMIN) {
          this.displayedColumns.push('action');
        }
      }
    })
  }

  filterRoleForRecruiter() {
    this.hasHrOrDirector = {
      hasHr: this.dataList.some(f => f.role === ROLEConstant.HR),
      hasDirector: this.dataList.some(f => f.role === ROLEConstant.DIRECTOR)
    };
  }

  performAction(item: any, action: string) {
    switch (action) {
      case 'Edit' : {
        // open add user form and patch data
        break;
      }

      case 'Delete' : {
        //this is possible, only business logic will solve this.
        break;
      }
    }
  }
}
