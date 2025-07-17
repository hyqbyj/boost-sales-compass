
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart3, TrendingUp, TrendingDown, Target, Calendar, Clock, Phone, MessageCircle, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PerformanceMetricsProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const PerformanceMetrics = ({ department }: PerformanceMetricsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // 图表配置
  const chartConfig = {
    target: {
      label: "目标",
      color: "hsl(var(--primary))",
    },
    actual: {
      label: "实际",
      color: "hsl(var(--chart-2))",
    },
    completed: {
      label: "已完成",
      color: "hsl(var(--chart-1))",
    },
    remaining: {
      label: "剩余",
      color: "hsl(var(--chart-3))",
    }
  };

  // 根据部门类型生成对应的KPI数据和图表数据
  const getKpiData = () => {
    if (department.type === 'medical-telemarketing') {
      return {
        daily: {
          target: 40,
          current: 32,
          chartData: [
            { name: '外呼总数', target: 200, actual: 156, completion: 78 },
            { name: '接通数', target: 80, actual: 68, completion: 85 },
            { name: '30S有效外呼', target: 40, actual: 32, completion: 80 },
            { name: '60S有效外呼', target: 25, actual: 18, completion: 72 },
            { name: '10分钟有效外呼', target: 5, actual: 3, completion: 60 }
          ],
          trendData: [
            { time: '9:00', value: 8 },
            { time: '10:00', value: 15 },
            { time: '11:00', value: 22 },
            { time: '12:00', value: 26 },
            { time: '14:00', value: 29 },
            { time: '15:00', value: 32 },
          ],
          pieData: [
            { name: '已完成', value: 32, color: '#10b981' },
            { name: '剩余', value: 8, color: '#e5e7eb' }
          ]
        },
        weekly: {
          target: 200,
          current: 168,
          completion: 84,
          chartData: [
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
          completion: 68.1,
          chartData: [
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
          chartData: [
            { name: '微信深聊(3+5条)', target: 25, actual: 18, completion: 72 },
            { name: '微信深聊+1分钟电话', target: 20, actual: 12, completion: 60 },
            { name: '新增微信好友数', target: 15, actual: 8, completion: 53 },
            { name: '触达数量', target: 250, actual: 185, completion: 74 },
            { name: '朋友圈互动', target: 80, actual: 57, completion: 71 }
          ],
          trendData: [
            { time: '9:00', value: 3 },
            { time: '10:00', value: 6 },
            { time: '11:00', value: 9 },
            { time: '12:00', value: 12 },
            { time: '14:00', value: 15 },
            { time: '15:00', value: 18 },
          ],
          pieData: [
            { name: '已完成', value: 18, color: '#10b981' },
            { name: '剩余', value: 7, color: '#e5e7eb' }
          ]
        },
        weekly: {
          target: 125,
          current: 95,
          completion: 76,
          chartData: [
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
          completion: 71.2,
          chartData: [
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
          chartData: [
            { name: '新增KP', target: 4, actual: 2, completion: 50 },
            { name: '30S有效外呼', target: 40, actual: 28, completion: 70 },
            { name: '外呼总数', target: 180, actual: 145, completion: 81 },
            { name: '接通数', target: 72, actual: 58, completion: 81 },
            { name: '接通率', target: 40, actual: 40, completion: 100 }
          ],
          trendData: [
            { time: '9:00', value: 0 },
            { time: '10:00', value: 0 },
            { time: '11:00', value: 1 },
            { time: '12:00', value: 1 },
            { time: '14:00', value: 2 },
            { time: '15:00', value: 2 },
          ],
          pieData: [
            { name: '已完成', value: 2, color: '#10b981' },
            { name: '剩余', value: 2, color: '#e5e7eb' }
          ]
        },
        weekly: {
          target: 20,
          current: 12,
          completion: 60,
          chartData: [
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
          chartData: [
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
              <div className="space-y-4">
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
                {/* 今日进度饼图 */}
                <div className="h-32">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={kpiData.daily.pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          dataKey="value"
                        >
                          {kpiData.daily.pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
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
              <div className="space-y-4">
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
                {/* 本周每日对比柱状图 */}
                <div className="h-32">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={kpiData.weekly.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" fontSize={10} />
                        <YAxis fontSize={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="target" fill="var(--color-target)" opacity={0.5} />
                        <Bar dataKey="actual" fill="var(--color-actual)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
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
              <div className="space-y-4">
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
                {/* 本月每周趋势线图 */}
                <div className="h-32">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={kpiData.monthly.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" fontSize={10} />
                        <YAxis fontSize={10} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="target" 
                          stroke="var(--color-target)" 
                          strokeDasharray="5 5"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="var(--color-actual)" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <p className="text-sm text-gray-600">
                  月完成率 {kpiData.monthly.completion}%
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 今日业绩趋势图 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>今日业绩趋势</span>
          </CardTitle>
          <CardDescription>
            实时监控今日各时段的业绩完成情况
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpiData.daily.trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--color-actual)" 
                    strokeWidth={3}
                    dot={{ fill: 'var(--color-actual)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* 详细指标对比图 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>关键指标完成情况</span>
          </CardTitle>
          <CardDescription>
            {department.name}部门今日各项KPI指标的目标与实际完成对比
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kpiData.daily.chartData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="target" fill="var(--color-target)" opacity={0.5} />
                  <Bar dataKey="actual" fill="var(--color-actual)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
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
                <div className="h-48">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={kpiData.weekly.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="target" fill="var(--color-target)" opacity={0.5} />
                        <Bar dataKey="actual" fill="var(--color-actual)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="month" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">月度完成趋势</h4>
                    <div className="h-48">
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={kpiData.monthly.chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line 
                              type="monotone" 
                              dataKey="target" 
                              stroke="var(--color-target)" 
                              strokeDasharray="5 5"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="actual" 
                              stroke="var(--color-actual)" 
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
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
