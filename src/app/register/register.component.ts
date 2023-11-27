import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { MultiSelect } from 'primeng/multiselect';

//creacion de interfaz para cada lista
interface Country {
  name: string;
}

interface Disaster {
  name: string;
}

interface NumInvestigators {
  number: number;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

interface InvestigatorsRegistered {
  identifier: string;
  name: string;
}

interface DisasterData {
  uuid: any;
  country: any;
  investigators: any;
  desasterName: any;
  description: any;
  image: any;
  waveHeight?: any;
  magnitude?: any;
  maximumTemperature?: any;
  scope?: any;
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {


  private API_SERVER = "http://localhost:8081/"
  private API_SERVER_LIST = "http://localhost:8081/investigator/getall"

  formGroupRegistration!: FormGroup;



  ngOnInit(): void {
    this.formGroupRegistration = this.fb.group({
      uuid: ['', Validators.required],
      country: ['', Validators.required],
      investigators: [[], Validators.required],
      disasterName: [''],
      description: ['', Validators.required],
      image: [''],
      waveHeight: [''],
      magnitude: [''],
      maximumTemperature: [''],
      scope: [''],
    });

    this.getAllInvestigators().subscribe((data: any[]) => {
      this.investigatorsRegistered = data;
    });
  }

  onCountryChange(event: any) {

    if (this.selectedCountry) {
      this.formGroupRegistration.controls['country'].setValue(this.selectedCountry.name);
    } else {
      this.formGroupRegistration.controls['country'].setValue(null);
    }


  }

  onTypeDisasterChange(event: any) {
    if (this.selectedDisaster) {
      this.formGroupRegistration.controls['disasterName'].setValue(this.selectedDisaster.name);
    } else {
      this.formGroupRegistration.controls['disasterName'].setValue(null);
    }

  }

  @ViewChild('multiSelect') multiSelect!: MultiSelect;

  onSelecteionChange(event: any) {
    if (event.value.length > 3) {
      event.value.pop();
    }

    let selectedOptions = event.value;

    let selectedUuids = selectedOptions.map((option: any) => option.uuid);

    this.formGroupRegistration.patchValue({
      investigators: selectedUuids
    });

    // event.value = [];
  }

  /*
  onInvestigatorsChange(event: any[]) {
    const investigatorsUuids = this.selectedInvestigatorsRegistered.map((investigator:any) => investigator.uuid);

    this.formGroupRegistration.controls['investigators'].setValue(investigatorsUuids);
  }
*/
  public getAllInvestigators(): Observable<any> {
    return this.httpClient.get(this.API_SERVER_LIST);
  }

  public registerDisaster(disaster: any, endpoint: string): Observable<any> {
    const url = `http://localhost:8081/${endpoint}`;
    return this.httpClient.post(url, disaster, { responseType: 'text' });
    //this.API_SERVER + endpoint, disaster
  }


  isImageLoaded = false;

  register(): void {


    if(!this.isImageLoaded){
      this.messageService.add({severity: 'error', summary: 'Image Required/Information', detail: 'Please select an image before registering Complete empty spaces', life: 5000});
      this.formGroupRegistration.reset();
      return;
    }

    const disasterType = this.formGroupRegistration.get('disasterName')?.value;
    let endpoint = '';
    let data: DisasterData = {
      uuid: this.formGroupRegistration.get('uuid')?.value,
      country: this.formGroupRegistration.get('country')?.value,
      investigators: this.formGroupRegistration.get('investigators')?.value,
      desasterName: this.formGroupRegistration.get('disasterName')?.value,
      description: this.formGroupRegistration.get('description')?.value,
      image: this.formGroupRegistration.get('image')?.value,
      waveHeight: this.formGroupRegistration.get('waveHeight')?.value || '',
      magnitude: this.formGroupRegistration.get('magnitude')?.value || '',
      maximumTemperature: this.formGroupRegistration.get('maximumTemperature')?.value || '',
      scope: this.formGroupRegistration.get('scope')?.value || '',
    };

   

    switch (disasterType) {
      case 'Earthquake':
        endpoint = 'earthqueake/createearthquake';
        data['magnitude'] = this.formGroupRegistration.get('magnitude')?.value;
        break;

      case 'Extreme Heat':
        endpoint = 'extreamheat/createextremeheat';
        data['maximumTemperature'] = this.formGroupRegistration.get('maximumTemperature')?.value;
        break;

      case 'Volcanic Eruption':
        endpoint = 'volcaniceruption/createvolcaniceruption';
        data['scope'] = this.formGroupRegistration.get('scope')?.value;
        break;

      case 'Hurricane':
        endpoint = 'hurricane/createhurricane';
        data['magnitude'] = this.formGroupRegistration.get('magnitude')?.value;
        break;

      case 'Tsunami':
        endpoint = 'tsunami/createtsunami';
        data['waveHeight'] = this.formGroupRegistration.get('waveHeight')?.value;
        break;

      default:
        endpoint = 'naturaldisaster/createdisaster';
        break;

    }
    console.log(endpoint);

    this.registerDisaster(this.formGroupRegistration.value, endpoint).subscribe(resp => {
      console.log(this.formGroupRegistration.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Registration Successfully',
        detail: 'Natural Disaster Registered'
      });

      this.formGroupRegistration.reset();


    },
      error => {
        console.log(this.formGroupRegistration.value)
        this.messageService.add({
          severity: 'error',
          summary: 'Registration error',
          detail: 'Invalid registration, check UUID´s registered'
        });
        this.formGroupRegistration.reset();
      }
    )
  }

 
  
  disasterName: string | any;

  //inicializacion de listas
  countries!: Country[];
  selectedCountry: Country | any;

  disasters!: Disaster[];
  selectedDisaster: Disaster | any;

  investigatorsRegistered: any[] | any; //= []
  selectedInvestigatorsRegistered: InvestigatorsRegistered[] | any;



  selection!: number;
  identifier1: string | any;
  name1: string | any;
  identifier2: string | any;
  name2: string | any;
  identifier3: string | any;
  name3: string | any;

  description: string | any;

  //reset de espacios

  hideDialogInvestigators() {
    this.visible = false;
  }

  confirmDialogInvestigators() {
    this.visible = false;
  }

  hideDialogNewDisaster() {

    if (this.selectedDisaster === 'Other ') {
      this.selectedDisaster = '';
    }
    this.newItem = ''
    this.visibledis = false;
    this.selectedDisaster = '';

  }

  confirmDialogNewDisaster() {
    const disasterName = this.formGroupRegistration.get('disasterName')?.value;
    if (disasterName && disasterName.trim() != '') {
      this.visibledis = false;
    }

  }

  deselectOptions() {
    if (this.multiSelect) {
      this.multiSelect.value = [];
      this.multiSelect.updateFilledState();
      this.multiSelect.uncheckAll();
      this.multiSelect.updateLabel();
    }
  }


  confirmregistration() {

    this.deselectOptions();
    this.selectedCountry = '';
    this.selectedDisaster = '';
    this.disasterName = '';
    this.imageURL = '';
    
  }

  //mostrar espacio al seleccionar other
  selectDisaster(disaster: any) {
    this.selectedDisaster = disaster;
    if (disaster.name === 'Other ') {
      this.showInputField = true;
    } else {
      this.showInputField = false;
    }
  }

  showInputField = false;
  showInputField2 = false;
  showInputField3 = false;

  newItem = '';

  visible: boolean = false;
  visibledis: boolean = false;

  //mostrar dialogo con input the other
  onChange(event: { originalEvent: Event, value: any }) {
    if (event.value && event.value.name === 'Other ') {
      this.showInputField = true;
      this.visibledis = true;
    } else {
      this.showInputField = false;
    }
  }

  //añadir temporalmente a la lista de desastres
  addItem() {
    if (this.newItem) {
      let newDisaster = { name: this.newItem };
      this.disasters.push({ name: this.newItem });
      this.selectedDisaster = newDisaster; //update region selection
      this.newItem = '';
      this.showInputField = false;
      this.visible = false;
    }
  }

  //expresion regular para control de entrada en other
  onKeyPress(event: KeyboardEvent) {
    const pattern = /[a-zA-Z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onKeyPress2(event: KeyboardEvent) {
    const pattern = /[a-zA-Z0-9 ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onKeyPress3(event: KeyboardEvent) {
    const pattern = /[0-9.]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }

  }


  loading: boolean = false;

  //animacion de cargar
  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

  //obtener imagen y ponerla en el form
  imageURL: string | ArrayBuffer | null = null;
  onBasicUploadAuto(event: UploadEvent | FileUploadEvent) {

    const file: File = event.files[0];
    const reader = new FileReader();

    reader.onload = () => {

      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 100;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        this.imageURL = canvas.toDataURL('image/jpeg', 0.7);

        canvas.toBlob((blob) => {

          const reader = new FileReader();

          reader.onload = () => {

            const arrayBuffer: ArrayBuffer = reader.result as ArrayBuffer;
            const bytes: Uint8Array = new Uint8Array(arrayBuffer);

            const byteArray: number[] = Array.from(bytes);

            this.formGroupRegistration.get('image')?.setValue(byteArray);

            this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Image Upload' });
            this.isImageLoaded = true;
          }
          reader.readAsArrayBuffer(blob as Blob);
        }, 'image/jpeg', 0.7);
      }

    }

    reader.readAsDataURL(file);

  }

  numToRegister!: number;
  //asignar seleccion
  selectedOption(event: { originalEvent: Event, value: any }) {
    //  this.selection = selection;
    this.numToRegister = event.value.number;

    if (event.value.number == 0) {
      this.showInputField = false;
      this.showInputField2 = false;
      this.showInputField3 = false;
      this.visible = true;
    }
    else if (event.value.number == 1) {
      this.showInputField = true;
      this.showInputField2 = false;
      this.showInputField3 = false;
      this.visible = true;
    }
    else if (event.value.number == 2) {
      this.showInputField = true;
      this.showInputField2 = true;
      this.showInputField3 = false;
      this.visible = true;
    }
    else if (event.value.number == 3) {
      this.showInputField = true;
      this.showInputField2 = true;
      this.showInputField3 = true;
      this.visible = true;
    }

  }

  //limite de selccion registrados
  limitSelection() {

    let length = this.selectedInvestigatorsRegistered.length;

    this.selectedInvestigatorsRegistered = this.selectedInvestigatorsRegistered.slice(0, 3);

  }

  //constructor listas
  constructor(private httpClient: HttpClient, public fb: FormBuilder, private messageService: MessageService) {

    this.disasters = [
      { name: 'Other ' },
      { name: 'Tsunami' },
      { name: 'Earthquake' },
      { name: 'Extreme Heat' },
      { name: 'Volcanic Eruption' },
      { name: 'Hurricane' }
    ];

    this.countries = [
      { name: 'Afghanistan' },
      { name: 'Armenia' },
      { name: 'Azerbaijan' },
      { name: 'Bahrain' },
      { name: 'Bangladesh' },
      { name: 'Bhutan' },
      { name: 'Brunei' },
      { name: 'Cambodia' },
      { name: 'China' },
      { name: 'Cyprus' },
      { name: 'Georgia' },
      { name: 'India' },
      { name: 'Indonesia' },
      { name: 'Iran' },
      { name: 'Iraq' },
      { name: 'Israel' },
      { name: 'Japan' },
      { name: 'Jordan' },
      { name: 'Kazakhstan' },
      { name: 'Kuwait' },
      { name: 'Kyrgyzstan' },
      { name: 'Laos' },
      { name: 'Lebanon' },
      { name: 'Malaysia' },
      { name: 'Maldives' },
      { name: 'Mongolia' },
      { name: 'Myanmar' },
      { name: 'Nepal' },
      { name: 'North Korea' },
      { name: 'Oman' },
      { name: 'Pakistan' },
      { name: 'Palestine' },
      { name: 'Philippines' },
      { name: 'Qatar' },
      { name: 'Saudi Arabia' },
      { name: 'Singapore' },
      { name: 'South Korea' },
      { name: 'Sri Lanka' },
      { name: 'Syria' },
      { name: 'Taiwan' },
      { name: 'Tajikistan' },
      { name: 'Thailand' },
      { name: 'Timor-Leste' },
      { name: 'Turkey' },
      { name: 'Turkmenistan' },
      { name: 'United Arab Emirates' },
      { name: 'Uzbekistan' },
      { name: 'Vietnam' },
      { name: 'Yemen' },
      { name: 'Algeria' },
      { name: 'Angola' },
      { name: 'Benin' },
      { name: 'Botswana' },
      { name: 'Burkina Faso' },
      { name: 'Burundi' },
      { name: 'Cabo Verde' },
      { name: 'Cameroon' },
      { name: 'Central African Republic' },
      { name: 'Chad' },
      { name: 'Comoros' },
      { name: 'Democratic Republic of the Congo ' },
      { name: 'Djibouti' },
      { name: 'Egypt' },
      { name: 'Equatorial Guinea' },
      { name: 'Eritrea' },
      { name: 'Eswatini' },
      { name: 'Ethiopia' },
      { name: 'Gabon' },
      { name: 'Gambia' },
      { name: 'Ghana' },
      { name: 'Guinea' },
      { name: 'Guinea-Bissau' },
      { name: 'Ivory Coast' },
      { name: 'Kenya' },
      { name: 'Lesotho' },
      { name: 'Liberia' },
      { name: 'Libya' },
      { name: 'Madagascar' },
      { name: 'Malawi' },
      { name: 'Mali' },
      { name: 'Mauritania' },
      { name: 'Mauritius' },
      { name: 'Morocco' },
      { name: 'Mozambique' },
      { name: 'Namibia' },
      { name: 'Niger' },
      { name: 'Nigeria' },
      { name: 'Republic of the Congo' },
      { name: 'Rwanda' },
      { name: 'Sao Tome and Principe' },
      { name: 'Senegal' },
      { name: 'Seychelles' },
      { name: 'Sierra Leone' },
      { name: 'Somalia' },
      { name: 'South Africa' },
      { name: 'South Sudan' },
      { name: 'Sudan' },
      { name: 'Tanzania' },
      { name: 'Togo' },
      { name: 'Tunisia' },
      { name: 'Uganda' },
      { name: 'Zambia' },
      { name: 'Zimbabwe' },
      { name: 'Antigua and Barbuda' },
      { name: 'Argentina' },
      { name: 'Bahamas' },
      { name: 'Barbados' },
      { name: 'Belize' },
      { name: 'Bolivia' },
      { name: 'Brazil' },
      { name: 'Canada' },
      { name: 'Chile' },
      { name: 'Colombia' },
      { name: 'Costa Rica' },
      { name: 'Cuba' },
      { name: 'Dominica' },
      { name: 'Dominican Republic' },
      { name: 'Ecuador' },
      { name: 'El Salvador' },
      { name: 'Grenada' },
      { name: 'Guatemala' },
      { name: 'Guyana' },
      { name: 'Haiti' },
      { name: 'Honduras' },
      { name: 'Jamaica' },
      { name: 'Mexico' },
      { name: 'Nicaragua' },
      { name: 'Panama' },
      { name: 'Paraguay' },
      { name: 'Peru' },
      { name: 'Saint Kitts and Nevis' },
      { name: 'Saint Lucia' },
      { name: 'Saint Vincent and the Grenadines' },
      { name: 'Suriname' },
      { name: 'Trinidad and Tobago' },
      { name: 'United States' },
      { name: 'Uruguay' },
      { name: 'Venezuela' },
      { name: 'Aruba' },
      { name: 'Albania' },
      { name: 'Andorra' },
      { name: 'Austria' },
      { name: 'Belarus' },
      { name: 'Belgium' },
      { name: 'Bosnia and Herzegovina' },
      { name: 'Bulgaria' },
      { name: 'Croatia' },
      { name: 'Cyprus' },
      { name: 'Czech Republic' },
      { name: 'Denmark' },
      { name: 'Estonia' },
      { name: 'Finland' },
      { name: 'France' },
      { name: 'Germany' },
      { name: 'Greece' },
      { name: 'Hungary' },
      { name: 'Iceland' },
      { name: 'Ireland' },
      { name: 'Italy' },
      { name: 'Kosovo' },
      { name: 'Latvia' },
      { name: 'Liechtenstein' },
      { name: 'Lithuania' },
      { name: 'Luxembourg' },
      { name: 'Malta' },
      { name: 'Moldova' },
      { name: 'Monaco' },
      { name: 'Montenegro' },
      { name: 'Netherlands' },
      { name: 'North Macedonia' },
      { name: 'Norway' },
      { name: 'Poland' },
      { name: 'Portugal' },
      { name: 'Romania' },
      { name: 'Russia' },
      { name: 'San Marino' },
      { name: 'Serbia' },
      { name: 'Slovakia' },
      { name: 'Slovenia' },
      { name: 'Spain' },
      { name: 'Sweden' },
      { name: 'Switzerland' },
      { name: 'Ukraine' },
      { name: 'United Kingdom' },
      { name: 'Vatican City' },
      { name: 'Australia' },
      { name: 'Fiji' },
      { name: 'Marshall Islands' },
      { name: 'Solomon Islands' },
      { name: 'Kiribati' },
      { name: 'Federated States of Micronesia' },
      { name: 'Nauru' },
      { name: 'New Zealand' },
      { name: 'Palau' },
      { name: 'Papua New Guinea' },
      { name: 'Samoa' },
      { name: 'Tonga' },
      { name: 'Tuvalu' },
      { name: 'Vanuatu' },
    ];


  }

}

