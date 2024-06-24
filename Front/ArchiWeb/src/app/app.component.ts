import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConnexionComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArchiWeb';
  Name: string = "Milo Pauchet"
}
