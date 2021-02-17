import { ajax } from 'rxjs/ajax';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getQuestions();
  }
  getQuestions(): void {
    this.http
      .get(`${environment.baseURL}/questions`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    // ajax({
    //   method: 'GET',
    //   url: `${environment.baseURL}/questions`,
    //   headers: {
    //     accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
    //     locale: 'ar',
    //   },
    // }).subscribe((res) => {
    //   console.log(res);
    // });
  }
}
