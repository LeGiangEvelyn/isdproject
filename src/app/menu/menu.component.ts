import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Drink } from '../models/drink';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  drinks: Drink[];
  selectedDrink;
  menuForm;
  editMode = false;
  constructor(private db: FirestoreService, private fb: FormBuilder, private el: ElementRef) {

    this.menuForm = fb.group({
        name: ['',[Validators.required,Validators.maxLength(20)]],
        price: ['',[Validators.required]],
        category: ['',[Validators.required]]
      })
    }

   ngOnInit(): void {
    this.db.getDrink().subscribe(item => {
      this.drinks = item;
      })
    }

    get(name) {
      return this.menuForm['controls'][name];
    }

    onSubmit() {
      // TODO: Use EventEmitter with form value
      this.db.addDrink(this.menuForm.value['name'], this.menuForm.value['price'],this.menuForm.value['category']);
      console.log('Successfully');
      
    }

    deleteDrink(item) {
      this.db.deleteDrink(item);
    }

    editDrink(item) {
      this.selectedDrink = item;
      this.editMode = true;
      this.menuForm.setValue({
        name: item.name,
        price: item.price,
        category: item.category
      })      
      console.log(this.selectedDrink);
      
    }

    async updateDrink(e) {
      e = this.selectedDrink;
      this.editMode = false;
      await this.db.updateDrink(e, this.menuForm.value['name'], this.menuForm.value['price'],this.menuForm.value['category']);
      // console.log(this.menuForm.value);
      
    }

    log() {
      console.log(this.menuForm);
    }




}
