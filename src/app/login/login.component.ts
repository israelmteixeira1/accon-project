import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { RequestService } from '../shared/request.service';
import { SharingService } from '../shared/sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private router: Router,
    private sharingService: SharingService) { }

  request: any;
  email: string;
  password: string;
  network: any;
  token: string;

  ngOnInit() {
  }

  authentication( email:string, senha: string){
    this.requestService.loginAuthentication(email, senha).subscribe(
      data => {
        this.request = data;
        this.network = this.request.user.network;
        this.token = this.request.token;
        this.router.navigate(['/orders']);
        this.sharingService.setData(this.token, this.network);
        console.log(data);
      },
      error =>{
        alert('usuário ou senha incorretos')
        this.email = '';
        this.password = '';
      })
  }
}