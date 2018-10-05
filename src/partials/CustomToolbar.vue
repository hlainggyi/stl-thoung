<template>
  <v-ons-toolbar :style="swipeTheme" modifier="white-content">
    <div class="left">
      <slot name="left">
        <v-ons-back-button v-if="backLabel" color="white">
          {{ backLabel }}
        </v-ons-back-button>
      </slot>
    </div>
    <div class="center" style="color:white"><slot>{{ title }}</slot></div>
    <div class="right" style="text-align:center"><slot name="right"></slot></div>
    <!-- <div class="right" style="text-align:center"><slot name="right"></slot></div> -->
  </v-ons-toolbar>
</template>

<script>
const green = [67, 160, 71];
export default {
  props: ['title', 'backLabel'],
  data () {
    return {
      colors: green,
      animationOptions: {}
    }
  },
  computed: {
    swipeTheme() {
      return this.md && {
        backgroundColor: `rgb(${this.colors.join(',')})`,
        transition: `all ${this.animationOptions.duration || 0}s ${this.animationOptions.timing || ''}`
      }
    }
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    },
  }
};
</script>


<style>
/* Custom 'white-content' modifier */
.back-button--material__icon {
  fill:#ffffff;
}
.page--material .toolbar--white-content__center,
.page--material .toolbar-button--white-content,
.page--material :checked + .tabbar--white-content__button {
  color: white;
}

.page--material .tabbar--white-content__button {
  color: rgba(255, 255, 255, 0.7);
}

.page--material .tabbar--white-content__border {
  background-color: white;
}
</style>
