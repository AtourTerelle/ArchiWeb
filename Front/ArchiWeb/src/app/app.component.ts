import { Component, DoCheck, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements DoCheck{
  title = 'ArchiWeb';
  Name: string = localStorage.getItem("name") || "erreurName";

  ngDoCheck(){
    this.Name = localStorage.getItem("name") || "erreurName";
  }

  constructor(private router: Router) { }

  isExistLocalStorageValue(key: string) {
    if(localStorage.getItem(key) === null) return false;
    return true;
  }

  Deco(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
