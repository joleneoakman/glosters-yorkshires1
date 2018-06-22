import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  styles: [`
    .footer {
      height: 250px;      
    }
  `],
  template: `
    <footer class="footer">
      <div class="container p-lg-5 p-3">
        <div class="text-center text-default">
          <p>&copy; {{year()}}</p>
          <p>Wij verzamelen geen persoonsgegevens en gebruiken geen cookies!</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {

  year(): string {
    return '' + new Date().getFullYear();
  }
}
