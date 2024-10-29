import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CompanyService } from "../../service/company.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    DatePipe
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'createdBy', 'created', 'address'];
  dataList: Array<String> = new Array<String>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private companyService: CompanyService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.companyService.getAllCompanies().subscribe({
      next: (res: any) => {
        this.dataList = res.body;
        this.dataSource.data = this.dataList;
      }
    })
  }
}
