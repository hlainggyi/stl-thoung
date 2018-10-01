<template>
  <!-- <v-ons-card> -->
    <v-ons-page>
      <v-ons-card>
        <!-- <v-ons-card-content> -->
          <v-ons-list>
            <v-ons-list-item>
              <div class="right">
                <v-ons-icon @click="$emit('close')" class="close_btn" icon="md-close-circle"></v-ons-icon>
              </div>
            </v-ons-list-item>
            <v-ons-list-item>
              <v-date-picker
                mode='single'
                v-model='account.date'>
                <b-field slot-scope='props'>
                  <b-input
                    type='text'
                    icon='calendar'
                    :value='props.inputValue'
                    @change.native='props.updateValue($event.target.value)'
                    expanded>
                  </b-input>
                </b-field>
              </v-date-picker>
            </v-ons-list-item>
            <v-ons-list-item>
              <b-field>
                <b-input placeholder="Amount" v-model="account.amount" type="number"></b-input>
              </b-field>
            </v-ons-list-item>
            <v-ons-list-item>
              <b-field>
                <b-input placeholder="Description" v-model="account.description"></b-input>
              </b-field>
            </v-ons-list-item>
            <v-ons-list-item>
              <div class="block">
                <b-radio v-model="typeTitle"
                    native-value="Income">
                    Income
                </b-radio>
                <b-radio v-model="typeTitle"
                    native-value="Expense">
                    Expense
                </b-radio>
              </div>
            </v-ons-list-item>
            <v-ons-list-item v-show="selectTitle">
              <b-field style="width: 100%">
                <b-select v-model="account.title" expanded placeholder="Select ..">
                  <option v-for="cashTitleIncome in cashTitleIncomes"
                    :key="cashTitleIncome.name"
                    v-if="typeTitle == 'Income'">
                    {{ cashTitleIncome.name }}
                  </option>
                  <option v-for="cashTitleExpense in cashTitleExpenses"
                    :key="cashTitleExpense.name"
                    v-if="typeTitle == 'Expense'">
                    {{ cashTitleExpense.name }}
                  </option>
                </b-select>
                <button class="button is-success"
                    @click="addCashTitle">
                    <b-icon icon="plus"></b-icon>
                </button>
              </b-field>
            </v-ons-list-item>
            <v-ons-list-item v-show="saveTitle">
              <b-field>
                <b-input placeholder="Cash Title"
                  v-model="cashTitleIncome"
                  v-if="typeTitle == 'Income'"></b-input>
                <button class="button is-success"
                  @click="saveCashTitleIncome"
                  v-if="(typeTitle == 'Income') && (cashTitleIncome != '')">
                    <b-icon icon="check"></b-icon>
                </button>
                <button class="button is-success"
                  @click="(selectTitle = true) && (saveTitle = false)"
                  v-if="(typeTitle == 'Income') && (cashTitleIncome == '')">
                    <b-icon icon="check"></b-icon>
                </button>
                <b-input placeholder="Cash Title"
                  v-model="cashTitleExpense"
                  v-if="typeTitle == 'Expense'"></b-input>
                <button class="button is-success"
                  @click="saveCashTitleExpense"
                  v-if="(typeTitle == 'Expense') && (cashTitleExpense != '')">
                    <b-icon icon="check"></b-icon>
                </button>
                <button class="button is-success"
                  @click="(selectTitle = true) && (saveTitle = false)"
                  v-if="(typeTitle == 'Expense') && (cashTitleExpense == '')">
                    <b-icon icon="check"></b-icon>
                </button>
              </b-field>
            </v-ons-list-item>
            <v-ons-list-item>
              <b-field style="width: 100%">
                <b-select v-model="account.payment_type" expanded>
                  <option value="Cash" selected>Cash</option>
                  <option value="Bank">Bank</option>
                </b-select>
              </b-field>
            </v-ons-list-item>
          </v-ons-list>
        <!-- </v-ons-card-content> -->
        <!-- <v-ons-card-footer> -->
          <v-ons-button modifier="large" class="button-margin" v-show="typeTitle == 'Income'" @click="addIncome">Save In</v-ons-button>
          <v-ons-button modifier="large" class="button-margin" v-show="typeTitle == 'Expense'" @click="addExpense">Save Out</v-ons-button>
        <!-- </v-ons-card-footer> -->
      </v-ons-card>
    </v-ons-page>
  <!-- </v-ons-card> -->
</template>

<script>
import { mapState } from 'vuex'
import { db } from '@/firebaseConfig'
export default {
  data() {
    return {
      incomePage: true,
      expensePage: false,
      account: {
        date: new Date(Date.now()), // Date
        // date: '',
        title: '', // Cash Title
        payment_type: 'Cash', // Cash or Bank
        amount: '', // Amount
        description: '' // Description
      },
      typeTitle: '',
      types: ["Income", "Expense"],
      error:'',
      cashTitleIncomes : [],
      cashTitleIncome: '',
      cashTitleExpenses : [],
      cashTitleExpense: '',
      selectTitle: true,
      saveTitle: false
    }
  },
  created () {
    this.getCashTitleIncome ()
    this.getCashTitleExpense ()
  },
  computed: {
      ...mapState(['userProfile', 'currentUser'])
  },
  methods: {
    getCashTitleIncome () {
      db.collection('income-titles').where('userId', '==', this.currentUser.uid).onSnapshot(querySnapshot =>{
        const titles = []
        querySnapshot.forEach((doc)=>{
          titles.push(doc.data())
        })
        this.cashTitleIncomes = []
        this.cashTitleIncomes = titles
      })
    },
    getCashTitleExpense () {
      db.collection('expense-titles').where('userId', '==', this.currentUser.uid).onSnapshot(querySnapshot =>{
        const titles = []
        querySnapshot.forEach((doc)=>{
          titles.push(doc.data())
        })
        this.cashTitleExpenses = []
        this.cashTitleExpenses = titles
      })
    },
    addCashTitle () {
      this.selectTitle = false,
      this.saveTitle = true
    },
    saveCashTitleIncome () {
      db.collection('income-titles').add({
        userId: this.currentUser.uid,
        name: this.cashTitleIncome
      })
      this.getCashTitleIncome ()
      this.cashTitleIncome = ''
      this.selectTitle = true,
      this.saveTitle = false
    },
    saveCashTitleExpense () {
      db.collection('expense-titles').add({
        userId: this.currentUser.uid,
        name: this.cashTitleExpense
      })
      this.getCashTitleExpense ()
      this.cashTitleExpense = ''
      this.selectTitle = true,
      this.saveTitle = false
    },
    addIncome: function () {
      // let date = this.date.getMonth()+"/"+this.date.getDate()+"/"+this.date.getFullYear()
      db.collection('incomes').add({
        createdOn: new Date(),
        account: this.account,
        queryDay: this.account.date.getDate(),
        monthId: this.account.date.getFullYear()+'-'+this.account.date.getMonth(),
        userId: this.currentUser.uid,
        userName: this.userProfile.name
      })
      this.account.title= '', // Cash Title
      this.account.amount= '', // Amount
      this.account.description= '' // Description
      this.$emit('close')
    },
    addExpense: function () {
      db.collection('expenses').add({
        createdOn: new Date(),
        account: this.account,
        queryDay: this.account.date.getDate(),
        monthId: this.account.date.getFullYear()+'-'+this.account.date.getMonth(),
        userId: this.currentUser.uid,
        userName: this.userProfile.name
      })
      this.account.title= '', // Cash Title
      this.account.amount= '', // Amount
      this.account.description= '' // Description
      this.$emit('close')
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
