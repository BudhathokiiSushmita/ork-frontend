import {Component, OnInit} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatStepperModule,
    MatInputModule,
    CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  adminSteps = ["Applicant (Create Recruiters)", "Sector"];
  recruiterSteps = ["Register Company", "Create vacancies based on sector", "Create HR & Director"];

  ngOnInit(): void {
  }

}
