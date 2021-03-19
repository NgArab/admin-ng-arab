export interface QuestionResponse {
  status: string;
  questions: Question[];
}
export interface Question {
  id: string;
  question: string;
  category: string;
  level: string;
  status: string;
  resource: string;
  hint: string;
  question_category_id?: string;
  answers: Answer[];
}

export interface Answer {
  id?: string;
  answer: string;
  accepted: number;
}
