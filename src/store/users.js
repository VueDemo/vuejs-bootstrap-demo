//import RemoteDB from 'firebase'
//const baseURL = 'https://vue-demo.firebaseio.com/'

import RemoteDB from 'wilddog'
const baseURL = new RemoteDB('https://alex.wilddogio.com/')

import { EventEmitter } from 'events'




let store = new EventEmitter()
let Users
export default store
store.removeUserById = id => {
  new RemoteDB(baseURL + 'users/' +id).remove()
}
store.addUser = user => {
  Users.push(user)
}
store.init = () => {
  //console.log('init users')
  Users = new RemoteDB(baseURL + 'users')
  Users.on('child_added', function (snapshot) {
    let item = snapshot.val()
    item.id = snapshot.key()
    store.user=item
    //console.log('child_added',item)
    store.emit('add-user')
  })

  Users.on('child_removed', function (snapshot) {
    const id = snapshot.key()
    store.userId=id
    store.emit('remove-user')
    /*  app.users.some(function (user) {
        if (user.id === id) {
          app.users.$remove(user)
          return true
        }
      }) */
  })
}

