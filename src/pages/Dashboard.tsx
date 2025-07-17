
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { TodayTasks } from '@/components/TodayTasks';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';
import { HistoryAnalysis } from '@/components/HistoryAnalysis';
import { useState } from 'react';

const Dashboard = () => {
  const { department } = useParams();
  const [activeTab, setActiveTab] = useState('today');

  // Department configuration
  const getDepartmentConfig = (dept: string) => {
    switch (dept) {
      case 'dept1':
      case 'dept2':
        return {
          name: dept === 'dept1' ? '一区' : '二区',
          type: 'medical-telemarketing',
          kpis: [
            { name: '30S有效外呼', target: 40, unit: '个/天' },
            { name: '60S/接通率', target: 0.65, unit: '' },
            { name: '10分钟时长', target: 100, unit: '分钟' }
          ]
        };
      case 'dept3':
        return {
          name: '三区',
          type: 'wechat-marketing',
          kpis: [
            { name: '微信深聊(3+5条)', target: 25, unit: '个/天' },
            { name: '微信深聊+1分钟电话', target: 20, unit: '个/天' },
            { name: '新增微信好友数', target: 15, unit: '个/天' }
          ]
        };
      case 'resource':
        return {
          name: '资源拓展部',
          type: 'resource-expansion',
          kpis: [
            { name: '新增KP', target: 4, unit: '个/天' },
            { name: '30S有效外呼', target: 40, unit: '个/天' },
            { name: '业绩达标降标', condition: '月业绩≥5万', reducedTarget: 18 }
          ]
        };
      default:
        return {
          name: '未知部门',
          type: 'unknown',
          kpis: []
        };
    }
  };

  const deptConfig = getDepartmentConfig(department || '');

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return <TodayTasks department={deptConfig} />;
      case 'performance':
        return <PerformanceMetrics department={deptConfig} />;
      case 'history':
        return <HistoryAnalysis department={deptConfig} />;
      default:
        return <TodayTasks department={deptConfig} />;
    }
  };

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      departmentName={deptConfig.name}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
