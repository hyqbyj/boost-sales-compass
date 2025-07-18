
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Phone, 
  MessageCircle, 
  Target,
  Calendar,
  Award,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface PerformanceMetricsProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const PerformanceMetrics = ({ department }: PerformanceMetricsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data for charts
  const trendData = [
    { time: '09:00', calls: 8, efficiency: 65, target: 10 },
    { time: '10:00', calls: 12, efficiency: 75, target: 15 },
    { time: '11:00', calls: 15, efficiency: 82, target: 18 },
    { time: '12:00', calls: 10, efficiency: 68, target: 12 },
    { time: '13:00', calls: 8, efficiency: 60, target: 10 },
    { time: '14:00', calls: 18, efficiency: 88, target: 20 },
    { time: '15:00', calls: 22, efficiency: 92, target: 25 }
  ];

  const performanceDistribution = [
    { name: '优秀(70-89%)', value: 45, color: '#22c55e' },
    { name: '良好(90%+)', value: 15, color: '#3b82f6' },
    { name: '一般(50-69%)', value: 30, color: '#f59e0b' },
    { name: '待改进(<50%)', value: 10, color: '#ef4444' }
  ];

  const kpiData = [
    {
      name: '今日业绩',
      current: 32,
      target: 40,
      unit: '个',
      change: '+12%',
      trend: 'up',
      description: 'vs 上周 35'
    },
    {
      name: '本周业绩',
      current: 168,
      target: 200,
      unit: '个',
      change: '+8%',
      trend: 'up',
      description: 'vs 上周 178'
    },
    {
      name: '本月业绩',
      current: 545,
      target: 800,
      unit: '个',
      change: '-3%',
      trend: 'down',
      description: 'vs 上月 720'
    },
    {
      name: '效率分析',
      current: 4.2,
      target: 5.0,
      unit: 'min',
      change: '+2.5%',
      trend: 'up',
      description: '平均通话时长'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header with department info - removed report controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">业绩数据分析</h2>
          <p className="text-gray-600">实时监控业绩表现，洞察数据趋势</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {kpi.name}
                  </CardTitle>
                  <Badge
                    variant={kpi.trend === 'up' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {kpi.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {kpi.current}
                    </span>
                    <span className="text-lg text-gray-500">/{kpi.target}</span>
                    <span className="text-sm text-gray-500">{kpi.unit}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>达成率</span>
                      <span>{Math.round((kpi.current / kpi.target) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(kpi.current / kpi.target) * 100} 
                      className="h-2" 
                    />
                  </div>
                  <p className="text-xs text-gray-500">{kpi.description}</p>
                </div>
              </CardContent>
              <div
                className={`absolute top-0 right-0 w-1 h-full ${
                  kpi.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Historical Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LineChart className="w-5 h-5 text-blue-600" />
              <span>历史对比趋势</span>
            </CardTitle>
            <CardDescription>
              当日与历史同期业绩对比分析
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                calls: {
                  label: "实际业绩",
                  color: "hsl(var(--chart-1))",
                },
                target: {
                  label: "目标业绩",
                  color: "hsl(var(--chart-2))",
                },
                efficiency: {
                  label: "效率指标",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#888888"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#888888"
                    fontSize={12}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar 
                    dataKey="calls" 
                    fill="var(--color-calls)"
                    name="实际业绩"
                    radius={[2, 2, 0, 0]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="var(--color-target)"
                    strokeWidth={2}
                    name="目标业绩"
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="var(--color-efficiency)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="效率指标"
                    dot={{ r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Performance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-blue-600" />
              <span>业绩分布情况</span>
            </CardTitle>
            <CardDescription>
              各绩效区间人员分布
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={performanceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {performanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {performanceDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Detail Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>KPI详细分析</span>
          </CardTitle>
          <CardDescription>
            各项关键指标的详细数据与成功情况
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {department.kpis?.map((kpi, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{kpi.name}</span>
                    <Badge variant="outline" className="text-xs">
                      目标: {kpi.target}{kpi.unit}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">32/{kpi.target}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({Math.round((32 / kpi.target) * 100)}%)
                    </span>
                  </div>
                </div>
                <Progress value={(32 / kpi.target) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
