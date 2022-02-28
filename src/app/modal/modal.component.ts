import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { Status, StatusStringMapping } from '../enum/status.emun';
import { Server } from '../interface/server';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent  {
    
    @Output() serverEvent = new EventEmitter<{server:Server, isLoading:BehaviorSubject<boolean>}>();

    readonly Status = Status;
    readonly StatusStringMapping = StatusStringMapping;

    statuses:Status[] = Object.values(Status).filter(s=>s!=='ALL');

    private closeResult: string;
    private loading = new BehaviorSubject<boolean>(false);
    loading$ = this.loading.asObservable();

    constructor(private modalService: NgbModal) { }

    open(content:any) {
      console.log(content);
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }).then(result => console.log(this.closeResult));
    }
  
    getDismissReason(reason: any) {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

    updateServer(serverForm: NgForm) {
      this.loading.next(true);
      this.serverEvent.emit({server:serverForm.value as Server, isLoading:this.loading});
      serverForm.resetForm({ status: this.Status.SERVER_DOWN });
    }
}