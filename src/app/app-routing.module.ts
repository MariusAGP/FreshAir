import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HubComponent} from "./hub/hub.component";
import {DetailsComponent} from "./details/details.component";

const routes: Routes = [
  {
    path: '',
    component: HubComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
