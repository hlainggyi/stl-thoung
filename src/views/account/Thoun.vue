<template>
  <!-- <v-ons-page> -->
    <v-ons-card>
      <v-ons-card-header>
        <span class="left-title"> Thoun ({{ date | moment('MMM - YYYY') }})</span>
      </v-ons-card-header>
      <v-ons-card-content>
        <v-ons-list>
          <v-ons-list-item>
            <div class="left">Income</div>
            <div class="right">
              {{mIncomeTotalThoun}}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="left">Expense</div>
            <div class="right">
              {{mExpenseTotalThoun}}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="left">Balance</div>
            <div class="right">
              {{mBalanceThoun}}
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </v-ons-card-content>
    </v-ons-card>
  <!-- </v-ons-page> -->
</template>

<script>
import {db } from '@/firebaseConfig'
export default {
  data () {
    return {
      mIncomes: [],
      mExpenses: [],
      date: new Date(Date.now())
    }
  },
  created (){
    this.getData()
  },
  computed: {
    mIncomeTotalThoun() {
        return this.mIncomes.reduce(function(carry, mIncome) {
            return carry + parseFloat(mIncome.account.amount)
        }, 0)
    },
    mExpenseTotalThoun() {
        return this.mExpenses.reduce(function(carry, mExpense) {
            return carry + parseFloat(mExpense.account.amount)
        }, 0)
    },
    mBalanceThoun() {
        return this.mIncomeTotalThoun - parseFloat(this.mExpenseTotalThoun)
    }
  },
  methods: {
    getData () {
      let queryMonth = this.date.getFullYear()+'-'+this.date.getMonth()
      db.collection("incomes")
        .where("monthId", "==", queryMonth)
        .where("userId", "==", "hJe9hA6AQ2heNUrEb3ng4ILIn2H3")
        .onSnapshot(querySnapshot =>{
            const incomes = []
            querySnapshot.forEach((doc)=>{
              incomes.push(doc.data())
            })
            this.mIncomes = incomes
          }),

      db.collection("expenses")
        .where("monthId", "==", queryMonth)
        .where("userId", "==", "hJe9hA6AQ2heNUrEb3ng4ILIn2H3")
        .onSnapshot(querySnapshot =>{
            const expenses = []
            querySnapshot.forEach((doc)=>{
              expenses.push(doc.data())
            })
            this.mExpenses = expenses
          })
    }
  }
}
</script>

<style lang="css">
</style>
