import { Component , EventEmitter, Output} from '@angular/core';
import { DataStorageService } from '../../Shared/DataStorageService';
import { AuthService } from '../../auth/auth.service';


@Component(
    {
        selector: "app-header",
        templateUrl: "./header.component.html"
    }
)
export class HeaderComponent{

    constructor(private dataStorage: DataStorageService,
                public authService: AuthService)
    {

    }

    OnSaveData()
    {
        this.dataStorage.SaveData();
    }

    OnFetchData()
    {
        this.dataStorage.GetData();
    }

    OnLogOut()
    {
        this.authService.logOut();
    }
}