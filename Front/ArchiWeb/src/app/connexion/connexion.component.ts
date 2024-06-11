import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ConnexionComponent],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})

export class ConnexionComponent {
  test: string = "Bonjour tout le monde !"
}
