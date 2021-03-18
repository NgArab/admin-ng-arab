import { createAction, props } from '@ngrx/store';
import { Question } from '@shared/models/question';

// Add Questions
export const addQuestion = createAction('[Questions] Add Question', props<Question>());

export const addQuestionSuccess = createAction('[Questions] Add Question Success');

export const addQuestionFailure = createAction('[Questions] Add Question Failure');

// Delete Questions
export const deleteQuestion = createAction('[Questions] Delete Question', props<{ questionId: string }>());

export const deleteQuestionSuccess = createAction('[Questions] Delete Question Success');

export const deleteQuestionFailure = createAction('[Questions] Delete Question Failure');

// Get Questions
export const getQuestions = createAction('[Questions] Get Question');

export const getQuestionsSuccess = createAction('[Questions] Get Question Success', props<{ questions: Question[] }>());

export const getQuestionsFailure = createAction('[Questions] Get Question Failure');
