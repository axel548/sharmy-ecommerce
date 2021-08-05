import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { LogoutDialogComponent } from 'src/app/shared/components/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['./home'])
      })
  }

  openDialog():void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '350px',
      data: {message: '¿Desea Cerrar Sesión?', btn: 'Cerrar Sesión'}
    })
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
      if (res) {
        console.log('Producto eliminado')
        this.logout()
      }
    })
  }

  // "./node_modules/bootstrap/dist/css/bootstrap.min.css",
}