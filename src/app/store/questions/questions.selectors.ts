import { Question } from '@shared/models/question';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromQuestions from './questions.reducer';

export const selectQuestionsState = createFeatureSelector<Question[]>(fromQuestions.questionsFeatureKey);
