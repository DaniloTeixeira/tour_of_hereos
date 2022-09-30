import { Component, Inject } from '@angular/core';
import { DialogContent } from '../../models/DialogContent';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogContent) {}
}
