import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-registerinvestigator',
  templateUrl: './registerinvestigator.component.html',
  styleUrls: ['./registerinvestigator.component.css'],
  providers: [MessageService]
})
export class RegisterinvestigatorComponent implements OnInit{

  private API_SERVER = "http://localhost:8081/investigator/createinvestigator"


  formGroupRegisterInvestigators!: FormGroup;

  constructor(private httpClient: HttpClient, public fb: FormBuilder, private messageService: MessageService) {
  }

    ngOnInit(): void {
      this.formGroupRegisterInvestigators = this.fb.group({
	    	uuid: ['', Validators.required], 
        name: ['', Validators.required], 
      });
    }

    public getAllInvestigators(){
      return this.httpClient.get(this.API_SERVER);
    }

    public registerInvestigator(investigator: any): Observable<any>{
      return this.httpClient.post(this.API_SERVER, investigator)
    }

    registerInv(): void{
      this.registerInvestigator(this.formGroupRegisterInvestigators.value).subscribe(resp => {
        
        this.messageService.add({
          severity: 'info',
          summary: 'Registered Successfully',
          detail: 'Investigator correctly registered'
        });
        this.formGroupRegisterInvestigators.reset();
      },
      error => {
        //console.log(this.formGroupRegisterInvestigators.value);
        this.messageService.add({
          severity: 'error',
          summary: 'Registering researcher',
          detail: 'Registered identifier, enter another'
        });
        this.formGroupRegisterInvestigators.reset();
      }
      )
    }

    onKeyPress(event: KeyboardEvent) {
      const pattern = /[a-zA-Z ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }

}
