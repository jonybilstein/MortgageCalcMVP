import { Component, booleanAttribute } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'mortgage-calc',
  styleUrls: ['mortgage-calc.css'],
  templateUrl: 'mortgage-calc.html',
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
export class MortgageLoanCalculator {
  constructor(private http: HttpClient) {}

  selectedYearValue: string;
  interestRate: string;
  loanAmount: string;

  monthlyPaymentMessage: string = '';

  years: any[] = [
    { value: '10', viewValue: '10 Years' },
    { value: '20', viewValue: '20 Years' },
    { value: '30', viewValue: '30 Years' },
  ];

  Calculate = () => {
     
    this.monthlyPaymentMessage = "";
    let lowerBounds: Boolean = false;
    let upperBounds: Boolean = false;

    
    if (Number(this.loanAmount) > 0 && Number(this.interestRate) > 0 && Number(this.selectedYearValue) > 0 ) 
    {
      lowerBounds = true;
    }

    if (Number(this.loanAmount) <= 100000000000 && Number(this.interestRate) <= 1000 && Number(this.selectedYearValue) <= 30 ) 
    {
      upperBounds = true;
    }

    if (lowerBounds && upperBounds)
    {
      this.http
      .get<any>(
        `https://mortagagecalculator.azurewebsites.net/api/GetMonthlyPayment?years=${this.selectedYearValue}&rate=${this.interestRate}&principal=${this.loanAmount}`
      )
      .subscribe((data) => {
        var monthlyprice = data.monthlyPayment.toFixed(2);
        this.monthlyPaymentMessage = "Your Payment will be " + monthlyprice;
        
        
      });
    }
      
  };
}
