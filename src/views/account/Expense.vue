<template lang="html">
  <v-ons-page>
      <v-ons-list>
        <v-ons-list-header>
          {{ selectDate | moment('DD - MMM - YYYY') }}
        </v-ons-list-header>
        <v-ons-list-item v-for="expense in expenses" :key="expense.id">
          <div class="center">
            <v-ons-row>
              <v-ons-col>
                {{ expense.account.description }}
              </v-ons-col>
              <v-ons-col width="100px" style="text-align: right; padding-right:5px">
                {{ expense.account.amount }}
              </v-ons-col>
            </v-ons-row>
          </div>
          <div class="right" v-if="expense.userId == currentUser.uid">
            <v-ons-icon icon="md-edit" @click="editexpense(expense)"></v-ons-icon>
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
        <edit-account :editDate="editDate" :typeTitle="'Expense'" :accountData="editexpenseData" v-on:close="dialogVisibleEdit = false"></edit-account>
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
      expenses: [],
      monthlyExpenses: [],
      editexpenseData: '',
      editDate: {date:''},
      dialogVisible: false,
      dialogVisibleEdit: false
    }
  },
  computed: {
    ...mapState(['currentUser']),
    total() {
        return this.expenses.reduce(function(carry, expense) {
            return carry + parseFloat(expense.account.amount)
        }, 0)
    },
    monthlyTotal() {
        return this.monthlyExpenses.reduce(function(carry, monthlyExpense) {
            return carry + parseFloat(monthlyExpense.account.amount)
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
      db.collection('expenses')
        .where("monthId", "==", queryMonth)
        .where("queryDay", "==", queryDay)
        .orderBy('createdOn', 'desc')
        .where("userId", "==", this.$store.state.currentUser.uid)
        .onSnapshot(querySnapshot =>{
        const expenses = []
        const expensesArray = []
        let i = 0
        querySnapshot.forEach((doc)=>{
          expensesArray.push(doc.data())
          expensesArray[i].id = doc.id
          expenses.push(expensesArray[i])
          i++
        })
        this.expenses = expenses
      }),
      db.collection('expenses')
        .where("monthId", "==", queryMonth)
        .where("userId", "==", this.$store.state.currentUser.uid)
        .orderBy('createdOn', 'desc')
        .onSnapshot(querySnapshot =>{
        const expenses = []
        const expensesArray = []
        let i = 0
        querySnapshot.forEach((doc)=>{
          expensesArray.push(doc.data())
          expensesArray[i].id = doc.id
          expenses.push(expensesArray[i])
          i++
        })
        this.monthlyExpenses = expenses
      })
    },
    editexpense (expense) {
      this.editDate.date = new Date(expense.account.date.toDate())
      this.dialogVisibleEdit = true
      this.editexpenseData  = expense
    }
  }
}
</script>

<style scoped>
  .left {
    max-width: 100px;
  }
</style>
