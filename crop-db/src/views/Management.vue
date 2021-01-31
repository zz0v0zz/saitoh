<template>
  <div class="about">
    <h4>農作物</h4>
    <div>
      <span>新しい農作物</span>
    </div>
    <div>
      <input class="input-text" v-model="new_crop" placeholder="">
      <button class="input-button" type="button" v-on:click="post_crop">マスタ登録</button>
    </div>
    <div>
      <span>農作物を選択</span>
    </div>
    <div>
      <select class="input-select" v-model="selected_crop" @change="reload()">
        <option v-for="(option_crop, index) in option_crops" v-bind:value="option_crop.crop_id" v-bind:key="index">
          {{ option_crop.crop_name}}
        </option>
      </select>
    </div>

    <h4>品種</h4>
    <div>
      <span>新しい品種</span>
    </div>
    <div>
      <input class="input-text" v-model="new_variety" placeholder="">
      <button class="input-button" type="button" v-on:click="post_variety">マスタ登録</button>
    </div>
    <div>
      <span>品種を選択</span>
    </div>
    <div>
      <select class="input-select" v-model="selected_variety" @change="reload()">
        <option v-for="(option_variety, index) in option_varieties" v-bind:value="option_variety.variety_id" v-bind:key="index">
          {{ option_variety.variety_name }}
        </option>
      </select>
    </div>

    <h4>栽培方法</h4>
    <div>
      <span>新しい栽培方法</span>
    </div>
    <div>
      <input class="input-text" v-model="new_m_cultivation" placeholder="">
      <button class="input-button" type="button" v-on:click="post_m_cultivation">マスタ登録</button>
    </div>
    <div>
      <span>栽培方法を選択</span>
    </div>
    <div>
      <select class="input-select" v-model="selected_m_cultivation" @change="reload()">
        <option v-for="(option_m_cultivation, index) in option_m_cultivations" v-bind:value="option_m_cultivation.cultivation_id" v-bind:key="index">
          {{ option_m_cultivation.cultivation_name }}
        </option>
      </select>
    </div>

    <h4>栽培工程</h4>
    <div>
      <span>新しい栽培工程</span>
    </div>
    <div>
      <input class="input-text" v-model="new_m_process" placeholder="">
      <button class="input-button" type="button" v-on:click="post_m_process">マスタ登録</button>
    </div>
    <div>
      <span>栽培工程を選択</span>
    </div>
    <div>
      <select class="input-select" v-model="selected_m_process">
        <option v-for="(option_m_process, index) in option_m_processes" v-bind:value="{process_id: option_m_process.process_id, process_name: option_m_process.process_name}" v-bind:key="index">
          {{ option_m_process.process_name }}
        </option>
      </select>
      <button class="input-button" type="button" v-on:click="add_selected_process">追加↓</button>
    </div>
    <div>
      <span>上記条件の栽培工程</span>
    </div>
    <div>
      <div v-for="(option_process, p_index) in option_processes" v-bind:key="p_index">
        {{ option_process.process_name }}
        <select class="input-select" v-model="selected_process_1[option_process.process_id]">
          <option v-for="(option_date, d_index) in option_dates" v-bind:value="option_date.date_id" v-bind:key="d_index">
            {{ option_date.date_name }}
          </option>
        </select>
        ~
        <select class="input-select" v-model="selected_process_2[option_process.process_id]">
          <option v-for="(option_date, d_index) in option_dates" v-bind:value="option_date.date_id" v-bind:key="d_index">
            {{ option_date.date_name }}
          </option>
        </select>
        {{ option_process }}
      </div>
      {{ selected_process_1 }}
      {{ selected_process_2 }}
    </div>

    <div>
      <button class="input-button" type="button" v-on:click="post_data">データ追加</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      option_dates: '',

      selected_crop: 0,
      option_crops: '',
      new_crop: '',

      selected_variety: 0,
      option_varieties: '',
      new_variety: '',

      selected_m_cultivation: 0,
      option_m_cultivations: '',
      new_m_cultivation: '',

      selected_m_process: 0,
      option_m_processes: '',
      new_m_process: '',

      selected_process_1: [],
      selected_process_2: [],
      option_processes: '',
      new_process: ''
    }
  },
  mounted: function() {
    this.fetch_date();
    this.reload();
  },
  methods: {
    reload: function() {
      this.fetch_crop();
      this.fetch_variety();
      this.fetch_m_cultivation();
      this.fetch_m_process();
      this.fetch_process();
    },
    fetch_date: function() {
      fetch(`http://153.127.68.164:3000/date`, {
          mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.option_dates = data;
        });
    },
    fetch_crop: function() {
      fetch(`http://153.127.68.164:3000/crop`, {
          mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.option_crops = data;
        });
    },
    fetch_variety: function() {
      fetch(`http://153.127.68.164:3000/variety?param=${ this.selected_crop }`, {
          mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.option_varieties = data;
        });
    },
    fetch_m_cultivation: function() {
      fetch(`http://153.127.68.164:3000/m_cultivation`, {
          mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.option_m_cultivations = data;
        });
    },
    fetch_m_process: function() {
      fetch(`http://153.127.68.164:3000/m_process`, {
          mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.option_m_processes = data;
        });
    },
    fetch_process: function() {
      fetch(`http://153.127.68.164:3000/process?crop=${ this.selected_crop }&variety=${ this.selected_variety }&cultivation=${ this.selected_m_cultivation }`, {
          mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.selected_process_1 = [];
          this.selected_process_2 = [];
          data.forEach((each) => {
            this.selected_process_1[each.process_id] = each.date_1_num;
            this.selected_process_2[each.process_id] = each.date_2_num;
          });
          this.option_processes = data;
        });
    },
    add_new_process: function() {
      this.option_processes.push({
        process_name: this.new_m_process
      });
    },
    add_selected_process: function() {
      this.option_processes.push({
        process_name: this.selected_m_process.process_name,
        process_id: this.selected_m_process.process_id
      });
    },
    post_crop: function() {
      const obj = {crop_name: this.new_crop};
      const method = "POST";
      const body = JSON.stringify(obj);
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      fetch(`http://153.127.68.164:3000/crop`, {
        method, headers, body
        })
        .then((res) => res.json())
        .then(data => {
          console.log(data);
          this.reload();
        });
    },
    post_variety: function() {
      const obj = {
        variety_name: this.new_variety,
        crop_id: this.selected_crop
      };
      const method = "POST";
      const body = JSON.stringify(obj);
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      fetch(`http://153.127.68.164:3000/variety`, {
        method, headers, body
        })
        .then((res) => res.json())
        .then(data => {
          console.log(data);
          this.reload();
        });
    },
    post_m_cultivation: function() {
      const obj = {
        cultivation_name: this.new_m_cultivation
      };
      const method = "POST";
      const body = JSON.stringify(obj);
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      fetch(`http://153.127.68.164:3000/m_cultivation`, {
        method, headers, body
        })
        .then((res) => res.json())
        .then(data => {
          console.log(data);
          this.reload();
        });
    },
    post_m_process: function() {
      const obj = {
        process_name: this.new_m_process
      };
      const method = "POST";
      const body = JSON.stringify(obj);
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      fetch(`http://153.127.68.164:3000/m_process`, {
        method, headers, body
        })
        .then((res) => res.json())
        .then(data => {
          console.log(data);
          this.reload();
        });
    },
    post_cultivation: function() {
      const obj = {
        cultivation_id: this.selected_m_cultivation,
        crop_id: this.selected_crop,
        variety_id: this.selected_variety
      };
      const method = "POST";
      const body = JSON.stringify(obj);
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      fetch(`http://153.127.68.164:3000/cultivation`, {
        method, headers, body
        })
        .then((res) => res.json())
        .then(data => {
          console.log(data);
        });
    },
    post_process: function() {
      this.option_processes.forEach(each => {
        const obj = {
          process_id: each.process_id,
          crop_id: this.selected_crop,
          variety_id: this.selected_variety,
          cultivation_id: this.selected_m_cultivation,
          start_date_id: this.selected_process_1[each.process_id],
          end_date_id: this.selected_process_2[each.process_id]
        };
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        fetch(`http://153.127.68.164:3000/process`, {
          method, headers, body
          })
          .then((res) => res.json())
          .then(data => {
            console.log(data);
          });
      });
    },
    post_data: function() {
      this.post_cultivation();
      this.post_process();
    }
  }
}
</script>

<style>
.input-text {
  height: 20px;
}
.input-select {
  height: 26px;
}
</style>
