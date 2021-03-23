import { createReducer, on } from '@ngrx/store';
import * as QuestionsActions from './questions.actions';
import { Question } from '@shared/models/question';

export const questionsFeatureKey = 'questions';

export const initialState: Question[] = [];

export const reducer = createReducer(
  initialState,
  on(QuestionsActions.getQuestionsSuccess, (state, payload) => [...payload.questions])
);
