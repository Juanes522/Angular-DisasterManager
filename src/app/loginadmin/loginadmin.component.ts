import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css'],
  providers: [MessageService]
})
export class LoginadminComponent implements OnInit {

  private API_SERVER = "http://localhost:8081/admindisaster/existadmin"

  formGroupLogin!: FormGroup;

  constructor(private httpClient: HttpClient, public fb: FormBuilder, private router: Router, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.formGroupLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  public getAllAdmin() {
    return this.httpClient.get(this.API_SERVER);
  }

  public logAdmin(admin: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER, admin)
  }

  login(): void {

    this.logAdmin(this.formGroupLogin.value).subscribe(resp => {
      this.router.navigate(['/admincontrol'])
      this.formGroupLogin.reset();
    },
      error => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Log In error',
          detail: 'Username or Password invalid'
        });
        this.formGroupLogin.reset();
      }
    )
  }

  value!: any;


}
