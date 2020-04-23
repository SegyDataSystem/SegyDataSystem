<template>
  <div id="app">
    <div class="top-panel">
      <div class="left-panel">
        <div @click="()=>{this.$router.push('/')}">
        <span class="left-panel-fonts">
          Segy Data System
        </span>
        
        </div>
      </div>
      <div style="float:right;margin-top:10px;margin-right:20px;">

        <el-button type="plain" @click="()=>{this.$router.push('/')}">HomePage</el-button>
      </div>
    </div>
    <div class="main-content">
      <router-view />
    </div>
    <div style="width:100%;height:30px;">

    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  
}
</script>

<style>
  .top-panel{
    width: 100%;
    height:60px;
    /* box-shadow: 0px 4px 10px whitesmoke; */
    border-bottom: 1px solid lightgray;
    background-color: white;
    z-index: 1005;
    position: fixed;
    top:0;
  }

  .main-content{
    width: 90%;
    min-height: 600px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    margin-top: 70px;
    border: 1px solid lightgray;
    box-shadow: 0 4px 10px whitesmoke;

  }



  html,body{
    width: 100%;
    height:100%;
    margin: 0;
    padding: 0;
    background-color: #fcfcfc;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #fcfcfc;

}

  .left-panel-fonts{
    font-size: 23px;
    font-weight: bold;
    color: #666;

  }
  .left-panel{
    width: 400px;
    float: left;
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-family: "PingFang SC";
  }
</style>
