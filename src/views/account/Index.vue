<template>
  <v-ons-page>
    <today></today>
    <shwe-thee-lay></shwe-thee-lay>
    <thoun></thoun>
    <v-ons-fab
        position='bottom right'
        modifier='mini'
        class="fab-btn"
        @click="create(animation)">
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>
  </v-ons-page>
</template>

<script>

import {db } from '@/firebaseConfig'
import createAccount from '@/views/account/Create.vue'
import Today from '@/views/account/Today.vue'
import ShweTheeLay from '@/views/account/ShweTheeLay.vue'
import Thoun from '@/views/account/Thoun.vue'
import Create from '@/views/account/Create.vue'
export default {
  components: {createAccount, Today, ShweTheeLay, Thoun},
  data () {
    return {
      animation: 'default',
      totalIncomes: [],
      totalExpenses: [],
      date: new Date(Date.now())
    };
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
    create(name) {
      this.$store.commit('navigator/options', {
        // Sets animations
        animation: name,
        // Resets default options
        callback: () => this.$store.commit('navigator/options', {})
      });
      this.$store.commit('navigator/push', {
        extends: Create,
        data() {
          return {
            animation: name
          }
        }
      });
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
