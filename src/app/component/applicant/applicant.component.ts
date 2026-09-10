import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from "../../service/application.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {NoDataComponent} from "../../generic_component/no-data/no-data.component";

@Component({
  selector: 'app-applicant',
  standalone: true,
  imports: [
    MatTableModule, MatPaginatorModule, MatIcon, NgIf, NoDataComponent
  ],
  templateUrl: './applicant.component.html',
  styleUrl: './applicant.component.css'
})
export class ApplicantComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'emailAddress', 'contactNumber'];
  dataList: Array<String> = new Array<String>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private applicationService: ApplicationService
  ) {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchAllApplicant();
  }

  private fetchAllApplicant() {
    this.applicationService.getAllApplicantForRecruiterVacancies().subscribe({
      next: (res: any) => {
        this.dataList = res.body;
        this.dataSource.data = this.dataList;
        console.log("dataSourcedataSourcedataSourcedataSource", this.dataSource)
      }
    })
  }
}
