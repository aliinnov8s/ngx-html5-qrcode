import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QrcodeReaderComponent } from './qrcode-reader/qrcode-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    QrcodeReaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
