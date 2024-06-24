import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConnexionComponent, HttpClientModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArchiWeb';
  Name: string = "Milo Pauchet"

  constructor(private router: Router) { }

  Deco(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    this.router.navigate(['']);
  }
}
