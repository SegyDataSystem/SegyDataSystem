<template>
    <div class="projects-pad">
      <el-dialog :visible.sync="dialogVisible"  title="please choose a file" style="width:50%;min-width:600px;margin-left:auto;margin-right:auto;">
        <div>
          <span>choose a file:</span>
          <input type="file" />
        </div>
        <div style="margin-top:30px;">
          <el-button type="primary" @click="()=>{this.$router.push('/LoadColormap')}">finish</el-button>
          <el-button type="primary" @click="()=>{this.$data.dialogVisible=false;}">Cancel</el-button>


        </div>
      </el-dialog>
      <div>
        <el-menu  class="el-menu-demo" mode="horizontal"  :router="true">
          <el-menu-item index="/">File</el-menu-item>
          <el-submenu index="2">
            <template slot="title">Import</template>
            <el-menu-item index="NewProject" >Import Segy Data</el-menu-item>
            <el-menu-item index="HorizonData">Import Horizon Data</el-menu-item>
            <el-menu-item index="WellData">Import Well Data</el-menu-item>
            <el-menu-item index="CalculateAttributes">Calculate Attributes</el-menu-item>

          </el-submenu>
           <el-submenu index="/">
              <template slot="title">Data Mining</template>
              <el-submenu index="1">
                <template slot="title">Preprocess</template>
                <el-menu-item index="Standardization">Standardization</el-menu-item>
              </el-submenu>
              <el-menu-item index="/LabelPrepare">Label Prepare By Well</el-menu-item>
              <el-menu-item index="/Cluster">Cluster</el-menu-item>
              <el-menu-item index="/FeatureSelection">Feature Selection</el-menu-item>
              <el-menu-item index="/FeatureExtraction">Feature Extraction</el-menu-item>
              <el-menu-item index="/Classification">Classification</el-menu-item>
          </el-submenu>
          <el-submenu>
            <template slot="title">Tools</template>
            <el-menu-item @click="()=>{this.$data.dialogVisible = true;}">Load Colormap</el-menu-item>
          </el-submenu>
          <el-menu-item index="/">Help</el-menu-item>
        </el-menu>
      </div>
      <div style="width:100%;height:40px;border-bottom: 1px solid lightgray">
        <div style="float: left">
          <div class="icon-image">
          </div>
        </div>
        <div style="float: left">
          <div class="icon-image-1">
          </div>
        </div>
        <div style="float: left">
          <div class="icon-image-2">
          </div>
        </div>
        <div style="float: left">
          <div class="icon-image-3">
          </div>
        </div>

      </div>
      <div style="margin-top:20px;width: 80%;">
        <el-tabs type="border-card" style="box-shadow:0 0 0 white">

          <el-tab-pane label="Seismic">
            <el-tree :data="data" :props="defaultProps" ref="tree"  show-checkbox></el-tree>

            <div style="margin-top:50px;width: 98%;margin-right:auto;margin-left:auto;text-align:left">
              <el-button type="primary" size="small" @click="getCheckedNodes">Export Seismic Data</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="Horizon">
            <el-tree :data="data" :props="defaultProps"  show-checkbox ref="tree1"></el-tree>
            <div style="margin-top:50px;width: 98%;margin-right:auto;margin-left:auto;text-align:left">
              <el-button type="primary" size="small" @click="getCheckedNodes1">Export Horizon Data</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="Interval">
            <el-tree :data="data" :props="defaultProps"  show-checkbox></el-tree>
          </el-tab-pane>
          <el-tab-pane label="Well">
            <el-tree :data="data" :props="defaultProps"  show-checkbox></el-tree>


          </el-tab-pane>
          <el-tab-pane label="Fault">
            <el-tree :data="data" :props="defaultProps"  show-checkbox></el-tree>
          </el-tab-pane>
        </el-tabs>
        
      </div>

     
    </div>

</template>

<script>
  /* eslint-disable */
  export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      data: [ {
          label: 'SeisMiningMyProject',
          children: [{
            label: 'Horizon3D',
            children: [{
              label: 'Ha6_T03t-50'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogVisible:false,
    }
  },
  mounted(){
    window.console.log(this.$route);
    if(this.$route.query.a==='a'){
      window.console.log('ddd');
      this.$data.data=[ {
          label: 'SeisMiningMyProject',
          children: [{
            label: 'Horizon3D',
            children: [{
              label: 'Ha6_T03t-50',
              children: [
                {
                  label:'Attributes',
                  children:[
                    {
                      label:'FeatureExtraction'
                    },
                    {
                      label:'FeatureSelection'
                    },
                    {
                      label:'Cluster'
                    },
                    {
                      label:'Classification'
                    },
                    {
                      label:'Preprocess'
                    },
                    
                  ]
                }
              ]
            }]
          }]
        }]
    }
  },
  methods:{
    getCheckedNodes(){
      /* eslint-disable*/
      console.log(this.$refs.tree.getCheckedNodes());
      let tree = this.$refs.tree.getCheckedNodes();
      if(tree.length===0){
        this.$message({
          message:'No node is selected!',
          type:'error'
        })
      }else{
        this.$router.push('/ExportData')
      }
    },
    getCheckedNodes1(){
      /* eslint-disable*/
      console.log(this.$refs.tree1.getCheckedNodes());
      let tree = this.$refs.tree1.getCheckedNodes();
      if(tree.length===0){
        this.$message({
          message:'No node is selected!',
          type:'error'
        })
      }else{
        this.$router.push('/ExportHorizonData')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .projects-pad{
    width: 100%;
    height: 100%;

  }

  .icon-image{
    margin-top: 10px;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    background-image: url("../assets/新建.png");
    background-size: cover;
  }

  .icon-image-1{
    margin-top: 10px;
    margin-left: 10px;
    width: 22px;
    height: 22px;
    background-image: url("../assets/打开.png");
    background-size: cover;
  }

  .icon-image-2{
    margin-top: 10px;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    background-image: url("../assets/保存.png");
    background-size: cover;
  }

  .icon-image-3{
    margin-top: 10px;
    margin-left: 10px;
    width: 20px;
    height: 20px;
    background-image: url("../assets/保存1.png");
    background-size: cover;
  }


</style>
