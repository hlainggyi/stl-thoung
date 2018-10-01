<template>
<v-ons-page v-if="accountData != ''">
  <v-ons-card>
    <v-ons-list>
      <v-ons-list-item>
        <div class="right">
          <v-ons-icon @click="$emit('close')" class="close_btn" icon="md-close-circle"></v-ons-icon>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <v-date-picker mode='single' v-model='editDate.date'>
          <b-field slot-scope='props'>
            <b-input type='text' icon='calendar' :value='props.inputValue' @change.native='props.updateValue($event.target.value)' expanded>
            </b-input>
          </b-field>
        </v-date-picker>
      </v-ons-list-item>
      <v-ons-list-item>
        <b-field>
          <b-input placeholder="Amount" v-model="accountData.account.amount" type="number"></b-input>
        </b-field>
      </v-ons-list-item>
      <v-ons-list-item>
        <b-field>
          <b-input placeholder="Description" v-model="accountData.account.description"></b-input>
        </b-field>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="block">
          <b-radio v-model="typeTitle" native-value="Income">
            Income
          </b-radio>
          <b-radio v-model="typeTitle" native-value="Expense">
            Expense
          </b-radio>
        </div>
      </v-ons-list-item>
      <v-ons-list-item v-show="selectTitle">
        <b-field style="width: 100%">
          <b-select v-model="accountData.account.title" expanded placeholder="Select ..">
            <option v-for="cashTitleIncome in cashTitleIncomes" :key="cashTitleIncome.name" v-if="typeTitle == 'Income'">
              {{ cashTitleIncome.name }}
            </option>
            <option v-for="cashTitleExpense in cashTitleExpenses" :key="cashTitleExpense.name" v-if="typeTitle == 'Expense'">
              {{ cashTitleExpense.name }}
            </option>
          </b-select>
          <button class="button is-success" @click="addCashTitle">
                    <b-icon icon="plus"></b-icon>
                </button>
        </b-field>
      </v-ons-list-item>
      <v-ons-list-item v-show="saveTitle">
        <b-field>
          <b-input placeholder="Cash Title" v-model="cashTitleIncome" v-if="typeTitle == 'Income'"></b-input>
          <button class="button is-success" @click="saveCashTitleIncome" v-if="(typeTitle == 'Income') && (cashTitleIncome != '')">
                    <b-icon icon="check"></b-icon>
                </button>
          <button class="button is-success" @click="(selectTitle = true) && (saveTitle = false)" v-if="(typeTitle == 'Income') && (cashTitleIncome == '')">
                    <b-icon icon="check"></b-icon>
                </button>
          <b-input placeholder="Cash Title" v-model="cashTitleExpense" v-if="typeTitle == 'Expense'"></b-input>
          <button class="button is-success" @click="saveCashTitleExpense" v-if="(typeTitle == 'Expense') && (cashTitleExpense != '')">
                    <b-icon icon="check"></b-icon>
                </button>
          <button class="button is-success" @click="(selectTitle = true) && (saveTitle = false)" v-if="(typeTitle == 'Expense') && (cashTitleExpense == '')">
                    <b-icon icon="check"></b-icon>
                </button>
        </b-field>
      </v-ons-list-item>
      <v-ons-list-item>
        <b-field style="width: 100%">
          <b-select v-model="accountData.account.payment_type" expanded>
            <option value="Cash" selected>Cash</option>
            <option value="Bank">Bank</option>
          </b-select>
        </b-field>
      </v-ons-list-item>
      <v-ons-list-item>
        <v-ons-button modifier="large" class="button-margin fab-btn" v-show="typeTitle == 'Income'" @click="editIncome">Save Income</v-ons-button>
        <v-ons-button modifier="large" class="button-margin fab-btn" v-show="typeTitle == 'Expense'" @click="editExpense">Save Expense</v-ons-button>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-card>
</v-ons-page>
</template>

<script>
import {
  mapState
} from 'vuex'
import {
  db
} from '@/firebaseConfig'
export default {
  props: ['accountData', 'typeTitle', 'editDate'],
  data() {
    return {
      incomePage: true,
      expensePage: false,
      types: ["Income", "Expense"],
      error: '',
      cashTitleIncomes: [],
      cashTitleIncome: '',
      cashTitleExpenses: [],
      cashTitleExpense: '',
      selectTitle: true,
      saveTitle: false
    }
  },
  created() {
    this.getCashTitleIncome(),
      this.getCashTitleExpense()

  },
  computed: {
    ...mapState(['userProfile', 'currentUser'])
  },
  methods: {
    getCashTitleIncome() {
      db.collection('income-titles').where('userId', '==', this.currentUser.uid).onSnapshot(querySnapshot => {
        const titles = []
        querySnapshot.forEach((doc) => {
          titles.push(doc.data())
        })
        this.cashTitleIncomes = []
        this.cashTitleIncomes = titles
      })
    },
    getCashTitleExpense() {
      db.collection('expense-titles').where('userId', '==', this.currentUser.uid).onSnapshot(querySnapshot => {
        const titles = []
        querySnapshot.forEach((doc) => {
          titles.push(doc.data())
        })
        this.cashTitleExpenses = []
        this.cashTitleExpenses = titles
      })
    },
    addCashTitle() {
      this.selectTitle = false,
        this.saveTitle = true
    },
    saveCashTitleIncome() {
      db.collection('income-titles').add({
        userId: this.currentUser.uid,
        name: this.cashTitleIncome
      })
      this.getCashTitleIncome()
      this.cashTitleIncome = ''
      this.selectTitle = true,
        this.saveTitle = false
    },
    saveCashTitleExpense() {
      db.collection('expense-titles').add({
        userId: this.currentUser.uid,
        name: this.cashTitleExpense
      })
      this.getCashTitleExpense()
      this.cashTitleExpense = ''
      this.selectTitle = true,
        this.saveTitle = false
    },
    editIncome: function() {
      var accountRef = db.collection("incomes").doc(this.accountData.id);
      // Set the "capital" field of the city 'DC'
      accountRef.update({
        account: {
          date: this.editDate.date,
          title: this.accountData.account.title, // Cash Title
          payment_type: this.accountData.account.payment_type, // Cash or Bank
          amount: this.accountData.account.amount, // Amount
          description: this.accountData.account.description // Description
        },
        queryDay: this.editDate.date.getDate(),
        monthId: this.editDate.date.getFullYear() + '-' + this.editDate.date.getMonth()
      })
      this.$emit('close')
    },
    editExpense: function() {
      var accountRef = db.collection("expenses").doc(this.accountData.id);
      // Set the "capital" field of the city 'DC'
      accountRef.update({
        account: {
          date: this.editDate.date,
          title: this.accountData.account.title, // Cash Title
          payment_type: this.accountData.account.payment_type, // Cash or Bank
          amount: this.accountData.account.amount, // Amount
          description: this.accountData.account.description // Description
        },
        queryDay: this.editDate.date.getDate(),
        monthId: this.editDate.date.getFullYear() + '-' + this.editDate.date.getMonth()
      })
      this.$emit('close')
    }
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return '-'
      }
      let date = val.toDate()
      return moment(date)
    }
  }
}
</script>

<style scoped>
.close_btn {
  color: red;
}

.list-item--material__left {
  min-width: 30px
}
</style>
