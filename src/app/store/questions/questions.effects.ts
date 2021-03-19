import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, mergeMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { Question } from '@shared/models/question';

import { environment } from '@env/environment';
import { ApiService } from '@core/api.service';

import * as QuestionsActions from './questions.actions';
import { AlertService } from '@shared/alert.service';

@Injectable()
export class QuestionsEffects {
  addQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.addQuestion),
      concatMap((payload: Question & { type: string }) =>
        this.apiService.post(`${environment.baseURL}/questions`, payload).pipe(
          map(() => {
            this.alertService.alert.next({ msg: 'Added Successfuly', type: 'success' });
            return QuestionsActions.addQuestionSuccess();
          }),
          catchError((error) => {
            this.alertService.alert.next({ msg: 'There is something wrong', type: 'failed' });
            return of(QuestionsActions.addQuestionFailure());
          })
        )
      )
    );
  });

  deleteQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.deleteQuestion),
      concatMap((payload) =>
        this.apiService.delete(`${environment.baseURL}/questions/${payload.questionId}`).pipe(
          map(() => {
            this.alertService.alert.next({ msg: 'Deleted Successfuly', type: 'success' });
            return QuestionsActions.deleteQuestionSuccess();
          }),
          catchError((error) => {
            this.alertService.alert.next({ msg: 'There is something wrong', type: 'failed' });
            return of(QuestionsActions.deleteQuestionFailure());
          })
        )
      )
    );
  });

  getQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.getQuestions),
      concatMap((params) => {
        console.log('id ', params.questionId);
        return this.apiService
          .get(`${environment.baseURL}/questions${params.questionId ? `/${params.questionId}` : ''}`)
          .pipe(
            map((payload: { questions: Question[]; status: string } | { question: Question; status: string }) => {
              console.log('payload', payload);
              this.alertService.alert.next({ msg: 'Get Data Successfuly', type: 'success' });
              return QuestionsActions.getQuestionsSuccess({
                questions: params.questionId ? [payload['question']] : payload['questions'],
              });
            }),
            catchError(() => {
              this.alertService.alert.next({ msg: 'There is something wrong', type: 'failed' });
              return of(QuestionsActions.getQuestionsFailure());
            })
          );
      })
    );
  });

  editQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.editQuestion),
      mergeMap((question) => {
        console.log('id ', question);
        return this.apiService.put(`${environment.baseURL}/questions/${question.id}`, question).pipe(
          map(() => {
            this.alertService.alert.next({ msg: 'Edit Question Successfuly', type: 'success' });
            return QuestionsActions.editQuestionSuccess();
          }),
          catchError(() => {
            this.alertService.alert.next({ msg: 'There is something wrong', type: 'failed' });
            return EMPTY;
          })
        );
      })
    );
  });
  constructor(private actions$: Actions, private apiService: ApiService, private alertService: AlertService) {}
}
