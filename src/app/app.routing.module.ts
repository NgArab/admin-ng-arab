import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './modules/auth/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    children: [
      {
        path: 'questions',
        loadChildren: () =>
          import('./modules/questions/questions.module').then(
            (m) => m.QuestionsModule
          ),
      },
    ],
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
