import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { ValidationPopUpComponent } from '../validation-pop-up/validation-pop-up.component';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})


export class HomeAdminComponent implements OnInit{
  dataAllMaterials: any[] = [];
  dataTickets: any[] = [];

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/allMateriel').subscribe((response: any[]) => {
      this.dataAllMaterials = response;
    });

    this.http.get<any[]>('http://localhost:5000/allDemandeEnAttente').subscribe((response: any[]) => {
      this.dataTickets = response;
    });
  }

  deleteMaterial(name: string){
    const userData = {
      headers: new HttpHeaders(),
      body: {
        nom_m: name 
      },
    };
    this.http.delete(`http://localhost:5000/deleteMateriels`, userData)
    .subscribe(
      response => {
        console.log('Matériel supprimé avec succès', response);
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de la suppression du matériel', error);
      }
    );
  }

  popUp(materialid: string){
    this.dialog.open(ValidationPopUpComponent, {
      width: '500px',
      height: '300px',
      data: {id : materialid}
    })
  }
}
