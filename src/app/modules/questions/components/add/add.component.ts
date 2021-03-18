import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { Question } from '@shared/models/question';

import * as customEditor from '@shared/ckeditor.js';

import { Store } from '@ngrx/store';
import * as QuestionsActions from '@store/questions/questions.actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  addQuestionForm: FormGroup;
  destroyed$ = new Subject<boolean>();
  public Editor = customEditor;
  ckconfig = {
    toolbar: ['heading', '|', 'bold', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'codeBlock'],
  };

  constructor(private actions$: Actions, private fb: FormBuilder, private store: Store<Question>) {
    this.initAddQuestionForm();
    this.actions$.pipe(ofType(QuestionsActions.addQuestionSuccess), takeUntil(this.destroyed$)).subscribe({
      next: (res) => {
        this.addQuestionForm.reset(), this.initAddQuestionForm();
      },
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
    this.store.dispatch(QuestionsActions.addQuestion(this.addQuestionForm.value));
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
