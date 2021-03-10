import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, merge, Observable } from 'rxjs';
import { Client } from '../models/client';
import { Drink } from '../models/drink';
import { Order } from '../models/orders';
import { Expense } from '../models/expense';
//import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  clientCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;
  drinks: Observable<Drink[]>
  orders: Observable<Order[]>
  expense: Observable<Expense[]>;
  //account: Observable<Account[]>;
  constructor(public db: AngularFirestore) {
    this.clients = this.db.collection('client').valueChanges();
    this.drinks = this.db.collection('drinks').valueChanges();
    this.orders = this.db.collection('completed-orders').valueChanges();
    this.expense = this.db.collection('expense').valueChanges();
    //this.account = this.db.collection('account').valueChanges();

  }

  // -------------------------------------------DRINKS INTERACTION------------------------------------------------------------

    getDrink() {
      return this.drinks;
    }
    addDrink(name,price,cate) {
        this.db.collection("drinks").add({
        name: name,
        price: price,
        category: cate
      })  
    }
    async deleteDrink(e) {
      // console.log(e.targer);
      await this.db.collection('drinks').get().toPromise().then((data) =>
      // Trả về 4 document     
        data.docs.forEach(item => {
          let ele = item.data();
          if (e.name === ele['name'] && e.price === ele['price'] && e.category === ele['category']) {
            this.db.collection('drinks').doc(item.id).delete();
            }                    
          })
        )
      }

    async updateDrink(prev,name,price,category) {
      await this.db.collection('drinks').get().toPromise().then((data) => {
          data.docs.forEach(item => {  
            let ele = item.data();
              if (prev.name === ele['name'] && prev.price === ele['price'] && prev.category === ele['category']) {
                this.db.collection('drinks').doc(item.id).update({  
                  name: name,
                  price: Number(price),
                  category: category
              })
            }
          })
      })          
    }
;
       

// -------------------------------------------CLIENT INTERACTION------------------------------------------------------------
  getClient() {
    return this.clients;
  }

  addClient(name, phone) {
    // Add a new document with a generated id.
    this.db.collection("client").add({
      name: name,
      phone: phone,
      totalSpent: 0,
      point: 0,
    })    
  }

  async deleteClient(e) {
    // console.log(e.targer);
    await this.db.collection('client').get().toPromise().then((data) =>
    // Trả về     
      data.docs.forEach(item => {
        let ele = item.data();
        if (e.name === ele['name'] && e.phone === ele['phone']) {
          this.db.collection('client').doc(item.id).delete();
          }                    
        })
      )
    }
    async updateClient(prev,name,phone) {
      await this.db.collection('client').get().toPromise().then((data) => {
          data.docs.forEach(item => {  
            let ele = item.data();
              if (prev.name === ele['name'] && prev.phone === ele['phone']) {
                this.db.collection('client').doc(item.id).update({  
                  name: name,
                  phone: Number(phone),
                  })
            }
          })
      })          
    }

  // -------------------------------------------------------------------------------------
  // getDrinkInfo() {
  //   return this.
  // }
  getOrders() {
    return this.orders;
  }

  // -------------------------------------------Expense INTERACTION------------------------------------------------------------

  getExpense() {
    return this.expense;
  }
  addExpense(name,quantity, price) {
      this.db.collection("expense").add({
      name: name,
      quantity: quantity,
      price: price

    })  
  }
  async deleteExpense(e) {
    // console.log(e.targer);
    await this.db.collection('expense').get().toPromise().then((data) =>
    // Trả về     
      data.docs.forEach(item => {
        let ele = item.data();
        if (e.name === ele['name'] && e.price === ele['price'] && e.quantity === ele['quantity']) {
          this.db.collection('expense').doc(item.id).delete();
          }                    
        })
      )
    }
    async updateExpense(prev,name,quantity, price) {
      await this.db.collection('expense').get().toPromise().then((data) => {
          data.docs.forEach(item => {  
            let ele = item.data();
              if (prev.name === ele['name'] && prev.quantity === ele['quantity'] && prev.price === ele['price']) {
                this.db.collection('expense').doc(item.id).update({  
                  name: name,
                  quantity: Number(quantity),
                  price: Number(price)            
                  })
            }
          })
      })          
    }

  /*// -------------------------------------------Account INTERACTION------------------------------------------------------------

  getAccount() {
    return this.account;
  }
  
  async deleteAccount(e) {
    // console.log(e.targer);
    await this.db.collection('account').get().toPromise().then((data) =>
    // Trả về     
      data.docs.forEach(item => {
        let ele = item.data();
        if (e.name === ele['name'] && e.phone === ele['phone'] && e.email === ele['email']) {
          this.db.collection('account').doc(item.id).delete();
          }                    
        })
      )
    }
    async updateAccount(prev,name,phone, email) {
      await this.db.collection('account').get().toPromise().then((data) => {
          data.docs.forEach(item => {  
            let ele = item.data();
              if (prev.name === ele['name'] && prev.phone === ele['phone'] && prev.email === ele['email']) {
                this.db.collection('account').doc(item.id).update({  
                  name: name,
                  phone: Number(phone),
                  email: email        
                  })
            }
          })
      })          
    }*/
  }


