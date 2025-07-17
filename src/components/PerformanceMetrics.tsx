import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, Calendar, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer, PieChart, Cell, Pie, Area, AreaChart } from 'recharts';

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
          completion: 80,
          metrics: [
            { name: '30S有效外呼', target: 40, actual: 32, completion: 80, trend: 'up' },
            { name: '接通率', target: 65, actual: 68, completion: 105, trend: 'up' },
            { name: '10分钟时长', target: 100, actual: 75, completion: 75, trend: 'down' }
          ],
          hourlyData: [
            { hour: '09:00', value: 5, target: 5 },
            { hour: '10:00', value: 12, target: 10 },
            { hour: '11:00', value: 18, target: 15 },
            { hour: '12:00', value: 22, target: 20 },
            { hour: '14:00', value: 27, target: 25 },
            { hour: '15:00', value: 32, target: 30 },
            { hour: '16:00', value: 35, target: 35 },
            { hour: '17:00', value: 38, target: 40 }
          ]
        },
        weekly: {
          target: 200,
          current: 168,
          completion: 84,
          weeklyData: [
            { day: '周一', target: 40, actual: 35 },
            { day: '周二', target: 40, actual: 38 },
            { day: '周三', target: 40, actual: 32 },
            { day: '周四', target: 40, actual: 34 },
            { day: '周五', target: 40, actual: 29 }
          ]
        },
        monthly: {
          target: 800,
          current: 545,
          completion: 68,
          monthlyData: [
            { week: '第1周', target: 200, actual: 175 },
            { week: '第2周', target: 200, actual: 168 },
            { week: '第3周', target: 200, actual: 142 },
            { week: '第4周', target: 200, actual: 60 }
          ]
        }
      };
    } else if (department.type === 'wechat-marketing') {
      return {
        daily: {
          target: 25,
          current: 18,
          completion: 72,
          metrics: [
            { name: '微信深聊', target: 25, actual: 18, completion: 72, trend: 'up' },
            { name: '深聊+电话', target: 20, actual: 12, completion: 60, trend: 'down' },
            { name: '新增好友', target: 15, actual: 8, completion: 53, trend: 'down' }
          ],
          hourlyData: [
            { hour: '09:00', value: 2, target: 3 },
            { hour: '10:00', value: 5, target: 6 },
            { hour: '11:00', value: 8, target: 9 },
            { hour: '12:00', value: 10, target: 12 },
            { hour: '14:00', value: 13, target: 15 },
            { hour: '15:00', value: 16, target: 18 },
            { hour: '16:00', value: 18, target: 21 },
            { hour: '17:00', value: 20, target: 25 }
          ]
        },
        weekly: {
          target: 125,
          current: 95,
          completion: 76,
          weeklyData: [
            { day: '周一', target: 25, actual: 22 },
            { day: '周二', target: 25, actual: 19 },
            { day: '周三', target: 25, actual: 18 },
            { day: '周四', target: 25, actual: 20 },
            { day: '周五', target: 25, actual: 16 }
          ]
        },
        monthly: {
          target: 500,
          current: 356,
          completion: 71,
          monthlyData: [
            { week: '第1周', target: 125, actual: 110 },
            { week: '第2周', target: 125, actual: 95 },
            { week: '第3周', target: 125, actual: 89 },
            { week: '第4周', target: 125, actual: 62 }
          ]
        }
      };
    } else {
      return {
        daily: {
          target: 4,
          current: 2,
          completion: 50,
          metrics: [
            { name: '新增KP', target: 4, actual: 2, completion: 50, trend: 'up' },
            { name: '30S有效外呼', target: 40, actual: 28, completion: 70, trend: 'up' },
            { name: '接通率', target: 40, actual: 40, completion: 100, trend: 'up' }
          ],
          hourlyData: [
            { hour: '09:00', value: 0, target: 0.5 },
            { hour: '10:00', value: 0, target: 1 },
            { hour: '11:00', value: 1, target: 1.5 },
            { hour: '12:00', value: 1, target: 2 },
            { hour: '14:00', value: 2, target: 2.5 },
            { hour: '15:00', value: 2, target: 3 },
            { hour: '16:00', value: 2, target: 3.5 },
            { hour: '17:00', value: 2, target: 4 }
          ]
        },
        weekly: {
          target: 20,
          current: 12,
          completion: 60,
          weeklyData: [
            { day: '周一', target: 4, actual: 3 },
            { day: '周二', target: 4, actual: 2 },
            { day: '周三', target: 4, actual: 2 },
            { day: '周四', target: 4, actual: 3 },
            { day: '周五', target: 4, actual: 2 }
          ]
        },
        monthly: {
          target: 80,
          current: 48,
          completion: 60,
          monthlyData: [
            { week: '第1周', target: 20, actual: 15 },
            { week: '第2周', target: 20, actual: 12 },
            { week: '第3周', target: 20, actual: 11 },
            { week: '第4周', target: 20, actual: 10 }
          ]
        }
      };
    }
  };

  const kpiData = getKpiData();
  const currentData = kpiData[selectedPeriod as keyof typeof kpiData];

  const getStatusColor = (completion: number) => {
    if (completion >= 100) return 'text-green-600';
    if (completion >= 80) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusBg = (completion: number) => {
    if (completion >= 100) return 'bg-green-50 border-green-200';
    if (completion >= 80) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  const pieData = [
    { name: '已完成', value: currentData.current, color: '#10b981' },
    { name: '未完成', value: Math.max(0, currentData.target - currentData.current), color: '#e5e7eb' }
  ];

  return (
    <div className="space-y-6 p-6 bg-background">
      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className={`${getStatusBg(currentData.completion)} border-2`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">今日完成度</CardTitle>
                <div className="flex items-center space-x-1">
                  {currentData.completion >= 80 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <Badge variant={currentData.completion >= 100 ? 'default' : 'secondary'}>
                    {currentData.completion}%
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-baseline space-x-2">
                  <span className={`text-3xl font-bold ${getStatusColor(currentData.completion)}`}>
                    {currentData.current}
                  </span>
                  <span className="text-muted-foreground">/ {currentData.target}</span>
                </div>
                <Progress value={currentData.completion} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  还需 {Math.max(0, currentData.target - currentData.current)} 个完成目标
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <PieChartIcon className="w-5 h-5 mr-2 text-blue-600" />
                完成分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={50}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-muted-foreground mt-2">
                完成率 {currentData.completion}%
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-600" />
                效率指标
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">平均效率</span>
                  <span className="font-medium">{Math.round(currentData.completion)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">预计完成时间</span>
                  <span className="font-medium">
                    {currentData.completion >= 100 ? '已完成' : '18:30'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">排名</span>
                  <Badge variant="outline">Top 3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 详细指标表格 */}
      {kpiData.daily.metrics && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              关键指标详情
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-muted-foreground">指标名称</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">目标</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">实际</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">完成率</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">趋势</th>
                  </tr>
                </thead>
                <tbody>
                  {kpiData.daily.metrics.map((metric, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium">{metric.name}</td>
                      <td className="p-3 text-center">{metric.target}</td>
                      <td className="p-3 text-center font-medium">{metric.actual}</td>
                      <td className="p-3 text-center">
                        <Badge 
                          variant={metric.completion >= 100 ? 'default' : metric.completion >= 80 ? 'secondary' : 'destructive'}
                        >
                          {metric.completion}%
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600 mx-auto" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 时间趋势图表 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
            实时进度趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpiData.daily.hourlyData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#colorActual)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 时间维度切换 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-orange-600" />
            多维度分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">今日</TabsTrigger>
              <TabsTrigger value="weekly">本周</TabsTrigger>
              <TabsTrigger value="monthly">本月</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weekly" className="mt-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={kpiData.weekly.weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Bar dataKey="target" fill="#e5e7eb" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="actual" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kpiData.monthly.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
