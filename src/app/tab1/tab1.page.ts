import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  time: BehaviorSubject<string> = new BehaviorSubject('00:00.00');
  timer: number;

  interval;
  startDuration = 0;

  state: 'start'  | 'pause'  | 'stop' = 'stop';

  constructor() {}
  
  startTimer(duration: number) {
    this.state = 'start';
    clearInterval(this.interval);
    this.timer = duration * 60;
    this.updateTimeValue();
    this.interval = setInterval(() => {
         this.updateTimeValue();
    }, 10); //the method start runs every 10 milliseconds
  }
 
  resumeTimer() {
    this.state = 'start';
    this.updateTimeValue();
    this.interval = setInterval(() => {
         this.updateTimeValue();
    }, 10); //the method resumen runs every 10 milliseconds
  }

  //method stop
  stopTimer() {
    clearInterval(this.interval);
    this.time.next('00:00.00');
    this.state = 'stop';

  }
  //method pause
  pauseTimer() {
    clearInterval(this.interval);
    this.state = 'pause';
  }

  //method update time
  // 1 second = 1,000 miliseconds
  // 1 minute = 60,000 miliseconds
  updateTimeValue (){
    let minutes: any = this.timer / 6000; // 60,000 / 10 = 6,000 
    let seconds: any = this.timer / 100 %60; //means 1 second is the timer / 100 and reset every time it reaches 60 
    let mseconds: any = this.timer % 100; // % means when the number is reset every time it reaches 100
    
    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);
    mseconds = String('0' + Math.floor(mseconds)).slice(-2);
    
    const text = minutes + ':' + seconds + '.' + mseconds;
    this.time.next(text);
    this.timer++;

  }


}
