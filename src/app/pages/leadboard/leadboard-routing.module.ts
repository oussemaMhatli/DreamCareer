import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadboardPage } from './leadboard.page';

const routes: Routes = [
  {
    path: '',
    component: LeadboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadboardPageRoutingModule {}
