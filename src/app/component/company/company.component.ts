import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from "../../service/company.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {DatePipe, NgIf} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {ROLEConstant} from "../../constant/APIConstant";
import {CompanyModel} from "../../model/company.model";


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
    MatCard,
    MatIcon,
    MatDivider,
    NgIf
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'createdBy', 'created', 'address'];
  dataList: Array<CompanyModel> = new Array<CompanyModel>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  isViewNeeded: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private companyService: CompanyService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchData();
    this.isViewNeeded = localStorage.getItem("roleType") as string == ROLEConstant.RECRUITER;
  }

  fetchData() {
    this.companyService.getAllCompanies().subscribe({
      next: (res: any) => {
        this.dataList = res.body;
        this.dataSource.data = this.dataList;
      }
    })
  }

  openForm() {}

  //to edit company data by recruiter
}
