<template>
    <div id="NewProject" v-loading="isLoading">
        <el-dialog :visible.sync="dialogVisible" title="Line Header Preview" style="width:800px;margin-left: auto;margin-right:auto;">
            <el-table
                    :data="tableData"
                    style="border: 1px solid lightgray;height:300px;"
                    stripe
                    height="250"
            >
                <el-table-column label="Bytes" >
                    <template slot-scope="scope">
                        <span>{{scope.$index*4}}-{{(scope.$index+1)*4-1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="Description"></el-table-column>
                <el-table-column label="format">Integer</el-table-column>
                <el-table-column prop="value" label="Value"></el-table-column>
            </el-table>

        </el-dialog>
        
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
                            <el-table-column
                                prop="description"
                                label="description"
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
                <div v-show="hasChosen">
                    <div class="form-item-title no-first">
                        <span class="form-item-title-span">Line Header</span>
                    </div>
                    <div class="form-item-body">
                        <span>Format:</span>
                        <el-radio v-model="baseInfo.dataFormat" label="4-byte IBM float" style="margin-left: 10px;">IBM</el-radio>
                        <el-radio v-model="baseInfo.dataFormat" label="IEEE">IEEE</el-radio>
                        <el-checkbox label="Flip Bytes">Flip Bytes</el-checkbox>
                        <el-button type="primary" size="small" style="margin-left:15px;" @click="clickPreview">Preview</el-button>
                    </div>
                    



                    <div class="form-item-title no-first">
                        <span class="form-item-title-span">Trace Preview</span>
                    </div>
                    <div class="form-item-body" style="margin-top:5px;">
                        <div id="myChart" :style="{width: '600px', height: '400px'}"></div>
                    </div>

                
                    <!-- <div class="form-item-title no-first">
                        <span class="form-item-title-span">Display</span>
                    </div>
                    <div class="form-item-body">
                        <el-radio v-model="chooseDisplay" label="Wiggle" style="margin-left: 10px;">Wiggle</el-radio>
                        <el-radio v-model="chooseDisplay" label="Histogram">Histogram</el-radio>
                    </div> -->


                    <div class="form-item-title no-first">
                        <span class="form-item-title-span">Current Trace</span>
                    </div>
                    <div class="form-item-body">
                        <el-row style="width: 330px">
                            <el-col style="width: 230px;">
                                <el-slider v-model="trace" @change="changeSlide" :min="0" :max="baseInfo.traceNum" style="width: 200px;"></el-slider>
                            </el-col>
                            <el-col style="width: 100px;">
                                <el-input-number v-model="trace" size="small" @change="changeSlide"></el-input-number>
                            </el-col>
                        </el-row>

                    </div>
                </div>

                <div class="button-panel">
                    <el-button v-show="hasChosen" type="primary" @click="()=>{this.$data.active=1;this.getWorkZone();}">Next</el-button>
                    <el-button type="primary" @click="()=>{this.$router.push('/')}">Cancel</el-button>
                </div>
            </div>

            <div v-if="active===1">
                <div class="form-item-title no-first">
                        <span class="form-item-title-span">Slice Preview</span>
                </div>
                <div class="form-item-body" style="margin-top:5px;">
                    <div>
                        <span>Slice Type: </span>
                        <el-select size="small" v-model="chooseDraw" >
                            <el-option value="xline">crossline</el-option>
                            <el-option value="iline">inline</el-option>
                            <el-option value="depth">time</el-option>
                        </el-select>
                    </div>
                    <div v-if="chooseDraw==='xline'" style="margin-top:20px;">
                        <div>
                            <el-row>
                                <el-col style="width:100px;">
                                    <div style="margin-top:10px;">Crossline: </div>
                                </el-col>
                                <el-col style="width:200px;">
                                    <el-slider v-model="changeDrawValueXline"  :min="workzone.xlineFrom" :max="workzone.xlineTo" style="width: 200px;"></el-slider>
                                </el-col>
                                <el-col style="width:200px;margin-left:10px;">
                                    <el-input-number v-model="changeDrawValueXline" size="small"></el-input-number>
                                </el-col>
                            </el-row>
                            
                        </div>
                        
                    </div>
                    <div v-if="chooseDraw==='iline'" style="margin-top:20px;">
                        <div>
                            <el-row>
                                <el-col style="width:100px;">
                                    <div style="margin-top:10px;">Inline: </div>
                                </el-col>
                                <el-col style="width:200px;">
                                    <el-slider v-model="changeDrawValueIline"  :min="workzone.inlineFrom" :max="workzone.inlineTo" style="width: 200px;"></el-slider>
                                </el-col>
                                <el-col style="width:200px;margin-left:10px;">
                                    <el-input-number v-model="changeDrawValueIline" size="small"></el-input-number>
                                </el-col>
                            </el-row>
                            
                        </div>
                        
                    </div>
                    <div v-if="chooseDraw==='depth'" style="margin-top:20px;">
                        <div>
                            <el-row>
                                <el-col style="width:100px;">
                                    <div style="margin-top:10px;">Depth: </div>
                                </el-col>
                                <el-col style="width:200px;">
                                    <el-slider v-model="changeDrawValueDepth"  :min="workzone.timeFrom" :max="workzone.timeTo" style="width: 200px;"></el-slider>
                                </el-col>
                                <el-col style="width:200px;margin-left:10px;">
                                    <el-input-number v-model="changeDrawValueDepth" size="small"></el-input-number>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div style="margin-top:30px;">
                        <el-button type="primary" size="small" @click="changeDraw">Show Slice</el-button>
                    </div>
                    <div id="myChartHot" :style="{width: '600px', height: '400px'}" style="margin-top:30px;"></div>
                </div>
                <div class="button-panel">
                    <el-button @click="()=>{this.$data.active=1}">Back</el-button>
                    <el-button v-show="hasChosen" type="primary" @click="()=>{this.$data.active=2;this.getTraceHeader()}">Next</el-button>
                    <el-button type="primary" @click="()=>{this.$router.push('/')}">Cancel</el-button>
                </div>

            </div>

            <div v-if="active===2">
                <div class="step2-panel">
                    <el-row style="width:100%">
                        <el-col style="width: 55%;">
                            <div class="form-item-title no-first">
                                <span class="form-item-title-span">Trace Header Display Information</span>
                            </div>
                            <div class="form-item-body">
                                <el-table
                                    :data="tableData"
                                    style="border: 1px solid lightgray;height:500px;"
                                    stripe
                                    height="500"
                                >
                                    <el-table-column label="Bytes" >
                                        <template slot-scope="scope">
                                            <span>{{scope.$index*4}}-{{(scope.$index+1)*4-1}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="description" label="Description"></el-table-column>
                                    <el-table-column label="format">Integer</el-table-column>
                                    <el-table-column prop="value" label="Value"></el-table-column>
                                </el-table>
                            </div>

                            <div class="form-item-title no-first">
                                <!-- <span class="form-item-title-span">Trace </span> -->
                            </div>
                            <div class="form-item-body">
                                <!-- <el-row style="width: 310px">
                                    <el-col style="width: 210px;">
                                        <el-slider v-model="trace" style="width: 180px;"></el-slider>
                                    </el-col>
                                    <el-col style="width: 100px;">
                                        <el-input-number v-model="trace" size="small"></el-input-number>
                                    </el-col>
                                </el-row> -->
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
                                        <input style="width: 80%;" v-model="baseInfo.inlineBin"/>
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
                                        <input style="width: 80%;" v-model="baseInfo.crosslineBin"/>
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
                                        <input style="width: 80%;" v-model="baseInfo.coordinateX"/>
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
                                        <input style="width: 80%;" v-model="baseInfo.coordinateY"/>
                                    </el-col>
                                    <el-col style="width:33%">
                                        <input style="width: 80%;" v-model="s2in8"/>
                                    </el-col>
                                </el-row>
                                
                            </div>

                            <div class="form-item-title no-first">
                                <span class="form-item-title-span">Header In Detail</span>
                            </div>
                            <div class="form-item-body" style="font-size: 14px;">
                                <div>
                                    <el-button size="small" type="primary" style="width: 150px;" disabled>EBCDIC</el-button>
                                </div>
                                <div style="margin-top: 10px;">
                                    <el-button size="small" type="primary" style="width: 150px;" @click="seeLineHeader">Line Header...</el-button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>

                    <div class="button-panel">
                        <el-button @click="()=>{this.$data.active=2}">Back</el-button>
                        <el-button type="primary" @click="()=>{this.$data.active=3}">Next</el-button>
                        <el-button @click="()=>{this.$router.push('/')}">Cancel</el-button>

                    </div>
                </div>
            </div>

            <div v-if="active===5">
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
                        <el-button @click="()=>{this.$data.active=3}">Back</el-button>
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
                                <input style="width:150px;" disabled v-model="workzone.inlineFrom" />
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="workzone.inlineTo"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="workzone.inlineStep"/>
                            </el-col>
                        </el-row>
                         <el-row style="width:100%;margin-top:10px">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <span>Inline</span>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="workzone.xlineFrom"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="workzone.xlineTo"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="workzone.xlineStep"/>
                            </el-col>
                        </el-row>
                         <el-row style="width:100%;margin-top:10px;">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <span>Two-Way Time</span>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="workzone.timeFrom"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="workzone.timeTo"/>
                            </el-col>
                            <el-col style="width: 25%">
                                <input style="width:150px;" disabled v-model="workzone.timeStep"/>
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
                                <div>
                                    <input style="width:150px;"  v-model="workzoneOutput.inlineFrom"/>
                                </div>
                                <div v-show="workzoneOutputFlag.inlineFrom">
                                    <span class="validation">value invalid!</span>
                                </div>
                            </el-col>
                            <el-col style="width: 25%">
                                <div>
                                    <input style="width:150px;"  v-model="workzoneOutput.inlineTo"/>
                                </div>
                                <div v-show="workzoneOutputFlag.inlineTo">
                                    <span class="validation">value invalid!</span>
                                </div>
                            </el-col>
                            <el-col style="width: 25%">
                                <div>
                                    <input style="width:150px;"  v-model="workzoneOutput.inlineStep"/>
                                </div>
                                <div v-show="workzoneOutputFlag.inlineStep">
                                    <span class="validation">value invalid!</span>
                                </div>
                            </el-col>
                        </el-row>
                         <el-row style="width:100%;margin-top:10px">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <span>Inline</span>
                            </el-col>
                            <el-col style="width: 25%">
                                <div>
                                    <input style="width:150px;"  v-model="workzoneOutput.xlineFrom"/>
                                </div>
                                <div v-show="workzoneOutputFlag.xlineFrom">
                                    <span class="validation">value invalid!</span>
                                </div>
                            </el-col>
                            <el-col style="width: 25%">
                                <div>
                                    <input style="width:150px;"  v-model="workzoneOutput.xlineTo"/>
                                </div>
                                <div v-show="workzoneOutputFlag.xlineTo">
                                    <span class="validation">value invalid!</span>
                                </div>
                            </el-col>
                            <el-col style="width: 25%">
                                <div>
                                    <input style="width:150px;"  v-model="workzoneOutput.xlineStep"/>
                                </div>
                                <div v-show="workzoneOutputFlag.xlineStep">
                                    <span class="validation">value invalid!</span>
                                </div>
                            </el-col>
                        </el-row>
                         <el-row style="width:100%;margin-top:10px;">
                            <el-col style="width: 25%;text-align: right;padding-right:10px;">
                                <span>Two-Way Time</span>
                            </el-col>
                            <el-col style="width: 25%">
                                <div>
                                    <input style="width:150px;"  v-model="workzoneOutput.timeFrom"/>
                                </div>
                                <div v-show="workzoneOutputFlag.timeFrom">
                                    <span class="validation">value invalid!</span>
                                </div>
                            </el-col>
                            <el-col style="width: 25%">
                                <div>
                                    <input style="width:150px;"  v-model="workzoneOutput.timeTo"/>
                                </div>
                                <div v-show="workzoneOutputFlag.timeTo">
                                    <span class="validation">value invalid!</span>
                                </div>
                            </el-col>
                            <el-col style="width: 25%">
                                <div>
                                    <input style="width:150px;"  v-model="workzoneOutput.timeStep"/>
                                </div>
                                <div v-show="workzoneOutputFlag.timeStep">
                                    <span class="validation">value invalid!</span>
                                </div>
                            </el-col>
                        </el-row>
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
                chooseDraw:'xline',
                changeDrawValueIline:'',
                changeDrawValueXline:'',
                changeDrawValueDepth:'',
                dialogVisible: false,
                chosenFile:'',
                hasChosen: false,
                downloadFileList:[],
                tempvalue:'<',
                active: 0,
                chooseTime:'',
                chooseUnit:'Masters',
                chooseFormat:'IBM',
                traceNum:'',
                chooseDisplay:'Wiggle',
                chooseSurvey:'XY Coordinate from 3 point definition',
                trace:1,
                tableData:[],
                overrideScaling:0.01,
                checkFloat:true,
                checkOverrideScaling: false,
                segyData:'',
                chosedFileId:'',
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
                end:[],
                tableDataDialog:[],
                xdata:[],
                ydata:[],
                displayData:[],
                xlimit:300,
                ylimit:300,
                diagramData:[],
                signData:[],
                xlabel:'',
                ylabel:'',
                workzoneOutput:{
                    id: null,
                    inlineFrom: 470,
                    inlineStep: 1,
                    inlineTo: 1070,
                    timeFrom: 2500,
                    timeStep: 2,
                    timeTo: 3100,
                    xlineFrom: 480,
                    xlineStep: 1,
                    xlineTo: 1180,
                },
                workzoneOutputFlag:{
                    inlineFrom: false,
                    inlineTo: false,
                    inlineStep: false,
                    xlineFrom: false,
                    xlineTo: false,
                    xlineStep: false,
                    timeFrom: false,
                    timeTo: false,
                    timeStep: false,
                },

                workzone:{
                    id: null,
                    inlineFrom: 470,
                    inlineStep: 1,
                    inlineTo: 1070,
                    timeFrom: 2500,
                    timeStep: 2,
                    timeTo: 3100,
                    xlineFrom: 480,
                    xlineStep: 1,
                    xlineTo: 1180,
                },
                baseInfo:{
                    coordinateX:'',
                    coordinateY:'',
                    crosslineBin:'',
                    dataFormat:'',
                    inlineBin:'',
                    traceNum:''
                }
                
            }
        },
        watch:{

        },
        mounted() {
            //获取文件列表
            let _this = this;
            this.$axios({
                method:'post',
                url: this.$Global.server_config.url+'/downloadFile/fileList',
                data:{
                    userId:this.$Global.server_config.userId,
                    type:'Seismic'
                }

            }).then((response)=>{
                _this.downloadFileList = response.data;
            });





       },
        methods:{
            getWorkZone(){
                let _this = this;
                this.$axios({
                    method:'get',
                    url:'/segy/workzone',
                    params:{
                        fileId: this.$data.chosenFileId
                    }
                }).then((response)=>{
                    _this.$data.workzone = response.data.data;
                    // _this.$data.workzoneOutput = response.data.data;
                    _this.changeDrawValueIline = response.data.data.inlineFrom;
                    _this.changeDrawValueXline = response.data.data.xlineFrom;
                    _this.changeDrawValueDepth = response.data.dara.timeFrom;
                })
            },
            seeLineHeader(){
                let _this = this;
                this.isLoading=true;

                this.$axios({
                    method:'get',
                    url:'/segy/binheader',
                    params:{
                        fileId: this.$data.chosenFileId
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then((response)=>{
                    window.console.log(response.data.data);
                    _this.isLoading=false;
                    for(let item in response.data.data){
                        _this.tableDataDialog.push({
                            description: item,
                            format: 'Integer',
                            value: response.data.data[item]
                        })
                    }
                    _this.dialogVisible=true;
                })
            },
            getTraceHeader(){
                let _this = this;
                let myChartHot = this.$echarts.init(document.getElementById('myChartHot'));
                myChartHot.dispose();
                
                this.isLoading=true;
                this.$axios({
                    method:'get',
                    url:'/segy/trace/'+this.$data.chosenFileId+'/header',
                    params:{
                        fileId: this.$data.chosenFileId
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then((response)=>{
                    window.console.log(response.data.data);
                    _this.isLoading=false;
                    for(let item in response.data.data){
                        _this.tableData.push({
                            description: item,
                            format: 'Integer',
                            value: response.data.data[item]
                        })
                    }
                })
            },
            chooseSegy(index){
                this.isLoading = true;
                window.console.log(index);
                this.$data.chosenFileId = this.$data.downloadFileList[index].id;
                let _this = this;
                this.$axios({
                    method:'get',
                    url:'/segy/validation',
                    params:{
                        fileId: this.$data.chosenFileId
                    }
                }).then((response)=>{
                    if(response.data.code===0){
                        window.console.log(response);
                        _this.isLoading = false;
                        // _this.getSignData();
                        _this.$data.chosenFile = this.$data.downloadFileList[index].realName;
                        _this.$data.hasChosen = true;
                        _this.getBaseInfo();
                    }else{
                        _this.$message({
                            type:'error',
                            message:'segy file invalid!'
                        });
                        _this.isLoading = false;
                    }
                    
                }).catch((error)=>{
                    window.console.log(error);
                    _this.isLoading = false;
                })

            },
            getBaseInfo(){
                let _this = this;
                this.$axios({
                    method:'get',
                    url:'/segy/baseInfo',
                    params:{
                        fileId: this.$data.chosenFileId
                    }
                }).then((response)=>{
                    window.console.log(response.data.data.dataFormat);
                    _this.chooseFormat = response.data.data.dataFormat;
                    _this.traceNum = response.data.data.traceNum;
                    _this.baseInfo = response.data.data;
                });
            },
            
            changeDraw(){
                this.isLoading = true;
                let change = this.$data.chooseDraw;
                let _this = this;
                if(change==='depth'){
                this.$axios({
                    method:'get',
                    url:'/segy/'+change+'/'+ (this.changeDrawValueDepth-this.workzone.timeFrom),
                    params:{
                        // subProjectId: this.$Global.projectDetails.subProjectList[0].id
                        fileId: this.$data.chosenFileId
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
                }else if(change==='xline'){
                    this.$axios({
                        method:'get',
                        url:'/segy/'+change+'/'+ this.changeDrawValueXline,
                        params:{
                            // subProjectId: this.$Global.projectDetails.subProjectList[0].id,
                            fileId: this.$data.chosenFileId
                        }
                    }).then((response)=>{
                        _this.$data.displayData = response.data.data;
                        
                        _this.checkSliceEcharts();
                        //  window.console.log(response);
                        _this.isLoading = false;
                    }).catch((err)=>{
                        _this.isLoading = false;
                        window.console.log(err);
                    })

                }else{
                    this.$axios({
                        method:'get',
                        url:'/segy/'+change+'/'+ this.changeDrawValueIline,
                        params:{
                            // subProjectId: this.$Global.projectDetails.subProjectList[0].id,
                            fileId: this.$data.chosenFileId
                        }
                    }).then((response)=>{
                        _this.$data.displayData = response.data.data;
                        _this.checkSliceEcharts();
                        //  window.console.log(response);
                        _this.isLoading = false;
                    }).catch((err)=>{
                        _this.isLoading = false;
                        window.console.log(err);
                    })
                }

            },
            checkSliceEcharts(){
                let myChartHot = this.$echarts.init(document.getElementById('myChartHot'));
                let data = [];
                let totalNum = this.$data.displayData.length;
                let xlimit = totalNum;
                let ylimit = this.$data.displayData[0].length;


                if(this.chooseDraw==='xline'){
                    

                    for(let i = 0; i < xlimit/2; i=i+this.workzone.inlineStep){
                        this.$data.xdata.push(i*2+parseInt(this.workzone.inlineFrom));
                    }

                    for(let i = 0; i < ylimit/2; i=i+this.workzone.timeStep){
                        this.$data.ydata.push(i*2+parseInt(this.workzone.timeFrom));
                        
                    }
                    this.xlabel='i';
                    this.ylabel='time';
                }else if(this.chooseDraw==='iline'){
                    for(let i = 0; i < xlimit/2; i=i+this.workzone.xlineStep){
                    this.$data.xdata.push(i*2+parseInt(this.workzone.xlineFrom));
                    // this.$data.xdata.push(i+470);
                    }

                    for(let i = 0; i < ylimit/2; i=i+this.workzone.timeStep){
                        this.$data.ydata.push(i*2+parseInt(this.workzone.timeFrom));
                        // this.$data.ydata.push(i+480);
                    }
                    this.xlabel='x';
                    this.ylabel='time';
                }else{
                    for(let i = 0; i < xlimit/2; i++){
                        this.$data.xdata.push(i*2+parseInt(this.workzone.inlineFrom));
                        // this.$data.xdata.push(i+470);
                    }

                    for(let i = 0; i < ylimit/2; i++){
                        this.$data.ydata.push(i*2+parseInt(this.workzone.xlineFrom));
                        // this.$data.ydata.push(i+480);
                    }
                    this.xlabel='i';
                    this.ylabel='x';
                }

                window.console.log(this.$data.xdata);


                

                // let index = 0;
                for(let x = 0; x < xlimit/2; x++){
                    for(let y = 0; y < ylimit/2; y++){
                        data.push([x, y, (this.$data.displayData[x*2][y*2]*1.0)/1000000]);
                    }
                }


                let option = {
                    tooltip: {},
                    xAxis: {
                        name: this.xlabel,
                        type: 'category',
                        data: this.$data.xdata,
                        label: this.xlabel
                    },
                    yAxis: {
                        name: this.ylabel,
                        type: 'category',
                        data: this.$data.ydata,
                        label: this.ylabel
                    },
                    visualMap: {
                        min: -500,
                        max: 500,
                        calculable: true,
                        realtime: false,
                        inRange: {
                            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                        }
                    },
                    grid:{
                      x:100,
                      y:30,
                      x2: 50,
                      y2:70
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
            },
            checkEcharts(){
                let myChart = this.$echarts.init(document.getElementById('myChart'));
            // 绘制图表
            let k = [];
            if(this.diagramData.length===0){
                for(let index = 0; index < 461; index++){
                k.push(index);
                this.$data.diagramData.push(-1);
                
            }
            }
            
            
            myChart.setOption({
                
                xAxis: {
                    type: 'category',
                    data: ['50', '100', '150', '200', '250', '300', '350']
                },
                yAxis: {
                    type: 'value'
                },
                grid:{
                      x:100,
                      y:30,
                      x2: 50,
                      y2:70
                     },
                series: [{
                    data: this.$data.diagramData,
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
                    _this.$data.active=4;
                },2000);
                
                                                               
            },

            clickPreview(){
                let _this = this;
                this.isLoading = true;
                this.$axios({
                    method:'get',
                    url:'/segy/trace/'+this.traceNum+'/data',
                    params:{
                        fileId: this.$data.chosenFileId
                    },
                    // headers:{
                    //     'Content-Type':'application/json'
                    // }
                }).then((response)=>{
                    window.console.log(response.data);
                    _this.diagramData = response.data.data;
                    _this.isLoading = false;
                    _this.checkEcharts();
                }).catch((error)=>{
                    window.console.log(error);
                    _this.isLoading = false;
                    _this.checkEcharts();
                })
            },
            changeSlide(val){
                let _this = this;
                this.$axios({
                    method:'get',
                    url:'/segy/trace/'+val+'/data',
                    params:{
                        fileId: this.$data.chosenFileId
                    },
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then((response)=>{
                    window.console.log(response.data);
                    _this.diagramData = response.data.data;
                    _this.checkEcharts();
                })
            },
            finishFunc(){

                let form = this.$data.workzoneOutput;
                let workzone = this.$data.workzone;
                let flag = true;

                if(form.inlineFrom < workzone.inlineFrom || form.inlineFrom > workzone.inlineTo || form.inlineFrom > form.inlineTo){
                    this.$data.workzoneOutputFlag.inlineFrom = true;
                    flag = false;
                }

                if(form.inlineTo < workzone.inlineTo || form.inlineTo > workzone.inlineTo || form.inlineTo < form.inlineFrom){
                    this.$data.workzoneOutputFlag.inlineTo = true;
                    flag = false;
                }

                if(form.inlineStep % this.$data.inlineStep != 0 && form.inlineStep == 0){
                    this.$data.workzoneOutputFlag.inlineStep = true;
                    flag = false;
                }


                if(form.xlineFrom < workzone.xlineFrom || form.xlineFrom > workzone.xlineTo || form.xlineFrom > form.xlineTo){
                    this.$data.workzoneOutputFlag.xlineFrom = true;
                    flag = false;
                }

                if(form.xlineTo < workzone.xlineTo || form.xlineTo > workzone.xlineTo || form.xlineTo < form.xlineFrom){
                    this.$data.workzoneOutputFlag.xlineTo = true;
                    flag = false;
                }

                if(form.xlineStep % this.$data.xlineStep != 0 && form.xlineStep == 0){
                    this.$data.workzoneOutputFlag.xlineStep = true;
                    flag = false;
                }

                if(form.timeFrom < workzone.timeFrom || form.timeFrom > workzone.timeTo || form.timeFrom > form.timeTo){
                    this.$data.workzoneOutputFlag.timeFrom = true;
                    flag = false;
                }

                if(form.timeTo < workzone.timeTo || form.timeTo > workzone.timeTo || form.timeTo < form.timeFrom){
                    this.$data.workzoneOutputFlag.timeTo = true;
                    flag = false;
                }

                if(form.timeStep % this.$data.timeStep != 0 && form.timeStep == 0){
                    this.$data.workzoneOutputFlag.timeStep = true;
                    flag = false;
                }

                if(flag===false){
                    this.$message({
                        type:'error',
                        message:'value invalid'
                    })
                }else{
                    // 
                    this.$data.isLoading = true;
                    let _this = this;
                    this.$axios({
                        method:'post',
                        url:'/segy',
                        params:{
                            projectId: this.$Global.projectDetails.id,
                            fileId: this.$data.chosenFileId
                        },
                        data: this.$data.workzoneOutput
                    }).then((response)=>{
                        if(response.data.code===0){
                            _this.$router.push('/');
                            _this.$data.isLoading = true;
                            _this.$message({
                                type:'success',
                                message:'Import Successfully'
                            });
                        }
                    })
                    
                }
    
                
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

                this.getTraceHeader();
            }


        }
    }
</script>

<style scoped>

.validation{
    font-size: 12px;
    color: red;
}

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