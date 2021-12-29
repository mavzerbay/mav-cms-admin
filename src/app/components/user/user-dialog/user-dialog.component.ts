import { Component, isDevMode, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AppUser } from 'src/app/models/app-user';
import { IApiResponse } from 'src/app/shared/models/api-response';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { MavDataService } from 'src/app/shared/services/mav-data.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private dataService: MavDataService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private localizationService: LocalizationService,
  ) { }

  appUserId: string = this.config.data;

  formAppUser!: FormGroup;

  private unsubscribe = new Subject();

  ngOnInit(): void {
    this.createAppUserForm();
    if (this.appUserId)
      this.getAppUser();
  }

  closeDialog() {
    this.ref.close();
  }

  isMatching: boolean = true;

  private createAppUserForm() {
    this.formAppUser = this.formBuilder.group({
      id: [{ value: null, disabled: false }],
      name: [{ value: null, disabled: false }, Validators.required],
      surname: [{ value: null, disabled: false }, Validators.required],
      email: [{ value: null, disabled: false }, Validators.required],
      userName: [{ value: null, disabled: false }, Validators.required],
      phoneNumber: [{ value: null, disabled: false }, Validators.required],
      password: [{ value: null, disabled: false }, this.appUserId ? null : [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      passwordConfirm: [{ value: null, disabled: false }, this.appUserId ? null : [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      profileImagePath: [{ value: null, disabled: false }],
      profileImageFile: [{ value: null, disabled: false }],
      userRoleIdList: [{ value: null, disabled: false }, Validators.required],
      userRoles: [{ value: null, disabled: false }, Validators.required],
    });

    this.formAppUser.get('password')?.valueChanges.subscribe((val) => {
      if (val) {
        this.isMatching = val == this.formAppUser.get('passwordConfirm')?.value;
      } else if (val == null && this.formAppUser.get('passwordConfirm')?.value == null) {
        this.isMatching = true;
      }
      console.log("::isMatching 1", this.isMatching);
    })
    this.formAppUser.get('passwordConfirm')?.valueChanges.subscribe((val) => {
      if (val) {
        this.isMatching = val == this.formAppUser.get('password')?.value;
      } else if (val == null && this.formAppUser.get('password')?.value == null) {
        this.isMatching = true;
      }
      console.log("::isMatching 2", this.isMatching);
    })

    this.formAppUser.get('userRoles')?.valueChanges.subscribe((val: any[]) => {
      console.log(val);
      if (val && val.length > 0) {
        console.log(val.map(x => x.id));
        this.formAppUser.get('userRoleIdList')?.setValue(val.map(x => x.id));
      }
    })
  }

  translate(keyName: string) {
    return this.localizationService.translate(keyName);
  }

  private getAppUser() {
    this.dataService.getById<AppUser>(`/AppUser`, this.appUserId).subscribe((response: IApiResponse<AppUser>) => {
      if (response && response.isSuccess) {
        this.formAppUser.patchValue(response.dataSingle);
      } else {
        if (response.error) {
          let errorMessage;
          for (const key in response.error) {
            if (Object.prototype.hasOwnProperty.call(response.error, key)) {
              if (this.formAppUser.get(key) != null) {
                this.formAppUser.get(key)?.setErrors(Validators.required, response.error[key]);
              }
              errorMessage += response.error[key];
            }
          }
          this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 3000 });
        }
      }
    }, error => {
      if (isDevMode())
        console.log(error);
    })
  }

  saveAppUser() {
    if (this.formAppUser.valid) {
      this.dataService.saveData<AppUser>("/AppUser", this.formAppUser.value).pipe(takeUntil(this.unsubscribe)).subscribe(response => {
        if (response && response.isSuccess) {
          this.ref.close(response);
        } else {
          if (response.error) {
            let errorMessage;
            for (const key in response.error) {
              if (Object.prototype.hasOwnProperty.call(response.error, key)) {
                if (this.formAppUser.get(key) != null) {
                  this.formAppUser.get(key)?.setErrors(Validators.required, response.error[key]);
                }
                errorMessage += response.error[key];
              }
            }
            this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: errorMessage, life: 3000 });
          }
          this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: response.message, life: 3000 });
        }
      }, error => {
        if (isDevMode())
          console.log(error);
      })
    }
  }

}
