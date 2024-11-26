import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './core/components/main/main.component';
import { LivrosHomeComponent } from './pages/livros/livros-home/livros-home.component';
import { AssuntoComponent } from './pages/assunto/assunto.component';
import { AutorComponent } from './pages/autor/autor.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path:'', component:LivrosHomeComponent,pathMatch: 'full'},
      { path: 'livros', component: LivrosHomeComponent, pathMatch: 'full' },
      { path: 'assuntos', component: AssuntoComponent, pathMatch: 'full' },
      { path: 'autores', component: AutorComponent, pathMatch: 'full' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    enableTracing: true,
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'ignore'
  }), ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
