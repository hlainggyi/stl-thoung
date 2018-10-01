<template>
  <v-ons-page>
    <!-- <img src="./assets/vue-onsenui.png" alt="Wan Yu" style="padding:30px;"> -->
    <v-ons-list>
      <v-ons-list-header>Login</v-ons-list-header>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon style="color:green" icon="ion-email" class="list-item__icon"></v-ons-icon>
        </div>
        <label class="center">
          <v-ons-input type="email" placeholder="Eamil" float v-model.trim="loginForm.email" style="width:100%">
          </v-ons-input>
          <!-- <input type="email" class="text-input--material" placeholder="Email" float v-model="form.email"> -->
        </label>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon style="color:green" icon="ion-android-lock" class="list-item__icon"></v-ons-icon>
        </div>
        <label class="center">
          <v-ons-input type="password" float placeholder="Password" style="width:100%" v-model.trim="loginForm.password">
          </v-ons-input>
          <!-- <input type="password" class="text-input--material" placeholder="Password" float v-model="form.password"> -->
        </label>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">

        </div>
        <label class="center">
          <ons-button @click="login" modifier="cta" class="login-button">Log In</ons-button>
        </label>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
const fb = require('./firebaseConfig.js')

// Just a linear interpolation formula
const lerp = (x0, x1, t) => parseInt((1 - t) * x0 + t * x1, 10);
// RGB colors
const red = [244, 67, 54];
const blue = [30, 136, 229];
const purple = [103, 58, 183];
const green = [67, 160, 71];

export default {
  data() {
      return {
          loginForm: {
              email: '',
              password: ''
          },
          signupForm: {
              name: '',
              title: '',
              email: '',
              password: ''
          },
          passwordForm: {
              email: ''
          },
          showLoginForm: true,
          showForgotPassword: false,
          passwordResetSuccess: false,
          performingRequest: false,
          errorMsg: ''
      }
  },

  methods: {
    toggleForm() {
        this.errorMsg = ''
        this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
        if (this.showForgotPassword) {
            this.showLoginForm = true
            this.showForgotPassword = false
            this.passwordResetSuccess = false
        } else {
            this.showLoginForm = false
            this.showForgotPassword = true
        }
    },
    login() {
        this.performingRequest = true

        fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
            this.$store.commit('setCurrentUser', user)
            this.$store.dispatch('fetchUserProfile')
            this.performingRequest = false
            // this.$router.push('/dashboard')
        }).catch(err => {
            console.log(err)
            this.performingRequest = false
            this.errorMsg = err.message
        })
    },
    signup() {
        this.performingRequest = true

        fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
            this.$store.commit('setCurrentUser', user)

            // create user obj
            fb.usersCollection.doc(user.uid).set({
                name: this.signupForm.name,
                title: this.signupForm.title
            }).then(() => {
                this.$store.dispatch('fetchUserProfile')
                this.performingRequest = false
                // this.$router.push('/dashboard')
            }).catch(err => {
                console.log(err)
                this.performingRequest = false
                this.errorMsg = err.message
            })
        }).catch(err => {
            console.log(err)
            this.performingRequest = false
            this.errorMsg = err.message
        })
    },
    resetPassword() {
        this.performingRequest = true

        fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
            this.performingRequest = false
            this.passwordResetSuccess = true
            this.passwordForm.email = ''
        }).catch(err => {
            console.log(err)
            this.performingRequest = false
            this.errorMsg = err.message
        })
    }
  }
};
</script>

<style>
/* Custom 'white-content' modifier */

.page--material .toolbar--white-content__center,
.page--material .toolbar-button--white-content,
.page--material :checked + .tabbar--white-content__button {
  color: white;
}

.page--material .tabbar--white-content__button {
  color: rgba(255, 255, 255, 0.7);
}

.page--material .tabbar--white-content__border {
  background-color: white;
}
</style>
