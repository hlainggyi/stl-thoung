<template>
  <!-- <v-ons-page> -->
    <v-ons-card>
      <v-ons-card-header>
        <span class="left-title"> Shwe Thee Lay ({{ date | moment('MMM - YYYY') }})</span>
      </v-ons-card-header>
      <v-ons-card-content>
        <v-ons-list>
          <v-ons-list-item>
            <div class="left">Income</div>
            <div class="right">
              {{mIncomeTotalStl}}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="left">Expense</div>
            <div class="right">
              {{mExpenseTotalStl}}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="left">Balance</div>
            <div class="right">
              {{mBalanceStl}}
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
    mIncomeTotalStl() {
        return this.mIncomes.reduce(function(carry, mIncome) {
            return carry + parseFloat(mIncome.account.amount)
        }, 0)
    },
    mExpenseTotalStl() {
        return this.mExpenses.reduce(function(carry, mExpense) {
            return carry + parseFloat(mExpense.account.amount)
        }, 0)
    },
    mBalanceStl() {
        return this.mIncomeTotalStl - parseFloat(this.mExpenseTotalStl)
    }
  },
  methods: {
    getData () {
      let queryMonth = this.date.getFullYear()+'-'+this.date.getMonth()
      db.collection("incomes")
        .where("monthId", "==", queryMonth)
        .where("userId", "==", "PgQihX7GpDW2GMvyjg6k3moG3ez1")
        .onSnapshot(querySnapshot =>{
        const months = []
        querySnapshot.forEach((doc)=>{
          months.push(doc.data())
        })
        this.mIncomes = months
      }),
      db.collection("expenses")
        .where("monthId", "==", queryMonth)
        .where("userId", "==", "PgQihX7GpDW2GMvyjg6k3moG3ez1")
        .onSnapshot(querySnapshot =>{
        const months = []
        querySnapshot.forEach((doc)=>{
          months.push(doc.data())
        })
        this.mExpenses = months
      })
    }
  }
}
</script>

<style lang="css">
</style>
