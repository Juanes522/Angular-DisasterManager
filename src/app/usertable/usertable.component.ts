import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { Injectable } from '@angular/core'
/*
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';*/

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit{
  
  private API_SERVER = "http://localhost:8081/"

  disasters: any[] = [];

  constructor(private httpClient: HttpClient){}

  getAllDisasters(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.API_SERVER}naturaldisaster/getall`);
  }

  decryptImage(encodedImageData: string): string{
    const binaryImageData = atob(encodedImageData);

    const byteArray = new Uint8Array(binaryImageData.length);
    for(let i = 0; i < binaryImageData.length; i++){
      byteArray[i] = binaryImageData.charCodeAt(i);
    }

    const blob = new Blob([byteArray], {type: 'image/jpeg'});

    return URL.createObjectURL(blob);

  }

  ngOnInit(): void {
    this.getDataAndRefreshTable();

    interval(120000).subscribe(()=>{
      this.getDataAndRefreshTable();
    })

    
  }

  getDataAndRefreshTable(){
    this.getAllDisasters().subscribe((data: any[])=>{

      this.disasters = data.map(disaster => {
        return {...disaster, imageURL: this.decryptImage(disaster.image)};
      });

    },
    error => {
      console.error('Error fetching data: ',error);
    }
    );
  }

  /*decryptImage(encryptedImageData: string): string{

    return encryptedImageData.split('').reverse().join('');
  }*/

  

  /*
  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
    }
}*/

}

