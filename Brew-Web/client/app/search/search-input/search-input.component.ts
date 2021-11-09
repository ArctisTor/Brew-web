import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  searchFormGroup!: FormGroup;
  @Input() disabled!: boolean;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

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
        // @ts-ignore
      if (!this.searchFormGroup.get('query')?.invalid){
        // @ts-ignore
        this.search.emit(this.searchFormGroup.get('query')?.value);
      }
    })
  }

}
