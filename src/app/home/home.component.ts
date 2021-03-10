import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Drink } from '../models/drink';
import { Order } from '../models/orders';
import { FirestoreService } from '../services/firestore.service';
import { filter, debounceTime } from 'rxjs/operators';
import { Client } from '../models/client';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchClientValue = new FormControl('',)
  searchC: boolean;
  searchDrinkValue = new FormControl
  searchD: boolean;

  quantity: number =1;
  orderForm;
  orderMode: boolean = false;
  selected: boolean = false;

  tables: string[] = ['1','2','3','4','5','6','7','8','9'];
  total = 0;
  onSelectTable: any;
  // interface 
  order: Order[];

  drinks: Drink[]
  sortedDrink: Drink[];
  selectedDrink: any = {
    name: 'Ex: Black Coffee',
    price: 25000
  };
  listOfDrink: any[] = [
    // {
    // name: String,
    // price: Number,
    // quantity: Number,
    // total: Number,
    // note: String
    // }
  ];

  clients: Client[];
  sortedClient: Client[];
  selectedClient: Client = {
    name: 'Ex: Minh',
    point: 2
  }


  constructor(private db: FirestoreService, private firestoreService: FirestoreService,private fb: FormBuilder) {
    this.orderForm = fb.group({
      client: ['',[Validators.required,Validators.maxLength(20)]],
      price: ['',[Validators.required]],
      category: ['',[Validators.required]],
      drinks: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.db.getDrink().subscribe(item => {
      this.drinks = item;
      // console.log(this.drinks);
    })
    this.db.getClient().subscribe(item => {
      this.clients = item
    }) 
    
    // ----------------------------------FUNCTION TRIGGER 2 SEARCH BAR--------------------------------------------------
     this.searchDrinkValue.valueChanges.pipe
    (debounceTime(200))
    .subscribe((value) => {
        this.searchD = true;
        this.firestoreService.getDrink().subscribe((info) => {
          this.sortedDrink = info.filter(item => {
            // console.log(item.name.toLowerCase().replace(/\s/g, ''));
            // console.log(value.toLowerCase().replace(/\s/g, ''));
            // console.log((item.name.toLowerCase().replace(/\s/g, '').search(value.toLowerCase().replace(/\s/g, ''))) > -1);
             return (item.name.toLowerCase().replace(/\s/g, '').indexOf(value.toLowerCase().replace(/\s/g, '')) > -1)      
          })      
        })
    }) 

    this.searchClientValue.valueChanges.pipe
    (filter((v: any) => v !== ' '), debounceTime(200)
    )
    .subscribe((value) => {
      if (value.length > 0) this.searchC = true; else false 
      this.firestoreService.getClient().subscribe((info) => {
        this.clients = info.filter(item => {
          return (item.name.toLowerCase().replace(/\s/g, '').indexOf(value.toLowerCase().replace(/\s/g, '')) > -1)      
          })
        })  
      })
    }
    // ------------------------------------------------------------------------------------

  selectedTable(e) {
      this.orderMode = true;
      this.onSelectTable = e;
  }

  chooseClient(item) {
    this.selectedClient = item;
    this.searchClientValue.setValue('');

    console.log(this.selectedClient);
  }

  chooseDrink(item) {
    this.selectedDrink = item;
    this.searchDrinkValue.setValue('');
    this.listOfDrink.push({
      name: item.name,
      price: Number(item.price),
      quantity: Number(this.quantity),
      total: item.price * this.quantity,
      note: ' '
    })
    this.total = this.totalBill()
  }

  calculate(e, item) {
    item.total = e.target.value * item.price
    this.totalBill()
    
  }
  deleteItem(item) {
    this.listOfDrink = this.listOfDrink.filter(ele => {
      return (item.name !== ele.name && item.price !== ele.price);
    })
    // console.log(this.listOfDrink);
    // console.log(item);
    this.totalBill()
  }

  totalBill() {
    this.total = 0;
    this.listOfDrink.forEach(item => {
      // for (const ele in item) {
        console.log(item);  
        this.total = this.total + Number(item.total);
      // }
    })
    return this.total   
    // console.log(this.total);
    
  }
}
