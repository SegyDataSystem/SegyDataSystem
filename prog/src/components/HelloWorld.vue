<template>
    <div class="projects-pad" >
      <div v-loading="v_loading">

        <el-dialog :visible.sync="dialogVisibleExisting"  title="Please Choose a Project" style="margin-left:auto;margin-right:auto;" :close-on-click-modal="false">
          <div>
            <el-table style="width:80%;margin-left:auto;margin-right:auto;" :data="projectList">
              <el-table-column
                      prop="name"
                      label="Project Name"
              >
              </el-table-column>
              <el-table-column
                      prop="description"
                      label="Description"
              >
              </el-table-column>
              <el-table-column
                label="Operation"
              >
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="chooseProject(scope.$index)">Select</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top:30px;">

            <el-button type="primary" @click="()=>{this.$data.dialogVisibleExisting=false;}">Cancel</el-button>
          </div>
        </el-dialog>

        <el-dialog :visible.sync="dialogVisibleImportAttribute" :close-on-click-modal="false"  title="please choose a file" style="margin-left:auto;margin-right:auto;">
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
            <el-button type="primary" @click="()=>{this.$data.dialogVisibleImportAttribute=false;}">Cancel</el-button>
          </div>
        </el-dialog>
      <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" title="please choose a file" style="width:50%;min-width:600px;margin-left:auto;margin-right:auto;">
        <div>
          <span>input </span>
          <input type="file" />
        </div>
        <div style="margin-top:30px;">
          <el-button type="primary" @click="()=>{this.$router.push('/LoadColormap')}">finish</el-button>
          <el-button type="primary" @click="()=>{this.$data.dialogVisible=false;}">Cancel</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisibleNew" :close-on-click-modal="false" title="Create a new project" style="width:50%;min-width:600px;margin-left:auto;margin-right:auto;" v-loading="loading1">
        <div>
          <el-form :model="formNewProject">
            <el-form-item
              label="Project Name:"
            >
              <el-input v-model="formNewProject.name"></el-input>
            </el-form-item>
            <el-form-item
              label="Project Description:"
            >
              <el-input v-model="formNewProject.description" type="textarea"></el-input>
            </el-form-item>
            
          </el-form>
        </div>
        <div style="margin-top:30px;">
          <el-button type="primary" @click="newProject" size="small">Finish</el-button>
          <el-button type="primary" @click="()=>{this.$data.dialogVisibleNew=false;}" size="small">Cancel</el-button>
        </div>
      </el-dialog>
      <div>
        <el-menu  mode="horizontal"  :router="true">
          <el-submenu index="0" :router="false">
            <template slot="title">Project</template>
            <el-menu-item  @click="dialogVisibleNew=true" >New Project</el-menu-item>
            <el-menu-item  @click="getExistingProjects" >Open Existing Project</el-menu-item>
          </el-submenu>
          <el-submenu index="2" v-if="haveNewProject">
            <template slot="title">Import</template>
            <el-menu-item index="NewProject" v-show="showSegyFlag">Import Segy Data</el-menu-item>
            <el-menu-item index="HorizonData">Import Horizon Data</el-menu-item>
            <el-menu-item index="WellData">Import Well Data</el-menu-item>
            <el-menu-item index="IntervalData">Import Interval Data</el-menu-item>
            <!-- <el-menu-item index="CalculateAttributes">Calculate Attributes</el-menu-item> -->

          </el-submenu >
           <el-submenu index="/" v-if="haveNewProject">
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
          <el-submenu v-if="haveNewProject">
            <template slot="title">Tools</template>
            <el-menu-item @click="()=>{this.$data.dialogVisible = true;}">Load Colormap</el-menu-item>
          </el-submenu>
          <!-- <el-menu-item index="/">Help</el-menu-item> -->
          <el-menu-item index="/FileManage">File Management</el-menu-item>
        </el-menu>
      </div>
      <div style="width:100%;height:40px;border-bottom: 1px solid lightgray">
        <div style="float: left">
          <div class="icon-image" @click="dialogVisibleNew=true">
          </div>
        </div>
        <div style="float: left">
          <div class="icon-image-1" @click="getExistingProjects">
          </div>
        </div>
        <div style="float: left">
          
        </div>
      </div>
      <div style="margin-top:20px;width: 80%;" >
        <span v-if="!haveNewProject">No Project. Please Create a New Project or Select a Existing Project.</span>
        <el-card class="project-intro-card" v-if="haveNewProject">
            <span style="font-weight:normal">Project:</span>
            <span>{{projectName}}</span>
            <span style="margin-left:20px;font-weight:normal">Description:</span>
            <span v-if="projectDescription" style="width:200px;overflow:hidden;">{{projectDescription}}</span>
            <span v-if="!projectDescription" style="width:200px;overflow:hidden;">No Description</span>
        </el-card>
        <el-tabs type="border-card" style="box-shadow:0 0 0 white;margin-top:20px;" v-if="haveNewProject">

          <el-tab-pane label="Seismic">
            <el-tree :default-expand-all="true" :data="SeismicData" :check-strictly="true" :props="defaultProps" ref="treeSeismic"  show-checkbox></el-tree>
            <div style="margin-top:50px;width: 98%;margin-right:auto;margin-left:auto;text-align:left">
              <el-button type="primary" size="small" @click="importSegyAttribute">Import Seismic Attribute</el-button>
              <el-button type="primary" size="small" @click="getCheckedNodes">Export Seismis</el-button>
              <el-button type="primary" size="small" @click="showSeismicImage">Seismic Data Image</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="Horizon">
            <el-tree :default-expand-all="true" :data="data" :props="defaultProps" :check-strictly="true" show-checkbox ref="tree1"></el-tree>
            <div style="margin-top:50px;width: 98%;margin-right:auto;margin-left:auto;text-align:left">
              <el-button type="primary" size="small" @click="getCheckedNodes1">Export Horizon Data</el-button>
<!--              <el-button type="primary" size="small" @click="getCheckedNodes1">Import Horizon Data</el-button>-->
              <el-button type="primary" size="small" @click="importHorizonAttr">Import Horizon Attribute</el-button>
              <!-- <el-button type="primary" size="small" @click="toScatterProcess">Scatter Process</el-button> -->
              <!-- <el-button type="primary" size="small" @click="toImageDenosing">Image Denoising</el-button> -->
              <!-- <el-button type="primary" size="small" @click="toAutoSelectLabel">Auto Select Label</el-button> -->
              <el-button type="primary" size="small" v-if="showClusterImage" @click="toClusterImage">See Cluster Image</el-button>
              <el-button type="primary" size="small" v-if="showCluster" @click="toCluster">Run Cluster</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Interval">
            <el-tree :default-expand-all="true" :data="IntervalData" :props="defaultProps" :check-strictly="true"  ref="treeInterval" show-checkbox></el-tree>

            <div style="margin-top:50px;width: 98%;margin-right:auto;margin-left:auto;text-align:left">
              
<!--              <el-button type="primary" size="small" @click="getCheckedNodes1">Import Horizon Data</el-button>-->
              <el-button type="primary" size="small" @click="importIntervalAttr">Import Interval Attribute</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Well">
            <el-tree :default-expand-all="true" :data="WellsData" :props="defaultProps" :check-strictly="true" show-checkbox></el-tree>
          </el-tab-pane>
          <el-tab-pane label="Fault">
            <el-tree :default-expand-all="true" :data="Fault" :props="defaultProps" :check-strictly="true" show-checkbox></el-tree>
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
      projectName:'',
      projectDescription:'',
      projectList:[],
      dialogVisibleExisting: false,
      data: [ ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogVisible:false,
      dialogVisibleNew:false,
      haveNewProject: this.$Global.hasProject,
      formNewProject:{
        name:'',
        description:'',
      },
      v_loading: false,
      loading1: false,
      dialogVisibleImportAttribute:false,
      downloadFileList:[],
      chosenFile:'',
      chosedFileId:'',
      showCluster: false,
      showClusterImage: false,
      SeismicData:[],
      FaultData:[],
      WellsData:[],
      IntervalData:[],
      showSegyFlag:false,
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
          if(response.data.data.subProjectList.length!==0){
            _this.showSegyFlag=false;
          }else{
            _this.showSegyFlag=true;
          }
          window.console.log('jjj');
          _this.showTrees();
        })
      }

    },
  mounted(){
    this.getProject();
    this.getDownloadFiles();
    window.console.log(this.$route);
    
    
  },
  methods:{
    importHorizonAttr(){
      let tree = this.$refs.tree1.getCheckedNodes();
      if(tree.length === 1 && tree[0].label.indexOf('Attributes') !== -1){
        this.$router.push('/ImportHorizonAttribute');
      }else{
        this.$message({
          type:'error',
          message: 'No Attribute node is selected'
        })
      }
      
    },
    importIntervalAttr(){
      let tree = this.$refs.treeInterval.getCheckedNodes();
      if(tree.length === 1 && tree[0].label.indexOf('Attributes') !== -1){
        this.$router.push('/ImportIntervalAttribute');
      }else{
        this.$message({
          type:'error',
          message: 'No Attribute node is selected'
        })
      }
      
    },
    chooseProject(index){
      let _this = this;
      this.$Global.projectDetails.id = this.$data.projectList[index].id;
      window.console.log(this.$Global.projectDetails);
      this.getProject();
      this.dialogVisibleExisting = false;
      this.haveNewProject = true;
    },
    getExistingProjects(){

      let use = new FormData();
      use.append('userId','10000');
      let _this = this;
      this.$axios({
        method: 'get',
        url: 'http://47.103.212.224:8080/project?userId=10000',
      }).then((response)=>{
        window.console.log(response.data);
        _this.$data.projectList = response.data.data;
        _this.$data.dialogVisibleExisting = true;
      })

    },
    getDownloadFiles(){
      let _this = this;
      this.$axios({
        method:'post',
        url: this.$Global.server_config.url+'/downloadFile/fileList',
        data:{
         userId: this.$Global.server_config.userId,
         type: 'Horizon'
        }

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
        _this.haveNewProject = true;
        this.$axios({
          method: 'get',
          url: '/project/' + this.$Global.projectDetails.id,
        }).then((response) => {
          _this.$Global.projectDetails = response.data.data;
          if(response.data.data.subProjectList.length!==0){
            _this.showSegyFlag=false;
          }else{
            _this.showSegyFlag=true;
          }
          
          
          _this.showTrees();
        })
      }
    },
    showTrees(){
      this.projectName = this.$Global.projectDetails.name;
      this.projectDescription = this.$Global.projectDetails.description;
      if(this.$Global.projectDetails.subProjectList&&this.$Global.projectDetails.subProjectList.length!==0){
    
        if(this.$Global.projectDetails.subProjectList[1]){
          if(this.$Global.projectDetails.subProjectList[1].dataMiningList){
            if(this.$Global.projectDetails.subProjectList[1].dataMiningList[0].fileList!=null){
              this.showCluster = true;
            }
            if(this.$Global.projectDetails.subProjectList[1].dataMiningList[2].fileList!=null){
              this.showClusterImage = true;
            }
          }
          
        }

        let project = this.$Global.projectDetails.subProjectList;
        for(let index = 0; index < project.length; index++){
          let HorizonProject = this.$Global.projectDetails.subProjectList[index];
            let tempHorizonTreeData=[{
              label:project[index].type,
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
              if(HorizonProject.dataMiningList){
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
          

            }
          if(project[index].type === 'Seismic'){
            this.$data.SeismicData = tempHorizonTreeData;
          }else if(project[index].type === 'Horizon'){
            this.$data.data = tempHorizonTreeData;
          }else if(project[index].type === 'Interval'){
            this.$data.IntervalData = tempHorizonTreeData;
          }else if(project[index].type === 'Wells'){
            this.$data.WellsData = tempHorizonTreeData;
          }else{
            this.$data.FaultData = tempHorizonTreeData;
          }
        }
      
      }else{
        this.$data.FaultData = '';
        this.$data.WellsData = '';
        this.$data.IntervalData = '';
        this.$data.SeismicData = '';
        this.$data.data = '';
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
          userId: this.$Global.server_config.userId,
          description: this.formNewProject.description
        }
      }).then((response)=>{
        _this.$Global.projectDetails = response.data.data;
        _this.$Global.hasProject=true;
        _this.haveNewProject = true;
        _this.v_loading=false;
        _this.showSegyFlag = true;
        _this.showTrees();
        _this.$message({
          type:'success',
          message:'project created successfully!'
        })
      })
    },
    importSegyAttribute(){
      let tree = this.$refs.treeSeismic.getCheckedNodes();
      if(tree.length === 1 && tree[0].label === 'Attributes'){
        this.$router.push('/ImportSegyAttribute');
      }else{
        this.$message({
          type:'error',
          message: 'Please select the Attributes node!'
        });
      }
    },
    getCheckedNodes(){
      /* eslint-disable*/
      
      let tree = this.$refs.treeSeismic.getCheckedNodes();
      if(tree.length===1 && tree[0].label.indexOf('.sgy')!==-1){
        this.$router.push('/ExportData')
        
      }else{
        this.$message({
          message:'No segy data node is selected!',
          type:'error'
        })
      }
    },
    getCheckedNodes1(){
      /* eslint-disable*/
      console.log(this.$refs.tree1.getCheckedNodes());
      let tree = this.$refs.tree1.getCheckedNodes();
      if(tree.length==1 && tree[0].label.indexOf('.dat')!==-1){
        this.$router.push('/ExportHorizonData')
      }else{
        this.$message({
          message:'No Horizon node is selected!',
          type:'error'
        })
        
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
    toCluster(){
      // window.console.log(this.$Global.projectDetails.subProjectList[1].dataMiningList);
      this.$router.push({path:'/Cluster',query:{
          id: this.$Global.projectDetails.subProjectList[1].dataMiningList[0].fileList[0].id,
          fileId: this.$Global.projectDetails.subProjectList[1].dataMiningList[0].fileList[0].id,
          label:5
          }});
    },
    toClusterImage(){
      
      let tree = this.$refs.tree1.getCheckedNodes();
      
      if(tree.length===0){
        this.$message({
          message:'No node is selected!',
          type:'error'
        })
      }else if(tree.length === 1){
        window.console.log(tree[0]);
        let goid = 0;
        let list = this.$Global.projectDetails.subProjectList[1].dataMiningList[2].fileList;
        for(let i = 0; i < list.length; i++){
          if(list[i].realName === tree[0].label){
            goid = list[i].id;
            break;
          }
        }
        this.$router.push({path:'/ClusterImage',query:{
          id: goid}});
      }else{
        this.$message({
          message:'Please Select One Cluster Node!',
          type:'error'
        })
      }
    },
    showSeismicImage(){
      let tree = this.$refs.treeSeismic.getCheckedNodes();
      if(tree.length > 1){
        this.$message({
          type:'error',
          message:'Please select only one node!'
        })
      }else{
        if(tree[0].label.indexOf('.sgy') !== -1){
          console.log(this.$Global.projectDetails);
          this.$router.push({path:'/SegyDataImage', query:{fileId: this.$Global.projectDetails.subProjectList[0].file.id}});
        }else{
          this.$message({
            type:'error',
            message:'Please select a segy file!'
          })
        }
      }
      console.log(tree);

      // this.$router.push('/SegyDataImage')
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

  .project-intro-card{
    text-align:left;
    font-weight: bold;
    width:600px;
    margin-left: 5px;
    /* width:400px;
    height:40px; */
    box-shadow: none;
    /* border:1px solid whitesmoke; */
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

  .use-menu{
    z-index: 100000;
  }


</style>
