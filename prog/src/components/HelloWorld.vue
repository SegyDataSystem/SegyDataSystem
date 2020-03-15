<template>
    <div class="projects-pad" >
      <div v-loading="v_loading">
        <el-dialog :visible.sync="dialogVisibleImportAttribute"  title="please choose a file" style="margin-left:auto;margin-right:auto;">
          <div>
            <el-table :data="downloadFileList" v-show="!hasChosen">
              <el-table-column
                      prop="realName"
                      label="file name"
              >
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="chooseSegy(scope.$index)">select</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top:30px;">

            <el-button type="primary" @click="()=>{this.$data.dialogVisible=false;}">Cancel</el-button>
          </div>
        </el-dialog>
      <el-dialog :visible.sync="dialogVisible"  title="please choose a file" style="width:50%;min-width:600px;margin-left:auto;margin-right:auto;">
        <div>
          <span>input </span>
          <input type="file" />
        </div>
        <div style="margin-top:30px;">
          <el-button type="primary" @click="()=>{this.$router.push('/LoadColormap')}">finish</el-button>
          <el-button type="primary" @click="()=>{this.$data.dialogVisible=false;}">Cancel</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisibleNew"  title="please choose a file" style="width:50%;min-width:600px;margin-left:auto;margin-right:auto;" v-loading="loading1">
        <div>
          <el-form :model="formNewProject">
            <el-form-item
              label="project name:"
            >
              <el-input v-model="formNewProject.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-top:30px;">
          <el-button type="primary" @click="newProject">finish</el-button>
          <el-button type="primary" @click="()=>{this.$data.dialogVisibleNew=false;}">Cancel</el-button>
        </div>
      </el-dialog>
      <div>
        <el-menu  class="el-menu-demo" mode="horizontal"  :router="true">
          <el-submenu index="0">
            <template slot="title">File</template>
            <el-menu-item @click="dialogVisibleNew=true" >New Project</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">Import</template>
            <el-menu-item index="NewProject" >Import Segy Data</el-menu-item>
            <el-menu-item index="HorizonData">Import Horizon Data</el-menu-item>
            <el-menu-item index="WellData">Import Well Data</el-menu-item>
            <el-menu-item index="IntervalData">Import Interval Data</el-menu-item>
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
          <el-menu-item index="/FileManage">File Manage</el-menu-item>
        </el-menu>
      </div>
      <div style="width:100%;height:40px;border-bottom: 1px solid lightgray">
        <div style="float: left">
          <div class="icon-image" >
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
      <div style="margin-top:20px;width: 80%;" >
        <span v-if="!haveNewProject">No Project. Please Create a New Project</span>
        <el-tabs type="border-card" style="box-shadow:0 0 0 white" v-if="haveNewProject">

          <el-tab-pane label="Seismic">
            <el-tree :data="SeismicData" :props="defaultProps" ref="treeSeismic"  show-checkbox></el-tree>
            <div style="margin-top:50px;width: 98%;margin-right:auto;margin-left:auto;text-align:left">
              <el-button type="primary" size="small" @click="getCheckedNodes">Export Seismic Data</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="Horizon">
            <el-tree :data="data" :props="defaultProps"  show-checkbox ref="tree1"></el-tree>
            <div style="margin-top:50px;width: 98%;margin-right:auto;margin-left:auto;text-align:left">
              <el-button type="primary" size="small" @click="getCheckedNodes1">Export Horizon Data</el-button>
<!--              <el-button type="primary" size="small" @click="getCheckedNodes1">Import Horizon Data</el-button>-->
              <el-button type="primary" size="small" @click="dialogVisibleImportAttribute=true">Import Horizon Attribute</el-button>
              <el-button type="primary" size="small" @click="toScatterProcess">Scatter Process</el-button>
              <el-button type="primary" size="small" @click="toImageDenosing">Image Denoising</el-button>
              <el-button type="primary" size="small" @click="toAutoSelectLabel">Auto Select Label</el-button>
              <el-button type="primary" size="small" @click="toClusterImage">See Cluster Image</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="Interval">
            <el-tree :data="IntervalData" :props="defaultProps"  show-checkbox></el-tree>

            <div style="margin-top:50px;width: 98%;margin-right:auto;margin-left:auto;text-align:left">
              
<!--              <el-button type="primary" size="small" @click="getCheckedNodes1">Import Horizon Data</el-button>-->
              <el-button type="primary" size="small" @click="dialogVisibleImportAttribute=true">Import Horizon Attribute</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Well">
            <el-tree :data="WellsData" :props="defaultProps"  show-checkbox></el-tree>


          </el-tab-pane>
          <el-tab-pane label="Fault">
            <el-tree :data="Fault" :props="defaultProps"  show-checkbox></el-tree>
          </el-tab-pane>
        </el-tabs>
        
      </div>

      </div>
    </div>

</template>

<script>
  /* eslint-disable */
  export default {
  name: 'HelloWorld',
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
      dialogVisibleNew:false,
      haveNewProject: this.$Global.hasProject,
      formNewProject:{
        name:''
      },
      v_loading: false,
      loading1: false,
      dialogVisibleImportAttribute:false,
      downloadFileList:[],
      chosenFile:'',
      chosedFileId:'',
      SeismicData:[],
      FaultData:[],
      WellsData:[],
      IntervalData:[]
    }
  },
    watch:{
      $route(fromPath, toPath){
        let _this = this;
        this.$axios({
          method:'get',
          url:'/project/'+this.$Global.projectDetails.id,
        }).then((response)=>{
          _this.$Global.projectDetails = response.data.data;
          window.console.log('jjj');
          _this.showTrees();
        })
      }

    },
  mounted(){
    this.getProject();
    this.getDownloadFiles();
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
    getDownloadFiles(){
      let _this = this;
      this.$axios({
        method:'get',
        url: this.$Global.server_config.url+'/downloadFile/fileList?userId='+this.$Global.server_config.userId,

      }).then((response)=>{
        _this.downloadFileList = response.data;
      });
    },
    chooseSegy(index){
      this.isLoading = true;
      window.console.log(index);
      this.$data.chosenFile = this.$data.downloadFileList[index].realName;
      this.$data.chosenFileId = this.$data.downloadFileList[index].id;
      this.$data.hasChosen = true;
      let _this = this;
      this.$axios({
        method:'post',
        url:this.$Global.server_config.url+'/updateFile/datamining/'+this.$Global.projectDetails.subProjectList[1].dataMiningList[5].id,
        params:{
          // subProjectId: this.$Global.projectDetails.subProjectList[1].id,
          fileId: this.$data.chosenFileId
        }
      }).then((response)=>{
        window.console.log(response);
        _this.isLoading = false;
        _this.dialogVisibleImportAttribute=false;
        _this.getProject();
      }).catch((error)=>{
        window.console.log(error);
        _this.isLoading = false;
      })

    },
    getProject(){
      if(this.$Global.projectDetails.id) {
        let _this = this;
        this.$axios({
          method: 'get',
          url: '/project/' + this.$Global.projectDetails.id,
        }).then((response) => {
          _this.$Global.projectDetails = response.data.data;
          window.console.log('222');
          _this.showTrees();
        })
      }
    },
    showTrees(){

      /**
       * Horizon
       * */
      if(this.$Global.projectDetails.subProjectList[1]) {
        // window.console.log(this.$Global.);
        let HorizonProject = this.$Global.projectDetails.subProjectList[1];
        let tempHorizonTreeData=[{
          label:'Horizon',
        }];
        if(HorizonProject.file){
          tempHorizonTreeData[0].children=[{
              label: HorizonProject.file.realName,
              id: HorizonProject.file.id,
              children:[{
                label:'Attribute',
                children:[]
              }]
          }];
          for(let item = 0;item < HorizonProject.dataMiningList.length; item++){
            tempHorizonTreeData[0].children[0].children[0].children.push({
              label: HorizonProject.dataMiningList[item].type,
              children:[]
            });
            if(HorizonProject.dataMiningList[item].fileList){
              let tempFileList = HorizonProject.dataMiningList[item].fileList;
              for(let index = 0;index<tempFileList.length;index++){
                tempHorizonTreeData[0].children[0].children[0].children[item].children.push({
                    label: tempFileList[index].realName
                })
              }
            }
          }

        }
        this.$data.data = tempHorizonTreeData;
      }

      /**
       * seismic
       * */
      if(this.$Global.projectDetails.subProjectList[0]){
        let HorizonProject = this.$Global.projectDetails.subProjectList[0];
        let tempHorizonTreeData=[{
          label:'Seismic',
        }];
        if(HorizonProject.file){
          tempHorizonTreeData[0].children=[{
            label: HorizonProject.file.realName,
            id: HorizonProject.file.id,
            children:[{
              label:'Attribute',
              children:[]
            }]
          }];
          for(let item = 0;item < HorizonProject.dataMiningList.length; item++){
            tempHorizonTreeData[0].children[0].children[0].children.push({
              label: HorizonProject.dataMiningList[item].type,
              children:[]
            });
            if(HorizonProject.dataMiningList[item].fileList){
              let tempFileList = HorizonProject.dataMiningList[item].fileList;
              for(let index = 0;index<tempFileList.length;index++){
                tempHorizonTreeData[0].children[0].children[0].children[item].children.push({
                  label: tempFileList[index].realName
                })
              }
            }
          }

        }
        this.$data.SeismicData = tempHorizonTreeData;

      }

      /**
       * Interval
       * */
      if(this.$Global.projectDetails.subProjectList[2]){
        let HorizonProject = this.$Global.projectDetails.subProjectList[2];
        let tempHorizonTreeData=[{
          label:'Interval',
        }];
        if(HorizonProject.file){
          tempHorizonTreeData[2].children=[{
            label: HorizonProject.file.realName,
            id: HorizonProject.file.id,
            children:[{
              label:'Attribute',
              children:[]
            }]
          }];
          for(let item = 0;item < HorizonProject.dataMiningList.length; item++){
            tempHorizonTreeData[0].children[0].children[0].children.push({
              label: HorizonProject.dataMiningList[item].type,
              children:[]
            });
            if(HorizonProject.dataMiningList[item].fileList){
              let tempFileList = HorizonProject.dataMiningList[item].fileList;
              for(let index = 0;index<tempFileList.length;index++){
                tempHorizonTreeData[0].children[0].children[0].children[item].children.push({
                  label: tempFileList[index].realName
                })
              }
            }
          }

        }
        this.$data.IntervalData = tempHorizonTreeData;

      }
      /**
       * Wells
       * */
      if(this.$Global.projectDetails.subProjectList[3]){
        let HorizonProject = this.$Global.projectDetails.subProjectList[3];
        let tempHorizonTreeData=[{
          label:'Wells',
        }];
        if(HorizonProject.file){
          tempHorizonTreeData[0].children=[{
            label: HorizonProject.file.realName,
            id: HorizonProject.file.id,
            children:[{
              label:'Attribute',
              children:[]
            }]
          }];
          for(let item = 0;item < HorizonProject.dataMiningList.length; item++){
            tempHorizonTreeData[0].children[0].children[0].children.push({
              label: HorizonProject.dataMiningList[item].type,
              children:[]
            });
            if(HorizonProject.dataMiningList[item].fileList){
              let tempFileList = HorizonProject.dataMiningList[item].fileList;
              for(let index = 0;index<tempFileList.length;index++){
                tempHorizonTreeData[0].children[0].children[0].children[item].children.push({
                  label: tempFileList[index].realName
                })
              }
            }
          }

        }
        this.$data.WellsData = tempHorizonTreeData;

      }

      /**
       * Fault
       * */
      if(this.$Global.projectDetails.subProjectList[4]){
        let HorizonProject = this.$Global.projectDetails.subProjectList[4];
        let tempHorizonTreeData=[{
          label:'Fault',
        }];
        if(HorizonProject.file){
          tempHorizonTreeData[0].children=[{
            label: HorizonProject.file.realName,
            id: HorizonProject.file.id,
            children:[{
              label:'Attribute',
              children:[]
            }]
          }];
          for(let item = 0;item < HorizonProject.dataMiningList.length; item++){
            tempHorizonTreeData[0].children[0].children[0].children.push({
              label: HorizonProject.dataMiningList[item].type,
              children:[]
            });
            if(HorizonProject.dataMiningList[item].fileList){
              let tempFileList = HorizonProject.dataMiningList[item].fileList;
              for(let index = 0;index<tempFileList.length;index++){
                tempHorizonTreeData[0].children[0].children[0].children[item].children.push({
                  label: tempFileList[index].realName
                })
              }
            }
          }

        }
        this.$data.FaultData = tempHorizonTreeData;

      }


    },
    newProject(){
      this.v_loading=true;

      this.dialogVisibleNew = false;
      let _this = this;
      this.$axios({
        method:'post',
        url:'/project',
        params:{
          name: this.formNewProject.name,
          userId: this.$Global.server_config.userId
        }
      }).then((response)=>{
        _this.$Global.projectDetails = response.data.data;
        _this.$Global.hasProject=true;
        _this.haveNewProject = true;

        _this.v_loading=false;
        _this.showTrees();
        _this.$message({
          type:'success',
          message:'project created successfully!'
        })
      })
    },
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
    },
    toAutoSelectLabel(){
      /* eslint-disable*/
      console.log(this.$refs.tree1.getCheckedNodes());
      let tree = this.$refs.tree1.getCheckedNodes();
      if(tree.length===0){
        this.$message({
          message:'No node is selected!',
          type:'error'
        })
      }else{
        this.$router.push('/AutoSelectLabel')
      }
    },
    toScatterProcess(){
      /* eslint-disable*/
      let tree = this.$refs.tree1.getCheckedNodes();
      if(tree.length===0){
        this.$message({
          message:'No node is selected!',
          type:'error'
        })
      }else{
        this.$confirm('Do Scatter Process?', 'Info', {
          confirmButtonText: 'yes',
          cancelButtonText: 'no',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Scatter Process Successful!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Scatter Process Cancel!'
          });          
        });
      }
    },
    toImageDenosing(){
      /* eslint-disable*/
      let tree = this.$refs.tree1.getCheckedNodes();
      if(tree.length===0){
        this.$message({
          message:'No node is selected!',
          type:'error'
        })
      }else{
        this.$confirm('Do Image Denosing?', 'Info', {
          confirmButtonText: 'yes',
          cancelButtonText: 'no',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Image Denosing Successful!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Image Denosing Cancel!'
          });          
        });
      }
    },
    toClusterImage(){
      
      let tree = this.$refs.tree1.getCheckedNodes();
      
      if(tree.length===0){
        this.$message({
          message:'No node is selected!',
          type:'error'
        })
      }else{
        this.$router.push({path:'/ClusterImage',query:{
          imagePath:this.$Global.projectDetails.subProjectList[1].dataMiningList[2].fileList[0].path,
          id: this.$Global.projectDetails.subProjectList[1].dataMiningList[2].fileList[0].id}});
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
