<template>
    <div id="SegyDataImage" v-loading="isLoading">
        <el-dialog :visible.sync="deleteDialog" title="Display Slices Management">
            <div>
               <el-table :data="displayAllData" style="width:80%;margin-left:auto;margin-right:auto;">
                   <el-table-column
                    prop="change"
                    label="Type"
                    >
                   </el-table-column>
                   <el-table-column
                    prop="value"
                    label="Value"
                    >
                   </el-table-column>
                   <el-table-column
                    
                    >
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="deleteRow(scope.$index)">Delete</el-button>
                    </template>
                   </el-table-column>
               </el-table>
            </div>
            <div style="margin-top:20px;">
                <el-button type="primary" size="small" @click="deleteDraw()">Confirm</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="idialog" title="choose a inline slice ">
            <div>
                <span>inline range:</span>
                <el-slider v-model="inlineValue" :min="workzone.inlineFrom" :max="workzone.inlineTo" show-input></el-slider>
            </div>
            <div>
                <el-button type="primary" size="small" @click="getDrawData('iline')">Confirm</el-button>
            </div>
        </el-dialog>
        
        <el-dialog :visible.sync="xdialog" title="choose a crossline slice ">
            <div>
                <span>crossline range:</span>
                <el-slider v-model="xlineValue"  :min="workzone.xlineFrom" :max="workzone.xlineTo" show-input=""></el-slider>
            </div>
            <div>
                <el-button type="primary" size="small" @click="getDrawData('xline')">Confirm</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="tdialog" title="choose a time slice ">
            <div>
                <span>time range:</span>
                <el-slider v-model="timeValue" :step="timeStep" :min="workzone.timeFrom" :max="workzone.timeTo" show-input=""></el-slider>
            </div>
            <div>
                <el-button type="primary" size="small" @click="getDrawData('depth')">Confirm</el-button>
            </div>
        </el-dialog>
        <div>
            <el-menu  class="el-menu-demo" mode="horizontal"  >
                <el-submenu index="0">
                    <template slot="title">Add Data Slice Image</template>
                    <el-menu-item @click="()=>{this.$data.idialog=true;}">Inline</el-menu-item>
                    <el-menu-item @click="()=>{this.$data.xdialog=true;}">Crossline</el-menu-item>
                    <el-menu-item @click="()=>{this.$data.tdialog=true;}">Depth</el-menu-item>

                </el-submenu>
                <el-menu-item @click="()=>{this.$data.deleteDialog=true;}">Display Slices Management</el-menu-item>
            </el-menu>
        </div>
        <div class="image-panel">
            <div class="image" id="myChartHot" ></div>
            <!-- <img :src="imagePath" class="image" @mousemove="touchstart" @mousedown="mousedown" /> -->
            
            <div style="width:100%;height:50px;"></div>


        </div>
    </div>
</template>
<script>
export default {
    name:'',
    data(){
        return{
            displayAllData:[],
            timeStep:'',
            inlineValue:'',
            xlineValue:'',
            timeValue:'',
            idialog:false,
            deleteDialog: false,
            xdialog:false,
            tdialog:false,
            isLoading:false,
            workzone:this.$Global.projectDetails.workZone,
            useData:[],
            data:[],
            choosedColors:0,
            displayData:[],

            colors:[
                ['#313695', '#4575b4', '#abd9e9', '#ffffbf', '#fdae61', '#f46d43',  '#a50026'],
                ['#313695', '#74add1', '#e0f3f8', '#fee090', '#d73027'],
                ['#FFB6C1', '#6495ED', '#00FF00', '#FFD700', '#FF6347']

            ]
        }
    },
    mounted(){
        this.timeStep = this.$Global.projectDetails.workZone.timeStep;
        let myChartHot = this.$echarts.init(document.getElementById('myChartHot'));
        let workzone = this.$Global.projectDetails.workZone;
        let option = {
                visualMap: {
                    show: false,
                    min: -150,
                    max: 150,
                    inRange: {
                        symbolSize: [0.1, 12],
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
                        colorAlpha: [0.2, 1]
                    }
                },
                xAxis3D: {
                    name:'inline',
                    type: 'value',
                    min: workzone.inlineFrom,
                    max: workzone.inlineTo
                },
                yAxis3D: {
                    name:'crossline',
                    type: 'value',
                    min: workzone.xlineFrom,
                    max: workzone.xlineTo
                },
                zAxis3D: {
                    name:'timestep',
                    type: 'value',
                    min: workzone.timeFrom,
                    max: workzone.timeTo
                },
                grid3D: {
                    axisLine: {
                        lineStyle: { color: '#fff' }
                    },
                    axisPointer: {
                        lineStyle: { color: '#fff' }
                    },
                    viewControl: {
                        // autoRotate: true
                    }
                },
                series: [{
                    type: 'scatter3D',
                    data: []
                }]
            }

                myChartHot.setOption(option);

    },
    methods:{
        deleteRow(index){
            this.$data.displayAllData.splice(index, 1);
        },
        changeDraw(change){
            let myChartHot = this.$echarts.init(document.getElementById('myChartHot'));
            let data = this.$data.useData;
            let totalNum = this.$data.displayData.length;
            let xlimit = totalNum;
            let ylimit = this.$data.displayData[0].length;
            let workzone = this.$Global.projectDetails.workZone;
            let xdata=[],ydata=[],zdata=[];
            for(let i = workzone.inlineFrom; i < workzone.inlineTo; i+=workzone.inlineStep){
                xdata.push(i);
            }

            for(let i = workzone.xlineFrom; i < workzone.xlineTo; i += workzone.xlineStep){
                ydata.push(i);
            }
            for(let i = workzone.timeFrom; i < workzone.timeTo; i+=workzone.timeStep){
                zdata.push(i);
            }
            if(change==='xline'){
                for(let x = 0; x < xlimit/4; x++){
                    for(let y = 0; y < ylimit/4; y++){
                        data.push([x*4+parseInt(workzone.inlineFrom), this.$data.xlineValue, y*4*parseInt(workzone.timeStep)+parseInt(workzone.timeFrom), (this.$data.displayData[x*4][y*4]*1.0)/10000000]);
                    }
                }
                
            }else if(change==='iline'){
                for(let x = 0; x < xlimit/4; x++){
                    for(let y = 0; y < ylimit/4; y++){
                        data.push([this.$data.inlineValue, x*4+parseInt(workzone.xlineFrom), y*4*parseInt(workzone.timeStep)+parseInt(workzone.timeFrom), (this.$data.displayData[x*4][y*4]*1.0)/10000000]);
                    }
                }
                    
            }else{
                for(let x = 0; x < xlimit/4; x++){
                    for(let y = 0; y < ylimit/4; y++){
                        data.push([x*4+parseInt(workzone.inlineFrom), y*4+parseInt(workzone.xlineFrom), this.$data.timeValue, (this.$data.displayData[x*4][y*4]*1.0)/10000000]);
                    }
                }
                    
                    
            }

            this.$data.useData = data;
            

                let option = {
                visualMap: {
                    show: true,
                    min: -150,
                    max: 150,
                    inRange: {
                        symbolSize: [0.1, 12],
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
                        colorAlpha: [0.2, 1]
                    }
                },
                xAxis3D: {
                    name:'inline',
                    type: 'value',
                    min: workzone.inlineFrom,
                    max: workzone.inlineTo
                },
                yAxis3D: {
                    name:'crossline',
                    type: 'value',
                    min: workzone.xlineFrom,
                    max: workzone.xlineTo
                },
                zAxis3D: {
                    name:'timestep',
                    type: 'value',
                    min: workzone.timeFrom,
                    max: workzone.timeTo
                },
                grid3D: {
                    axisLine: {
                        lineStyle: { color: '#fff' }
                    },
                    axisPointer: {
                        lineStyle: { color: '#fff' }
                    },
                    viewControl: {
                        // autoRotate: true
                    }
                },
                series: [{
                    type: 'scatter3D',
                    data: data
                }]
            }

                myChartHot.setOption(option);
        },
        deleteDraw(){
            this.deleteDialog = false;
            let myChartHot = this.$echarts.init(document.getElementById('myChartHot'));

            let data = [];
           
            let workzone = this.$Global.projectDetails.workZone;
            let xdata=[],ydata=[],zdata=[];
            for(let i = workzone.inlineFrom; i < workzone.inlineTo; i+=workzone.inlineStep){
                xdata.push(i);
            }
            for(let i = workzone.xlineFrom; i < workzone.xlineTo; i += workzone.xlineStep){
                ydata.push(i);
            }
            for(let i = workzone.timeFrom; i < workzone.timeTo; i+=workzone.timeStep){
                zdata.push(i);
            }
            let allData = this.displayAllData;
            for(let index = 0; index < allData.length; index++){
                let totalNum = this.$data.displayAllData[index].displayData.length;
                let xlimit = totalNum;
                let ylimit = this.$data.displayData[0].length;
                let change = allData[index].change;
                if(change==='xline'){
                    for(let x = 0; x < xlimit/4; x++){
                        for(let y = 0; y < ylimit/4; y++){
                            data.push([x*4+parseInt(workzone.inlineFrom), this.$data.xlineValue, y*4*parseInt(workzone.timeStep)+parseInt(workzone.timeFrom), (allData[index].displayData[x*4][y*4]*1.0)/10000000]);
                        }
                    }
                    
                }else if(change==='iline'){
                    for(let x = 0; x < xlimit/4; x++){
                        for(let y = 0; y < ylimit/4; y++){
                            data.push([this.$data.inlineValue, x*4+parseInt(workzone.xlineFrom), y*4*parseInt(workzone.timeStep)+parseInt(workzone.timeFrom), (allData[index].displayData[x*4][y*4]*1.0)/10000000]);
                        }
                    }
                        
                }else{
                    for(let x = 0; x < xlimit/4; x++){
                        for(let y = 0; y < ylimit/4; y++){
                            data.push([x*4+parseInt(workzone.inlineFrom), y*4+parseInt(workzone.xlineFrom), this.$data.timeValue, (allData[index].displayData[x*4][y*4]*1.0)/10000000]);
                        }
                    }
                }
            }

            this.$data.useData = data;
            

                let option = {
                visualMap: {
                    show: true,
                    min: -150,
                    max: 150,
                    inRange: {
                        symbolSize: [0.1, 12],
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
                        colorAlpha: [0.2, 1]
                    }
                },
                xAxis3D: {
                    name:'inline',
                    type: 'value',
                    min: workzone.inlineFrom,
                    max: workzone.inlineTo
                },
                yAxis3D: {
                    name:'crossline',
                    type: 'value',
                    min: workzone.xlineFrom,
                    max: workzone.xlineTo
                },
                zAxis3D: {
                    name:'timestep',
                    type: 'value',
                    min: workzone.timeFrom,
                    max: workzone.timeTo
                },
                grid3D: {
                    axisLine: {
                        lineStyle: { color: '#fff' }
                    },
                    axisPointer: {
                        lineStyle: { color: '#fff' }
                    },
                    viewControl: {
                        // autoRotate: true
                    }
                },
                series: [{
                    type: 'scatter3D',
                    data: data
                }]
            }

                myChartHot.setOption(option);
        },
        getDrawData(change){
                window.console.log(change);
                this.$data.tdialog=false;
                
                this.isLoading = true;
                // let change = this.$data.cho;
                let _this = this;
                if(change==='depth'){
                    let value = (this.$data.timeValue-this.$data.workzone.timeFrom)/this.workzone.timeStep;
                    this.$axios({
                        method:'get',
                        url:'/segy/'+change+'/'+value,
                        params:{
                            fileId: this.$Global.projectDetails.subProjectList[0].file.id
                        }
                    }).then((response)=>{
                        _this.$data.displayData = response.data.data;
                        _this.$data.displayAllData.push({
                            change: 'depth',
                            value: this.timeValue,
                            displayData: response.data.data
                        })
                        window.console.log(response.data);
                        _this.changeDraw(change);
                        //  window.console.log(response);
                        _this.isLoading = false;
                    }).catch((err)=>{
                        _this.isLoading = false;
                        window.console.log(err);
                    })
                
                }else if(change==='xline'){
                    let value = this.$data.xlineValue
                    this.$data.xdialog=false;
                    this.$axios({
                        method:'get',
                        url:'/segy/'+change+'/'+value,
                        params:{
                            fileId: this.$Global.projectDetails.subProjectList[0].file.id
                        }
                    }).then((response)=>{
                        _this.$data.displayData = response.data.data;
                        window.console.log(response.data);
                        _this.$data.displayAllData.push({
                            change: 'xline',
                            value: this.xlineValue,
                            displayData: response.data.data
                        })
                        _this.changeDraw(change);
                        //  window.console.log(response);
                        _this.isLoading = false;
                    }).catch((err)=>{
                        _this.isLoading = false;
                        window.console.log(err);
                    })
                    
                }else{
                    let value = this.$data.inlineValue;
                    this.$data.idialog=false;
                    this.$axios({
                        method:'get',
                        url:'/segy/'+change+'/'+ value,
                        params:{
                            fileId: this.$Global.projectDetails.subProjectList[0].file.id
                        }
                    }).then((response)=>{
                        _this.$data.displayData = response.data.data;
                        window.console.log(response.data);
                        _this.$data.displayAllData.push({
                            change: 'iline',
                            value: this.inlineValue,
                            displayData: response.data.data
                        })
                        _this.changeDraw(change);
                        //  window.console.log(response);
                        _this.isLoading = false;
                    }).catch((err)=>{
                        _this.isLoading = false;
                        window.console.log(err);
                    })
                    
                }

            },
    }
}
</script>
<style scoped>
.input-use{
    width: 150px;
    margin-left: 13px;
}

.image-panel{
    width: 100%;
    background-color: black;
    /* margin-left:auto;
    margin-right:auto; */
}


.image{
    width:70%;
    margin-left:auto;
    margin-right:auto;
    height:600px;
    background: black;
    /* background-image: url('../assets/back.jpg'); */
    /* background-size: cover; */
    /* background-color:red;  */
    /* margin-left:200px; */
    /* margin-right:auto; */
    margin-top:30px;
}
</style>