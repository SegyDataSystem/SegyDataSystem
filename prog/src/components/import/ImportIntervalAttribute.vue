<template>
    <div id="NewProject" v-loading="isLoading">
        <div class="import-title-panel">
            <span class="import-title">
                Import Interval Attribute
            </span>
        </div>
        
        <div class="import-details-panel">
            <!--第一步-->
            <div class="form-item-title">
                <span class="form-item-title-span">Browse File</span>
            </div>
            <div class="form-item-body">
                <span>File:</span>
                <div class="form-item-body">
                    <span>Choose a already uploaded Interval data file</span>
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
                        <el-table :data="tableData" v-show="hasChosen" height="400">
                            <el-table-column
                            type="index"
                            width="50">
                            </el-table-column>
                            <el-table-column
                                    label="data column"
                            >
                                <template slot-scope="scope">
                                    <span>{{tableData[scope.$index]}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            style="margin-top:20px;"
                            v-show="hasChosen"
                            layout="pager, jumper"
                            @current-change="changePage"
                            :total="100">
                        </el-pagination>
                        
                    </div>

                </div>
            </div>
            <div v-show="hasChosen">
                <div class="form-item-title" style="margin-top:40px;">
                    <span class="form-item-title-span">Set data column</span>
                </div>
                <div class="form-item-body">
                    <el-row style="width:100%">
                        <el-col style="width:50%">
                            <div>
                                <span style="display:inline-block; width:60px;">Inline: </span>
                                <el-select size="small" v-model="formColumns.iline" style="margin-left:10px;width:100px;">
                                    <el-option v-for="(item, index) in 6" :value="index" :key="index" :label="'column'+index"></el-option>
                                </el-select>
                            </div>
                            <div style="margin-top:10px;">
                                <span style="display:inline-block; width:60px;">X: </span>
                                <el-select size="small" v-model="formColumns.x" style="margin-left:10px;width:100px;">
                                    <el-option v-for="(item, index) in 6" :value="index" :key="index" :label="'column'+index"></el-option>
                                </el-select>
                            </div>
                            <div style="margin-top:10px;">
                                <span style="display:inline-block; width:60px;">Name: </span>
                                <el-select size="small" v-model="chooseInline" style="margin-left:10px;width:100px;">
                                    <el-option v-for="(item, index) in 6" :value="index" :key="index" :label="'column'+index"></el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col style="width:50%">
                            <div>
                                <span style="display:inline-block; width:60px;">Xline: </span>
                                <el-select size="small" v-model="formColumns.xline" style="margin-left:10px;width:100px;">
                                    <el-option v-for="(item, index) in 6" :value="index" :key="index" :label="'column'+index"></el-option>
                                </el-select>
                            </div>
                            <div style="margin-top:10px;">
                                <span style="display:inline-block; width:60px;">Y: </span>
                                <el-select size="small" v-model="formColumns.y" style="margin-left:10px;width:100px;">
                                    <el-option v-for="(item, index) in 6" :value="index" :key="index" :label="'column'+index"></el-option>
                                </el-select>
                            </div>
                            <div style="margin-top:10px;">
                                <span style="display:inline-block; width:60px;">Data: </span>
                                <el-select size="small" v-model="formColumns.data" style="margin-left:10px;width:100px;">
                                    <el-option v-for="(item, index) in 6" :value="index" :key="index" :label="'column'+index"></el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="form-item-title" style="margin-top:20px;">
                    <span class="form-item-title-span">Set data output range</span>
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
                            <span>Inline</span>
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form1.inlineFrom" style="width:100px;" />
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form1.inlineTo" style="width:100px;" />
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form1.inlineStep" disabled  style="width:100px;" />
                        </el-col>
                    </el-row>
                    <el-row style="width:100%;margin-top:10px;">
                        <el-col style="width:25%">
                            <span>Xline</span>
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form1.xlineFrom" style="width:100px;" />
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form1.xlineTo" style="width:100px;" />
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form1.xlineStep" disabled  style="width:100px;" />
                        </el-col>
                    </el-row>
                </div>
                <div class="form-item-title" style="margin-top:20px;">
                    <span class="form-item-title-span">Work area range</span>
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
                            <span>Inline</span>
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form2.inlineFrom" disabled style="width:100px;" />
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form2.inlineTo" disabled  style="width:100px;" />
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form2.inlineStep" disabled  style="width:100px;" />
                        </el-col>
                    </el-row>
                    <el-row style="width:100%;margin-top:10px;">
                        <el-col style="width:25%">
                            <span>Xline</span>
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form2.xlineFrom" disabled  style="width:100px;" />
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form2.xlineTo" disabled  style="width:100px;" />
                        </el-col>
                        <el-col style="width:25%">
                            <input v-model="form2.xlineStep" disabled  style="width:100px;" />
                        </el-col>
                    </el-row>
                </div>

                <div class="form-item-title" style="margin-top:20px;">
                    <span class="form-item-title-span">Invalid Number process</span>
                </div>
                <div class="form-item-body">
                    <el-checkbox v-model="checkInvalid">Invalid Numver</el-checkbox>
                    <input style="width:100px;margin-left:10px;" :disabled="!checkInvalid" />
                </div>
            </div>
            <div style="margin-top:30px;">
                <el-button v-show="hasChosen" type="primary" @click="importHorizon">Import File</el-button>
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
                currentPage:1,
                checkInvalid:true,
                chooseInline:'column1',
                columns:[
                    1,2,3,4,5,6,7,8,9,10,11
                ],
                tableData:[

                ],
                downloadFileList:[],
                chosenFile:'',
                hasChosen: false,
                isLoading: false,
                formColumns:{
                    xline:0,
                    iline:0,
                    x:0,
                    y:0,
                    data:0,
                },
                form1:{
                    inlineFrom:'470',
                    inlineTo:'1070',
                    inlineStep:'1',
                    xlineFrom:'480',
                    xlineTo:'1180',
                    xlineStep:'1',
                },
                form2:{
                    inlineFrom:'470',
                    inlineTo:'1070',
                    inlineStep:'1',
                    xlineFrom:'480',
                    xlineTo:'1180',
                    xlineStep:'1',
                }
            }
        },
        mounted() {
            //获取文件列表
            let _this = this;
            this.$axios({
                method:'post',
                url: this.$Global.server_config.url+'/downloadFile/fileList',
                data:{
                    userId:this.$Global.server_config.userId,
                    type:'Interval'
                }
            }).then((response)=>{
                _this.downloadFileList = response.data;
            });


        },
        methods:{
            changePage(page){
                this.$data.isLoading = true;
                let _this = this;
                this.$axios({
                    method:'get',
                    url:'/interval',
                    params:{
                        fileId: this.$data.chosenFileId,
                        page:page,
                        size:50
                    }
                }).then((response)=>{
                    window.console.log(response);
                    // _this.tableData = response.data.data;
                    if(response.data.code===0){
                        // _this.$data.chosenFile = this.$data.downloadFileList[index].realName;
                        // _this.$data.hasChosen = true;
                        _this.$data.currentPage = page;
                        _this.$data.tableData = response.data.data;
                        
                    }else{
                         _this.$message({
                            type:'error',
                            message:'horizon file invalid'
                        });
                    }
                    _this.isLoading = false;

                }).catch((error)=>{
                    window.console.log(error);
                    _this.isLoading = false;
                })
            },
            importHorizon(){
                let _this = this;
                
                _this.isLoading=true;
                this.$axios({
                    method:'post',
                    url:'/interval/'+this.$Global.projectDetails.subProjectList[2].id+'/attribute?&fileId='+this.$data.chosenFileId,
                }).then((response)=>{
                    window.console.log(response);
                    _this.$message({
                        type:'success',
                        message:'import successful'
                    })
                    _this.$router.push('/');
                })
            },
            chooseSegy(index){
                this.isLoading = true;
                window.console.log(index);
                
                this.$data.chosenFileId = this.$data.downloadFileList[index].id;
                
                let _this = this;
                this.$axios({
                    method:'get',
                    url:'/interval',
                    params:{
                        fileId: this.$data.chosenFileId,
                        page:1,
                        size:50
                    }
                }).then((response)=>{
                    window.console.log(response);
                    // _this.tableData = response.data.data;
                    if(response.data.code===0){
                        _this.$data.chosenFile = this.$data.downloadFileList[index].realName;
                        _this.$data.hasChosen = true;
                        _this.$message({
                            type:'success',
                            message:'import success'
                        });
                        _this.$data.tableData = response.data.data;
                        // _this.getHorizon();
                    }else{
                         _this.$message({
                            type:'error',
                            message:'horizon file invalid'
                        });
                    }
                    _this.isLoading = false;

                }).catch((error)=>{
                    window.console.log(error);
                    _this.isLoading = false;
                })
            },
            // getHorizon(){
            //     let _this = this;
            //     this.$axios({
            //         method:'get',
            //         url:'/horizon',
            //         params:{
            //             fileId: this.$data.chosenFileId,
            //             page:1,
            //             size:50
            //         }
            //     }).then((response)=>{
            //         _this.$data.tableData = response.data.data;
            //     })
            // }
        }
    }
</script>

<style scoped>
#NewProject{
    width: 100%;
    height: 100%;

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

.form-item-title{

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