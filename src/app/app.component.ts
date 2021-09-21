import { Component } from '@angular/core';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { RequestService } from './shared/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'accon-integration';

  constructor(){ }

}