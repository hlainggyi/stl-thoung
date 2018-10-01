<template>
  <div>
    <v-ons-card>
      <v-ons-card-header>
        <span class="left-title">Balance</span>
      </v-ons-card-header>
      <v-ons-card-content>
        <v-ons-list>
          <v-ons-list-item>
            <div class="center">Shwe Thee lay</div>
            <div class="right">
              {{ stlBalance }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="center">Thoun Beauty Land</div>
            <div class="right">
              {{ thounBalance }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="center">Total Balance</div>
            <div class="right">
              {{ Balance }}
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-card-content>
    </v-ons-card>
    <v-ons-card>
      <v-ons-card-header>
        <span class="left-title">Today</span>
      </v-ons-card-header>
      <v-ons-card-content>
        <v-ons-list>
          <v-ons-list-item>
            <div class="center">Income</div>
            <div class="right">
              {{cIncomeTotal}}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="center">Expense</div>
            <div class="right">
              {{cExpenseTotal}}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="center">Balance</div>
            <div class="right">
              {{cBalance}}
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-card-content>
    </v-ons-card>
    <v-ons-card>
      <v-ons-card-header>
        <span class="left-title">{{ date | moment('YYYY - MMMM') }}</span>
      </v-ons-card-header>
      <v-ons-card-content>
        <v-ons-list>
          <v-ons-list-item>
            <div class="center">Income</div>
            <div class="right">
              {{ mIncomeTotal }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="center">Expense</div>
            <div class="right">
              {{ mExpenseTotal }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="center">Balance</div>
            <div class="right">
              {{ mBalance }}
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-card-content>
    </v-ons-card>
    <v-ons-card>
      <v-ons-card-header>
        <span class="left-title">Total</span>
      </v-ons-card-header>
      <v-ons-card-content>
        <v-ons-list>
          <v-ons-list-item>
            <div class="center">Income</div>
            <div class="right">
              {{ tIncomeTotal }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="center">Expense</div>
            <div class="right">
              {{ tExpenseTotal }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="center">Balance</div>
            <div class="right">
              {{ tBalance }}
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-card-content>
    </v-ons-card>
  </div>
</template>

<script>
import {db } from '@/firebaseConfig'
export default {
  data () {
    return {
      cIncomes: [],
      cExpenses: [],
      mIncomes: [],
      mExpenses: [],
      tIncomes: [],
      tExpenses: [],
      stlIncomes: [],
      stlExpenses: [],
      thounIncomes: [],
      thounExpenses: [],
      date: new Date(Date.now())
    }
  },
  created (){
    this.getData()
  },
  computed: {
    cIncomeTotal() {
        return this.cIncomes.reduce(function(carry, cIncome) {
            return carry + parseFloat(cIncome.account.amount)
        }, 0)
    },
    cExpenseTotal() {
        return this.cExpenses.reduce(function(carry, cExpense) {
            return carry + parseFloat(cExpense.account.amount)
        }, 0)
    },
    cBalance() {
        return this.cIncomeTotal - parseFloat(this.cExpenseTotal)
    },
    mIncomeTotal() {
        return this.mIncomes.reduce(function(carry, mIncome) {
            return carry + parseFloat(mIncome.account.amount)
        }, 0)
    },
    mExpenseTotal() {
        return this.mExpenses.reduce(function(carry, mExpense) {
            return carry + parseFloat(mExpense.account.amount)
        }, 0)
    },
    mBalance() {
        return this.mIncomeTotal - parseFloat(this.mExpenseTotal)
    },
    tIncomeTotal() {
        return this.tIncomes.reduce(function(carry, tIncome) {
            return carry + parseFloat(tIncome.account.amount)
        }, 0)
    },
    tExpenseTotal() {
        return this.tExpenses.reduce(function(carry, tExpense) {
            return carry + parseFloat(tExpense.account.amount)
        }, 0)
    },
    tBalance() {
        return this.tIncomeTotal - parseFloat(this.tExpenseTotal)
    },
    stlIncomeTotal() {
        return this.stlIncomes.reduce(function(carry, stlIncome) {
            return carry + parseFloat(stlIncome.account.amount)
        }, 0)
    },
    stlExpenseTotal() {
        return this.stlExpenses.reduce(function(carry, stlExpense) {
            return carry + parseFloat(stlExpense.account.amount)
        }, 0)
    },
    stlBalance() {
        return this.stlIncomeTotal - parseFloat(this.stlExpenseTotal)
    },
    thounIncomeTotal() {
        return this.thounIncomes.reduce(function(carry, thounIncome) {
            return carry + parseFloat(thounIncome.account.amount)
        }, 0)
    },
    thounExpenseTotal() {
        return this.thounExpenses.reduce(function(carry, thounExpense) {
            return carry + parseFloat(thounExpense.account.amount)
        }, 0)
    },
    thounBalance() {
        return this.thounIncomeTotal - parseFloat(this.thounExpenseTotal)
    },
    Balance() {
        return this.stlBalance + parseFloat(this.thounBalance)
    }
  },
  methods: {
    getData () {
      let queryMonth = this.date.getFullYear()+'-'+this.date.getMonth()
      db.collection('incomes')
        .where("monthId", "==", queryMonth)
        .where("queryDay", "==", new Date().getDate())
        .onSnapshot(querySnapshot =>{
          const incomes = []
          querySnapshot.forEach((doc)=>{
            incomes.push(doc.data())
          })
          this.cIncomes = incomes
        }),

      db.collection('expenses')
        .where("monthId", "==", queryMonth)
        .where("queryDay", "==", this.date.getDate())
        .onSnapshot(querySnapshot =>{
          const expenses = []
          querySnapshot.forEach((doc)=>{
            expenses.push(doc.data())
          })
          this.cExpenses = expenses
        }),

      db.collection('incomes')
        .where("monthId", "==", queryMonth)
        .onSnapshot(querySnapshot =>{
          const incomes = []
          querySnapshot.forEach((doc)=>{
            incomes.push(doc.data())
          })
          this.mIncomes = incomes
        }),

      db.collection('expenses')
        .where("monthId", "==", queryMonth)
        .onSnapshot(querySnapshot =>{
          const expenses = []
          querySnapshot.forEach((doc)=>{
            expenses.push(doc.data())
          })
          this.mExpenses = expenses
        }),

      db.collection('incomes')
        .onSnapshot(querySnapshot =>{
          const incomes = []
          querySnapshot.forEach((doc)=>{
            incomes.push(doc.data())
          })
          this.tIncomes = incomes
        }),

      db.collection('expenses')
        .onSnapshot(querySnapshot =>{
          const expenses = []
          querySnapshot.forEach((doc)=>{
            expenses.push(doc.data())
          })
          this.tExpenses = expenses
        }),

      db.collection('incomes')
        .where("userId", "==", "PgQihX7GpDW2GMvyjg6k3moG3ez1")
        .onSnapshot(querySnapshot =>{
          const incomes = []
          querySnapshot.forEach((doc)=>{
            incomes.push(doc.data())
          })
          this.stlIncomes = incomes
        }),

      db.collection('expenses')
        .where("userId", "==", "PgQihX7GpDW2GMvyjg6k3moG3ez1")
        .onSnapshot(querySnapshot =>{
          const expenses = []
          querySnapshot.forEach((doc)=>{
            expenses.push(doc.data())
          })
          this.stlExpenses = expenses
        }),

      db.collection('incomes')
        .where("userId", "==", "hJe9hA6AQ2heNUrEb3ng4ILIn2H3")
        .onSnapshot(querySnapshot =>{
          const incomes = []
          querySnapshot.forEach((doc)=>{
            incomes.push(doc.data())
          })
          this.thounIncomes = incomes
        }),

      db.collection('expenses')
        .where("userId", "==", "hJe9hA6AQ2heNUrEb3ng4ILIn2H3")
        .onSnapshot(querySnapshot =>{
          const expenses = []
          querySnapshot.forEach((doc)=>{
            expenses.push(doc.data())
          })
          this.thounExpenses = expenses
        })
    }
  }
}
</script>

<style scoped>
  .left {
    max-width: 100px;
  }
</style>
