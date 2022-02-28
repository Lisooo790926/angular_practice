import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { DataState } from './enum/data-state.enum';
import { Status } from './enum/status.emun';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom.response';
import { Server } from './interface/server';
import { ServerService } from './service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // all variable in component can be read by this component html!

  appState$: Observable<AppState<CustomResponse>>;
  appState2$: Observable<Server[]>;

  // for showing data state
  // this attributes can be used in component
  readonly DataState = DataState;
  readonly Status = Status;

  // just for record status
  private filterSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  filterStatus$ = this.filterSubject.asObservable();

  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  // find serverService and inject it
  constructor(private serverService: ServerService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.appState$ = this.serverService.servers$
      .pipe(
        map(response => {
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED_STATE, appData: response }
        }),
        startWith({ dataState: DataState.LOADING_STATE }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR_STATE, error })
        })
      )

    this.appState2$ = this.serverService.servers2$
      .pipe(
        map(response => response),
        catchError((error: string) => {
          return [];
        })
      );
  }

  pingServer(ipAddress: string): void {
    this.filterSubject.next(ipAddress);
    this.appState$ = this.serverService.ping$(ipAddress)
      .pipe(
        map(response => {
          const index = this.dataSubject.value.data.servers.findIndex(server => server.id === response.data.server.id);
          this.dataSubject.value.data.servers[index] = response.data.server;
          this.filterSubject.next('');
          return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.filterSubject.next('');
          return of({ dataState: DataState.ERROR_STATE, error });
        })
      )
  }

  filter(status: Status): void {
    this.appState$ = this.serverService.filter$(status, this.dataSubject.value)
      .pipe(
        map(response => {
          return { dataState: DataState.LOADED_STATE, appData: response }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR_STATE, error });
        })
      )
  }

  saveServer($event): void {
    console.log($event as Server);
    this.isLoading.next(true);
    this.appState$ = this.serverService.save$($event as Server)
      .pipe(
        map(response => {
          this.dataSubject.next(
            {...response, data:{servers : [response.data.server, ...this.dataSubject.value.data.servers]}}
          );
          // close the modal
          document.getElementById('closeModal').click();
          // give next time init data
          this.isLoading.next(false);
          return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoading.next(false);
          return of({ dataState: DataState.ERROR_STATE, error });
        })
      )
  }

}