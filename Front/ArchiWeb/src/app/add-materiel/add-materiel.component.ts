import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-materiel',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-materiel.component.html',
  styleUrl: './add-materiel.component.css'
})


export class AddMaterielComponent {

  addMaterialForm: FormGroup;

  constructor (private fb: FormBuilder, private http: HttpClient, private router: Router){
    this.addMaterialForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addMaterialForm.valid) {
      const userData = {
        nom_m: this.addMaterialForm.value.name,
        type_m: this.addMaterialForm.value.type,
      };
      const headers = new HttpHeaders()
      this.http.post('http://localhost:5000/addMateriels', userData, {headers})
        .subscribe(
          response => {
            console.log('Materiel ajouté avec succès', response);
            this.router.navigate(['home']);
          },
          error => {
            console.error('Erreur lors de l\'ajout du matériel', error);
          }
        );
    }
  }
}
