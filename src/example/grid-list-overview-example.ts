import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'grid-list-overview-example',
  styleUrls: ['grid-list-overview-example.css'],
  templateUrl: 'grid-list-overview-example.html',
  standalone: true,
  imports: [
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
  ],
})
export class GridListOverviewExample {
  constructor(private http: HttpClient) {}

  selectedYearValue: string;
  interestRate: string;
  loanAmount: string;

  years: any[] = [
    { value: '10', viewValue: '10 Years' },
    { value: '20', viewValue: '20 Years' },
    { value: '30', viewValue: '30 Years' },
  ];

  Calculate = () => {
    this.http
      .get<any>(
        'https://mortagagecalculator.azurewebsites.net/api/GetMonthlyPayment?years=30&rate=5&principal=400000'
      )
      .subscribe((data) => {
        console.log(data);
      });
  };
}
