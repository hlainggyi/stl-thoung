<template>
  <v-ons-page>
    <today></today>
    <shwe-thee-lay></shwe-thee-lay>
    <thoun></thoun>
    <v-ons-fab
        position='bottom right'
        modifier='mini'
        class="fab-btn"
        @click="dialogVisible = true">
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>
    <!-- Components -->

    <v-ons-dialog
      :visible.sync="dialogVisible"
    >
      <!-- Optional page. This could contain a Navigator as well. -->
      <create-account  v-on:close="dialogVisible = false"></create-account>
    </v-ons-dialog>
  </v-ons-page>
</template>

<script>

import {db } from '@/firebaseConfig'
import createAccount from '@/views/account/Create.vue'
import Today from '@/views/account/Today.vue'
import ShweTheeLay from '@/views/account/ShweTheeLay.vue'
import Thoun from '@/views/account/Thoun.vue'
export default {
  components: {createAccount, Today, ShweTheeLay, Thoun},
  data () {
    return {
      dialogVisible: false,
      animation: 'default',

      totalIncomes: [],
      totalExpenses: [],
      date: new Date(Date.now())
    };
  },
  created (){
    this.getData()
  },
  computed: {
    IncomeTotal() {
        return this.totalIncomes.reduce(function(carry, totalIncome) {
            return carry + parseFloat(totalIncome.account.amount)
        }, 0)
    },
    ExpenseTotal() {
        return this.Expenses.reduce(function(carry, totExpense) {
            return carry + parseFloat(Expense.account.amount)
        }, 0)
    },
    BalanceTotal() {
        return this.IncomeTotal - parseFloat(this.ExpenseTotal)
    }
  },
  methods: {
    getData () {

    }
  }
}
</script>

<style>
.left-title {
  color: rgba(0, 0, 0, .54);
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.125;
}
.right-icon {
  float: right;
  padding-right:20px;
}
.dialog {
  width: 90%;
  height: 97%;
  margin-top: 10px;
}
.fab-btn {
  color: #FFFFFF;
  background-color: rgb(67, 160, 71);
}
.intro {
  text-align: left;
  padding: 0 22px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(0, 0, 0, .54);
}

ons-card {
  cursor: pointer;
  color: #333;
}

.card__title, .card--material__title {
  font-size: 20px;
}
</style>
