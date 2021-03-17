import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromQuestions from './questions.reducer';

export const selectQuestionsState = createFeatureSelector<fromQuestions.State>(
  fromQuestions.questionsFeatureKey
);
