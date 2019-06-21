import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../service/alert.service';
import { AuthenticationService } from '../../service/authentication.service';
import { SocketService } from '../../service/socket.service';
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-auth',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
     private connection: any;
    constructor(
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        httpVar: HttpClient
    ) {
      this.connection = SocketService.getInstance(httpVar);
    }

    ngOnInit() {

        // redirect to home if already logged in
        if (localStorage.getItem('jwt-token')) {
            this.router.navigate(['/']);
        }

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.init();
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

  public init() {
    this.connection.initSocket();
    this.onMessage();
  }

  public sendMessage(message: {subject_type: string, id: string}): void {
    if (!message) {
      return;
    }
    this.connection.send(message);
  }

  public onMessage(): void {
    const thus = this;
    this.connection.onMessage((message: {subject_type: string, id: string}) => {
      thus.snackBar.open(message.id, message.subject_type, {duration: 3000}).onAction().subscribe(() => {
        thus.sendMessage({subject_type: 'question', id: '1'});
      });
    });
  }
}
