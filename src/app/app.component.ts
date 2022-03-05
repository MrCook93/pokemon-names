import { Component } from '@angular/core';
import { pokeApiService } from './services/pokeapi.service';
import { pokeInfo } from './classes/pokeclasses';
import { pokeDetails } from './classes/pokeclasses';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  searchText = '';

  constructor(private _pokeApiService : pokeApiService)
  {
  
  }

  listPokemon:pokeInfo[] = [];
  listPokemonDetails:pokeDetails[] = [];

  ngOnInit() {

    //perform the basic GET API call to return list of pokemon for "https://pokeapi.co/api/v2/pokemon?limit=151"
    this. _pokeApiService.getPokemon().subscribe
    (
      data =>
      {
        this.listPokemon = data.results;
        console.log(this.listPokemon);
        let currentPokemon;
        
        //loop each pokemon in the list
        for (var i = 0; i < this.listPokemon.length; i++){

        //perform GET API call to individual pokemon URLs to retrieve more details for each
        this. _pokeApiService.getPokemonDetails(this.listPokemon[i].url).subscribe
        (
            data =>
            {
              currentPokemon = data;
              //push the details for this pokemon onto the current array
              this.listPokemonDetails.push(currentPokemon);

             
            }

        );  
          }
          //call function for sorting the array, using id as parameter (id = pokemon number)
          //this.listPokemonDetails.sort(this.sort_by_key("id"));
          console.log(this.listPokemonDetails);
          this.listPokemonDetails = this.sort_by_key(this.listPokemonDetails, 'id');
          console.log(this.listPokemonDetails);

      }
  
    );



  }

  //generic function for sorting an array of JSON objects on an attribute
  sort_by_key(array, key)
  {
   return array.sort(function(a, b)
   {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
   });
  }

  /*
    return function(a,b){
       if (a[prop] > b[prop]){
           return 1;
       } else if(a[prop] < b[prop]){
           return -1;
       }
       return 0;
    }

    */
 


//no longer used in application, replaced with filter pipe
 filterList() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('fString');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
 
}    
 



