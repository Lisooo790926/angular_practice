# ServerApp

## Purpose
Learn basic angular to build the basic site and combine with SpringBoot project

## What I learned 

### Basic 
1. Why using Angular 
   Because JQuery and JS code are hard to maintain, Angular is more modular
   - Clean structure
   - Re-use code
   - More Testable
2. Angular Main Folder (Not include all) : 
   - node_module : 3 party lib
   - src folder : actual source code for our app
   - angular-cli.json : standard configuration 
   - karma.config.js : test runner for js code
   - package.json : for node setting
   - tsconfig.json : typescript compiler setting
3. Basic html Angular  
   https://airy-chinchilla-ff4.notion.site/Angular-html-Basic-ee962a935dd54d3a8a057b8e56492034
4. Basic Angular CLI Command : For boosting create the files  
   https://airy-chinchilla-ff4.notion.site/Command-Angular-CLI-9a3a2c705f144b8eb3324a5454dcc611
   
### Component and Module
5. Module vs Component :   
   **Module** : control the external or internal dependencies (ex : import FormModule, declare otherComponent)  
   **Component** : decide the content of the given block (html, css and so on)
6. NgModules : 
   - import : for external modules import
   - providers : for Injection purpose to reuse service in this module (include child)
   - declarations : for declare what kind of internal components you need to use in this module
   - exports : what kind of attribute you want to export
   - bootstrap : only define in root module for root html, enviorment setting 
7. Attribute delivery between component : (only learn parent to child and child to parent)
   - parent to child : use @Input annotation  
     **a.** defind @Input in child
     ```
        @Input() childProperty: string;
     ```  
     **b.** parent can use html tag to define what value do you want 
     ```
        <child-component [childProperty]="parentProperty">
     ```  
   - child to parent : use EventEmitter and @Output   
     **a.** defind @Output with EventEmitter in child
     ```
        @Output() messageEvent = new EventEmitter<string>();
        
        sendMessage() {
          this.messageEvent.emit(this.message)
        }
     ```  
     **b.** parent can use html to point messageEvent to parent method
     ```
        // in html 
         <child-component (messageEvent)="receiveMessage($event)">
         
        // in ts 
        receiveMessage($event) {
          this.message = $event
        }
     ```
8. Component LifeCycle :  
   https://airy-chinchilla-ff4.notion.site/OnInit-OnChanges-89ad12830ab346ea9b50673ceb07681e

### RXJS Reactive X
9. What is RXJs : 
   RX is an API for async programming with observable streams!
   Compose of Observer Pattern, Iterator Pattern, Stream, Functional Programming.
10. Observable : It is combining these two concept, can fetch data then push to subscriber one by one
    - Observer Pattern : for pushing data to subscriber (producer)
    - Iterator Pattern : for fetching data from dataSource (consumer)  
11. Promise(Ajax) vs Observable :  
    - Cannot cancel promise, observable is cancellable
    - Native promise have only 2 methods, rxjs has many
    - Promise only use in single event, Observable can be 0~many
    - Promise start immediately, observable can be lazy execution
12. Observable and Subject :   
    - Observable is for fixing data stream and only unitcast
    - Subject is for unknown data stream, it could have early-defined or late-defined data, it is multicast(stream is shared)  
    https://airy-chinchilla-ff4.notion.site/RxJS-Observable-and-Subject-BehaviorSubject-ReplaySubject-AsyncSubject-asObservable-14afba7fdb194974b07f5918bca262e8
13. Marble Diagram :   
    To understand stream concept in Observable, we could draw marble diagram to represent data stream
    ex : after go through map method, each data will be increased one
    ```
      -----1-----2-----3-----4-----------|
      map(x => x + 1)
      -----2-----3-----4-----5-----------|
    ```


## Reference 
1. https://www.youtube.com/watch?v=8ZPsZBcue50 : for guiding me to build basic angular, then i can start to build by myself 
2. https://stackoverflow.com/questions/40073941/whats-the-difference-between-an-angular-component-and-module : understand the component vs module
3. https://ithelp.ithome.com.tw/articles/10195338 : only for understanding rough concept about all parameters in NgModules
4. https://stackoverflow.com/questions/37587732/how-to-call-another-components-function-in-angular2 : for understanding the attribute delivery between components
5. https://ithelp.ithome.com.tw/articles/10203203 : for understanding basic lifeCycle when using OOTB component interface 
6. https://ithelp.ithome.com.tw/articles/10186832 : Observable introduction 
7. https://stackoverflow.com/questions/47571880/why-to-use-observables-instead-of-ajax  
   https://stackoverflow.com/questions/37364973/what-is-the-difference-between-promises-and-observables  
   : point out difference between observable and ajax
8. https://ithelp.ithome.com.tw/articles/10245022 : Observable and Subject introduction 
9. https://ithelp.ithome.com.tw/articles/10244422 : Marble Diagram for helping to understand  the stream

