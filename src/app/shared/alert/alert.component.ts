import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

interface ErrorDisplay {
  errorTitle: string,
  errorMessage: string
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() errors: ErrorDisplay;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.errors = data;
  }
}
