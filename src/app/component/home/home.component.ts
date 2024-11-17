import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SectorService} from "../../service/sector.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  sectors : Array<any> = [];

  constructor(
    private sectorService: SectorService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.fetchSectors();
  }

  fetchSectors() {
    this.sectorService.getAll(false).subscribe({
      next : (res: any) => {
        this.sectors = res.body;
      }
    })
  }

  openDetail(id: any) {
    id = 1;
    this.router.navigate([`/home/page/${id}`]);
  }
}
