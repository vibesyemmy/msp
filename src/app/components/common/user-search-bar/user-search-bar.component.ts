import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-search-bar',
  templateUrl: './user-search-bar.component.html',
  styleUrls: ['./user-search-bar.component.css']
})
export class UserSearchBarComponent implements OnInit {
  
  @Input('classes')
  klasses:string[] = [];
  
  @Input()
  placeholder:string = "Search";

  @Input()
  name:string = "input";

  @Output()
  keyUp = new EventEmitter<string>();

  @Output()
  backspace = new EventEmitter<{statue:boolean, key:string}>();
  
  classes() {
    let c = "form-control";
    for (let i:number = 0; i < this.klasses.length; i++) {
      c = c+this.klasses[i]+" ";
    }
    return c;
  }
  constructor() { }

  up(value) {
    // console.log(value);
    if(value.keyCode == 8) {
      this.backspace.emit({statue:true, key: value.target.value});
    }
    this.keyUp.emit(value.target.value);
  }

  back(status) {
    this.backspace.emit(status);
  }

  ngOnInit() {
  }

}
