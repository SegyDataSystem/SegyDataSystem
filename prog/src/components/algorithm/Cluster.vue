<template>
    <div id="NewProject" v-loading="loading1"> 
        <div class="import-title-panel">
            <span v-if="step<=2" class="import-title">
                Cluster Step {{step}} of 2
            </span>
            <span v-if="step>2" class="import-title">
                {{select5}}
            </span>
        </div>

        <div class="import-details-panel">
            <div v-if="step===1">
            <!--第一步-->
                <div class="form-item-title">
                    <span class="form-item-title-span">Data Selection</span>
                </div>
                <div class="form-item-body">
                    <el-select v-model="select1" placeholder="select...">
                        <el-option value="0" label="Seismic3D"></el-option>
                    </el-select>
                    <el-select v-model="select2" placeholder="select...">
                        <el-option value="0" label="Poststack Amplitude"></el-option>
                    </el-select>
                    <el-select v-model="select3" placeholder="select...">
                        <el-option value="0" label="Preprocess"></el-option>
                    </el-select>
                    <el-select v-model="select4" placeholder="select...">
                        <el-option value="0" label="SRC"></el-option>
                    </el-select>
                </div>
                <div class="form-item-body">
                    <el-transfer v-model="value" :data="tableData" @change="changeChoose" :titles="['file uploaded', 'file chosen']"></el-transfer>
                </div>
                <div class="form-item-body">
                    <el-button type="primary">Show Correlation Diagram</el-button>
                    <el-button type="primary">Show Histogram</el-button>
                </div>
                <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                <div style="margin-top:30px;">
                    <el-button  @click="()=>{
                        this.$data.step=2;
                    }">Next</el-button>
                    <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                </div>
                <div style="width:100%;height:50px;"></div>
            </div>
        
            <div v-if="step===2">
                <div class="form-item-title">
                    <span class="form-item-title-span">Cluster Method</span>
                </div>
                <div class="form-item-body">
                    <el-select v-model="select5" placeholder="select...">
                        <el-option value="K_MEANS" label="K-Means"></el-option>
                        <el-option value="DBSCAN" label="DBScan"></el-option>
                        <el-option value="OPTICS" label="Optics"></el-option>
                        <el-option value="SPECTRAL" label="Spectral"></el-option>
                        <el-option value="SOM" label="SOM"></el-option>
                        <el-option value="GTM" label="GTM"></el-option>
                        <el-option value="AP" label="Affinity Propagation"></el-option>
                        <el-option value="EMSEMBLE" label="Emsemble Cluster"></el-option>
                        <el-option value="FUZZY_SPACE" label="Fuzzy_Space"></el-option>
                        <el-option value="IMAGE_SEGMENTATION" label="Image_Segmentation"></el-option>
                    </el-select>

                </div>
                
                <div class="form-item-title" style="margin-top:40px;">
                    <span class="form-item-title-span">Dataset Range</span>
                </div>
                <div class="form-item-body">
                    <el-row style="width:100%">
                    <el-col style="width:25%">
                        <div style="width:100%;height:10px;"></div>
                    </el-col>
                    <el-col style="width:25%">
                        <span>From</span>
                    </el-col>
                    <el-col style="width:25%">
                        <span>To</span>
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
                        <input style="width:100px;" v-model="workZone.inlineFrom" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.inlineTo"/>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.inlineStep" />
                    </el-col>
                </el-row>
                 <el-row style="width:100%;margin-top:10px;">
                    <el-col style="width:25%">
                        <span>Crossline</span>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineFrom" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineTo" />
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineStep" />
                    </el-col>
                </el-row>
                </div>
                <div class="form-item-title" style="margin-top:40px;">
                    <span class="form-item-title-span">Output Range</span>
                </div>
                <div class="form-item-body">
                    <el-row style="width:100%">
                    <el-col style="width:25%">
                        <div style="width:100%;height:10px;"></div>
                    </el-col>
                    <el-col style="width:25%">
                        <span>From</span>
                    </el-col>
                    <el-col style="width:25%">
                        <span>To</span>
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
                        <input style="width:100px;" v-model="workZone.inlineFrom"/>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.inlineTo"/>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.inlineStep"/>
                    </el-col>
                </el-row>
                 <el-row style="width:100%;margin-top:10px;">
                    <el-col style="width:25%">
                        <span>Crossline</span>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineFrom"/>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineTo"/>
                    </el-col>
                    <el-col style="width:25%">
                        <input style="width:100px;" v-model="workZone.xlineStep"/>
                    </el-col>
                </el-row>
                </div>
                
                <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                <div style="margin-top:30px;">
                    <el-button  @click="()=>{()=>{this.$data.step=1;}}">back</el-button>
                    <el-button  @click="()=>{
                        this.$data.step=3;
                    }">Finish</el-button>
                    <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                </div>
                <div style="width:100%;height:50px;"></div>
            </div>

            <div v-if="step===3">
                <div v-if="select5==='K_MEANS'">
                    <div class="form-item-title">
                        <span class="form-item-title-span">Parameters</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:120px;">Cluster Number:</span>
                            <input v-model="K_MEANS.clusterNum" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Iterations:</span>
                            <input v-model="K_MEANS.iteration" style="width:100px;" />
                        </div>
                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <select multiple="multiple" style="width:240px;">
                            <option v-for="(item, index) in chosedFileList" :value="index" :key="index">{{item.realName}}</option>
                        </select>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateK">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>

                <div v-if="select5==='DBSCAN'">
                    <div class="form-item-title">
                        <span class="form-item-title-span">Parameters</span>
                    </div>
                    <div class="form-item-body">
                        <div>
                            <span style="display:inline-block;width:120px;">method:</span>
                            <el-select size="small" v-model="DBSCAN[0].value">
                                <el-option value="Fast DBSCAN"></el-option>
                                <el-option value="DBSCAN"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">minPts:</span>
                            <input v-model="DBSCAN[1].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">eps:</span>
                            <input v-model="DBSCAN[2].value" style="width:100px;" />
                        </div>
                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <select multiple="multiple" style="width:240px;">
                            <option v-for="(item, index) in chosedFileList" :value="index" :key="index">{{item.realName}}</option>
                        </select>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateDBSCAN">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>

                <div v-if="select5==='SPECTRAL'">
                    <div class="form-item-title">
                        <span class="form-item-title-span">Parameters</span>
                    </div>
                    <div class="form-item-body" style="font-size: 14px;">
                        <div>
                        <el-radio label="Sparse Matrix" v-model="Spectral[0].value">Sparse Matrix</el-radio>
                    </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">K Neighbors:</span>
                            <input style="width:100px;" v-model="Spectral[1].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Sigma:</span>
                            <input style="width:100px;" v-model="Spectral[2].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Block Num:</span>
                            <input style="width:100px;" v-model="Spectral[3].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Cluster Num:</span>
                            <input style="width:100px;" v-model="Spectral[4].value" />
                        </div>
                        <div style="margin-top: 20px;">
                            <el-radio label="Nystrom" v-model="Spectral[0].value">Nystrom</el-radio>
                            <el-checkbox value="orth" v-model="Spectral[5].value">orth</el-checkbox>
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Random Sample:</span>
                            <input style="width:100px;" v-model="Spectral[6].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Sigma:</span>
                            <input style="width:100px;" v-model="Spectral[7].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Block Num:</span>
                            <input style="width:100px;" v-model="Spectral[8].value" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Cluster Num:</span>
                            <input style="width:100px;" v-model="Spectral[9].value" />
                        </div>
                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <select multiple="multiple" style="width:240px;">
                            <option v-for="(item, index) in chosedFileList" :value="index" :key="index">{{item.realName}}</option>
                        </select>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateSpectral">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>

                <!--SOM-->
                <div v-if="select5==='SOM'">
                    <div class="form-item-title">
                        <span class="form-item-title-span">Parameters</span>
                    </div>
                    <div class="form-item-body">
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Cluster Number:</span>
                            <input v-model="SOM[0].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Iterators:</span>
                            <el-select size="small" v-model="SOM[1].value">
                                <el-option value="lininit"></el-option>
                                <el-option value="randinit"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Iterators:</span>
                            <el-select size="small" v-model="SOM[2].value">
                                <el-option value="gaussian"></el-option>
                                <el-option value="cutgauss"></el-option>
                                <el-option value="ep"></el-option>
                                <el-option value="bubble"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Iterators:</span>
                            <el-select size="small" v-model="SOM[3].value">
                                <el-option value="batch"></el-option>
                                <el-option value="seq"></el-option>
                            </el-select>
                        </div>

                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <select multiple="multiple" style="width:240px;">
                            <option v-for="(item, index) in chosedFileList" :value="index" :key="index">{{item.realName}}</option>
                        </select>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateSOM">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>

                <!--GTM-->
                <div v-if="select5==='GTM'">
                    <div class="form-item-title">
                        <span class="form-item-title-span">Parameters</span>
                    </div>
                    <div class="form-item-body">
                        <div style="margin-top:15px;">
                            <el-radio v-model="GTM[0].value" label="1D latent space">1D latent space</el-radio>
                            <input v-model="GTM[1].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <el-radio v-model="GTM[0].value" label="2D latent space">2D latent space</el-radio>
                            <el-select v-model="GTM[3].value" size="small">
                                <el-option value="4"></el-option>
                                <el-option value="9"></el-option>
                                <el-option value="16"></el-option>
                            </el-select>
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Sigma:</span>
                            <input v-model="GTM[4].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Lambda:</span>
                            <input v-model="GTM[5].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Iterations:</span>
                            <input v-model="GTM[6].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span style="display:inline-block;width:120px;">Basis Functions Num:</span>
                            <input v-model="GTM[7].value" style="width:100px;" />
                        </div>

                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <select multiple="multiple" style="width:240px;">
                            <option v-for="(item, index) in chosedFileList" :value="index" :key="index">{{item.realName}}</option>
                        </select>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateGTM">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>

                <!--AP-->
                <div v-if="select5==='AP'">
                    <div class="form-item-title">
                        <span class="form-item-title-span">Parameters</span>
                    </div>
                    <div class="form-item-body">
                        <div style="margin-top:15px;">
                            <el-radio v-model="AP[0].value" label="AP">AP</el-radio>
                            <span>K Neighbors</span>
                            <input v-model="AP[1].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <el-radio v-model="AP[0].value" label="APK">APK</el-radio>
                            <span>K Neighbors</span>
                            <input v-model="AP[3].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">

                            <span>Cluster Num</span>
                            <input v-model="AP[4].value" style="width:100px;" />
                        </div>
                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <select multiple="multiple" style="width:240px;">
                            <option v-for="(item, index) in chosedFileList" :value="index" :key="index">{{item.realName}}</option>
                        </select>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateAP">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>

                <!--ENSEMBLE-->
                <div v-if="select5==='ENSEMBLE'">
                    <div class="form-item-title">
                        <span class="form-item-title-span">Parameters</span>
                    </div>
                    <div class="form-item-body">

                        <div style="margin-top:15px;">
                            <span>Delta</span>
                            <input v-model="ensemble[0].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span>Clu-Iterations</span>
                            <input v-model="ensemble[1].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span>Cluster Num</span>
                            <input v-model="ensemble[2].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span>Distance</span>
                            <el-select size="small" v-model="ensemble[3].value">
                                <el-option value="sqEuclidean"></el-option>
                                <el-option value="city"></el-option>
                                <el-option value="cosine"></el-option>
                                <el-option value="correlation"></el-option>
                            </el-select>

                        </div>
                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <select multiple="multiple" style="width:240px;">
                            <option v-for="(item, index) in chosedFileList" :value="index" :key="index">{{item.realName}}</option>
                        </select>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateEnsemble">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>

                <!--FuzzySpace-->
                <div v-if="select5==='FUZZY_SPACE'">
                    <div class="form-item-title">
                        <span class="form-item-title-span">Parameters</span>
                    </div>
                    <div class="form-item-body">

                        <div style="margin-top:15px;">
                            <span>K Neighbors:</span>
                            <input v-model="fuzzySpace[0].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span>M Weight:</span>
                            <input v-model="fuzzySpace[1].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span>W Space Dimen:</span>
                            <input v-model="fuzzySpace[2].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span>Cluster Num:</span>
                            <input v-model="fuzzySpace[3].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span>p Weight:</span>
                            <input v-model="fuzzySpace[4].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span>Q Weight:</span>
                            <input v-model="fuzzySpace[5].value" style="width:100px;" />
                        </div>
                        <div style="margin-top:15px;">
                            <span>Cluster Iterations:</span>
                            <input v-model="fuzzySpace[6].value" style="width:100px;" />
                        </div>
                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <select multiple="multiple" style="width:240px;">
                            <option v-for="(item, index) in chosedFileList" :value="index" :key="index">{{item.realName}}</option>
                        </select>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateFuzzy">Run</el-button>
                        <el-button  @click="()=>{this.$router.push('/')}">Cancel</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>


                <!--ImageSegmentation-->
                <div v-if="select5==='IMAGE_SEGMENTATION'">
                    <div class="form-item-title">
                        <span class="form-item-title-span">Parameters</span>
                    </div>
                    <div class="form-item-body">

                        <div style="margin-top:15px;">
                            <span>Cluster Num</span>
                            <input v-model="imageSegmentation[0].value" style="width:100px;" />
                        </div>

                    </div>

                    <div class="form-item-title" style="margin-top:45px;">
                        <span class="form-item-title-span">Selected Attributes</span>
                    </div>
                    <div class="form-item-body">
                        <select multiple="multiple" style="width:240px;">
                            <option v-for="(item, index) in chosedFileList" :value="index" :key="index">{{item.realName}}</option>
                        </select>
                    </div>


                    <div style="margin-top:30px;height:1px;width:90%;background-color:#ddd"></div>
                    <div style="margin-top:30px;">
                        <el-button  @click="startCalculateImage">Run</el-button>
                        <el-button>Cancel</el-button>
                    </div>
                    <div style="width:100%;height:50px;"></div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "NewProject",

        data(){
            const generateData = _ => {
            const data = [];
            window.console.log(_);
            
                data.push({
                    key: 1000,
                    label: 'SRC_dn_rms_poststackamplitude',
                    disabled: false
                });
                
                return data;
            };
            return{
                loading1: false,
                chooseFloat:'IBM',
                checkInvalid:true,
                select1:'0',
                select2:'0',
                select3:'0',
                select4:'0',
                select5:'K_MEANS',
                tableData: generateData(),
                value: [],
                step:1,

                downloadFileList:[],
                chosedFileList:[],
                workZone:{
                    id:'',
                    inlineFrom:0,
                    inlineTo:0,
                    inlineStep:0,
                    xlineFrom:0,
                    xlineTo:0,
                    xlineStep:0,
                    timeFrom:0,
                    timeStep:0,
                },
                imageSegmentation:[
                    {
                        name: 'Cluster Num',
                        value: ''
                    }
                ],
                fuzzySpace:[
                    {
                        name: 'K Neighbors',
                        value: ''
                    },
                    {
                        name: 'M Weight',
                        value: ''
                    },
                    {
                        name: 'W Space Dimen',
                        value: ''
                    },
                    {
                        name: 'Cluster Num',
                        value: ''
                    },
                    {
                        name: 'p Weight',
                        value: ''
                    },
                    {
                        name: 'Q Weight',
                        value: ''
                    },
                    {
                        name: 'Cluster Iterations',
                        valuea: ''
                    }
                ],
                ensemble:[
                    {
                        name: 'delta',
                        value:''
                    },
                    {
                        name: 'Clu-Iterations',
                        value:''
                    },
                    {
                        name: 'Cluster Num',
                        value:''
                    },{
                        name: 'Distance',
                        value:''
                    },

                ],
                AP:[
                    {
                        name:'AP',
                        value:''
                    },
                    {
                        name:'K Neighbors',
                        value:''
                    },
                    {
                        name:'APK',
                        value:''
                    },
                    {
                        name:'K Neighbors',
                        value:''
                    },
                    {
                        name: 'Clutser Num',
                        value:''
                    }
                ],
                GTM:[
                    {
                        name: '1D latent space',
                        value:''
                    },
                    {
                        name: '1D latent space',
                        value:''
                    },
                    {
                        name: '2D latent space',
                        value:''
                    },
                    {
                        name: '2D latent space',
                        value:''
                    },
                    {
                        name: 'Sigma',
                        value:''
                    },
                    {
                        name: 'Lambda',
                        value:''
                    },
                    {
                        name: 'Iterations',
                        value:''
                    },
                    {
                        name: 'Basis Functions Num',
                        value:''
                    }
                ],
                SOM:[
                    {
                        name:'Cluster Number',
                        value: ''
                    },
                    {
                        name:'Iterations',
                        value: ''
                    },
                    {
                        name:'Iterations',
                        value: ''
                    },
                    {
                        name:'Iterations',
                        value: ''
                    }
                ],
                Spectral:[
                    {
                        name:'Sparse Matrix',
                        value: ''
                    },
                    {
                        name:'K Neighbors',
                        value: ''
                    },
                    {
                        name:'Block Num',
                        value: ''
                    },
                    {
                        name:'Cluster Num',
                        value: ''
                    },
                    {
                        name:'orth',
                        value: ''
                    },
                    {
                        name:'Random Sample',
                        value: ''
                    },
                    {
                        name:'Sigma',
                        value: ''
                    },
                    {
                        name:'Cluster Number',
                        value: ''
                    }
                ],
                DBSCAN:[
                    {
                        name:'method',
                        value:''
                    },
                    {
                        name:'minPts',
                        value:''
                    },
                    {
                        name:'eps',
                        value:''
                    }
                ],
                K_MEANS:{
                    iteration:'',
                    clusterNum:''
                },
                transformId:''
                    
                

            }
        },
        mounted(){
            window.console.log(this.$route.query);
            if(this.$route.query.label){
                if(this.$route.query.label === 5){
                    this.step=2;
                    // this.$data.files.push(this.$route.query.fileId);
                    this.chosedFileList.push({
                        id: this.$route.query.id,
                        realName: 'ExtrationResult'
                    });
                }
            }
            this.workZone = this.$Global.projectDetails.workZone;
            //获取文件列表
            let _this = this;
            this.$axios({
                method:'get',
                url: this.$Global.server_config.url+'/downloadFile/fileList?userId='+this.$Global.server_config.userId,

            }).then((response)=>{
                _this.downloadFileList = response.data;
                for(let index = 0; index < _this.downloadFileList.length; index++){
                    _this.tableData.push({
                        key: index,
                        label: _this.downloadFileList[index].realName,
                        disabled: false
                    });
                }

            });
        },
        methods:{
            startCalculateImage(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.imageSegmentation
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateFuzzy(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.fuzzySpace
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateEnsemble(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.ensemble
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateAP(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.AP
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateGTM(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.GTM
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateSOM(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.SOM
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateSpectral(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.Spectral
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateDBSCAN(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileId:files,
                        parameters: this.DBSCAN
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            startCalculateK(){
                let _this = this;
                let files = [];
                for(let index = 0; index < this.chosedFileList.length; index++){
                    files.push(this.chosedFileList[index].id);
                }
                this.loading1 = true;
                this.$axios({
                    method:'post',
                    url:'/datamining',
                    data:{
                        dataMiningMethod: this.select5,
                        // workZone: this.workZone,
                        subProjectId: this.$Global.projectDetails.subProjectList[1].id,
                        fileIdList:files,
                        parameters: this.K_MEANS
                    }
                }).then((response)=>{
                    window.console.log(response);
                    _this.$router.push('/');
                    _this.$message({
                        type:'success',
                        message:'run successful'
                    });
                })
            },
            changeChoose(current, direction, keys){
                window.console.log(current);
                window.console.log(direction);
                window.console.log(keys);
                let temp = [];
                for(let index = 0;index < current.length; index++){
                    temp.push(this.downloadFileList[current[index]])
                }
                this.chosedFileList = temp;
                window.console.log(this.chosedFileList);

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