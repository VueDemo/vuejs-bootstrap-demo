<template>
  <alert
	  :duration="3000"
	  type="success"
	  width="400px"
	  placement="top-right"
	  dismissable>
	  <span class="icon-ok-circled alert-icon-float-left"></span>
	  <strong>Well Done!</strong>
	  <p>You successfully read this important alert message.</p>
  </alert>
	<v-select multiple :limit="3" :options="fruitOptions" :search="true">
	</v-select>
  <button class="btn btn-primary" @click="fetchUsers()">Get Users</button>
  <div class="row">
    <div class="col-xs-6 col-md-3" v-for="user in users">
      <div class="thumbnail">
        <img :src="user.avatar_url" alt="{{ user.login }}">
        <div class="caption">
          <a :href="user.html_url">
            <h3 class="username">{{ user.login }}</h3>
          </a>
        </div>        
      </div>      
    </div>    
  </div>
</template>

<script>
import { alert,select } from 'vue-strap'
export default {
  name: 'UserImageView',
  data() {
    return {
      users: [],
      fruitOptions : [
		  {value:'apple', label:'Apple'},
		  {value:'banana', label:'Banana'},
		  {value:'cherry', label:'Cherry'},
		  {value:'orange', label:'Orange'},
		  {value:'grape', label:'Grape'},
		]
    }
  },
  components: {
    alert:alert,
    vSelect:select
  },
  methods: {
    fetchUsers() {
      this.$http.get('https://api.github.com/users', (data) => {
        this.users = data
      })
      .error((err) => console.log(err))
    }
  }
}
</script>

<style>
.username {
  text-align: center;
}
</style>
