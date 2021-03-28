import { Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Question, Answer } from '@shared/models/question';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { selectQuestionsState } from '@store/questions/questions.selectors';
import * as QuestionsActions from '@store/questions/questions.actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  activeTableLevel = 'junior';
  questions: Question[] = [];
  activeTableQuestions: Question[] = [];
  destroyed$ = new Subject<boolean>();

  constructor(private dialog: MatDialog, private store: Store<Question>, private actions$: Actions) {
    this.actions$
      .pipe(ofType(QuestionsActions.deleteQuestionSuccess), takeUntil(this.destroyed$))
      .subscribe({ next: () => this.getQuestions() });
  }

  ngOnInit(): void {
    this.getQuestions();
    this.store.select(selectQuestionsState).subscribe({
      next: (questions: Question[]) => {
        this.questions = questions;
        this.filterList(this.activeTableLevel);
      },
    });
  }
  getQuestions(): void {
    this.store.dispatch(QuestionsActions.getQuestions());
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
    this.store.dispatch(QuestionsActions.deleteQuestion({ questionId }));
  }

  filterList(level: string): void {
    this.activeTableLevel = level;
    this.activeTableQuestions = this.questions.filter((q) => q.level === level && q.category === 'JavaScript');
  }

  // Dialog
  openDialog(questionId: string): void {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      width: '260px',
      data: questionId,
    });

    dialogRef.afterClosed().subscribe({
      next: (id: string) => {
        if (id) {
          this.deleteQuestion(id);
        }
      },
    });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
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
