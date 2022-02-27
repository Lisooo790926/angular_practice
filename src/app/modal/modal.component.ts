import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Status } from '../enum/status.emun';
import { Server } from '../interface/server';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent  {
    
    @Output() serverEvent = new EventEmitter<Server>();

    readonly Status = Status;

    closeResult: string;
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
      console.log(serverForm.value.status);
      this.serverEvent.emit(serverForm.value as Server);
      serverForm.resetForm({ status: this.Status.SERVER_DOWN });
    }
}