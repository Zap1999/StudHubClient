import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../service/alert.service';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-auth',
    templateUrl: './password_forgot.component.html',
    styleUrls: ['./password_forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {

    passwordForgotForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.passwordForgotForm = this.formBuilder.group({
            email: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/password_reset';
    }

    // convenience getter for easy access to form fields
    get f() { return this.passwordForgotForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.passwordForgotForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.forgotPassword(this.f.email.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}
