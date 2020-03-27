import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from "../components/HelloWorld";
import NewProject from "../components/NewProject";
import WellData from "../components/WellData.vue"
import HorizonData from "../components/HorizonData.vue";
import ExportData from "../components/ExportData";
import ExportHorizonData from "../components/ExportHorizonData";
import CalculateAttributes from "../components/CalculateAttributes";
import Standardization from '../components/Standardization';
import StandardizationResult from '../components/StandardizationResult';
import LabelPrepare from '../components/LabelPrepare';
import Cluster from '../components/Cluster';
import FeatureSelection from '../components/FeatureSelection';
import FeatureExtraction from '../components/FeatureExtraction';
import Classification from '../components/Classification';
import LoadColormap from '../components/LoadColormap';
import DatavalueDistribute from '../components/DatavalueDistribute';
import FileManage from '../components/FileManage/FileManage';
import IntervalData from '../components/IntervalData';
import AutoSelectLabel from '../components/AutoSelectLabel';
import ClusterImage from '../components/ClusterImage';
import LabelMerger from '../components/LabelMerger';
import SegyDataImage from '../components/SegyDataImage';
import test from '../components/test.vue';

Vue.use(Router);

export default new Router({
        routes: [
            { path: '/', component: HelloWorld },
            { path: '/NewProject', component: NewProject},
            { path: '/HorizonData', component: HorizonData},
            { path: '/WellData', component: WellData},
            { path: '/ExportData', component: ExportData},
            { path: '/ExportHorizonData', component: ExportHorizonData},
            { path: "/CalculateAttributes", component: CalculateAttributes},
            { path: '/Standardization', component: Standardization},
            { path: '/Result', component: StandardizationResult},
            { path: '/LabelPrepare', component:LabelPrepare},
            { path: '/Cluster', component: Cluster},
            { path: '/FeatureSelection', component: FeatureSelection},
            { path: '/FeatureExtraction', component: FeatureExtraction},
            { path: '/Classification', component: Classification},
            { path: '/LoadColormap', component:LoadColormap},
            { path: '/DatavalueDistribute', component:DatavalueDistribute},
            {
                path: '/FileManage',
                component: FileManage
            },
            {
                path: '/IntervalData',
                component: IntervalData
            },
            {
                path: '/AutoSelectLabel',
                component: AutoSelectLabel
            },
            {
                path: '/ClusterImage',
                component: ClusterImage
            },
            {
                path: '/LabelMerger',
                component: LabelMerger
            },
            {
                path: '/test',
                component: test
            },
            {
                path: '/SegyDataImage',
                component: SegyDataImage
            }
        ],
        
    }
)
