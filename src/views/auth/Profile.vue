<template>
  <v-ons-page>
    <custom-toolbar backLabel="Anim" title="User profile">
      <template slot="right">
        <v-ons-icon style="color:white; padding-right:10px" icon="md-check" @click="updateProfile"></v-ons-icon>
      </template>
    </custom-toolbar>
    <v-ons-card>
      <v-ons-list style="height: 100%">
        <v-ons-list-item>
          <transition name="fade">
              <p v-if="showSuccess" class="success">profile updated</p>
          </transition>
        </v-ons-list-item>
        <v-ons-list-item>
          <span>Name: {{userProfile}}</span>
        </v-ons-list-item>
        <v-ons-list-item>
          <!-- <span>Job Title: {{userProfile.title}}</span> -->
        </v-ons-list-item>
        <v-ons-list-item>
          <b-field label="Name">
            <b-input v-model.trim="name"></b-input>
          </b-field>
          <!-- <div class="left">
            <v-ons-icon style="color:green" icon="ion-person" class="list-item__icon"></v-ons-icon>
          </div>
          <label class="center">
            <v-ons-input type="text" placeholder="Name" float v-model.trim="user.name" style="width:100%">
            </v-ons-input>
          </label> -->
        </v-ons-list-item>
        <v-ons-list-item>
            <b-field label="Job Title">
              <b-input v-model.trim="title"></b-input>
            </b-field>
          <!-- <div class="left">
            <v-ons-icon style="color:green" icon="ion-person" class="list-item__icon"></v-ons-icon>
          </div>
          <label class="center">
            <v-ons-input type="text" placeholder="Job Title" float v-model.trim="user.title" style="width:100%">
            </v-ons-input>
          </label> -->
        </v-ons-list-item>
        <!-- <v-ons-list-item>
          <div class="left">
            <v-ons-icon style="color:green" icon="ion-flag" class="list-item__icon"></v-ons-icon>
          </div>
          <label class="center">
            <b-field style="width: 100%">
              <b-select placeholder="Role" v-model="user.role" expanded>
                <option value="admin" selected>Admin</option>
                <option value="user">User</option>
              </b-select>
            </b-field>
          </label>
        </v-ons-list-item> -->
      </v-ons-list>
      <transition name="fade">
          <div v-if="performingRequest" class="loading">
              <p>Loading...</p>
          </div>
      </transition>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                name: '',
                title: '',
                role: 'user',
                imageUrl: '',
                showSuccess: false,
                performingRequest: false,
            }
        },
        computed: {
            ...mapState(['userProfile'])
        },
        methods: {
            updateProfile() {
                this.performingRequest = true,
                this.$store.dispatch('updateProfile', {
                    name: this.name !== '' ? this.name : this.userProfile.name,
                    title: this.title !== '' ? this.title : this.userProfile.title,
                    title: this.title !== '' ? this.title : this.userProfile.title,
                    imageUrl: this.imageUrl !== '' ? this.imageUrl : this.userProfile.imageUrl,
                    role: this.role !== '' ? this.role : this.userProfile.role,
                })
                this.performingRequest = false,
                this.name = this.userProfile.name
                this.title = this.userProfile.title

                this.showSuccess = true

                setTimeout(() => { this.showSuccess = false }, 2000)
            }
        }
    }
</script>
