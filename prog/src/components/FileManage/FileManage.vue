<template>
    <div id="file-manage">
        <div style="width: 100%;height:80px;" class="my-header">
            <span>Segy Data File Manage</span>
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
                        <div style="padding-left: 5px;text-align: left">
                            <span style="font-size: 25px;">Upload Single File</span>
                                <div style="padding-left: 20px;">
                                    <uploader
                                            browse_button="browse_button"
                                            :multi_selection="false"
                                            :filters="{
                                              max_file_size : '400kb'
                                            }"
                                    />
                                    <div style="margin-top: 30px;">
                                        <span>File Type:</span>
                                        <el-select v-model="selectType" size="small" style="margin-left: 5px;">
                                            <el-option value="Horizon"></el-option>
                                        </el-select>
                                    </div>
                                    <div style="height: 20px;">

                                    </div>
                                    <el-button id="browse_button" size="small" type="primary">select file</el-button>
            <!--                        <span v-for="file in files">{{file.name}}</span>-->
                                    <el-button type="danger"  size="small">start upload</el-button>

                                    <el-dialog title="正在上传" :visible.sync="dialogTableVisible">
                                        <el-progress v-if="files.length>0" :text-inside="true" :stroke-width="20" :percentage="files[0].percent"></el-progress>
                                    </el-dialog>
                                    <br/>
                                    <br/>
                                    <el-tag type="warning">file max length:400kb</el-tag>
                                </div>
                        </div>
                        <!--下载列表-->
                        <div style="padding-left: 5px;text-align: left;margin-top:40px;">
                            <span style="font-size: 25px;">Already Uploaded File</span>
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
                                            label="Operation">
                                        <template>
                                            <el-button type="primary" size="small">download</el-button>
                                            <el-button type="danger" size="small">delete</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>

                    </div>
                    <div v-if="useIndex===1">
                        <div style="padding-left: 5px;text-align: left">
                            <span style="font-size: 25px;">Upload Big File</span>
                            <div style="padding-left: 20px;margin-top: 20px;">
                                <uploader
                                        browse_button="browse_button"

                                />
                                <span>File Type: </span>
                                <el-select v-model="selectType" size="small">
                                    <el-option value="Horizon"></el-option>
                                </el-select>
                                <div style="width: 100%;height: 20px;"></div>
                                <el-button type="primary" id="browse_button" size="small">Select File</el-button>
                                <br/>
                                <el-table
                                        :data="tableData"
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
                                <el-button type="primary" @click="up.start()" size="small">Start</el-button>

                            </div>
                        </div>
                        <!--下载列表-->
                        <div style="padding-left: 5px;text-align: left;margin-top:40px;">
                            <span style="font-size: 25px;">Already Uploaded File</span>
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
                                            label="size">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.size}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="Type">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.size}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                            label="Operation">
                                        <template>
                                            <el-button type="primary" size="small">download</el-button>
                                            <el-button type="danger" size="small">delete</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>

                    </div>

                    <div  v-if="useIndex===2">
                        <div style="padding-left: 5px;text-align: left">
                            <span style="font-size: 25px;">Quick Upload</span>
                            <div style="padding-left: 20px;margin-top: 20px;">
                                <uploader
                                        browse_button="browse_button"

                                />
                                <span>File Type: </span>
                                <el-select v-model="selectType" size="small">
                                    <el-option value="Horizon"></el-option>
                                </el-select>
                                <div style="width: 100%;height: 20px;"></div>
                                <el-button type="primary" id="browse_button" size="small">Select File</el-button>
                                <br/>
                                <el-table
                                        :data="tableData"
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
                                            <el-button type="danger" @click="deleteFile(scope.row.id)">delete</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <br/>
                                <el-button type="primary" @click="up.start()" size="small">start</el-button>

                            </div>
                        </div>
                        <!--下载列表-->
                        <div style="padding-left: 5px;text-align: left;margin-top:40px;">
                            <span style="font-size: 25px;">Already Uploaded File</span>
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
                                            label="size">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.size}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column
                                            label="Operation">
                                        <template>
                                            <el-button type="primary" size="small">download</el-button>
                                            <el-button type="danger" size="small">delete</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>


                    </div>
                    <div v-if="useIndex===3">
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
                tableData:[{}],
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
