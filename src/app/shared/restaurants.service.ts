
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private basePath = "/restaurants";

  constructor(
    private _fireStore: AngularFirestore,
    private _fireStorage: AngularFireStorage,
  ) { }

  createRestaurant(rating: any, fileupload: any) {
    const restaurants = this._fireStore.collection("restaurants");
    // Operador Spread,o principal objetivo do operador de propagação é espalhar os elementos de uma matriz ou obj
    restaurants.add({ ...rating, downloadUrl: fileupload }).then(doc => doc.update({ id: doc.id }));
  }

  listRestaurant() {
    return this._fireStore.collection("restaurants").valueChanges();
  }

  pushFileToStorage(rating: any, fileupload: any) {
    const filePath = `${this.basePath}/${fileupload.name}_${rating.nome}_${new Date()}`;
    const storageRef = this._fireStorage.ref(filePath);
    const uploadTask = this._fireStorage.upload(filePath, fileupload);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileupload.url = downloadURL;
          this.createRestaurant(rating, fileupload.url);
        });
      })
    ).subscribe();
  }

  createUserComment(restaurantId: string, userId: string, rating: object) {
    return this._fireStore.collection('restaurants').doc(restaurantId).collection('ratings').doc(userId).set(rating);
  }

  listRestaurantComment(restaurantId: string) {
    return this._fireStore.collection('restaurants')
      .doc(restaurantId).collection('ratings').valueChanges();
  }

  deleteComment(restaurantId: string, userId: string) {
    return this._fireStore.collection('restaurants')
      .doc(restaurantId).collection('ratings').doc(userId).delete();
  }
}
