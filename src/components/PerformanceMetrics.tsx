
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
  ResponsiveContainer
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

  // Updated mock data for monthly trends (1-12月)
  const trendData = [
    { month: '1月', calls: 32, efficiency: 65, target: 40 },
    { month: '2月', calls: 38, efficiency: 72, target: 43 },
    { month: '3月', calls: 45, efficiency: 78, target: 43 },
    { month: '4月', calls: 42, efficiency: 75, target: 45 },
    { month: '5月', calls: 39, efficiency: 70, target: 45 },
    { month: '6月', calls: 48, efficiency: 85, target: 50 },
    { month: '7月', calls: 52, efficiency: 88, target: 55 },
    { month: '8月', calls: 47, efficiency: 82, target: 50 },
    { month: '9月', calls: 44, efficiency: 76, target: 50 },
    { month: '10月', calls: 49, efficiency: 86, target: 55 },
    { month: '11月', calls: 53, efficiency: 90, target: 55 },
    { month: '12月', calls: 50, efficiency: 87, target: 55 }
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
  ];

  // Process indicators
  const processIndicators = [
    { name: '外呼', current: 45, target: 50, unit: '个' },
    { name: '外呼时长', current: 120, target: 150, unit: '分钟' },
    { name: '接通数', current: 28, target: 35, unit: '个' },
    { name: '接通率', current: 62, target: 70, unit: '%' },
    { name: '30S有效外呼', current: 32, target: 40, unit: '个' },
    { name: '60S有效外呼', current: 25, target: 30, unit: '个' },
    { name: '60S时长', current: 85, target: 100, unit: '分钟' },
    { name: '60S/接通率', current: 89, target: 85, unit: '%' },
    { name: '3分钟有效外呼', current: 18, target: 20, unit: '个' },
    { name: '10分钟有效外呼', current: 12, target: 15, unit: '个' },
    { name: '10分钟时长', current: 180, target: 200, unit: '分钟' }
  ];

  // Assessment indicators
  const assessmentIndicators = [
    { name: '30S有效外呼达标', current: 32, target: 40, unit: '个/天', standard: '合格标准' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">业绩数据分析</h2>
          <p className="text-gray-600">实时监控业绩表现，洞察数据趋势</p>
        </div>
      </div>

      {/* KPI Cards - 居中排布，增大宽度 */}
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-8 max-w-6xl w-full">
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
      </div>

      {/* Historical Trend - Full Width */}
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
        <CardContent className="p-6">
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
            className="w-full h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
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
          <div className="space-y-8">
            {/* Process Indicators */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>过程指标</span>
              </h3>
              <div className="space-y-4">
                {processIndicators.map((indicator, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{indicator.name}</span>
                        <Badge variant="outline" className="text-xs">
                          目标: {indicator.target}{indicator.unit}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold">{indicator.current}/{indicator.target}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({Math.round((indicator.current / indicator.target) * 100)}%)
                        </span>
                      </div>
                    </div>
                    <Progress value={(indicator.current / indicator.target) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Indicators */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Award className="w-5 h-5 text-green-600" />
                <span>考核指标</span>
              </h3>
              <div className="space-y-4">
                {assessmentIndicators.map((indicator, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{indicator.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {indicator.standard}: {indicator.target}{indicator.unit}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold">{indicator.current}/{indicator.target}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({Math.round((indicator.current / indicator.target) * 100)}%)
                        </span>
                      </div>
                    </div>
                    <Progress value={(indicator.current / indicator.target) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
