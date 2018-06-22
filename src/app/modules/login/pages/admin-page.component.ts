import {Component} from '@angular/core';

@Component({
  selector: 'app-admin-page',
  styles: [`
    .page {
      margin-top: 150px;
    }
  `],
  template: `
    <main class="page">
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-6 mx-md-auto">
              <div class="card card-body">
                <app-login-form></app-login-form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `
})
export class AdminPageComponent {
}
