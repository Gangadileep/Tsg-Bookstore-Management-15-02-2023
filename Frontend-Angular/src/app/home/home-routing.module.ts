import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { AddbooksComponent } from '@app/addbooks/addbooks.component';
import { BooklistComponent } from '@app/booklist/booklist.component';
import { CategorylistComponent } from '@app/categorylist/categorylist.component';
import { UpdateComponent } from '@app/update/update.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') } },
    { path: 'addbooks', component: AddbooksComponent, pathMatch: 'full' },
    { path: 'addcategory', component: AddbooksComponent, pathMatch: 'full' },
    { path: 'booklist', component: BooklistComponent, pathMatch: 'full' },
    { path: 'update/:id', component: UpdateComponent, pathMatch: 'full' },
    { path: 'categorylist', component: CategorylistComponent, pathMatch: 'full' },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
