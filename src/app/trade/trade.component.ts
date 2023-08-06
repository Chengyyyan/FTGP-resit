import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TradeComponent {}
  
