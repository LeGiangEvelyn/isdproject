import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment'
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { AppComponent } from './app.component';
import { SummaryPipe } from './summary.pipe';
import { ButtonComponent } from './component/button/button.component';
import { InputFormatDirective } from './input-format.directive';
import TodoService from './services/todo.services';
import TodoHttpService from './services/todo-http.service';
import { NavbarComponent } from './navbar/navbar.component';
import { TodosComponent } from './todos/todos.component';
import { SettingComponent } from './setting/setting.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin-guard';
import { StaffComponent } from './staff/staff.component';
import { MenuComponent } from './menu/menu.component';
import { ExpenseComponent } from './expense/expense.component';
import { StorageComponent } from './storage/storage.component';
import { VoucherComponent } from './voucher/voucher.component';
import { ClientComponent } from './client/client.component';
import { FirebaseService } from './services/firebase.service';
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';
import { FirestoreService } from './services/firestore.service';


@NgModule({
  declarations: [
    AppComponent,
    SummaryPipe,
    ButtonComponent,
    InputFormatDirective,
    NavbarComponent,
    TodosComponent,
    SettingComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    MenuComponent,
    ExpenseComponent,
    StorageComponent,
    VoucherComponent,
    ClientComponent,
    BarChartComponent,
    PieChartComponent,
  ],
  
  imports: [
    ChartsModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/orders',
        pathMatch: 'full',
      },
      {
        path: 'staff',
        component: StaffComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'voucher',
        component: VoucherComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'storage',
        component: StorageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'menu',
        component: MenuComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'client',
        component: ClientComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'expense',
        component: ExpenseComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'history',
        component: TodosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'todos/:id', // Hai chấm để đánh dấu id là 1 param
        component: TodoDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'revenue',
        component: SettingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'login', 
        component: LoginComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [TodoService, TodoHttpService, FirebaseService, FirestoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
