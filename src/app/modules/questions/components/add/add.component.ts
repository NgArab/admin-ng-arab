import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '@env/environment';
import { ApiService } from '@core/api.service';

import { Question, Answer } from '@modules/questions/interfaces/question';

import * as customEditor from '@shared/ckeditor.js';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  addQuestionForm: FormGroup;
  public Editor = customEditor;
  ckconfig = {
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'codeBlock'],
  };

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.initAddQuestionForm();
    this.addQuestionForm.valueChanges.subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit(): void {}

  initAddQuestionForm(): void {
    this.addQuestionForm = this.fb.group({
      question: ['', Validators.required],
      level: ['', Validators.required],
      resource_link: ['', Validators.required],
      hint: ['', Validators.required],
      question_category_id: 'bf1da3d4-ec6a-4831-8a42-8aad1da497ef',
      status: 'active',
      answers: this.fb.array([]),
    });
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
    this.apiService.post(`${environment.baseURL}/questions`, this.addQuestionForm.value).subscribe(() => {
      this.addQuestionForm.reset(), this.initAddQuestionForm();
    });
  }
}
