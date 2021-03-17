import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { UiModule } from '../ui/ui.module';
import { AddComponent } from './components/add/add.component';
import { ListComponent, AppDialogComponent } from './components/list/list.component';

@NgModule({
  declarations: [QuestionsComponent, AddComponent, ListComponent, AppDialogComponent],
  imports: [CommonModule, QuestionsRoutingModule, UiModule],
})
export class QuestionsModule {}
