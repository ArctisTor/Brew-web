import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {query} from "@angular/animations";
import {HttpService} from "../../shared/services/http/http.service";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  searchFormGroup!: FormGroup;
  isQuery = false;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.searchFormGroup = new FormGroup({
      query: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)]))
    })

    this.onQuery();
  }

  onQuery(): void{
    this.searchFormGroup.get('query')?.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(val=> {
      if (!this.searchFormGroup.get('query')?.invalid){
        console.log(val);
      }
    })
  }

}
