import { Injectable } from '@angular/core';
import { Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

import { Car, CarKey } from './car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private db: AngularFirestore,
  ) { }

  getList(): Observable<CarKey[]> {
    return this.db.collection<Car>('cars')
      .snapshotChanges()
      .pipe(
        debounceTime(500),
        map(this.parseCarCollectionByChangeAction)
      );
  }

  getItem(id: string): Observable<CarKey> {
    console.log('getItem', id)
    return this.db.doc<Car>(`cars/${id}`)
      .snapshotChanges()
      .pipe(
        debounceTime(500),
        map(this.parseCarModelByAction)
      );
  }

  private parseCarCollectionByChangeAction = (actions: DocumentChangeAction<Car>[]): CarKey[] => {
    if (!actions) {
      return [];
    }
    return actions.map(this.parseCarModelByChangeAction).filter(action => !!action);
  }
  
  private parseCarModelByChangeAction = (action: DocumentChangeAction<Car>): CarKey => {
    if (!action) {
      return null;
    }
    const key = action.payload.doc.id;
    const data = action.payload.doc.data();
    return { key, ...data } as CarKey;
  }

  private parseCarModelByAction = (action: Action<QueryDocumentSnapshot<Car>>): CarKey => {
    if (!action) {
      return null;
    }
    console.log('parseCarModelByAction', action.payload.data())
    const key = action.payload.id
    const data = action.payload.data();
    return { key, ...data} as CarKey;
  }

}