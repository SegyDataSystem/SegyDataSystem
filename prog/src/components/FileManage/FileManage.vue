<template>
    <div id="file-manage">
        <div style="width: 100%;height:80px;" class="my-header">
            <span>File Upload</span>
        </div>
        <el-container class="my-container">

            <el-container>
                <el-aside>
                    <el-menu :default-active="defaultActive" style="height: 300px">
                        <el-menu-item index="0"  @click="()=>{this.$data.useIndex=0;}">
                            <i class="el-icon-menu"></i>
                            <span slot="title">single file upload</span>
                        </el-menu-item>
                        <el-menu-item index="1" @click="()=>{this.$data.useIndex=1;}">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">big file upload</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="()=>{this.$data.useIndex=2;}">
                            <i class="el-icon-document"></i>
                            <span slot="title">Quick Upload</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="()=>{this.$data.useIndex=3;}">
                            <i class="el-icon-upload"></i>
                            <span slot="title">Stop Upload</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="my-main">
                    <div v-if="useIndex===0">
                        <uploader
                                browse_button="browse_button"

                                :multi_selection="false"

                                :filters="{
                                  max_file_size : '400kb'
                                }"

                        />
                        <div>
                            <span>File Type:</span>
                            <el-select v-model="selectType">
                                <el-option value="Horizon"></el-option>
                            </el-select>
                        </div>
                        <div style="height: 20px;">

                        </div>
                        <el-button id="browse_button" type="primary">选择文件</el-button>
<!--                        <span v-for="file in files">{{file.name}}</span>-->
                        <el-button type="danger">开始上传</el-button>

                        <el-dialog title="正在上传" :visible.sync="dialogTableVisible">
                            <el-progress v-if="files.length>0" :text-inside="true" :stroke-width="20" :percentage="files[0].percent"></el-progress>
                        </el-dialog>
                        <br/>
                        <br/>
                        <el-tag type="warning">最大只能上传400kb的文件</el-tag>

                    </div>
                    <div style="" v-if="useIndex===1">
                        <uploader
                                browse_button="browse_button"

                        />
                        <el-button type="primary" id="browse_button">选择多个文件</el-button>
                        <br/>
                        <el-table
                                :data="tableData"
                                style="width: 100%; margin: 10px 10px;">
                            <el-table-column
                                    label="文件名">
                                <template slot-scope="scope">
                                    <span>{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="大小">
                                <template slot-scope="scope">
                                    <span>{{scope.row.size}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status === -1">正在计算MD5</span>
                                    <span v-if="scope.row.status === 1">MD5计算完成，准备上传</span>
                                    <span v-if="scope.row.status === 4" style="color: brown">上传失败</span>
                                    <span v-if="scope.row.status === 5" style="color: chartreuse">已上传</span>
                                    <el-progress v-if="scope.row.status === 2" :text-inside="true" :stroke-width="20" :percentage="scope.row.percent"></el-progress>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="deleteFile(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <br/>
                        <el-button type="danger" @click="up.start()">开始上传</el-button>

                    </div>
                    <div  v-if="useIndex===2">
                        <uploader
                                browse_button="browse_button"

                        />
                        <el-button type="primary" id="browse_button">选择多个文件</el-button>
                        <br/>
                        <el-table
                                :data="tableData"
                                style="width: 100%; margin: 10px 10px;">
                            <el-table-column
                                    label="文件名">
                                <template slot-scope="scope">
                                    <span>{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="大小">
                                <template slot-scope="scope">
                                    <span>{{scope.row.size}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status === -1">正在计算MD5</span>
                                    <span v-if="scope.row.status === 1">MD5计算完成，准备上传</span>
                                    <span v-if="scope.row.status === 4" style="color: brown">上传失败</span>
                                    <span v-if="scope.row.status === 5 && scope.row.percent === 100" style="color: chartreuse">已上传</span>
                                    <span v-if="scope.row.status === 5 && scope.row.percent < 100" style="color: darkgreen">妙传成功</span>
                                    <el-progress v-if="scope.row.status === 2" :text-inside="true" :stroke-width="20" :percentage="scope.row.percent"></el-progress>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="deleteFile(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <br/>
                        <el-button type="danger" @click="uploadStart()">开始上传</el-button>

                    </div>
                    <div v-if="useIndex===3">
                        <uploader
                                browse_button="browse_button"

                        />
                        <el-tag type="warning">自动重传三次</el-tag>
                        <br/>
                        <br/>
                        <el-button type="primary" id="browse_button">选择多个文件</el-button>
                        <br/>
                        <el-table
                                :data="tableData"
                                style="width: 100%; margin: 10px 10px;">
                            <el-table-column
                                    label="文件名">
                                <template slot-scope="scope">
                                    <span>{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="大小">
                                <template slot-scope="scope">
                                    <span>{{scope.row.size}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status === -1">正在计算MD5</span>
                                    <span v-if="scope.row.status === 1 && scope.row.percent === 0">MD5计算完成，准备上传</span>
                                    <span v-if="scope.row.status === 4" style="color: brown">上传失败</span>
                                    <span v-if="scope.row.status === 5" style="color: chartreuse">已上传</span>
                                    <el-progress v-if="scope.row.status === 2 || scope.row.status === 1 && scope.row.percent > 0" :text-inside="true" :stroke-width="20" :percentage="scope.row.percent"></el-progress>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="deleteFile(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <br/>
                        <el-button :disabled="uploading" type="danger" @click="uploadStart()">开始上传</el-button>
                        <el-button :disabled="!uploading" type="warring" @click="uploadStop()">暂停上传</el-button>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Uploader from "./Uploader";
    export default {
        name: 'FleManage',
        components:{
          uploader: Uploader
        },
        data () {
            return {
                defaultActive: 0,
                useIndex:0,
                dialogTableVisible: false,
                files:[],
                up: {},
                tableData:[],
                selectType: 'Horizon',

            }
        },


        methods: {
            redirectUrl(val){
                this.$router.push(val);
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
