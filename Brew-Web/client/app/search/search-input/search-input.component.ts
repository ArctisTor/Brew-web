import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {query} from "@angular/animations";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  searchFormGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.searchFormGroup = new FormGroup({
      query: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)]))
    })

    this.onQuery();
  }

  onQuery(): void{
    this.searchFormGroup.get('query')?.valueChanges.subscribe(val=> {
      if (!this.searchFormGroup.get('query')?.invalid){
        console.log(val);
      }
    })
  }

}
