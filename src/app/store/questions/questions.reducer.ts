import { Action, createReducer, on } from '@ngrx/store';
import * as QuestionsActions from './questions.actions';
import { Question } from '@shared/models/question';

export const questionsFeatureKey = 'questions';

export const initialState: Question = {
  id: '',
  question: '',
  category: '',
  level: '',
  status: '',
  resource: '',
  hint: '',
  answers: [{ id: '', answer: '', accepted: 0 }],
};

export const reducer = createReducer(
  initialState,

  on(QuestionsActions.addQuestion, (state) => state),
  on(QuestionsActions.addQuestionSuccess, (state, action) => state),
  on(QuestionsActions.addQuestionFailure, (state, action) => state)
);
