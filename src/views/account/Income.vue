<template lang="html">
  <v-ons-page>
      <v-ons-list>
        <v-ons-list-header>
          {{ selectDate | moment('DD - MMM - YYYY') }}
        </v-ons-list-header>
        <v-ons-list-item v-for="income in incomes" :key="income.id">
          <div class="center">
            <v-ons-row>
              <v-ons-col>
                {{ income.account.description }}
              </v-ons-col>
              <v-ons-col width="100px" style="text-align: right; padding-right:5px">
                {{ income.account.amount }}
              </v-ons-col>
            </v-ons-row>
          </div>
          <div class="right" v-if="income.userId == currentUser.uid">
            <v-ons-icon icon="md-edit" @click="editIncome(income)"></v-ons-icon>
          </div>
        </v-ons-list-item>
        <v-ons-list-item>
          <div class="center">
            <v-ons-row>
              <v-ons-col>
                <strong>Total</strong>
              </v-ons-col>
              <v-ons-col width="100px" style="text-align: right; padding-right:5px">
                <strong>{{ total }}</strong>
              </v-ons-col>
            </v-ons-row>
          </div>
          <div class="right">
            <v-ons-icon icon="md-check" style="color:green"></v-ons-icon>
          </div>
        </v-ons-list-item>
      </v-ons-list>
      <hr>
      <v-ons-list>
        <v-ons-list-header>
          {{ selectDate | moment('YYYY - MMMM') }}
        </v-ons-list-header>
        <v-ons-list-item>
          <div class="center">
            <v-ons-row>
              <v-ons-col>
                <strong>Total</strong>
              </v-ons-col>
              <v-ons-col width="100px" style="text-align: right; padding-right:5px">
                <strong>{{ monthlyTotal }}</strong>
              </v-ons-col>
            </v-ons-row>
          </div>
          <div class="right">
            <v-ons-icon icon="md-check" style="color:green"></v-ons-icon>
          </div>
        </v-ons-list-item>
      </v-ons-list>
      <v-ons-fab
          position='bottom right'
          modifier='mini'
          class="fab-btn"
          @click="dialogVisible = true">
        <v-ons-icon icon="md-plus"></v-ons-icon>
      </v-ons-fab>

      <!-- Add  -->
      <v-ons-dialog
        :visible.sync="dialogVisible"
      >
        <!-- Optional page. This could contain a Navigator as well. -->
        <create-account  v-on:close="dialogVisible = false"></create-account>
      </v-ons-dialog>

      <!-- Edit -->
      <v-ons-dialog
        :visible.sync="dialogVisibleEdit"
      >
        <!-- Optional page. This could contain a Navigator as well. -->
        <edit-account :editDate="editDate" :typeTitle="'Income'" :accountData="editIncomeData" v-on:close="dialogVisibleEdit = false"></edit-account>
      </v-ons-dialog>
  </v-ons-page>
</template>

<script>
import { mapState } from 'vuex'
import {db} from '@/firebaseConfig'
import createAccount from '@/views/account/Create.vue'
import editAccount from '@/views/account/Edit.vue'
export default {
  components: { createAccount, editAccount },
  data () {
    return {
      myDayDate: new Date(Date.now()).getDate(),
      myMonth: new Date(Date.now()).getMonth(),
      myYear: new Date(Date.now()).getFullYear(),
      selectDate: new Date(Date.now()),
      incomes: [],
      monthlyIncomes: [],
      editIncomeData: '',
      editDate: {date:''},
      dialogVisible: false,
      dialogVisibleEdit: false
    }
  },
  computed: {
    ...mapState(['currentUser']),
    total() {
        return this.incomes.reduce(function(carry, income) {
            return carry + parseFloat(income.account.amount)
        }, 0)
    },
    monthlyTotal() {
        return this.monthlyIncomes.reduce(function(carry, monthlyIncome) {
            return carry + parseFloat(monthlyIncome.account.amount)
        }, 0)
    }
  },
  created () {
    this.getData ()
  },
  methods: {
    getData () {
      let queryMonth = this.selectDate.getFullYear()+'-'+this.selectDate.getMonth()
      let queryDay = this.selectDate.getDate()
      db.collection('incomes')
        .where("monthId", "==", queryMonth)
        .where("queryDay", "==", queryDay)
        .where("userId", "==", this.$store.state.currentUser.uid)
        .orderBy('createdOn', 'desc')
        .onSnapshot(querySnapshot =>{
        const incomes = []
        const incomesArray = []
        let i = 0
        querySnapshot.forEach((doc)=>{
          incomesArray.push(doc.data())
          incomesArray[i].id = doc.id
          incomes.push(incomesArray[i])
          i++
        })
        this.incomes = incomes
      }),
      db.collection('incomes')
        .where("monthId", "==", queryMonth)
        .where("userId", "==", this.$store.state.currentUser.uid)
        .orderBy('createdOn', 'desc')
        .onSnapshot(querySnapshot =>{
        const incomes = []
        const incomesArray = []
        let i = 0
        querySnapshot.forEach((doc)=>{
          incomesArray.push(doc.data())
          incomesArray[i].id = doc.id
          incomes.push(incomesArray[i])
          i++
        })
        this.monthlyIncomes = incomes
      })
    },
    editIncome (income) {
      this.editDate.date = new Date(income.account.date.toDate())
      this.dialogVisibleEdit = true
      this.editIncomeData  = income
    }
  }
}
</script>

<style scoped>
  .left {
    max-width: 100px;
  }
</style>
