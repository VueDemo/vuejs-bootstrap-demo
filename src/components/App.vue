<template>
  <nav class="navbar navbar-default">
     <div class="container">
        <ul class="nav navbar-nav">
          <li><a href="#/users">Grid Users(Wilddog)</a></li>
          <li><a href="#/news/1">Hacker News(Firebase)</a></li>
          <li><a href="#/images">User Images (AJAX)</a></li>
          <li><a v-link="{ path: '/secretquote' }" v-if="user.authenticated">Secret Quote</a></li>
       </ul>
       	<!-- Right Side Of Navbar -->
			 <ul class="nav navbar-nav navbar-right">
				  <li><a v-link="'login'" v-if="!user.authenticated">Login</a></li>
          <li><a v-link="'signup'" v-if="!user.authenticated">Sign Up</a></li>
          <li><a v-link="'login'" v-if="user.authenticated" @click="logout()">Logout</a></li>
       </ul>   
     </div>    
  </nav>
  <div class="container">
      <router-view
          class="view"
          keep-alive
          transition
          transition-mode="out-in">
      </router-view>
  </div>
  <div style="margin-top: 125px;">
    <!-- Push Footer -->
  </div>
  <footer class="footer">
    <div class="container" style="color: #777;">
      <!-- Company Information -->
      <div class="pull-left" style="padding-top: 28px;">
        Copyright &copy; Yourname - <a v-link="{ path: '/terms'}">Terms Of Service</a>
      </div>
        <div class="clearfix"></div>
    </div>
  </footer>
</template>


<script>
import auth from '../auth'

export default {
  data() {
    return {
      user: auth.user
    }
  },

  methods: {

    logout() {
      auth.logout()
    }
  }
}
</script>
<style lang="stylus">
@import "../variables.styl"

ul
  list-style-type none
  padding 0
  margin 0

a
  color #000
  cursor pointer
  text-decoration none
  
#wrapper
  background-color $bg
  position relative
  width 100%
  min-height 80px
  margin 0 auto


.view
  width 100%
  transition opacity .2s ease
  box-sizing border-box
  padding 8px 20px
  &.v-enter, &.v-leave
    opacity 0


</style>
