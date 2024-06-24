import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css'
})
export class UserPanelComponent implements OnInit {
  Name: string = "Milo Pauchet"
  data: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void{
    this.http.get<any[]>('http://localhost:5000/users').subscribe((response: any[]) => {
      this.data = response;
    });
  }

  editItem(item: any): void { 
    this.router.navigate(['home/Users/Edit', item.pseudo_u]);
  }

  deleteItem(pseudo: string): void {
    const userData = {
      headers: new HttpHeaders(),
      body: {
        pseudo_u: pseudo
      },
    };
    this.http.delete(`http://localhost:5000/delete_user`, userData)
    .subscribe(
      response => {
        console.log('Utilisateur supprimé avec succès', response);
        window.location.reload()
      },
      error => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    );
  }
}
