import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-request-pop-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './request-pop-up.component.html',
  styleUrl: './request-pop-up.component.css'
})
export class RequestPopUpComponent {

  addDemandeForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, public dialogRef: MatDialogRef<RequestPopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addDemandeForm = this.fb.group({
      salle: [''],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.addDemandeForm.valid){
      const userData = {
        salle_d: this.addDemandeForm.value.salle,
        nom_m: this.data.name,
        pseudo_u: localStorage.getItem("name"),
        type_d: this.data.request
      };
      const headers = new HttpHeaders();
      this.http.post('http://localhost:5000/addDemandes', userData, {headers})
        .subscribe(
          response => {
            console.log('Demande ajouté avec succès', response);
            this.dialogRef.close();
            window.location.reload();
          },
          error => {
            console.error('Erreur lors de l\'ajout de la demande', error);
          }
        );
    }
  }
}
