import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../service/user.service";
import {AddUserComponent} from "./add-user/add-user.component";

@Component({
  selector: 'app-user',
  standalone: true,
    imports: [
      MatTableModule, MatPaginatorModule
    ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit{
  displayedColumns: string[] = ['id', 'username', 'role', 'emailAddress', 'contactNumber'];
  dataList: Array<String> = new Array<String>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
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
    dialogRef.result.then(
      (res: any) => {
        this.fetchAllUser();
      })
  }

  fetchAllUser() {
    this.userService.getAll(true).subscribe({
      next: (res: any) => {
        this.dataList = res.body;
        this.dataSource.data = this.dataList;
      }
    })
  }
}
