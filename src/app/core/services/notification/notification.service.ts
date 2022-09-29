import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private matSnackBar: MatSnackBar) {}

  error(msg: string): void {
    this.matSnackBar.open(`${msg}`, 'ENTENDI', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snack-error'],
    });
  }

  success(msg: string): void {
    this.matSnackBar.open(`${msg}`, 'OK', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snack-success'],
    });
  }
}
