import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ComposedChart, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Target, Award, Calendar, Clock, Phone, MessageCircle, Users, CheckCircle, AlertCircle, ArrowUpCircle, ArrowDownCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface PerformanceMetricsProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const PerformanceMetrics = ({ department }: PerformanceMetricsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('本月');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // 模拟数据 - 可以根据 department.type 从 API 获取实际数据
  const getKPIData = () => {
    switch (department.type) {
      case 'medical-telemarketing':
        return [
          { name: '30S有效外呼', current: 32, target: 40, completion: 80, trend: 12 },
          { name: '60S/接通率', current: 0.65, target: 0.65, completion: 100, trend: 5 },
          { name: '10分钟时长', current: 85, target: 100, completion: 85, trend: -8 }
        ];
      case 'wechat-marketing':
        return [
          { name: '微信深聊(3+5条)', current: 18, target: 25, completion: 72, trend: -15 },
          { name: '微信深聊+1分钟电话', current: 16, target: 20, completion: 80, trend: 8 },
          { name: '新增微信好友数', current: 12, target: 15, completion: 80, trend: 20 }
        ];
      case 'resource-expansion':
        return [
          { name: '新增KP', current: 3, target: 4, completion: 75, trend: -10 },
          { name: '30S有效外呼', current: 35, target: 40, completion: 87.5, trend: 15 },
          { name: '业绩达标降标', current: 1, target: 1, completion: 100, trend: 0 }
        ];
      default:
        return [];
    }
  };

  const dailyTrendData = [
    { date: '1日', calls: 35, wechat: 18, target: 40 },
    { date: '2日', calls: 42, wechat: 22, target: 40 },
    { date: '3日', calls: 38, wechat: 20, target: 40 },
    { date: '4日', calls: 45, wechat: 25, target: 40 },
    { date: '5日', calls: 32, wechat: 15, target: 40 },
    { date: '6日', calls: 48, wechat: 28, target: 40 },
    { date: '7日', calls: 41, wechat: 21, target: 40 }
  ];

  const performanceDistribution = [
    { name: '优秀(90%+)', value: 15, color: 'hsl(var(--chart-success))' },
    { name: '良好(80-90%)', value: 30, color: 'hsl(var(--chart-primary))' },
    { name: '一般(70-80%)', value: 35, color: 'hsl(var(--chart-warning))' },
    { name: '待提升(<70%)', value: 20, color: 'hsl(var(--chart-danger))' }
  ];

  const hourlyData = [
    { time: '09:00', efficiency: 78, calls: 12 },
    { time: '10:00', efficiency: 85, calls: 15 },
    { time: '11:00', efficiency: 82, calls: 14 },
    { time: '14:00', efficiency: 88, calls: 18 },
    { time: '15:00', efficiency: 91, calls: 20 },
    { time: '16:00', efficiency: 87, calls: 16 },
    { time: '17:00', efficiency: 83, calls: 13 }
  ];

  const kpiData = getKPIData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* 页面头部统计 */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5"></div>
            <CardContent className="p-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">完成率</p>
                    <p className="text-2xl font-bold text-gray-900">85.2%</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  ↑ 2.1%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5"></div>
            <CardContent className="p-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">排名</p>
                    <p className="text-2xl font-bold text-gray-900">3/25</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  ↑ 2名
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5"></div>
            <CardContent className="p-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">增长率</p>
                    <p className="text-2xl font-bold text-gray-900">+15.3%</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  持续增长
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5"></div>
            <CardContent className="p-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">团队平均</p>
                    <p className="text-2xl font-bold text-gray-900">78.4%</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  超平均
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* KPI 指标完成情况 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>KPI指标完成情况</span>
              </CardTitle>
              <CardDescription>
                {department.name} - {selectedPeriod}各项指标完成度分析
              </CardDescription>
            </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="本月">本月</SelectItem>
                <SelectItem value="本季度">本季度</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {kpiData.map((kpi, index) => (
              <motion.div
                key={kpi.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{kpi.name}</span>
                    <Badge 
                      variant={kpi.completion >= 100 ? 'default' : kpi.completion >= 80 ? 'secondary' : 'destructive'}
                      className={
                        kpi.completion >= 100 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : kpi.completion >= 80 
                          ? 'bg-blue-100 text-blue-800 border-blue-200' 
                          : 'bg-red-100 text-red-800 border-red-200'
                      }
                    >
                      {kpi.completion}%
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {typeof kpi.current === 'number' && kpi.current < 1 
                        ? `${(kpi.current * 100).toFixed(1)}%` 
                        : kpi.current
                      } / {typeof kpi.target === 'number' && kpi.target < 1 
                        ? `${(kpi.target * 100).toFixed(1)}%` 
                        : kpi.target
                      }
                    </span>
                    <div className={`flex items-center space-x-1 ${kpi.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.trend >= 0 ? (
                        <ArrowUpCircle className="w-4 h-4" />
                      ) : (
                        <ArrowDownCircle className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">{Math.abs(kpi.trend)}%</span>
                    </div>
                  </div>
                </div>
                <Progress 
                  value={kpi.completion} 
                  className="h-2"
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 图表区域 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 每日趋势图 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>每日业绩趋势</span>
            </CardTitle>
            <CardDescription>近7日工作量和目标对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dailyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="calls" fill="hsl(var(--chart-primary))" name="外呼量" radius={[4, 4, 0, 0]} />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="hsl(var(--chart-danger))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="目标线"
                    dot={{ fill: 'hsl(var(--chart-danger))', strokeWidth: 2, r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 业绩分布 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span>团队业绩分布</span>
            </CardTitle>
            <CardDescription>各业绩等级人员占比情况</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {performanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '占比']}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {performanceDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 时段效率分析 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>时段效率分析</span>
            </CardTitle>
            <CardDescription>不同时段的工作效率和外呼量对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar yAxisId="right" dataKey="calls" fill="hsl(var(--chart-secondary))" name="外呼量" radius={[4, 4, 0, 0]} />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="hsl(var(--chart-primary))" 
                    strokeWidth={3}
                    name="效率%"
                    dot={{ fill: 'hsl(var(--chart-primary))', strokeWidth: 2, r: 5 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 综合评分 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <span>综合能力评分</span>
            </CardTitle>
            <CardDescription>各项能力维度的综合评估</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: '沟通能力', score: 85, color: 'hsl(var(--chart-primary))' },
                { name: '客户关系', score: 90, color: 'hsl(var(--chart-success))' },
                { name: '成交能力', score: 68, color: 'hsl(var(--chart-warning))' },
                { name: '产品知识', score: 78, color: 'hsl(var(--chart-info))' },
                { name: '时间管理', score: 82, color: 'hsl(var(--chart-secondary))' }
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900">{skill.score}</span>
                      <Badge 
                        variant={skill.score >= 85 ? 'default' : skill.score >= 75 ? 'secondary' : 'destructive'}
                        className={
                          skill.score >= 85 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : skill.score >= 75 
                            ? 'bg-blue-100 text-blue-800 border-blue-200' 
                            : 'bg-orange-100 text-orange-800 border-orange-200'
                        }
                      >
                        {skill.score >= 85 ? '优秀' : skill.score >= 75 ? '良好' : '待提升'}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
