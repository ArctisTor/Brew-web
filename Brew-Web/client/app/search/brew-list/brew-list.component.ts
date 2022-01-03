import {Component, Input, OnInit, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {Brewery} from "../../shared/models/Brewery";

@Component({
  selector: 'app-beer-list',
  templateUrl: './brew-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
//The literal difference is that one has state, and the other doesn’t.
// That means the stateful components are keeping track of changing data,
// while stateless components print out what is given to them via props, or they always render the same thing.
export class BrewListComponent implements OnInit {

  @Input() breweryList!: Brewery[];
  @Output() selectedBrewery = new EventEmitter<Brewery>();

  paginatedBreweryList!: Brewery[];
  totalPages!: number;
  breweryPerPage = 10;
  currentPaginationNumber = 1;
  hasPrevious = false;
  hasNext= false;
  pageLowerLimit = 0;
  pageUpperLimit = 0;
  paginationLowerValue = 0;
  paginationUpperValue = 0;
  totalBreweryItems = 0;

  constructor() { }

  ngOnInit(): void {}

  //this makes the component STATEFUL
  ngOnChanges(changes: SimpleChanges) {
    this.totalBreweryItems = changes['breweryList'].currentValue.length;
    this.paginateBreweryList(changes['breweryList'].currentValue);
  }


  private paginateBreweryList(breweryList: Brewery[]) {
    this.paginatedBreweryList = [];
    if (breweryList && breweryList.length > 0) {
      //calculate total pages
      this.totalPages = Math.ceil(this.totalBreweryItems/this.breweryPerPage);

      // ensure current page isn't out of range
      if (this.currentPaginationNumber < 1) {
        this.currentPaginationNumber = 1;
      } else if (this.currentPaginationNumber > this.totalPages) {
        this.currentPaginationNumber = this.totalPages;
      }

      //hasPrevious and hasNext logic
      if (this.currentPaginationNumber <= 1) {
        if (this.currentPaginationNumber < this.totalPages) {
          this.hasNext = true;
        } else {
          this.hasNext = false;
        }
        this.hasPrevious = false;
      } else if (this.currentPaginationNumber === this.totalPages) {
        this.hasPrevious = true;
        this.hasNext = false;
      } else {
        this.hasNext = true;
        this.hasPrevious = true;
      }

      var startIndex = (this.currentPaginationNumber -1)*this.breweryPerPage;
      var endIndex = Math.min(startIndex+this.breweryPerPage-1,  this.totalBreweryItems - 1);

      if (startIndex < 0) {
        startIndex = 0;
      }

      if (endIndex < 0) {
        endIndex = 0;
      }

      if (startIndex == endIndex) {
        if (this.breweryList.length) {
          this.paginatedBreweryList.push(this.breweryList[startIndex]);
        }
      }else {
        this.paginatedBreweryList = [];
        for (let i = startIndex; i < endIndex+1; i++) {
          this.paginatedBreweryList.push(this.breweryList[i]);
        }
      }


      this.pageLowerLimit = (endIndex > 0 ? startIndex+1 : 0);
      this.pageUpperLimit = (endIndex > 0 ? endIndex+1 : 0);
      if (this.paginatedBreweryList.length == 1) {
        this.pageLowerLimit = 1;
        this.pageUpperLimit = 1;
      }

    }
  }

  brewList(): number[] {
    var index: any[] = [];

    if (!this.paginatedBreweryList.length) {
      return index;
    }

    if (this.currentPaginationNumber <= this.paginationLowerValue) {
      this.paginationLowerValue = Math.max(this.pageLowerLimit-this.breweryPerPage,  0);
      this.paginationUpperValue = this.pageUpperLimit-this.breweryPerPage;
    }

    if (this.currentPaginationNumber > this.paginationUpperValue) {
      this.paginationUpperValue = Math.min(this.pageUpperLimit+this.breweryPerPage, this.totalPages);
      this.paginationLowerValue = this.pageLowerLimit+this.breweryPerPage;
    }

    if (this.currentPaginationNumber == this.totalPages) {
      this.paginationUpperValue = this.totalPages;
      this.paginationLowerValue = Math.max(this.totalPages-this.breweryPerPage, 0);
    }

    if (this.currentPaginationNumber == 1) {
      this.paginationLowerValue = 0;
      this.paginationUpperValue = Math.min(this.pageLowerLimit+this.breweryPerPage, this.totalPages);
    }

    for (var i = this.paginationLowerValue; i < this.paginationUpperValue; i++) {
      index.push(i);
    }
    return index;
  }

  changePage(selectedPage: any) {
    this.currentPaginationNumber = selectedPage;
    this.paginateBreweryList(this.breweryList);
  }

  selectBrewery(brewery: Brewery){
    this.selectedBrewery.emit(brewery);
  }
}
