<template>
  <form id="form" v-on:submit.prevent="addUser">
    <input v-model="newUser.name" >
    <input v-model="newUser.email">
    <input type="submit" value="Add User" v-show="isValid">
    <div class="errors">
      <span v-show="!validation.name">required user name.</span>
      <span v-show="!validation.email">Please provide a valid email address.</span>
  </ul>
    </div>
  </form>
 
  <form id="search">
    Search <input name="query" v-model="searchQuery">
  </form> 
  <demo-grid
    :data="gridData"
    :columns="gridColumns"
    :filter-key="searchQuery">
  </demo-grid>
</template>

<script>
import userStore from '../store/users'
import DemoGrid from './DemoGrid.vue'

const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  name: 'UsersView',
  
  components: {
    DemoGrid
  },
 
  data () {
    return {
      newUser: {
        name: '',
        email: ''
      },
      searchQuery: '',
      gridColumns: ['name','email'],
      gridData: [ /*
        { name: 'Chuck Norris',email: 'a@139.com' },
        { name: 'Bruce Lee',email: 'b@139.com' },
        { name: 'Jackie Chan',email: 'c@139.com' },
        { name: 'Jet Li',email: 'd@139.com' } */
      ]
    }
  },
  created () {
    userStore.init()
    userStore.on('add-user', this.updateAdd)
    userStore.on('remove-user', this.updateRemove)
  },
  computed: {
    validation: function () {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  }, 
  events: {
    'deleteItem': function (user) {
       console.log('remove' , user)
       // this.gridData.$remove(user)
       this.removeUser(user.id)
    }
  },
  methods: {
    updateAdd () {
      this.gridData.push(userStore.user)
      // console.log('add '+ users.user.name)
    },
    updateRemove () {
      let id = userStore.userId
      let self=this
      console.log('remove: ' + id)
      this.gridData.some(function (user) {
        if (user.id === id) {
          self.gridData.$remove(user)
          return true
        }
      })
    },
   addUser () {
      //console.log('addUser')
      userStore.addUser(this.newUser)
      this.newUser.name = ''
      this.newUser.email = ''
    },
    removeUser (id) {
       userStore.removeUserById(id)
    }
  }
}
</script>

<style lang="stylus">
@import "../variables.styl"

#search
  margin-bottom 10px
.errors
  color #f00


</style>
