import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { CurrentUser } from 'src/app/shared/models/current-user';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavAuthService } from 'src/app/shared/services/mav-auth.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    MessageService,
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private localizationService: LocalizationService,
    private formBuilder: FormBuilder,
    private authService: MavAuthService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }
  returnUrl: string = '';

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '';
    this.createLoginForm();
  }

  loginForm!: FormGroup;

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      emailOrUserName: [null, Validators.required],
      password: [null, Validators.required],
      rememberMe: [false, Validators.required],
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.emailOrUserName, this.loginForm.value.password, this.loginForm.value.rememberMe).subscribe((loginResponse: IApiResponse<CurrentUser>) => {
        if (loginResponse && loginResponse.isSuccess) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          if (loginResponse.errors) {
            let errorMessage;
            for (const key in loginResponse.errors) {
              if (Object.prototype.hasOwnProperty.call(loginResponse.errors, key)) {
                if (this.loginForm.get(key) != null) {
                  this.loginForm.get(key)?.setErrors(Validators.required, loginResponse.errors[key]);
                }
                errorMessage += loginResponse.errors[key];
              }
            }
            this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 3000 });
          }
        }
      })
    }
  }

}
