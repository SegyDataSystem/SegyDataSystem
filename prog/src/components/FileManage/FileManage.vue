<template>
    <div id="file-manage">
        <div style="width: 100%;height:80px;" class="my-header">
            <span>Segy Data File Management</span>
        </div>
        <el-container class="my-container">

            <el-container>
                <el-aside>
                    <el-menu  style="height: 300px;text-align:left">
                        <el-menu-item index="0"  @click="()=>{this.$data.useIndex=0;}">
                            <i class="el-icon-menu"></i>
                            <span slot="title">Single file upload</span>
                        </el-menu-item>
                        <el-menu-item index="1" @click="()=>{this.$data.useIndex=1;}">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">Big file upload</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="()=>{this.$data.useIndex=3;this.reloadDownload();}">
                            <i class="el-icon-download"></i>
                            <span slot="title">File Download</span>
                        </el-menu-item>
<!--                        <el-menu-item index="3" @click="()=>{this.$data.useIndex=3;}">-->
<!--                            <i class="el-icon-upload"></i>-->
<!--                            <span slot="title">Stop Upload</span>-->
<!--                        </el-menu-item>-->
                    </el-menu>
                </el-aside>
                <el-main class="my-main">
                    <div v-if="useIndex===0">
                        <div style="padding-left: 5px;text-align: left">
                            <span style="font-size: 25px;">Upload Single File</span>
                                <div style="padding-left: 20px;">
                                    <uploader
                                            key="0"
                                            browse_button="browse_button"
                                            :url="server_config.url+'/uploadFile/normal'"
                                            :multi_selection="false"
                                            :FilesAdded="filesAddedSingle"
                                            :multipart_params="singleOptions"
                                            :filters="{
                                              max_file_size : '400kb'
                                            }"
                                            @inputUploader="inputUploaderSingle"
                                    />
                                    <div style="margin-top: 30px;">
                                        <span>File Type:</span>
                                        <el-select v-model="singleOptions.type" size="small" style="margin-left: 5px;">
                                            <el-option value="Horizon"></el-option>
                                            <el-option value="Seismic"></el-option>
                                            <el-option value="Interval"></el-option>
                                            <el-option value="Well"></el-option>
                                            <el-option value="Fault"></el-option>
                                        </el-select>
                                    </div>
                                    <div style="margin-top: 30px;">
                                        <div>
                                            <span>File Description:</span>
                                        </div>
                                        <div>
                                            <el-input type="textarea" style="width:500px;" v-model="singleOptions.description"></el-input>
                                        </div>
                                    </div>
                                    <div style="margin-top: 30px;margin-bottom:50px;">
                                        <div>
                                            <span>Is Public:</span>
                                            
                                            <el-switch
                                                style="margin-left:20px;"
                                                v-model="singleOptions.isPublic"
                                                active-text="public"
                                                inactive-text="private">
                                            </el-switch>
                                        </div>
                                    </div>
                                    
                                    <el-button id="browse_button" size="small" type="primary">select file</el-button>
                                    <el-button type="danger"  size="small" @click="uploadStartSingle">start upload</el-button>
                                    <div style="font-size: 14px;margin-top: 10px;" v-for="(file,index) in filesSingle" :key="index">{{file.name}}</div>

                                    <el-dialog title="正在上传" :visible.sync="dialogTableVisibleSingle">
                                        <el-progress v-if="filesSingle.length>0" :text-inside="true" :stroke-width="20" :percentage="filesSingle[0].percent"></el-progress>
                                    </el-dialog>
                                    <br/>
                                    <br/>
                                    <el-tag type="warning">file max length:100MB</el-tag>
                                </div>
                        </div>


                    </div>
                    <div v-if="useIndex===1">
                        <div style="padding-left: 5px;text-align: left">
                            <span style="font-size: 25px;">Upload Big File</span>
                            <div style="padding-left: 20px;margin-top: 20px;">
                                <uploader
                                        key="1"
                                        browse_button="browse_button_big"
                                        :url="server_config.url+'/uploadFile/big'"
                                        chunk_size="2MB"
                                        :filters="{prevent_duplicates:true}"
                                        :multipart_params="BigOptions"
                                        :FilesAdded="filesAddedBig"
                                        :BeforeUpload="beforeUploadBig"
                                        @inputUploader="inputUploaderBig"
                                />
                                <span>File Type: </span>
                                <el-select v-model="BigOptions.type" size="small">
                                    <el-option value="Horizon"></el-option>
                                    <el-option value="Seismic"></el-option>
                                    <el-option value="Interval"></el-option>
                                    <el-option value="Well"></el-option>
                                    <el-option value="Fault"></el-option>
                                </el-select>
                                <div style="margin-top: 30px;">
                                        <div>
                                            <span>File Description:</span>
                                        </div>
                                        <div>
                                            <el-input type="textarea" style="width:500px;" v-model="BigOptions.description"></el-input>
                                        </div>
                                    </div>
                                    <div style="margin-top: 30px;margin-bottom:50px;">
                                        <div>
                                            <span>Is Public:</span>
                                            
                                            <el-switch
                                                style="margin-left:20px;"
                                                v-model="BigOptions.isPublic"
                                                active-text="public"
                                                inactive-text="private">
                                            </el-switch>
                                        </div>
                                    </div>
                                <div style="width: 100%;height: 20px;"></div>
                                <el-button type="primary" id="browse_button_big" size="small">Select File</el-button>
                                <el-button type="primary" @click="BigFileStart" size="small">Start</el-button>
                                <br/>
                                <el-table
                                        :data="tableDataBig"
                                        style="width: 100%; margin: 10px 10px;">
                                    <el-table-column
                                            label="File Name">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.name}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="Size">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.size}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="Status">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.status === -1">正在计算MD5</span>
                                            <span v-if="scope.row.status === 1">MD5计算完成，准备上传</span>
                                            <span v-if="scope.row.status === 4" style="color: brown">上传失败</span>
                                            <span v-if="scope.row.status === 5" style="color: chartreuse">已上传</span>
                                            <el-progress v-if="scope.row.status === 2" :text-inside="true" :stroke-width="20" :percentage="scope.row.percent"></el-progress>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="Operation">
                                        <template slot-scope="scope">
                                            <el-button type="danger" @click="deleteFile(scope.row.id)" size="small">Delete</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <br/>
                            </div>
                        </div>
                    </div>

                    <div  v-if="useIndex===2">
                        <div style="padding-left: 5px;text-align: left">
                            <span style="font-size: 25px;">Quick Upload</span>
                            <div style="padding-left: 20px;margin-top: 20px;">
                                <uploader
                                        key="2"
                                        browse_button="browse_button_quick"
                                        :url="server_config.url+'/uploadFile/quick'"
                                        chunk_size="2MB"
                                        :filters="{prevent_duplicates:true}"
                                        :FilesAdded="filesAddedQuick"
                                        :BeforeUpload="beforeUploadQuick"
                                        @inputUploader="inputUploaderQuick"
                                />
                                <span>File Type: </span>
                                <el-select v-model="selectType" size="small">
                                    <el-option value="Horizon"></el-option>
                                    <el-option value="Seismic"></el-option>
                                    <el-option value="Interval"></el-option>
                                    <el-option value="Well"></el-option>
                                    <el-option value="Fault"></el-option>
                                </el-select>
                                <div style="width: 100%;height: 20px;"></div>
                                <el-button type="primary" id="browse_button_quick" size="small">Select File</el-button>
                                <el-button type="primary" @click="uploadStartQuick()" size="small">start</el-button>
                                <br/>
                                <el-table
                                        :data="tableDataQuick"
                                        style="width: 100%; margin: 10px 10px;">
                                    <el-table-column
                                            label="File Name">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.name}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="Size">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.size}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="Status">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.status === -1">正在计算MD5</span>
                                            <span v-if="scope.row.status === 1">MD5计算完成，准备上传</span>
                                            <span v-if="scope.row.status === 4" style="color: brown">上传失败</span>
                                            <span v-if="scope.row.status === 5" style="color: chartreuse">已上传</span>
                                            <el-progress v-if="scope.row.status === 2" :text-inside="true" :stroke-width="20" :percentage="scope.row.percent"></el-progress>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="Operation">
                                        <template slot-scope="scope">
                                            <el-button type="danger" @click="deleteFileQuick(scope.row.id)">delete</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div v-if="useIndex===4">
                        <div style="padding-left: 5px;text-align: left">
                            <span style="font-size: 25px;">Stop Upload</span>
                            <div style="padding-left: 20px;">
                                <uploader
                                        browse_button="browse_button"
                                />

                                <el-tag type="warning">自动重传三次</el-tag>
                                <br/>
                                <br/>
                                <span>File Type: </span>
                                <el-select v-model="selectType" size="small">
                                    <el-option value="Horizon"></el-option>
                                </el-select>
                                <div style="width: 100%;height: 20px;"></div>
                                <el-button type="primary" id="browse_button" size="small">Select File</el-button>
                                <br/>
                                <el-table
                                        :data="tableData"
                                        style="width: 70%; margin: 10px 10px;">
                                    <el-table-column
                                            label="File Name">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.name}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="size">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.size}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="type">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.type}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="status">
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.status === -1">正在计算MD5</span>
                                            <span v-if="scope.row.status === 1 && scope.row.percent === 0">MD5计算完成，准备上传</span>
                                            <span v-if="scope.row.status === 4" style="color: brown">上传失败</span>
                                            <span v-if="scope.row.status === 5" style="color: chartreuse">已上传</span>
                                            <el-progress v-if="scope.row.status === 2 || scope.row.status === 1 && scope.row.percent > 0" :text-inside="true" :stroke-width="20" :percentage="scope.row.percent"></el-progress>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="operation">
                                        <template slot-scope="scope">
                                            <el-button type="danger" @click="deleteFile(scope.row.id)">delete</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button :disabled="uploading" type="primary" @click="uploadStart()" size="small">Start</el-button>
                                <el-button :disabled="!uploading" type="warring" @click="uploadStop()" size="small">Pause</el-button>
                            </div>

                            <div style="padding-left: 5px;text-align: left;margin-top:40px;">
                                <span style="font-size: 25px;">Already Uploaded File</span>
                                <div>
                                    <span>File Type:</span>
                                    <el-select v-model="fileTypeType" size="small">
                                        <el-option value="Horizon"></el-option>
                                        <el-option value="Seismic"></el-option>
                                        <el-option value="Interval"></el-option>
                                        <el-option value="Well"></el-option>
                                        <el-option value="Fault"></el-option>
                                    </el-select>

                                </div>
                                <div style="padding-left: 20px;">
                                    <el-table

                                            :data="tableData"
                                            style="width: 70%; margin: 10px 10px;">
                                        <el-table-column
                                                label="File Name">
                                            <template slot-scope="scope">
                                                <span>{{scope.row.name}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="Size">
                                            <template slot-scope="scope">
                                                <span>{{scope.row.size}}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                                label="operation">
                                            <template>
                                                <el-button type="primary" size="small">download</el-button>
                                                <el-button type="danger" size="small">delete</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>

                            <br/>

                        </div>
                    </div>
                    <div v-if="useIndex===3">
                        <div style="padding-left: 5px;text-align: left">
                            <div style="padding-left: 5px;text-align: left;margin-top:0px;">
                                <span style="font-size: 25px;">Already Uploaded File</span>
                                
                                <div style="margin-top: 30px;">
                                        <span>File Type:</span>
                                        <el-select v-model="fileTypeSelect" size="small" style="margin-left: 5px;" @change="changeFileDownload">
                                            <el-option value="Horizon"></el-option>
                                            <el-option value="Seismic"></el-option>
                                            <el-option value="Interval"></el-option>
                                            <el-option value="Well"></el-option>
                                            <el-option value="Fault"></el-option>
                                        </el-select>
                                </div>
                                
                                <div style="padding-left: 20px;margin-top: 20px;">
                                    <el-table
                                            :data="tableDataDownload"
                                            style="width: 85%; margin: 10px 10px;">
                                        <el-table-column
                                                label="File Name"
                                                prop="realName"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                label="File Type"
                                                prop="fileType"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                label="createTime"
                                                
                                        >  
                                            <template slot-scope="scope">
                                                <span>{{scope.row.createTime.slice(0,10)}}</span>                                                
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="Visibility"
                                        >
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.isPublic">public</span>
                                                <span v-if="!scope.row.isPublic">private</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="Description"
                                                prop="description"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                label="operation"
                                                width="250">
                                            <template slot-scope="scope">
                                                <el-button type="primary" size="small" @click="downloadFileQuick(scope.$index)">download</el-button>
                                                <el-button type="danger" size="small" @click="deleteDownloadFile(scope.$index)">delete</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>

                            <br/>

                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Uploader from "./Uploader";
    import FileMd5 from '../model/file-md5.js';
    export default {
        name: 'FleManage',
        components:{
          uploader: Uploader
        },
        data () {
            return {
                server_config: this.$Global.server_config,
                defaultActive: 0,
                useIndex:0,
                dialogTableVisible: false,
                dialogTableVisibleSingle: false,
                fileTypeSelect:'Seismic',
                filesSingle:[],
                files:[],
                up:{},
                upSingle: {},
                tableData:[{}],
                tableDataBig:[],
                selectType: 'Horizon',

                singleOptions:{
                    type: 'Horizon',
                    isPublic: false,
                    userId: '10000',
                    description: '',
                },
                //big file
                BigOptions:{
                    type: 'Horizon',
                    isPublic: false,
                    userId: '10000',
                    description: '',
                },
                upBig:{

                },
                filesBig:[],
                dialogTableVisibleBig: false,


                filesQuick:[],
                upQuick:{},
                quickOptions:{
                    type: 'Horizon',
                    isPublic: false,
                    userId: '10000',
                    description: '',
                },
                tableDataQuick: [],

                tableDataDownload:[]



            }
        },
        computed:{
            statusSingle() {
                return this.filesSingle.length > 0 ? this.filesSingle[0].status : null;
            },

        },
        watch:{
            statusSingle() {
                if (this.statusSingle === 5) {
                    this.$confirm('文件上传成功', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    }).then(() => {
                        this.dialogTableVisibleSingle = false;
                    });
                }
            },
            filesBig: {
                handler() {
                    this.tableDataBig = [];
                    this.filesBig.forEach((e) => {
                        this.tableDataBig.push({
                            name: e.name,
                            size: e.size,
                            status: e.status,
                            id: e.id,
                            percent: e.percent
                        });
                    });
                },
                deep: true
            },
            filesQuick: {
                handler() {
                    this.tableDataQuick = [];
                    this.filesQuick.forEach((e) => {
                        this.tableDataQuick.push({
                            name: e.name,
                            size: e.size,
                            status: e.status,
                            id: e.id,
                            percent: e.percent
                        });
                    });
                },
                deep: true
            }
        },
        mounted(){
            let _this = this;
            this.$axios({
                method: 'post',
                url: this.$Global.server_config.url+'/downloadFile/fileList',
                data:{
                    type:'Horizon',
                    userId: '10000'
                }

            }).then((response)=>{
                _this.$data.tableDataDownload = response.data;
                window.console.log(response.data);
            })

        },
        methods: {
            deleteDownloadFile(index){
                let _this = this;
                this.$axios({
                    method:'delete',
                    url: this.$Global.server_config.url+'/updateFile',
                    data:{
                        fileId: _this.$data.tableDataDownload[index].id
                    }
                }).then((res)=>{
                    if(res.data.code===0){
                        _this.$message({
                            type:'success',
                            message:'file deleted successfully'
                        });
                        _this.$data.tableDataDownload.splice(index, 1);
                    }else{
                        _this.$message({
                            type:'error',
                            message:'error:file cannot be deleted'
                        });
                    }
                })
            },
            reloadDownload(){
                let _this = this;
                this.$axios({
                    method: 'post',
                    url: this.$Global.server_config.url+'/downloadFile/fileList',
                    data:{
                        userId: '10000',
                        type: this.$data.fileTypeSelect
                    }
                }).then((response)=>{
                    _this.$data.tableDataDownload = response.data;
                    window.console.log(response.data);
                })
            },
            redirectUrl(val){
                this.$router.push(val);
            },
            filesAddedSingle(up){
                if (up.files.length > 1) {
                    up.removeFile(up.files[0])
                }
            },
            inputUploaderSingle(up) {
                this.upSingle = up;
                this.filesSingle = up.files;
                
                // window.console.log(this.upS);
            },
            uploadStartSingle() {
                this.dialogTableVisibleSingle = true;
                this.upSingle.start();
            },

            changeFileDownload(){
                let _this = this;
                this.$axios({
                method: 'post',
                url: this.$Global.server_config.url+'/downloadFile/fileList',
                data:{
                    type: this.$data.fileTypeSelect,
                    userId: '10000'
                }

            }).then((response)=>{
                _this.$data.tableDataDownload = response.data;
                window.console.log(response.data);
            })
            },


            inputUploaderBig(up) {
                
                this.upBig = up;
                this.filesBig = up.files;
            },
            filesAddedBig(up, files) {
                files.forEach((f) => {
                    f.status = -1;
                    FileMd5(f.getNative(), (e, md5) => {
                        f["md5"] = md5;
                        f.status = 1;
                    });
                });
            },
            deleteFile(id) {
                let file = this.upBig.getFile(id);
                this.upBig.removeFile(file);
            },
            beforeUploadBig(up, file) {
                
                up.setOption("multipart_params", {"size":file.size,"type":this.BigOptions.type,"md5":file.md5,"userId":this.BigOptions.userId,"isPublic":this.$data.BigOptions.isPublic,"description":this.$data.BigOptions.description});
            },
            BigFileStart(){
                
                this.upBig.start();
            },

            //quick
            inputUploaderQuick(up) {
                this.upQuick = up;
                this.filesQuick = up.files;
            },
            filesAddedQuick(up, files) {
                files.forEach((f) => {
                    f.status = -1;
                    FileMd5(f.getNative(), (e, md5) => {
                        f["md5"] = md5;
                        f.status = 1;
                    });
                });
            },
            deleteFileQuick(id) {
                let file = this.upQuick.getFile(id);
                this.upQuick.removeFile(file);
            },
            beforeUploadQuick(up, file) {
                up.setOption("multipart_params", {"size":file.size,"md5":file.md5});
            },
            uploadStartQuick() {
                let _this = this;
                let count = 0, size = this.filesQuick.length;
                this.filesQuick.forEach((e) => {
                    if (e.status == 1) {
                        this.$axios.get(this.server_config.url+'/quickupload/?md5='+e.md5)
                            .then((response) => {
                                count += 1;
                                window.console.log(count);
                                if (!response.data) {
                                    e.status = 5;
                                }
                                if (count == size){
                                    _this.upQuick.start();
                                }
                            })
                    }
                });

            },
            downloadFileQuick(id){
                window.console.log(id);

                let _this = this;
                this.$axios.get(this.$Global.server_config.url+'/downloadFile/'+_this.$data.tableDataDownload[id].id,{responseType: 'blob'}).then((res) => {
                    if (!res) {
                        this.$message.error("下载模板文件失败");
                        return false;
                    }
                    const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
                    const downloadElement = document.createElement('a');
                    const href = window.URL.createObjectURL(blob);
                    // let contentDisposition = res.headers['Content-Disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;

                    // let patt = new RegExp("fileName=([^;]+\\.[^\\.;]+);*");
                    // let result = patt.exec(contentDisposition);
                    // window.console.log(res);
                    let filename = _this.$data.tableDataDownload[id].realName;
                    downloadElement.style.display = 'none';
                    downloadElement.href = href;
                    downloadElement.download = filename ; //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); //释放掉blob对象
                })
            }
        }
    }
</script>

<style>

    .my-container {
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }
    .my-header {
        background-color: deepskyblue;
        height: 80px;
        line-height: 80px;
        color: white;
        font-size: 30px;
        font-weight: bold;
    }
    .my-main {
        margin: 1em 1em;
    }
</style>
