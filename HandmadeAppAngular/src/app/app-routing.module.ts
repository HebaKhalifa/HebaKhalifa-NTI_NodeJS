import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminsComponent } from './admin/admins/admins.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';
import { EditPasswordAdminComponent } from './admin/edit-password-admin/edit-password-admin.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { OfferComponent } from './admin/offer/offer.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { UsersComponent } from './admin/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { AccountActivationComponent } from './user/account-activation/account-activation.component';
import { EditPasswordComponent } from './user/edit-password/edit-password.component';
import { EditComponent } from './user/edit/edit.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RateProductComponent } from './user/rate-product/rate-product.component';
import { RegisterComponent } from './user/register/register.component';
import { ReserveProductComponent } from './user/reserve-product/reserve-product.component';
import { ReviewProductComponent } from './user/review-product/review-product.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'productDeatails/:id',component:ProductDetailsComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'edit',component:EditComponent},
  {path:'reserveProduct/:id',component:ReserveProductComponent},
  {path:'review/:id',component:ReviewProductComponent},
  {path:'rate/:id',component:RateProductComponent},
  // {path:'activate?',component:AccountActivationComponent},
  /***********          reset password           */
  {path:'editPassword',component:EditPasswordComponent},
  {path:'admin/editPassword',component:EditPasswordAdminComponent},
  {path:'admin/register',component:RegisterAdminComponent},
  {path:'admin/login',component:LoginAdminComponent},
  {path:'admin/profile',component:ProfileAdminComponent},
  {path:'admin/edit',component:EditAdminComponent},
  {path:'admin/users',component:UsersComponent},
  {path:'admin/admins',component:AdminsComponent},
  {path:'admin',component:OrdersComponent},
  {path:'admin/addProduct',component:AddProductComponent},
  {path:'admin/editProduct/:id',component:EditProductComponent},
  {path:'admin/showAdmin/:id',component:ProfileAdminComponent},
  {path:'admin/showUser/:id',component:ProfileComponent},
  {path:'admin/makeOffer/:id',component:OfferComponent},
  {path:'editReservation/:id',component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
