import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { AddComponent } from './components/add/add.component';

@NgModule({
  declarations: [AddComponent],
  imports: [CommonModule, QuestionsRoutingModule],
})
export class QuestionsModule {}
