import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert: Subject<{ msg: string; type: string }>;
  constructor(private snackBar: MatSnackBar) {
    this.alert = new Subject();
    this.alert.subscribe({
      next: ({ msg, type }) => {
        this.openSnackBar(msg, type);
      },
    });
  }

  openSnackBar(message: string, type: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type,
    });
  }
}
