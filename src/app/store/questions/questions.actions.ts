import { createAction, props } from '@ngrx/store';
import { Question } from '@shared/models/question';

// Add Questions
export const addQuestion = createAction('[Questions] Add Question', props<Question>());

export const addQuestionSuccess = createAction('[Questions] Add Question Success');

export const addQuestionFailure = createAction('[Questions] Add Question Failure', props<{ error: string }>());
