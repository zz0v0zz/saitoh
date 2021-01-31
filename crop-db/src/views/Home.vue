<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div>
      <input class="input-text" v-model="param" placeholder="キーワード">
      <button class="input-button" type="button" v-on:click="fetch_api">検索</button>
      <div class="flex header">
        <div class="cell">
          農作物
        </div>
        <div class="cell">
          品種
        </div>
        <div class="cell">
          栽培方法
        </div>
        <div class="cell">
          栽培工程
        </div>
        <div class="date-header">
          <div v-for="n of 12" v-bind:key="n">
            <div class="month">
              {{ n }}月
            </div>
          </div>
        </div>
      </div>
      <div class="flex" v-for="(crops, index) in result" v-bind:key="index">
        <div class="cell">
          {{ crops.crop_name }}
        </div>
        <div class="cell">
          {{ crops.variety_name }}
        </div>
        <div class="cell">
          {{ crops.cultivation_name }}
        </div>
        <div class="cell">
          {{ crops.process_name }}
        </div>
        <div class="date">
          <div v-for="n of 36" v-bind:key="n">
            <div v-if="crops.date_1_num <= n">
              <div v-if="crops.date_2_num >= n">
                <div class="date-cell color">
                  -
                </div>
              </div>
              <div v-else class="date-cell empty">
              </div>
            </div>
            <div v-else class="date-cell empty">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
  },
  data: function() {
    return {
      param: '',
      result: ''
    }
  },
  mounted: function() {
    this.fetch_api();
  },
  methods: {
    fetch_api: function() {
      fetch(`http://153.127.68.164:3000?param=${ this.param }`, {
          mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.result = data;
        });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.flex {
  display: flex;
}
.table {
  padding: 2px;
  border: solid;
  border-width: 1px;
}
.cell {
  padding: 2px 2px;
  width: 200px;
  border: solid;
  border-width: 1px;
}
.date {
  display: flex;
  padding: 2px 0;
  border: solid;
  border-width: 1px;
}
.date-header {
  text-align: center;
  display: flex;
  padding: 0 1px;
  border-left: solid;
  border-top: solid;
  border-bottom: solid;
  border-width: 1px;
}
.date-cell {
  width: 21px;
  padding: 2px 0;
}
.color {
  background-color: #ffa76d;
  color: #ffa76d;
}
.month {
  padding: 2px 0;
  width: 62px;
  border-right: solid;
  border-width: 1px;
}
.input-text {
  height: 20px;
}
.input-button {
  margin: 2px 2px;
}
</style>
