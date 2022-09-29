import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  exports: [
    MatListModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
  ],
})
export class MaterialModule {}
