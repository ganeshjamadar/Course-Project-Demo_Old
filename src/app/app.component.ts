import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { DataStorageService } from './Shared/DataStorageService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dataStorage: DataStorageService)
  {}
  
  loadedFeature = 'recipes'
   
  onNavigate(feature: string)
  {
    this.loadedFeature = feature;
  }

  ngOnInit()
  {
    firebase.initializeApp(
      {
        apiKey: "AIzaSyDhApVfFA5n5D_1kFYKL_FXApcrT1jxxLc",
        authDomain: "RecipeDemo.firebaseapp.com"
      }
    )
    //this.dataStorage.GetData();
  }
}
