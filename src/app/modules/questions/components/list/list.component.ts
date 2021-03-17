import { Component, Inject, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { ApiService } from '@core/api.service';
import { QuestionResponse, Question, Answer } from '@shared/models/question';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  activeTableLevel = 'junior';
  questions: Question[] = [];
  activeTableQuestions: Question[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getQuestions();
  }
  getQuestions(): void {
    this.apiService.get(`${environment.baseURL}/questions`).subscribe((res: QuestionResponse) => {
      this.questions = res.questions;
      this.filterList(this.activeTableLevel);
      console.log(this.questions);
    });
  }

  /**
   * For filtering answers array
   * To help the table show correct answer at first TD
   * @param Answer[] answers
   * @param boolean [type=false]
   * @returns Answer[]
   */
  getAnswer(answers: Answer[], type: number = 0): Answer[] {
    return answers.filter((a) => +a.accepted === type);
  }

  deleteQuestion(questionId: string): void {
    this.apiService
      .delete(`${environment.baseURL}/questions/${questionId}`)
      .subscribe({ next: () => this.getQuestions() });
  }

  filterList(level: string): void {
    this.activeTableLevel = level;
    this.activeTableQuestions = this.questions.filter((q) => q.level === level);
  }

  // Dialog
  openDialog(questionId: string): void {
    console.log(questionId);
    const dialogRef = this.dialog.open(AppDialogComponent, {
      width: '260px',
      data: questionId,
    });

    dialogRef.afterClosed().subscribe({
      next: (id: string) => {
        console.log(`Dialog id: ${id}`);
        if (id) {
          this.deleteQuestion(id);
        }
      },
    });
  }
}

@Component({
  selector: 'app-dialog-content-example-dialog',
  template: `<div mat-dialog-content>
      <h2>Are you sure you want to delete this question?</h2>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [matDialogClose]="questionId" cdkFocusInitial>Ok</button>
    </div>`,
})
export class AppDialogComponent {
  constructor(public dialogRef: MatDialogRef<AppDialogComponent>, @Inject(MAT_DIALOG_DATA) public questionId: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
