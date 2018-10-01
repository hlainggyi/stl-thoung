<template>
  <v-ons-page modifier="white">
    <div class="profile-pic">
      <img :src="imageUrl">
    </div>

    <v-ons-list-title>Categories</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="(item, index) in access" :key="item.title"
        :modifier="md ? 'nodivider' : ''"
        @click="loadView(index)"
      >
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ item.title }}
        </div>
        <div class="right">
          <v-ons-icon icon="chevron-right"></v-ons-icon>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list-title>Setting</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item @click="profile(animation)">
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" icon="user"></v-ons-icon>
        </div>
        <div class="center">
          User profile
        </div>
        <div class="right">
          <v-ons-icon icon="fa-external-link"></v-ons-icon>
        </div>
      </v-ons-list-item>
      <v-ons-list-item @click="logout">
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" icon="lock"></v-ons-icon>
        </div>
        <div class="center">
          Log Out
        </div>
        <div class="right">
          <v-ons-icon icon="fa-external-link"></v-ons-icon>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import Profile from '@/views/auth/Profile.vue'
const fb = require('../firebaseConfig.js')
export default {
  computed: {
    imageUrl () {
      return this.$store.state.userProfile.imageUrl
    }
  },
  methods: {
    profile(name) {
      this.$store.commit('navigator/options', {
        // Sets animations
        animation: name,
        // Resets default options
        callback: () => this.$store.commit('navigator/options', {})
      });

      this.$store.commit('navigator/push', {
        extends: Profile,
        data() {
          return {
            animation: name
          }
        }
      });
      this.$store.state.splitter.open = false
    },
    loadView(index) {
      this.$store.commit('tabbar/set', index);
      this.$store.commit('splitter/toggle');
    },
    logout() {
        fb.auth.signOut().then(() => {
            this.$store.dispatch('clearData')
            this.$store.state.splitter.open = false
            // this.$router.push('/login')
        }).catch(err => {
            console.log(err)
        })
    }
  },
  data() {
    return {
      animation: 'default',
      access: [
        {
          title: 'Home',
          icon: 'ion-home, material:md-home'
        },
        {
          title: 'Income',
          icon: 'ion-cash, material:md-cash'
        },
        {
          title: 'Expense',
          icon: 'ion-cash, material:md-cash'
        },
        {
          title: 'Messenger',
          icon: 'ion-chatbubbles, material: md-chatbubbles'
        }
      ]
    };
  }
};
</script>

<style scoped>
.profile-pic {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #DDD;
  color: rgba(0, 0, 0, .56);
  padding-bottom: 8px;
}
.page--material .profile-pic {
  background-color: #f6f6f6;
}

.profile-pic > img {
  display: block;
  max-width: 100%;
}
</style>

<style>
.page--material__background.page--white__background {
  background-color: #fff;
}
</style>
