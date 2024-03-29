import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  showLoader$ = this.loader.showLoader$;
  loaderText$ = this.loader.loaderText$;

  constructor(private loader: LoaderService) {}
}
