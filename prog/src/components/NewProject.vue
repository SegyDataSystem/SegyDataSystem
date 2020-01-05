<template>
    <div id="NewProject" v-loading="isLoading">
        
        <div class="import-title-panel">
            <span class="import-title">
                Import Segy Data
            </span>
        </div>
        <div class="steps-panel">
            <el-steps :active="active" finish-status="success" class="steps" align-center>
                <el-step title="Step 1"></el-step>
                <el-step title="Step 2"></el-step>
                <el-step title="Step 3"></el-step>
                <el-step title="Step 4"></el-step>
            </el-steps>
        </div>
        <div class="import-details-panel">
            <!--第一步-->
            <div v-if="active===0">
                <div class="form-item-title">
                    <span class="form-item-title-span">SEG-Y File Name</span>
                </div>
                <div class="form-item-body">
                    <span>Choose a already uploaded segy data file</span>
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

                </div>
                <div class="form-item-title no-first">
                    <span class="form-item-title-span">Line Header</span>
                </div>
                <div class="form-item-body">
                    <span>Format:</span>
                    <el-radio v-model="chooseFormat" label="IBM" style="margin-left: 10px;">IBM</el-radio>
                    <el-radio v-model="chooseFormat" label="IEEE">IEEE</el-radio>
                    <el-checkbox label="Flip Bytes">Flip Bytes</el-checkbox>
                    <el-button type="primary" size="small" style="margin-left:15px;" @click="clickPreview">Preview</el-button>
                </div>


                <div class="form-item-title no-first">
                    <span class="form-item-title-span">Trace Preview</span>
                </div>
                <div class="form-item-body" style="margin-top:5px;">
                    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
                </div>

                <div class="form-item-title no-first">
                    <span class="form-item-title-span">Display</span>
                </div>
                <div class="form-item-body">
                    <el-radio v-model="chooseDisplay" label="Wiggle" style="margin-left: 10px;">Wiggle</el-radio>
                    <el-radio v-model="chooseDisplay" label="Histogram">Histogram</el-radio>
                </div>


                <div class="form-item-title no-first">
                    <span class="form-item-title-span">Current Trace</span>
                </div>
                <div class="form-item-body">
                    <el-row style="width: 330px">
                        <el-col style="width: 230px;">
                            <el-slider v-model="trace" @change="changeSlide" style="width: 200px;"></el-slider>
                        </el-col>
                        <el-col style="width: 100px;">
                            <el-input-number v-model="trace" size="small"></el-input-number>
                        </el-col>
                    </el-row>

                </div>

                <div class="button-panel">
                    <el-button type="primary" @click="()=>{this.$data.active=1;this.getTraceField()}">Next</el-button>
                    <el-button @click="()=>{this.$router.push('/')}">Cancel</el-button>
                </div>
            </div>

            <div v-if="active===1">
                <div class="step2-panel">
                    <el-row style="width:100%">
                        <el-col style="width: 55%;">
                            <div class="form-item-title no-first">
                                <span class="form-item-title-span">Trace Header Display Information</span>
                            </div>
                            <div class="form-item-body">
                                <el-table
                                    :data="tableData"
                                    style="border: 1px solid lightgray;height:300px;"
                                    stripe
                                >
                                    <el-table-column prop="Bytes" label="Bytes"></el-table-column>
                                    <el-table-column prop="Description" label="Description"></el-table-column>
                                    <el-table-column label="Format">Integer</el-table-column>
                                    <el-table-column prop="Value" label="Value"></el-table-column>
                                </el-table>
                            </div>

                            <div class="form-item-title no-first">
                                <span class="form-item-title-span">Trace </span>
                            </div>
                            <div class="form-item-body">
                                <el-row style="width: 310px">
                                    <el-col style="width: 210px;">
                                        <el-slider v-model="trace" style="width: 180px;"></el-slider>
                                    </el-col>
                                    <el-col style="width: 100px;">
                                        <el-input-number v-model="trace" size="small"></el-input-number>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col style="width: 41%;margin-left: 4%">
                            <div class="form-item-title no-first">
                                <span class="form-item-title-span">Line Number</span>
                            </div>
                            <div class="form-item-body" style="font-size: 14px;">
                                <el-row style="width: 100%;">
                                    <el-col style="width:33%">
                                        <div style="width: 100%;height:10px;"></div>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <span>Start Byte</span>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <span>Num Bytes</span>
                                    </el-col>
                                </el-row>
                                <el-row style="width: 100%;margin-top: 10px;">
                                    <el-col style="width:33%">
                                        <span>Inline Bin:</span>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="s2in1"/>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="s2in2"/>
                                    </el-col>
                                </el-row>
                                <el-row style="width: 100%;margin-top: 10px;">
                                    <el-col style="width:33%">
                                        <span>Crossline Bin:</span>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="s2in3"/>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="s2in4"/>
                                    </el-col>
                                </el-row>
                            </div>

                            <div class="form-item-title no-first">
                                <span class="form-item-title-span">Coordinate</span>
                            </div>
                            <div class="form-item-body" style="font-size: 14px;">
                                <el-row style="width: 100%;">
                                    <el-col style="width:33%">
                                        <div style="width: 100%;height:10px;"></div>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <span>Start Byte</span>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <span>Num Bytes</span>
                                    </el-col>
                                </el-row>
                                <el-row style="width: 100%;margin-top: 10px;">
                                    <el-col style="width:33%">
                                        <span>Coordinate X:</span>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="s2in5"/>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="s2in6"/>
                                    </el-col>
                                </el-row>
                                <el-row style="width: 100%;margin-top: 10px;">
                                    <el-col style="width:33%">
                                        <span>Coordinate Y:</span>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="s2in7"/>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="s2in8"/>
                                    </el-col>
                                </el-row>
                                <div style="width: 100%;margin-top: 5px;">
                                    <el-checkbox label="Float" v-model="checkFloat" disabled>Float</el-checkbox>
                                </div>
                                <div style="width: 100%;margin-top: 5px;">
                                    <el-checkbox v-model="checkOverrideScaling" >Override Scaling</el-checkbox>
                                    <input :disabled="!checkOverrideScaling" v-model="overrideScaling" style="width:40px;margin-left: 10px;"/>
                                </div>
                            </div>

                            <div class="form-item-title no-first">
                                <span class="form-item-title-span">Header In Detail</span>
                            </div>
                            <div class="form-item-body" style="font-size: 14px;">
                                <div>
                                    <el-button size="small" type="primary" style="width: 150px;" disabled>EBCDIC</el-button>
                                </div>
                                <div style="margin-top: 10px;">
                                    <el-button size="small" type="primary" style="width: 150px;">Line Header...</el-button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>

                    <div class="button-panel">
                        <el-button @click="()=>{this.$data.active=0}">Back</el-button>
                        <el-button type="primary" @click="()=>{this.$data.active=2}">Next</el-button>
                        <el-button @click="()=>{this.$router.push('/')}">Cancel</el-button>

                    </div>
                </div>
            </div>

            <div v-if="active===2">
                <div class="step3-panel">
                    <el-row style="width:100%">
                        <el-col style="width: 48%;">
                            <div class="form-item-title no-first">
                                <span class="form-item-title-span">Survey Information</span>
                            </div>
                            <div class="form-item-body" style="font-size: 14px;">
                                <el-radio label="XY Coordinate from 3 point definition" v-model="chooseSurvey"></el-radio>
                                <el-radio label="XY Coordinates from trace header" v-model="chooseSurvey"></el-radio>
                                <div style="margin-top: 20px;">
                                    <el-button size="small" type="primary" style="width: 180px;">Get XY Coordinates Info</el-button>
                                </div>
                                <div style="margin-top: 10px;">
                                    <el-row style="width: 100%">
                                        <el-col style="width: 20%">
                                            <div>
                                                <el-button type="primary" size="small">Load...</el-button>
                                            </div>
                                            <div style="margin-top: 9px;">
                                                <el-button type="primary" size="small">Save...</el-button>
                                            </div>
                                        </el-col>
                                        <el-col style="width: 20%">
                                            <div>
                                                <el-button type="primary" size="small" disabled>3 Points...</el-button>
                                            </div>
                                            <div style="margin-top: 9px;">
                                                <el-button type="primary" size="small">Scan...</el-button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </el-col>
                        <el-col style="width:52%;padding-left: 30px;border-left: 1px solid lightgray;">
                            <div class="form-item-title no-first">
                                <span class="form-item-title-span">Grid Information</span>
                            </div>
                            <div class="form-item-body" style="font-size: 14px;">
                                <el-row style="width: 100%;">
                                    <el-col style="width:33%">
                                        <div style="width: 100%;height:10px;"></div>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <span>Inline</span>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <span>Crossline</span>
                                    </el-col>
                                </el-row>
                                <el-row style="width: 100%;margin-top: 10px;">
                                    <el-col style="width:33%">
                                        <span>Number:</span>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="in1" />
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="in2"/>
                                    </el-col>
                                </el-row>
                                <el-row style="width: 100%;margin-top: 10px;">
                                    <el-col style="width:33%">
                                        <span>First:</span>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="in3"/>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="in4" />
                                    </el-col>
                                </el-row>
                                <el-row style="width: 100%;margin-top: 10px;">
                                    <el-col style="width:33%">
                                        <span>Increase:</span>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="in5"/>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="in6"/>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="form-item-title no-first">
                                <span class="form-item-title-span">Project Information</span>
                            </div>
                            <div class="form-item-body">
                                <span>Unit:</span>
                                <el-select v-model="chooseUnit" size="small" style="width: 100px;margin-left: 10px;">
                                    <el-option value="Masters"></el-option>
                                </el-select>

                            </div>
                        </el-col>
                    </el-row>
                    <div class="form-item-title no-first">
                        <span class="form-item-title-span">Survey Location Information</span>
                    </div>
                    <div class="form-item-body" style="font-size: 14px;">
                        <el-row style="width: 100%;">
                            <el-col style="width: 50%;">
                                <div style="font-size: 16px;">
                                    <span>BinSize</span>
                                </div>
                                <div style="margin-top: 10px;">
                                    <div>
                                        <span>Inline:</span>
                                        <input style="width: 100px;margin-left: 34px;" disabled v-model="in7"/>
                                    </div>
                                </div>
                                <div style="margin-top: 10px;">
                                    <div>
                                        <span>Crossline:</span>
                                        <input style="width: 100px;margin-left: 10px;" disabled v-model="in8"/>
                                    </div>
                                </div>
                            </el-col>
                            <el-col style="width: 50%;">
                                <div style="font-size: 16px;">
                                    <span>Survey Origin</span>
                                </div>
                                <div style="margin-top: 10px;">
                                    <div>
                                        <span>Easting:</span>
                                        <input style="width: 100px;margin-left: 16px;" disabled v-model="in9"/>
                                    </div>
                                </div>
                                <div style="margin-top: 10px;">
                                    <div>
                                        <span>Northing:</span>
                                        <input style="width: 100px;margin-left: 10px;" disabled v-model="in10"/>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <div style="margin-top: 20px;">
                            <div>
                                <span>Inclination(Deg)</span>
                                <input style="width: 100px;margin-left: 16px;" disabled v-model="in11" />
                            </div>
                        </div>
                    </div>


                    <div class="button-panel">
                        <el-button @click="()=>{this.$data.active=1}">Back</el-button>
                        <el-button type="primary" @click="clickNext">Next</el-button>
                        <el-button @click="()=>{this.$router.push('/')}">Cancel</el-button>

                    </div>
                </div>

            </div>
            <div v-if="active===3">
                <div class="step4-panel">

                    <div class="form-item-title">
                        <span class="form-item-title-span">Input Size(SEG-Y Format)</span>
                    </div>
                    <div class="form-item-body">
                        <el-row style="width:100%">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <div style="width:10px;height:10px;"></div>
                            </el-col>
                            <el-col style="width: 25%;text-align:center">
                                <span>From</span>
                            </el-col>
                            <el-col style="width: 25%;text-align:center">
                                <span>To</span>
                            </el-col>
                            <el-col style="width: 25%;text-align:center">
                                <span>Step</span>
                            </el-col>
                        </el-row>
                        <el-row style="width:100%">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <span>Crossline</span>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="put1" />
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="put2"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="put3"/>
                            </el-col>
                        </el-row>
                         <el-row style="width:100%;margin-top:10px">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <span>Inline</span>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="put4"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="put5"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="put6"/>
                            </el-col>
                        </el-row>
                         <el-row style="width:100%;margin-top:10px;">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <span>Two-Way Time</span>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="put7"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="put8"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="put9"/>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="form-item-title" style="margin-top:30px;">
                        <span class="form-item-title-span">Output Size(GTC Cube File Format)</span>
                    </div>
                    <div class="form-item-body">
                        <el-row style="width:100%">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <div style="width:10px;height:10px;"></div>
                            </el-col>
                            <el-col style="width: 25%;text-align:center">
                                <span>From</span>
                            </el-col>
                            <el-col style="width: 25%;text-align:center">
                                <span>To</span>
                            </el-col>
                            <el-col style="width: 25%;text-align:center">
                                <span>Step</span>
                            </el-col>
                        </el-row>
                        <el-row style="width:100%">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <span>Crossline</span>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" v-model="put10"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" v-model="put11"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" v-model="put12"/>
                            </el-col>
                        </el-row>
                         <el-row style="width:100%;margin-top:10px">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <span>Inline</span>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" v-model="put13"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" v-model="put14"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" v-model="put15"/>
                            </el-col>
                        </el-row>
                         <el-row style="width:100%;margin-top:10px;">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <span>Two-Way Time</span>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" v-model="put16"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" v-model="put17"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" v-model="put18"/>
                            </el-col>
                        </el-row>
                    </div>


                     <div class="form-item-title" style="margin-top:30px;">
                        <span class="form-item-title-span">Z Axis Unit</span>
                    </div>
                    <div class="form-item-body">
                        <span>Time</span>
                        <el-select v-model="chooseTime" size="small" style="width: 100px;margin-left:20px;">
                            <el-option value="Milliseconds"></el-option>
                        </el-select>
                    </div>
                    <div style="width: 100%;height:1px;background-color:whitesmoke;margin-top:20px;"></div>
                    <div style="margin-top:20px;">
                        <div style="margin-top:10px;">
                            <el-checkbox>Override Start Time</el-checkbox>
                            <input style="width: 100px;margin-left:10px;" v-model="put19"/>
                        </div>
                        <div style="margin-top:10px;">
                            <el-checkbox >Skip the trace if any value {{tempvalue}} </el-checkbox>
                            <input style="width: 100px;margin-left:10px;" v-model="put20"/>
                        </div>
                        <div style="margin-top:10px;">
                            <el-checkbox >Skip the trace if any value ></el-checkbox>
                            <input style="width: 100px;margin-left:10px;" v-model="put21"/>
                        </div>
                        <div style="margin-top:10px;font-size:14px;">
                            <span>Invalid Value</span>
                            <input style="width: 100px;margin-left:10px;" v-model="put22"/>
                        </div>
                        <div style="margin-top:10px;">
                            <el-checkbox  checked>Skip handling misplaced traces</el-checkbox>
                        </div>
                    </div>


                    <div class="button-panel">
                        <el-button @click="()=>{this.$data.active=2}">Back</el-button>
                        <el-button type="primary" @click="finishFunc">Finish</el-button>
                        <el-button @click="()=>{this.$router.push('/')}">Cancel</el-button>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "NewProject",
        data(){
            return{
                chosenFile:'',
                hasChosen: false,
                downloadFileList:[],
                tempvalue:'<',
                active: 0,
                chooseTime:'',
                chooseUnit:'Masters',
                chooseFormat:'IBM',
                chooseDisplay:'Wiggle',
                chooseSurvey:'XY Coordinate from 3 point definition',
                trace:1,
                tableData:[],
                overrideScaling:0.01,
                checkFloat:true,
                checkOverrideScaling: false,
                segyData:'',
                in1:'1',
                in2:'1',
                in3:'1',
                in4:'1',
                in5:'1',
                in6:'1',
                in7:'25',
                in8:'25',
                in9:'0',
                in10:'0',
                in11:'0',
                put1:'480',
                put2:'1180',
                put3:'1',
                put4:'470',
                put5:'1070',
                put6:'1',
                put7:'3750',
                put8:'4350',
                put9:'2',
                put10:'480',
                put11:'1180',
                put12:'1',
                put13:'470',
                put14:'1070',
                put15:'1',
                put16:'3750',
                put17:'4350',
                put18:'2',
                put19:'',
                put20:'',
                put21:'',
                put22:'99999',
                isLoading:false,
                s2in1:'189',
                s2in2:'4',
                s2in3:'193',
                s2in4:'4',
                s2in5:'181',
                s2in6:'4',
                s2in7:'185',
                s2in8:'4',
                end:[]
            }
        },
        mounted() {
            //获取文件列表
            let _this = this;
            this.$axios({
                method:'get',
                url: this.$Global.server_config.url+'/downloadFile/fileList?userId='+this.$Global.server_config.userId,

            }).then((response)=>{
                _this.downloadFileList = response.data;
            });

            for(let index = 1; index<461/4;index++){
                this.$data.tableData.push(
                    {
                        Bytes:' '+index.toString()+'-'+(index+3).toString(),
                        Description:'Trace...',
                        Format:'Integer',
                        Value:'431210.0'
                    }
                )
                
            }


            this.tableData[2].Value=0;
            
            this.tableData[3].Value=0;
            this.tableData[3].Description='Feild...';
            this.tableData[4].Value=0;
            this.tableData[4].Description='Feild...';
            this.tableData[5].Value=431210.0;
            this.tableData[6].Value=1;
            this.tableData[7].Value=1;
            
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
                    url:'/segy',
                    params:{
                        subProjectId: this.$Global.projectDetails.subProjectList[0].id,
                        fileId: this.$data.chosenFileId
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.isLoading = false;
                })

            },
            checkEcharts(){
                let myChart = this.$echarts.init(document.getElementById('myChart'));
            // 绘制图表
            let k = [];
            
            for(let index = 0; index < 461; index++){
                k.push(index);
                this.$data.end.push(-1);
                
            }
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: ['50', '100', '150', '200', '250', '300', '350']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.$data.end,
                    type: 'line',
                    smooth: true
                }]
            });
            },
            clickNext(){
                
                this.$message({
                    type:'info',
                    message:'Get trace header info...'
                })
                this.$data.isLoading=true;
                let _this = this;
                setTimeout(function(){
                    _this.$data.isLoading=false;
                    _this.$data.active=3;
                },2000);
                
                                                               
            },

            clickPreview(){
                window.console.log(this.$Global.projectDetails);
                let _this = this;
                this.$axios({
                    method:'get',
                    url:'/segy/trace/field',
                    params:{
                        subProjectId: this.$Global.projectDetails.subProjectList[0].id,
                        fileId: this.chosenFileId
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then((response)=>{
                    window.console.log(response.data);
                    
                    _this.checkEcharts();
                })
            },
            changeSlide(val){
                let _this = this;
                this.$axios({
                    method:'get',
                    url:'/segy/trace/'+val,
                    params:{
                        subProjectId: this.$Global.projectDetails.subProjectList[0].id
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then((response)=>{
                    window.console.log(response.data);
                    _this.checkEcharts();
                })
            },
            finishFunc(){
                this.$message({
                    type:'info',
                    message:'Import Segy Data...'
                })
                this.$data.isLoading=true;
                let _this = this;
                setTimeout(function(){
                    _this.$data.isLoading=false;
                    _this.$router.push('/');
                },2000);
            },
            getTraceField(){
                // let _this = this;
                this.$axios({
                    method:'get',
                    url:'/segy/trace/field',
                    params:{
                        subProjectId: this.$Global.projectDetails.subProjectList[0].id
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then((response)=>{
                    window.console.log(response.data);
                    
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