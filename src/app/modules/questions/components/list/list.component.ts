import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { ApiService } from '@core/api.service';
import { QuestionResponse, Question, Answer } from '../../interfaces/question';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  questions: Question[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getQuestions();
  }
  getQuestions(): void {
    this.apiService
      .get(`${environment.baseURL}/questions`)
      .subscribe((res: QuestionResponse) => {
        this.questions = res.questions;
        console.log(this.questions);
      });
  }

  /**
   * For filtering answers array
   * To help the table show correct answer at first TD
   * @param Answer[] answers
   * @param boolean [type=false]
   * @returns Answer[]
   */
  getAnswer(answers: Answer[], type: boolean = false): Answer[] {
    return answers.filter((a) => a.accepted === type);
  }

  deleteQuestion(questionId: string): void {
    this.apiService
      .delete(`${environment.baseURL}/questions/${questionId}`)
      .subscribe(() => this.getQuestions());
  }
}
