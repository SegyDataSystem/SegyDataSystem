<template>
    <div id="WellData" v-loading="isLoading">
        <div class="import-title-panel">
            <span class="import-title">
                Import Well Data
            </span>
        </div>
        
        <div class="import-details-panel">
            <!--第一步-->
            <div class="form-item-title">
                    <span class="form-item-title-span">WELL File Name</span>
                </div>
                <div class="form-item-body">
                    <span>Choose a already uploaded data file</span>
                    <br/><br/>
                    <div>
                        <span v-show="hasChosen">you have chosen file <strong>"{{chosenFile}}"</strong></span>
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
                    <div style="margin-top: 30px;">
                        <el-table :data="tableDataColumn" v-show="hasChosen" height="200">
                            <el-table-column
                                    label="data column"
                            >
                                <template slot-scope="scope">
                                    <span>{{tableDataColumn[scope.$index]}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                </div>
            
            <div class="form-item-title" style="margin-top:20px;">
                <span class="form-item-title-span">Set data column</span>
            </div>
            <div class="form-item-body">
                <el-row style="width:100%">
                    <el-col style="width:50%">
                        <div>
                            <span style="display:inline-block; width:60px;">Inline: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                <el-option v-for="(item, index) in tableDataColumn.length" :value="index" :key="index" :label="'column'+index"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">TimeStart: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                <el-option v-for="(item, index) in tableDataColumn.length" :value="index" :key="index" :label="'column'+index"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">FileName: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                <el-option v-for="(item, index) in tableDataColumn.length" :value="index" :key="index" :label="'column'+index"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col style="width:50%">
                        <div>
                            <span style="display:inline-block; width:60px;">Xline: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                               <el-option v-for="(item, index) in tableDataColumn.length" :value="index" :key="index" :label="'column'+index"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">TimeEnd: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                <el-option v-for="(item, index) in tableDataColumn.length" :value="index" :key="index" :label="'column'+index"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:10px;">
                            <span style="display:inline-block; width:60px;">Type: </span>
                            <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                <el-option v-for="(item, index) in tableDataColumn.length" :value="index" :key="index" :label="'column'+index"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
            </div>
            
            <div class="form-item-title" style="margin-top:20px;">
                <span class="form-item-title-span">Sign Data</span>
            </div>
            <div style="margin-top:20px;">
                <el-button type="primary" @click="getSignData">show sign</el-button>
            </div>
            <div class="form-item-body">
                <div v-if="loadingFinish">
                    <div v-for="(item,index) in tableDataColumnSplit" :key="index" style="float:left;position:relative;width:10px;height:10px;" :style="{left:item[1]+'px',top:item[2]+'px'}">
                        <div class="use-block" ></div>
                        <div style="font-size:5px;font-weight:bold">{{item[0]}}</div>
                    </div>
                </div>
                <!-- <div class="use-block" :style="{top:'65px',left:'50px'}"></div> -->
                <div id="myChartHot" :style="{width: '500px', height: '400px'}" >
                    
                </div>
            </div>

            <div class="form-item-title" style="margin-top:20px;">
                <span class="form-item-title-span">Set work range</span>
            </div>
            <div class="form-item-body">
                <el-row style="width:100%">
                    <el-col style="width:25%">
                        <div style="width:100%;height:10px;"></div>
                    </el-col>
                    <el-col style="width:25%">
                        <span>Min</span>
                    </el-col>
                    <el-col style="width:25%">
                        <span>Max</span>
                    </el-col>
                    <el-col style="width:25%">
                        <span>Step</span>
                    </el-col>
                </el-row>
                <el-row style="width:100%;margin-top:10px;">
                    <el-col style="width:25%">
                        <span>Inline:</span>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;"  v-model="setWorkzoneData.inlineFrom"/>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="setWorkzoneData.inlineTo" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="setWorkzoneData.inlineStep" />
                    </el-col>
                </el-row>
                 <el-row style="width:100%;margin-top:10px;">
                    <el-col style="width:25%">
                        <span>Xline:</span>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="setWorkzoneData.xlineFrom" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="setWorkzoneData.xlineTo" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="setWorkzoneData.xlineStep" />
                    </el-col>
                </el-row>
                <el-row style="width:100%;margin-top:10px;">
                    <el-col style="width:25%">
                        <span>Timeslice:</span>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="setWorkzoneData.timeFrom" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="setWorkzoneData.timeTo" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="setWorkzoneData.timeStep" />
                    </el-col>
                </el-row>
            </div>
            
            <div style="margin-top:30px;">
                <el-button type="primary" @click="()=>{this.$router.push('/')}">Import File</el-button>
                 <el-button type="primary" @click="()=>{this.$router.push('/')}">Cancel</el-button>
            </div>
            <div style="width:100%;height:50px;"></div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "NewProject",
        data(){
            return{
                checkInvalid:true,
                chooseInline:'column1',
                columns:[
                    1,2,3,4,5,6,7,8,9,10,11
                ],
                tableData:[
                    [1,2,3,4,5],
                    [1,2,3,4,5]
                ],
                downloadFileList:[],
                hasChosen:false,
                chosenFile:'',
                chosenFileId:'',
                isLoading: false,
                tableDataColumn:[],
                displayData:[],
                signData:{
                    id:'',
                    inlineFrom:'',
                    inlineTo:'',
                    inlineStep:'',
                    xlineFrom:'',
                    xlineTo:'',
                    xlineStep:'',
                    timeFrom:'',
                    timeTo:'',
                    timeStep:''
                },
                setWorkzoneData:{
                    id: this.$Global.projectDetails.workZone.id,
                    inlineFrom:'',
                    inlineTo:'',
                    inlineStep:'',
                    xlineFrom:'',
                    xlineTo:'',
                    xlineStep:'',
                    timeFrom:'',
                    timeTo:'',
                    timeStep:'',
                },
                xdata:[],
                ydata:[],
                xlimit:'',
                tableDataColumnSplit:[],
                loadingFinish:false,
            }
        },
        mounted(){
             //获取文件列表
            let _this = this;
            this.$axios({
                method:'get',
                url: this.$Global.server_config.url+'/downloadFile/fileList?userId='+this.$Global.server_config.userId,

            }).then((response)=>{
                _this.downloadFileList = response.data;
            });
        },
        methods:{
            chooseSegy(index){
                this.isLoading = true;
                window.console.log(index);
                this.$data.chosenFile = this.$data.downloadFileList[index].realName;
                this.$data.chosenFileId = this.$data.downloadFileList[index].id;
                this.$data.hasChosen = true;
                let _this = this;
                this.$axios({
                    method:'post',
                    url:'/wells',
                    params:{
                        subProjectId: this.$Global.projectDetails.subProjectList[3].id,
                        fileId: this.$data.chosenFileId
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.isLoading = false;
                    let finalData = [];
                    let resdata = response.data.data;
                    for(let index = 0; index < resdata.length; index++){
                        let temp = resdata[index].split('\t');
                        finalData.push(temp);
                    }
                    _this.tableDataColumnSplit = finalData;
                    window.console.log(finalData);
                    _this.tableDataColumn = response.data.data;
                }).catch((error)=>{
                    window.console.log(error);
                    _this.isLoading = false;
                })

            },
            changeDraw(){
                this.isLoading = true;
                // let change = this.$data.chooseDraw;
                let _this = this;
                this.$axios({
                    method:'get',
                    url:'/segy/depth/1',
                    params:{
                        subProjectId: this.$Global.projectDetails.subProjectList[0].id
                    }
                }).then((response)=>{
                    _this.$data.displayData = response.data.data;
                    window.console.log(response.data);
                    _this.checkSliceEcharts();
                    //  window.console.log(response);
                    _this.isLoading = false;
                }).catch((err)=>{
                    _this.isLoading = false;
                    window.console.log(err);
                })


            },
            checkSliceEcharts(){
                let myChartHot = this.$echarts.init(document.getElementById('myChartHot'));
                let data = [];
                let totalNum = this.$data.displayData.length;
                let xlimit = totalNum;
                let ylimit = this.$data.displayData[0].length

                for(let i = 0; i < xlimit; i++){
                    this.$data.xdata.push(i+this.signData.inlineFrom);
                    
                }

                for(let i = 0; i < ylimit; i++){
                    this.$data.ydata.push(i+this.signData.inlineFrom);
                    
                }

                // let index = 0;
                for(let x = 0; x < xlimit; x++){
                    for(let y = 0; y < ylimit; y++){
                        data.push([x, y, (this.$data.displayData[x][y]*1.0)/10000000]);
                    }
                }


                let option = {
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: this.$data.xdata,
                        label: 'inline'
                    },
                    yAxis: {
                        type: 'category',
                        data: this.$data.ydata,
                        label: 'xline'
                    },
                    visualMap: {
                        min: -150,
                        max: 150,
                        calculable: true,
                        realtime: false,
                        inRange: {
                            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                        }
                    },
                    series: [{
                        name: 'Gaussian',
                        type: 'heatmap',
                        data: data,
                        emphasis: {
                            itemStyle: {
                                borderColor: '#333',
                                borderWidth: 1
                            }
                        },
                        progressive: 1000,
                        animation: false
                    }]
                };
                myChartHot.setOption(option);
                this.loadingFinish = true;

                
            },
            getSignData(){
                let _this = this;
                this.$axios({
                    method:'get',
                    url:'/project/workzone/'+this.$Global.projectDetails.workZone.id,
                }).then((response)=>{
                    _this.signData = response.data.data;
                    _this.setSignData();
                    _this.changeDraw();
                })
            },
            setSignData(){
                for(let i = 0; i < this.tableDataColumnSplit.length; i++){
                    this.tableDataColumnSplit[i][1] = (parseInt(this.tableDataColumnSplit[i][1]) - parseInt(this.signData.inlineFrom)) / ((parseInt(this.signData.inlineTo) - parseInt(this.signData.inlineFrom)) * 1.0) * 400 + 50 -5*i;
                    this.tableDataColumnSplit[i][2] = (parseInt(this.tableDataColumnSplit[i][2]) - parseInt(this.signData.xlineFrom)) / ((parseInt(this.signData.xlineTo) - parseInt(this.signData.xlineFrom)) * 1.0) * 200 + 75;
                    window.console.log(this.tableDataColumnSplit[i][1]);
                }
                
            },
            postWorkzone(){
                let _this = this;
                let myChartHot = this.$echarts.init(document.getElementById('myChartHot'));
                myChartHot.dispose();
                this.$axios({
                    method:'post',
                    url:'/project/workzone',
                    data: this.setWorkzoneData
                }).then((response)=>{
                    if(response.data.code===0){
                        _this.$message({
                            type:'success',
                            message:'import wells data success!'
                        });
                        _this.$router.push('/');
                        
                    }else{
                        _this.$message({
                            type:'error',
                            message:'import wells data fail!'
                        });
                    }
                })
            }

        }
    }
</script>

<style scoped>
#NewProject{
    width: 100%;
    height: 100%;

}

.use-block{
    width:5px;
    height:5px;
    background-color:black;
    position:relative;
    float:left;
    border-radius: 50%;
}

.import-details-panel{
    width: 53%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    text-align: left;
}
.preview-image{
    width: 300px;
    height: 160px;
    margin-top: 10px;
    background-color: #666666;
}

.step2-panel{
    width: 88%;
    margin-left: auto;
    margin-right: auto;;
    margin-top: 20px;

}

.step4-panel{
    width: 88%;
    margin-left: auto;
    margin-right: auto;;
    margin-top: 20px;

}

.form-item-body{
    margin-top: 20px;
}
.button-panel{
    margin-top: 60px;
    width: 100%;
    height: 100px;
    text-align: center;
}
.no-first{
    margin-top: 30px;
}



.form-item-title-span{
    font-size: 18px;
    font-weight: bold;
}


    .steps-panel{
        width: 95%;
        height: 60px;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
    }
    .steps{
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    }

    .import-title-panel{
        width: 95%;
        height: 50px;
        line-height: 50px;
        margin-right: auto;
        margin-left: auto;
        margin-top: 20px;
    }


    .import-title{
        font-size: 26px;
        font-weight: bold;
    }
</style>