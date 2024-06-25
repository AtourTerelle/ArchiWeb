import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { RequestPopUpComponent } from '../request-pop-up/request-pop-up.component';
import { DataTranferServiceService } from '../data-tranfer-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  dataLibre: any[] = [];
  dataReserve: any[] = [];
  dataTickets: any[] = [];

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog, private dataTransferService: DataTranferServiceService) { }
  
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/materielsDispo').subscribe((response: any[]) => {
      this.dataLibre = response;
    });

    const userData = {
      pseudo_u: localStorage.getItem("name")
    };

    this.http.post<any[]>('http://localhost:5000/materielReserve', userData, {headers: new HttpHeaders()}).subscribe((response: any[]) => {
      this.dataReserve = response;
    });

    this.http.post<any[]>('http://localhost:5000/demandeByUser', userData, {headers: new HttpHeaders()}).subscribe((response: any[]) => {
      this.dataTickets = response;
    });
  }

  reserveItem(item: any) {
    this.dialog.open(RequestPopUpComponent, {
      width: '500px',
      height: '300px',
      data: {name : item.nom_m, request: "Attribution"}
    })
  }

  retourItem(item: any){
    console.log(item.nom_m)
    this.dialog.open(RequestPopUpComponent, {
      width: '500px',
      height: '300px',
      data: {name : item.nom_m, request: "Retour"}
    })
  }
}
