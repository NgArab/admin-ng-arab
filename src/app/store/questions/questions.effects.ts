import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
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
            return of(QuestionsActions.addQuestionFailure({ error }));
          })
        )
      )
    );
  });

  constructor(private actions$: Actions, private apiService: ApiService, private alertService: AlertService) {}
}
