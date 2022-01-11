import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import {Html5Qrcode} from "html5-qrcode";

@Component({
  selector: 'html5-qrcode',
  template: `
    <div #reader id="reader" width="600px"></div>
  `,
  styles: []
})
export class NgxHtml5QrcodeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('reader') reader: ElementRef | undefined;
  html5QrCode!: Html5Qrcode;
  cameraId: string = '';
  @Output() scannedQrCode: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.reader);

    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        // .. use this to start scanning.
        this.cameraId = devices[0].id;
        this.startHtmlQrCode();
      }
    }).catch(err => {
      console.log(err);
    });
  }

  startHtmlQrCode() {
    this.html5QrCode = new Html5Qrcode(this.reader?.nativeElement?.id);

    this.html5QrCode.start(
      this.cameraId,
      {
        fps: 10,    // Optional, frame per seconds for qr code scanning
        qrbox: {width: 250, height: 250}  // Optional, if you want bounded box UI
      },
      (decodedText, decodedResult) => {
        // do something when code is read
        this.scannedQrCode.emit(decodedText);
      },
      (errorMessage) => {
        // parse error, ignore it.
      })
      .catch((err) => {
        // Start failed, handle it.
      });
  }

  ngOnDestroy() {
    this.html5QrCode.stop().then((ignore) => {
      // QR Code scanning is stopped.
    }).catch((err) => {
      // Stop failed, handle it.
    });
  }

}
