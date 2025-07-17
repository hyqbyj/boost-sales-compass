
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, TrendingDown, Target, Calendar, Clock, Phone, MessageCircle, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface PerformanceMetricsProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const PerformanceMetrics = ({ department }: PerformanceMetricsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // 根据部门类型生成对应的KPI数据
  const getKpiData = () => {
    if (department.type === 'medical-telemarketing') {
      return {
        daily: {
          target: 40,
          current: 32,
          metrics: [
            { name: '外呼总数', current: 156, target: 200, unit: '个', trend: 8.5 },
            { name: '外呼时长', current: 285, target: 400, unit: '分钟', trend: 12.3 },
            { name: '接通数', current: 68, target: 80, unit: '个', trend: -2.1 },
            { name: '接通率', current: 43.6, target: 40, unit: '%', trend: 5.2 },
            { name: '30S有效外呼', current: 32, target: 40, unit: '个', trend: -12.5 },
            { name: '60S有效外呼', current: 18, target: 25, unit: '个', trend: -18.2 },
            { name: '60S时长', current: 124, target: 180, unit: '分钟', trend: -15.6 },
            { name: '60S/接通率', current: 26.5, target: 30, unit: '%', trend: -8.9 },
            { name: '3分钟有效外呼', current: 8, target: 12, unit: '个', trend: -22.1 },
            { name: '10分钟有效外呼', current: 3, target: 5, unit: '个', trend: -15.4 },
            { name: '10分钟时长', current: 45, target: 60, unit: '分钟', trend: -18.7 }
          ]
        },
        weekly: {
          target: 200,
          current: 168,
          completion: 84
        },
        monthly: {
          target: 800,
          current: 545,
          completion: 68.1
        }
      };
    } else if (department.type === 'wechat-marketing') {
      return {
        daily: {
          target: 25,
          current: 18,
          metrics: [
            { name: '微信深聊+1分钟电话', current: 12, target: 20, unit: '个', trend: -15.2 },
            { name: '微信好友总数', current: 1248, target: 1500, unit: '个', trend: 3.8 },
            { name: '触达数量', current: 185, target: 250, unit: '个', trend: -8.5 },
            { name: '触达/总数', current: 14.8, target: 16.7, unit: '%', trend: -12.1 },
            { name: '微信深聊(3+5条)', current: 18, target: 25, unit: '个', trend: -18.9 },
            { name: '深聊/沟通数', current: 9.7, target: 12, unit: '%', trend: -15.6 },
            { name: '新增微信好友数', current: 8, target: 15, unit: '个', trend: -22.3 },
            { name: '朋友圈数', current: 3, target: 5, unit: '个', trend: -12.5 },
            { name: '朋友圈评论数', current: 12, target: 20, unit: '个', trend: -18.2 },
            { name: '朋友圈点赞数', current: 45, target: 60, unit: '个', trend: -8.9 }
          ]
        },
        weekly: {
          target: 125,
          current: 95,
          completion: 76
        },
        monthly: {
          target: 500,
          current: 356,
          completion: 71.2
        }
      };
    } else {
      return {
        daily: {
          target: 4,
          current: 2,
          metrics: [
            { name: '新增KP', current: 2, target: 4, unit: '个', trend: -25.8 },
            { name: '30S有效外呼', current: 28, target: 40, unit: '个', trend: -15.2 },
            { name: '外呼总数', current: 145, target: 180, unit: '个', trend: -8.5 },
            { name: '接通数', current: 58, target: 72, unit: '个', trend: -12.1 },
            { name: '接通率', current: 40, target: 40, unit: '%', trend: 2.5 }
          ]
        },
        weekly: {
          target: 20,
          current: 12,
          completion: 60
        },
        monthly: {
          target: 80,
          current: 48,
          completion: 60
        }
      };
    }
  };

  const kpiData = getKpiData();

  const getStatusColor = (current: number, target: number) => {
    const ratio = current / target;
    if (ratio >= 1) return 'text-green-600';
    if (ratio >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (current: number, target: number) => {
    const ratio = current / target;
    if (ratio >= 1) return <Badge className="bg-green-100 text-green-800">已达标</Badge>;
    if (ratio >= 0.8) return <Badge className="bg-yellow-100 text-yellow-800">接近达标</Badge>;
    return <Badge className="bg-red-100 text-red-800">待提升</Badge>;
  };

  const getProgressColor = (current: number, target: number) => {
    const ratio = current / target;
    if (ratio >= 1) return 'bg-green-500';
    if (ratio >= 0.8) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* 整体业绩概览 */}
      <div className="grid grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>今日业绩</span>
                </span>
                {getStatusBadge(kpiData.daily.current, kpiData.daily.target)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-end space-x-2">
                  <span className={`text-3xl font-bold ${getStatusColor(kpiData.daily.current, kpiData.daily.target)}`}>
                    {kpiData.daily.current}
                  </span>
                  <span className="text-gray-500">/ {kpiData.daily.target}</span>
                </div>
                <Progress 
                  value={(kpiData.daily.current / kpiData.daily.target) * 100} 
                  className="h-2"
                />
                <p className="text-sm text-gray-600">
                  还需完成 {Math.max(0, kpiData.daily.target - kpiData.daily.current)} 个达到日标准
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span>本周业绩</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-end space-x-2">
                  <span className={`text-3xl font-bold ${getStatusColor(kpiData.weekly.current, kpiData.weekly.target)}`}>
                    {kpiData.weekly.current}
                  </span>
                  <span className="text-gray-500">/ {kpiData.weekly.target}</span>
                </div>
                <Progress 
                  value={kpiData.weekly.completion} 
                  className="h-2"
                />
                <p className="text-sm text-gray-600">
                  周完成率 {kpiData.weekly.completion}%
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>本月业绩</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-end space-x-2">
                  <span className={`text-3xl font-bold ${getStatusColor(kpiData.monthly.current, kpiData.monthly.target)}`}>
                    {kpiData.monthly.current}
                  </span>
                  <span className="text-gray-500">/ {kpiData.monthly.target}</span>
                </div>
                <Progress 
                  value={kpiData.monthly.completion} 
                  className="h-2"
                />
                <p className="text-sm text-gray-600">
                  月完成率 {kpiData.monthly.completion}%
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 详细指标看板 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>详细业绩指标</span>
          </CardTitle>
          <CardDescription>
            {department.name}部门关键绩效指标实时监控与分析
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {kpiData.daily.metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{metric.name}</h4>
                  <div className="flex items-center space-x-1">
                    {metric.trend > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-xs ${metric.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.trend > 0 ? '+' : ''}{metric.trend}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-end space-x-2">
                  <span className={`text-2xl font-bold ${getStatusColor(metric.current, metric.target)}`}>
                    {metric.current}
                  </span>
                  <span className="text-gray-500 text-sm">
                    / {metric.target} {metric.unit}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Progress 
                    value={(metric.current / metric.target) * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>完成率: {Math.round((metric.current / metric.target) * 100)}%</span>
                    <span>
                      差距: {metric.current >= metric.target ? 
                        `超额${metric.current - metric.target}${metric.unit}` : 
                        `还需${metric.target - metric.current}${metric.unit}`
                      }
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 时间维度分析 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-green-600" />
            <span>时间维度分析</span>
          </CardTitle>
          <CardDescription>
            不同时间维度的业绩完成情况和趋势分析
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">今日分析</TabsTrigger>
              <TabsTrigger value="week">本周分析</TabsTrigger>
              <TabsTrigger value="month">本月分析</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="space-y-4 mt-6">
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-blue-700">上午完成</p>
                        <p className="text-lg font-bold text-blue-900">
                          {Math.round(kpiData.daily.current * 0.4)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-green-700">下午完成</p>
                        <p className="text-lg font-bold text-green-900">
                          {Math.round(kpiData.daily.current * 0.6)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="text-sm text-yellow-700">剩余目标</p>
                        <p className="text-lg font-bold text-yellow-900">
                          {Math.max(0, kpiData.daily.target - kpiData.daily.current)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="week" className="space-y-4 mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">本周每日完成情况</h4>
                <div className="grid grid-cols-7 gap-2">
                  {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, index) => (
                    <div key={day} className="text-center">
                      <div className="text-xs text-gray-600 mb-1">{day}</div>
                      <div className={`h-12 rounded flex items-center justify-center text-sm font-medium ${
                        index < 5 ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index < 5 ? Math.round(kpiData.weekly.current / 5) : '-'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="month" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">月度完成趋势</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>第一周</span>
                        <span className="font-medium">{Math.round(kpiData.monthly.current * 0.3)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>第二周</span>
                        <span className="font-medium">{Math.round(kpiData.monthly.current * 0.25)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>第三周</span>
                        <span className="font-medium">{Math.round(kpiData.monthly.current * 0.25)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>第四周</span>
                        <span className="font-medium">{Math.round(kpiData.monthly.current * 0.2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">达标预测</h4>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600">
                        按当前进度预测月底完成率
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(kpiData.monthly.completion * 1.1)}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {kpiData.monthly.completion >= 100 ? 
                          '预计将超额完成月度目标' : 
                          '需要加快进度以达成月度目标'
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};
