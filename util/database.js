import firebase from "./firebase";

const firestore = firebase.firestore();

// Metodo para obtener un usuario en especifico
export function getUser(uid) {
    return firestore.collection('users').doc(uid).get();
}

// Metodo para crear el usuario
export function createUser(uid, data) {
    return firestore.collection('users').doc(uid).set( data, { merge: true });
}

// Metodo para craer un comentario en la base de datos
export function createComment(data) {
    return firestore.collection('comments').add(data);
}

// Se modifica el booleano del comentario
export function deleteComment(id) {
    return firestore.collection('comments').doc(id).set({ show: false }, { merge: true });
}

// Se traen todos los comentarios relacionados a ese post que no esten eliminados
export function getComments(postDate){
    let query = firestore.collection('comments').where('post', '==', postDate);
    query = query.where('show', '==', true);
    return query.get();
}


// this.firestore.getAll('appointments').subscribe(data => {
//     this.appointmentList = data.map(e => {
//       return {
//         id: e.payload.doc.id,
//         ...e.payload.doc.data()
//       } as Appointment;
//     });
//   });

// this.firestore.getValue(this.editedUserId, 'users').subscribe((user: User) => {
//     this.editedUser = user;

//     this.editForm.patchValue(user);
//     console.log('edited user: ', this.editedUser);
//   });

// firestore.collection("CollectionName").get().then((snapshot) => {snapshot.docs.map(doc => {
// 	console.log(doc)
// 	})
// });