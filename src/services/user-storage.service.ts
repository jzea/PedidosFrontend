import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserStorageService {
    public idUser: string;
    public avatar: string;
    public latitud: string;
    public longitud: string;
    public rol: string;
    private latLng: Subject<any[]> = new Subject();
    private rolObservable: Subject<string> = new Subject();
    constructor(public storage: Storage) {
    }

    setIdUser(idUser: string) {
        this.storage.set('idUser', idUser);
        this.idUser = idUser;
    }
    setRol(rol:string){
        this.storage.set('rol', rol);
        this.rol=rol;
        this.rolObservable.next(rol);
    }
    getRol(): Promise<string> {
        return this.storage.get('rol')
            .then((rol) => {
                return rol;
            });
    }
    getIdUser(): Promise<string> {
        return this.storage.get('idUser')
            .then((idUser) => {
                return idUser;
            });
    }

    setAvatar(avatar: string) {
        this.avatar = avatar;
    }

    getAvatar(): string {
        return this.avatar;
    }
    
    removeIdUser() {
        this.storage.clear();
    }
    setLatLng(latLng){
        this.latLng.next(latLng);
    }
    getLatLng(): Observable<any[]> {
        return this.latLng.asObservable();
    }
    getRolObservable(): Observable<string> {
        return this.rolObservable.asObservable();
    }
}