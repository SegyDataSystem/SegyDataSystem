import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from "../components/HelloWorld";
import NewProject from "../components/import/NewProject";
import WellData from "../components/import/WellData.vue"
import HorizonData from "../components/import/HorizonData.vue";
import ExportData from "../components/import/ExportData";
import ExportHorizonData from "../components/import/ExportHorizonData";
import CalculateAttributes from "../components/algorithm/CalculateAttributes";
import Standardization from '../components/algorithm/Standardization';
import StandardizationResult from '../components/algorithm/StandardizationResult';
import LabelPrepare from '../components/algorithm/LabelPrepare';
import Cluster from '../components/algorithm/Cluster';
import FeatureSelection from '../components/algorithm/FeatureSelection';
import FeatureExtraction from '../components/algorithm/FeatureExtraction';
import Classification from '../components/algorithm/Classification';
import LoadColormap from '../components/algorithm/LoadColormap';
import DatavalueDistribute from '../components/algorithm/DatavalueDistribute';
import FileManage from '../components/FileManage/FileManage';
import IntervalData from '../components/import/IntervalData';
import AutoSelectLabel from '../components/algorithm/AutoSelectLabel';
import ClusterImage from '../components/algorithm/ClusterImage';
import LabelMerger from '../components/algorithm/LabelMerger';
import SegyDataImage from '../components/algorithm/SegyDataImage';
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
