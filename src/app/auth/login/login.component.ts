import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interFace';
import { Minerals } from 'src/app/shared/models/minerals.interFace';
import { Hero } from 'src/app/shared/models/hero.interFace';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('mikepruebas23@gmail.com',[Validators.email, Validators.required]),
    password: new FormControl('mikegeko1',[Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authSvc: AuthService,
    private afs: AngularFirestore,
    private router: Router,
    private _snackBar: MatSnackBar) { }
    
  hide = true;

  ngOnInit(): void {}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if (user) {
        //revisar al iniciar sesion porque si hace el registro pero entra primero el guard.
        this.valideUserSmash(user.uid, email, user.emailVerified);
        // console.log(user);
        // this.checkUserIsVerified(user);
        this.router.navigate(['/home']);
      }
    } catch (error) {
      // console.log(error);
      this.openSnackBar('Correo o contraseña incorrecta');
    }
  }

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
    } else if (user) {
      this.authSvc.logout();
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  async valideUserSmash(id, email, verified){
    let data: any;
    data = await this.afs.collection('users').doc(id).valueChanges().subscribe(value => {
      if(value == undefined) {
        try {
          const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${id}`);

          const data: User = {
            uid: id,
            email: email,
            emailVerified: verified,
            role: 'SUSCRIPTOR',
            photoURL: null,
            tagName: null,
            rnkPoints: 0,
            position: ''
          };
          
          return userRef.set(data, { merge: true });
      }
        catch (error) 
        {
          console.log('ERROR: ', error);
        }
      }
      else
      {
        sessionStorage.setItem('USEREMAIL',value['email']);
        sessionStorage.setItem('USERTAGNAME',value['tagName']);
        sessionStorage.setItem('USERUID',value['uid']);
        sessionStorage.setItem('RNKPOINTS',value['rnkPoints']);
        sessionStorage.setItem('USERPHOTOURL',value['photoURL']);
      }
    });
    return data;
  }

}
