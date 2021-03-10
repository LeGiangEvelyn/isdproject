import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  expense: Expense[];
  selectedExpense;
  expenseForm;
  editMode = false;


  constructor(private db: FirestoreService, private fb: FormBuilder) {
    this.expenseForm = fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      quantity: ['', [Validators.required,  Validators.min(1)]],
      price: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.db.getExpense().subscribe((item) => {
      this.expense = item;
    });
  }

  get(name) {
    return this.expenseForm['controls'][name];
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.db.addExpense(
      this.expenseForm.value['name'],
      this.expenseForm.value['quantity'],
      this.expenseForm.value['price']
    );
    console.log('Successfully');
  }

  deleteExpense(item) {
    this.db.deleteExpense(item);
  }

  editExpense(item) {
    this.selectedExpense = item;
    this.editMode = true;
    this.expenseForm.setValue({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    });
    console.log(this.selectedExpense);
  }

  async updateExpense(e) {
    e = this.selectedExpense;
    this.editMode = false;
    await this.db.updateExpense(
      e,
      this.expenseForm.value['name'],
      this.expenseForm.value['quantity'],
      this.expenseForm.value['price']
    );
    // console.log(this.expenseForm.value);
  }

  log() {
    console.log(this.expenseForm);
  }
}


