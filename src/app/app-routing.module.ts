import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './components/listing/listing.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', component: RegisterComponent},
  {path: 'list', component: ListingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
