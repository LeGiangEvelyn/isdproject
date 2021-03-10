import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[];
  subscribeForm;
  selectedClient;
  editMode = false;

  constructor(private db: FirestoreService, private fb: FormBuilder) {
    this.subscribeForm = fb.group({
        name: ['',[Validators.required,Validators.maxLength(20)]],
        phone: ['',[Validators.required,Validators.maxLength(12)]],
      })
    }

   ngOnInit(): void {
    this.db.getClient().subscribe(item => {
      this.clients = item;
      })
    }

    get(name) {
      return this.subscribeForm['controls'][name];
    }
    onSubmit() {
      // TODO: Use EventEmitter with form value
      this.db.addClient(this.subscribeForm.value['name'], this.subscribeForm.value['phone']);
      console.log('Successfully');
      
    }
    log() {

    }
    deleteClient(item) {
      this.db.deleteClient(item);
    }

    editClient(item) {
      this.selectedClient = item;
      this.editMode = true;
      this.subscribeForm.setValue({
        name: item.name,
        phone: item.phone,
      })      
      console.log(this.selectedClient);
      
    }

    async updateClient(e) {
      e = this.selectedClient;
      this.editMode = false;
      await this.db.updateClient(e, this.subscribeForm.value['name'], this.subscribeForm.value['phone']);
      this.subscribeForm.re   
    }



  }

  
    
       
  

