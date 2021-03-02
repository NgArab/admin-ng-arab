import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { ApiService } from '@core/api.service';
import { QuestionResponse, Question, Answer } from '../../interfaces/question';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  activeTableLevel = 'junior';
  questions: Question[] = [];
  activeTableQuestions: Question[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getQuestions();
  }
  getQuestions(): void {
    this.apiService
      .get(`${environment.baseURL}/questions`)
      .subscribe((res: QuestionResponse) => {
        this.questions = res.questions;
        this.filterList(this.activeTableLevel);
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
  getAnswer(answers: Answer[], type: number = 0): Answer[] {
    return answers.filter((a) => +a.accepted === type);
  }

  deleteQuestion(questionId: string): void {
    // this.apiService
    //   .delete(`${environment.baseURL}/questions/${questionId}`)
    //   .subscribe(() => this.getQuestions());
  }

  filterList(level: string): void {
    this.activeTableLevel = level;
    this.activeTableQuestions = this.questions.filter((q) => q.level === level);
  }
}
