import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Pages/home/home.component';
import { TodoComponent } from './Pages/todo/todo.component';
import { FormComponent } from './Pages/form/form.component';
import { CertificateComponent } from './Components/certificate/certificate.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'todo',
    component: TodoComponent
  },
  {
    path: 'todo/:id',
    component: TodoComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'certificate',
    component: CertificateComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
