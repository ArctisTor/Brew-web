import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
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
  paginatedBreweryList!: Brewery[];
  requiredPaginatedPages!: number;
  breweryPerPage = 10;
  currentPaginationNumber = 1;
  hasPrevious = false;
  hasNext= false;
  pageLowerLimit = 0;
  pageUpperLimit = 0;

  constructor() { }

  ngOnInit(): void {}

  //this makes the component STATEFUL
  ngOnChanges(changes: SimpleChanges) {
    this.paginateBreweryList(changes['breweryList'].currentValue);
  }


  private paginateBreweryList(breweryList: Brewery[]) {
    if (!breweryList || breweryList.length <= 0) {
      this.paginatedBreweryList = [];
    } else {
      this.requiredPaginatedPages = Math.ceil(this.breweryList.length/this.breweryPerPage);

      //ensure current page isn't out of range
     if (this.currentPaginationNumber < 1) {
       this.currentPaginationNumber = 1
     } else if (this.currentPaginationNumber > this.requiredPaginatedPages){
       this.currentPaginationNumber = this.requiredPaginatedPages;
     }

     //hasPrevious and hasNext logic
      if (this.currentPaginationNumber <= 1){
        if (this.currentPaginationNumber < this.requiredPaginatedPages){
          this.hasNext = true;
        } else {
          this.hasNext = false;
        }
        this.hasPrevious = false;
      }else if (this.currentPaginationNumber == this.requiredPaginatedPages) {
        this.hasPrevious = true;
        this.hasNext= false;
      } else{
        this.hasNext = true;
        this.hasPrevious = true;
      }

      var startIndex = (this.currentPaginationNumber-1)*this.breweryPerPage;
      var endIndex = Math.min(startIndex+this.breweryPerPage-1, this.breweryList.length-1);

      if (endIndex < 0) {
        endIndex = 0;
      }

      if (startIndex == endIndex) {
        this.paginatedBreweryList = [];
        this.paginatedBreweryList.push(this.breweryList[startIndex]);
      }else {
        this.paginatedBreweryList = [];
        for (let i = startIndex; i < endIndex+1; i++) {
          this.paginatedBreweryList.push(this.breweryList[i]);
        }
      }


      this.pageLowerLimit = (endIndex > 0 ? startIndex+1 : 0);
      this.pageUpperLimit = (endIndex > 0 ? endIndex+1: 0);
      if (this.paginatedBreweryList.length == 1) {
        this.pageLowerLimit = 1;
        this.pageUpperLimit = 1;
      }
    }
  }

  brewList(): number[] {
    var index: number[] = [];

    // if (!this.paginatedBreweryList.length) {return index;}
    //
    // if (this.currentPaginationNumber <= this.pageLowerLimit) {
    //   this.pageLowerLimit = Math.max(this.pageLowerLimit-this.breweryPerPage, 0);
    //   this.pageUpperLimit = this.pageUpperLimit-this.breweryPerPage;
    // }
    //
    // if (this.currentPaginationNumber > this.pageUpperLimit) {
    //   this.pageUpperLimit = Math.min(this.pageUpperLimit+this.breweryPerPage, this.requiredPaginatedPages);
    //   this.pageLowerLimit = this.pageLowerLimit+this.breweryPerPage;
    // }
    //
    // if (this.currentPaginationNumber == this.requiredPaginatedPages) {
    //   this.pageUpperLimit = this.requiredPaginatedPages;
    //   this.pageLowerLimit = this.requiredPaginatedPages-this.breweryPerPage;
    // }
    //
    // if (this.currentPaginationNumber == 1) {
    //   this.pageLowerLimit = 0;
    //   this.pageUpperLimit = Math.min(this.pageLowerLimit+this.breweryPerPage, this.requiredPaginatedPages)
    // }
    //
    for (let i = this.pageLowerLimit; i < this.pageUpperLimit; i++) {index.push(i);}

    // console.log('lower ' + this.pageLowerLimit + ' INDEX: '+ index + ' upper ' + this.pageUpperLimit);
    return index;
  }

  changePage(selectedPage: any) {
    this.currentPaginationNumber = selectedPage;
    this.paginateBreweryList(this.breweryList);
  }
}
