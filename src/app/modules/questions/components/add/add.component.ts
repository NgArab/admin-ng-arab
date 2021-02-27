import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { ApiService } from '@core/api.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  addQuestionForm: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.addQuestionForm = this.fb.group({
      question: ['', Validators.required],
      level: ['', Validators.required],
      resource_link: ['', Validators.required],
      hint: ['', Validators.required],
      question_category_id: 'bf1da3d4-ec6a-4831-8a42-8aad1da497ef',
      status: 'active',
      answers: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    for (const [i, _] of Array(4).entries()) {
      this.getAnswers().push(
        this.fb.group({
          answer: ['', Validators.required],
          accepted: +!i,
        })
      );
    }
  }

  getAnswers(): FormArray {
    return this.addQuestionForm.get('answers') as FormArray;
  }
  onSubmit(): void {
    console.log(this.addQuestionForm.value);
    this.apiService
      .post(`${environment.baseURL}/questions`, this.addQuestionForm.value)
      .subscribe();
  }
}
