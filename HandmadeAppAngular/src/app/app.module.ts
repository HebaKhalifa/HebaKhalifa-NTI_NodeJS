import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { EditComponent } from './user/edit/edit.component';
import { ProfileComponent } from './user/profile/profile.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminsComponent } from './admin/admins/admins.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { ReserveProductComponent } from './user/reserve-product/reserve-product.component';
import { ReviewProductComponent } from './user/review-product/review-product.component';
import { RateProductComponent } from './user/rate-product/rate-product.component';
import { AccountActivationComponent } from './user/account-activation/account-activation.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { EditPasswordComponent } from './user/edit-password/edit-password.component';
import { ReviewComponent } from './user/review/review.component';
import { RateComponent } from './user/rate/rate.component';
import { OfferComponent } from './admin/offer/offer.component';
import { EditReservationComponent } from './user/edit-reservation/edit-reservation.component';
import { EditPasswordAdminComponent } from './admin/edit-password-admin/edit-password-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from './user.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailsComponent,
    RegisterComponent,
    LoginComponent,
    EditComponent,
    ProfileComponent,
    OrdersComponent,
    UsersComponent,
    AdminsComponent,
    AddProductComponent,
    EditProductComponent,
    ReserveProductComponent,
    ReviewProductComponent,
    RateProductComponent,
    AccountActivationComponent,
    RegisterAdminComponent,
    LoginAdminComponent,
    EditAdminComponent,
    ProfileAdminComponent,
    ResetPasswordComponent,
    EditPasswordComponent,
    ReviewComponent,
    RateComponent,
    OfferComponent,
    EditReservationComponent,
    EditPasswordAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
