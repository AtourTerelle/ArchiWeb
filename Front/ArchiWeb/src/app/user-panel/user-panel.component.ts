import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { DataTranferServiceService } from '../data-tranfer-service.service';


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

  constructor(private http: HttpClient, private router: Router, private dataTransferService: DataTranferServiceService) { }

  ngOnInit(): void{
    this.http.get<any[]>('http://localhost:5000/users').subscribe((response: any[]) => {
      this.data = response;
    });
  }

  editItem(item: any): void { 
    this.dataTransferService.setItem(item);
    this.router.navigate(['home/Users/Edit', item.pseudo_u]);
  }

  deleteItem(id: number): void {
    console.log(`Supprimer item avec id : ${id}`);
  }
}
