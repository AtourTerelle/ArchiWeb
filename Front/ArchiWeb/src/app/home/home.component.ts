import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) { }
  
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/materielsDispo').subscribe((response: any[]) => {
      this.dataLibre = response;
    });



    this.http.get<any[]>('http://localhost:5000/materielReserve').subscribe((response: any[]) => {
      this.dataReserve = response;
    });
  }

  reserveItem(item: string) {
    console.log("reserver : ", item)
  }

  retourItem(item: string){
    console.log("retour :", item);
  }
}
