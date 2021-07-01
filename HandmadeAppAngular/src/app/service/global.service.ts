import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  commonUrl = 'http://localhost:3000/';
  constructor(public http: HttpClient) {}

  loadHome(): Observable<any> {
    return this.http.get(`${this.commonUrl}`);
  }

  activateAccount(email: string, activationKey: string): Observable<any> {
    return this.http.patch(
      `${this.commonUrl}activate?email=${email}&activationKey=${activationKey}`,
      null
    );
  }
  profile(): Observable<any> {
    return this.http.get(`${this.commonUrl}profile`);
  }

  getUserReservations(): Observable<any> {
    return this.http.get(`${this.commonUrl}myReservations`);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.commonUrl}register`, user);
  }
  login(user: any): Observable<any> {
    return this.http.post(`${this.commonUrl}login`, user);
  }
  editProfile(user: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}edit`, user);
  }
  editPassword(data: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}editPassword`, data);
  }
  resetPassword(email: string, forgotPasswordKey: string): Observable<any> {
    return this.http.patch(
      `${this.commonUrl}resetPassword?email=${email}&forgotPasswordKey=${forgotPasswordKey}`,
      null
    );
  }

  deactivate(): Observable<any> {
    return this.http.patch(`${this.commonUrl}deactivate`, null);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.commonUrl}logout`, null);
  }
  logoutAllDevices(): Observable<any> {
    return this.http.post(`${this.commonUrl}logoutAllDevices`, null);
  }
  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.commonUrl}delete`);
  }
  registerAdmin(user: any): Observable<any> {
    return this.http.post(`${this.commonUrl}admin/register`, user);
  }
  activateAdmin(email: string, activationKey: string): Observable<any> {
    return this.http.patch(
      `${this.commonUrl}activate?email=${email}&activationKey=${activationKey}`,
      null
    );
  }

  loginAdmin(user: any): Observable<any> {
    return this.http.post(`${this.commonUrl}`, user);
  }
  resetPasswordAdmin(
    email: string,
    forgotPasswordKey: string
  ): Observable<any> {
    return this.http.patch(
      `${this.commonUrl}admin/resetPassword?email=${email}&forgotPasswordKey=${forgotPasswordKey}`,
      null
    );
  }
  deactivateAdmin(): Observable<any> {
    return this.http.patch(`${this.commonUrl}admin/deactivate`, null);
  }
  logoutAdmin(): Observable<any> {
    return this.http.post(`${this.commonUrl}admin/logout`, null);
  }
  logoutAllDevicesAdmin(): Observable<any> {
    return this.http.post(`${this.commonUrl}admin/logoutAllDevices`, null);
  }
  profileAdmin(): Observable<any> {
    return this.http.get(`${this.commonUrl}admin/profile`);
  }
  editPasswordAdmin(data: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}admin/editPassword`, data);
  }
  editAdmin(user: any): Observable<any> {
    return this.http.post(`${this.commonUrl}admin/edit`, user);
  }
  deleteAdminAccount(): Observable<any> {
    return this.http.delete(`${this.commonUrl}admin/delete`);
  }
  allUsers(): Observable<any> {
    return this.http.get(`${this.commonUrl}admin/allUsers`);
  }
  allAdmins(): Observable<any> {
    return this.http.get(`${this.commonUrl}admin/allAdmins`);
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.commonUrl}admin/deleteUser/${id}`);
  }
  deleteAdmin(id: any): Observable<any> {
    return this.http.delete(`${this.commonUrl}admin/deleteAdmin/${id}`);
  }
  showUser(id: any): Observable<any> {
    return this.http.get(`${this.commonUrl}admin/showUser/${id}`);
  }
  showAdmin(id: any): Observable<any> {
    return this.http.get(`${this.commonUrl}admin/showAdmin/${id}`);
  }
  makeSuperAdmin(id: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}admin/makeSuperAdmin/${id}`, null);
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.commonUrl}addCategory`, category);
  }
  allCategories(): Observable<any> {
    return this.http.get(`${this.commonUrl}allCategories`);
  }
  editCategory(id: any, category: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}editCategory/${id}`, category);
  }
  deleteCategory(id: any): Observable<any> {
    return this.http.delete(`${this.commonUrl}deleteCategory/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.commonUrl}addProduct`, product);
  }
  showProduct(id: any): Observable<any> {
    return this.http.get(`${this.commonUrl}product/${id}`);
  }
  showByCategory(id: any): Observable<any> {
    return this.http.get(`${this.commonUrl}category/${id}`);
  }
  editProduct(id: any, product: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}editProduct/${id}`, product);
  }
  makeOffer(id: any, offer: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}makeOffer/${id}`, offer);
  }
  endOffer(id: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}endOffer/${id}`, null);
  }
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.commonUrl}deleteProduct/${id}`);
  }
  reserveProduct(id: any, product: any): Observable<any> {
    return this.http.post(`${this.commonUrl}reserveProduct/${id}`, product);
  }
  showReservation(id: any): Observable<any> {
    return this.http.get(`${this.commonUrl}showReservation/${id}`);
  }
  adminHome(): Observable<any> {
    return this.http.get(`${this.commonUrl}adminHome`);
  }
  editRservation(id: any, order: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}editRservation/${id}`, order);
  }
  cancelReservation(id: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}cancelReservation/${id}`, null);
  }
  confirmOrder(id: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}confirmOrder/${id}`, null);
  }
  updateOrderStatus(id: any, status: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}updateStatus/${id}`, status);
  }
  setOrderMakerl(id: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}setMakerl/${id}`, null);
  }

  /********* */
  reviewProduct(id: any, review: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}reviewProduct/${id}`, review);
  }
  rateProduct(id: any, rate: any): Observable<any> {
    return this.http.patch(`${this.commonUrl}rateProduct/${id}`, rate);
  }
}
