import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-materiel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './add-materiel.component.html',
  styleUrl: './add-materiel.component.css'
})
export class AddMaterielComponent {
  Name: string = "Milo Pauchet"
}
