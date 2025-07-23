
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
  LineChart,
  Quote
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
  BarChart
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
      description: 'vs 昨天 35'
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

  // Process indicators with comparison data
  const processIndicators = [
    { name: '外呼', current: 45, target: 50, unit: '个', topPerformer: 65 },
    { name: '外呼时长', current: 120, target: 150, unit: '分钟', topPerformer: 180 },
    { name: '接通数', current: 28, target: 35, unit: '个', topPerformer: 42 },
    { name: '接通率', current: 62, target: 70, unit: '%', topPerformer: 85 },
    { name: '30S有效外呼', current: 32, target: 40, unit: '个', topPerformer: 48 },
    { name: '60S有效外呼', current: 25, target: 30, unit: '个', topPerformer: 38 },
    { name: '60S时长', current: 85, target: 100, unit: '分钟', topPerformer: 125 },
    { name: '60S/接通率', current: 89, target: 85, unit: '%', topPerformer: 95 },
    { name: '3分钟有效外呼', current: 18, target: 20, unit: '个', topPerformer: 25 },
    { name: '10分钟有效外呼', current: 12, target: 15, unit: '个', topPerformer: 22 },
    { name: '10分钟时长', current: 180, target: 200, unit: '分钟', topPerformer: 280 },
    { name: '每日触达新客户', current: 15, target: 20, unit: '个', topPerformer: 28 }
  ];

  // Assessment indicators
  const assessmentIndicators = [
    { name: '30S有效外呼达标', current: 32, target: 40, unit: '个/天', standard: '合格标准', topPerformer: 48 }
  ];

  // 每日毛选语录
  const dailyQuotes = [
    {
      quote: "只有战略的持久战，才是争取最后胜利的唯一途径。",
      author: "毛泽东",
      date: "今日"
    }
  ];

  // 生成单个指标的柱状图数据
  const generateChartData = (indicator: any) => {
    return [
      {
        category: '本人',
        value: indicator.current,
        fill: '#3b82f6'
      },
      {
        category: '部门最优',
        value: indicator.topPerformer,
        fill: '#10b981'
      }
    ];
  };

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

      {/* 每日毛选语录 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Quote className="w-5 h-5 text-blue-600" />
            <span>每日毛选语录</span>
          </CardTitle>
          <CardDescription>
            来自毛选的精神指导
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyQuotes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg"
              >
                <p className="text-gray-800 font-medium mb-2">"{item.quote}"</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>— {item.author}</span>
                  <span>{item.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
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
            个人表现与部门最优员工的对比分析
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {processIndicators.map((indicator, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{indicator.name}</span>
                      <Badge variant="outline" className="text-xs">
                        目标: {indicator.target}{indicator.unit}
                      </Badge>
                    </div>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={generateChartData(indicator)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>本人: {indicator.current}{indicator.unit}</span>
                      <span>部门最优: {indicator.topPerformer}{indicator.unit}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      超越最优还需: {indicator.topPerformer - indicator.current > 0 ? indicator.topPerformer - indicator.current : 0}{indicator.unit}
                    </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assessmentIndicators.map((indicator, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{indicator.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {indicator.standard}: {indicator.target}{indicator.unit}
                      </Badge>
                    </div>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={generateChartData(indicator)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="category" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>本人: {indicator.current}{indicator.unit}</span>
                      <span>部门最优: {indicator.topPerformer}{indicator.unit}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      超越最优还需: {indicator.topPerformer - indicator.current > 0 ? indicator.topPerformer - indicator.current : 0}{indicator.unit}
                    </div>
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
