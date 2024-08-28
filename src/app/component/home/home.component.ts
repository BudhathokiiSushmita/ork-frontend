import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  sectors = ['Tech', 'Food', 'Automobiles', 'Animal', 'Security', 'Health', 'Cosmetic', 'Clothing', 'Medicine']

  ngOnInit(): void {
    console.log('sectors', this.sectors)
  }

}
