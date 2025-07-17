
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  Clock, 
  Phone, 
  MessageCircle, 
  Users, 
  Award,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart
} from 'recharts';

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
      color: "hsl(var(--muted))",
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // 根据部门类型生成对应的KPI数据
  const getKpiData = () => {
    if (department.type === 'medical-telemarketing') {
      return {
        today: {
          target: 40,
          current: 32,
          completion: 80,
          trend: '+12%',
          trendUp: true
        },
        weekly: {
          target: 200,
          current: 168,
          completion: 84,
          trend: '+8%',
          trendUp: true
        },
        monthly: {
          target: 800,
          current: 545,
          completion: 68.1,
          trend: '-3%',
          trendUp: false
        },
        kpiDetails: [
          { name: '30S有效外呼', target: 40, actual: 32, completion: 80, unit: '个' },
          { name: '60S/接通率', target: 65, actual: 52, completion: 80, unit: '%' },
          { name: '10分钟时长', target: 100, actual: 75, completion: 75, unit: '分钟' },
          { name: '外呼总数', target: 200, actual: 156, completion: 78, unit: '个' },
          { name: '接通数', target: 80, actual: 68, completion: 85, unit: '个' }
        ],
        trendData: [
          { time: '09:00', value: 8, target: 10 },
          { time: '10:00', value: 15, target: 18 },
          { time: '11:00', value: 22, target: 25 },
          { time: '12:00', value: 26, target: 30 },
          { time: '14:00', value: 29, target: 35 },
          { time: '15:00', value: 32, target: 40 },
        ],
        weeklyData: [
          { day: '周一', target: 40, actual: 35 },
          { day: '周二', target: 40, actual: 38 },
          { day: '周三', target: 40, actual: 32 },
          { day: '周四', target: 40, actual: 34 },
          { day: '周五', target: 40, actual: 29 }
        ]
      };
    } else if (department.type === 'wechat-marketing') {
      return {
        today: {
          target: 25,
          current: 18,
          completion: 72,
          trend: '+5%',
          trendUp: true
        },
        weekly: {
          target: 125,
          current: 95,
          completion: 76,
          trend: '+12%',
          trendUp: true
        },
        monthly: {
          target: 500,
          current: 356,
          completion: 71.2,
          trend: '-2%',
          trendUp: false
        },
        kpiDetails: [
          { name: '微信深聊(3+5条)', target: 25, actual: 18, completion: 72, unit: '个' },
          { name: '微信深聊+1分钟电话', target: 20, actual: 12, completion: 60, unit: '个' },
          { name: '新增微信好友数', target: 15, actual: 8, completion: 53, unit: '个' },
          { name: '触达数量', target: 250, actual: 185, completion: 74, unit: '个' },
          { name: '朋友圈互动', target: 80, actual: 57, completion: 71, unit: '个' }
        ],
        trendData: [
          { time: '09:00', value: 3, target: 6 },
          { time: '10:00', value: 6, target: 10 },
          { time: '11:00', value: 9, target: 13 },
          { time: '12:00', value: 12, target: 16 },
          { time: '14:00', value: 15, target: 20 },
          { time: '15:00', value: 18, target: 25 },
        ],
        weeklyData: [
          { day: '周一', target: 25, actual: 22 },
          { day: '周二', target: 25, actual: 19 },
          { day: '周三', target: 25, actual: 18 },
          { day: '周四', target: 25, actual: 20 },
          { day: '周五', target: 25, actual: 16 }
        ]
      };
    } else {
      return {
        today: {
          target: 4,
          current: 2,
          completion: 50,
          trend: '-10%',
          trendUp: false
        },
        weekly: {
          target: 20,
          current: 12,
          completion: 60,
          trend: '+5%',
          trendUp: true
        },
        monthly: {
          target: 80,
          current: 48,
          completion: 60,
          trend: '+8%',
          trendUp: true
        },
        kpiDetails: [
          { name: '新增KP', target: 4, actual: 2, completion: 50, unit: '个' },
          { name: '30S有效外呼', target: 40, actual: 28, completion: 70, unit: '个' },
          { name: '外呼总数', target: 180, actual: 145, completion: 81, unit: '个' },
          { name: '接通数', target: 72, actual: 58, completion: 81, unit: '个' },
          { name: '接通率', target: 40, actual: 40, completion: 100, unit: '%' }
        ],
        trendData: [
          { time: '09:00', value: 0, target: 1 },
          { time: '10:00', value: 0, target: 1 },
          { time: '11:00', value: 1, target: 2 },
          { time: '12:00', value: 1, target: 2 },
          { time: '14:00', value: 2, target: 3 },
          { time: '15:00', value: 2, target: 4 },
        ],
        weeklyData: [
          { day: '周一', target: 4, actual: 3 },
          { day: '周二', target: 4, actual: 2 },
          { day: '周三', target: 4, actual: 2 },
          { day: '周四', target: 4, actual: 3 },
          { day: '周五', target: 4, actual: 2 }
        ]
      };
    }
  };

  const kpiData = getKpiData();

  const getStatusColor = (completion: number) => {
    if (completion >= 90) return 'text-green-600';
    if (completion >= 70) return 'text-blue-600';
    if (completion >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (completion: number) => {
    if (completion >= 90) return <Badge className="bg-green-100 text-green-800 border-green-200">优秀</Badge>;
    if (completion >= 70) return <Badge className="bg-blue-100 text-blue-800 border-blue-200">良好</Badge>;
    if (completion >= 50) return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">待提升</Badge>;
    return <Badge className="bg-red-100 text-red-800 border-red-200">需改进</Badge>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">今日业绩</span>
                </div>
                {getStatusBadge(kpiData.today.completion)}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-2xl font-bold ${getStatusColor(kpiData.today.completion)}`}>
                      {kpiData.today.current}
                    </span>
                    <span className="text-sm text-gray-500">/ {kpiData.today.target}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${kpiData.today.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {kpiData.today.trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    <span className="text-sm font-medium">{kpiData.today.trend}</span>
                  </div>
                </div>
                <Progress value={kpiData.today.completion} className="h-2" />
                <p className="text-xs text-gray-500">
                  完成率 {kpiData.today.completion}%
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
          <Card className="relative overflow-hidden border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">本周业绩</span>
                </div>
                {getStatusBadge(kpiData.weekly.completion)}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-2xl font-bold ${getStatusColor(kpiData.weekly.completion)}`}>
                      {kpiData.weekly.current}
                    </span>
                    <span className="text-sm text-gray-500">/ {kpiData.weekly.target}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${kpiData.weekly.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {kpiData.weekly.trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    <span className="text-sm font-medium">{kpiData.weekly.trend}</span>
                  </div>
                </div>
                <Progress value={kpiData.weekly.completion} className="h-2" />
                <p className="text-xs text-gray-500">
                  完成率 {kpiData.weekly.completion}%
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
          <Card className="relative overflow-hidden border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-600">本月业绩</span>
                </div>
                {getStatusBadge(kpiData.monthly.completion)}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className={`text-2xl font-bold ${getStatusColor(kpiData.monthly.completion)}`}>
                      {kpiData.monthly.current}
                    </span>
                    <span className="text-sm text-gray-500">/ {kpiData.monthly.target}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${kpiData.monthly.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {kpiData.monthly.trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    <span className="text-sm font-medium">{kpiData.monthly.trend}</span>
                  </div>
                </div>
                <Progress value={kpiData.monthly.completion} className="h-2" />
                <p className="text-xs text-gray-500">
                  完成率 {kpiData.monthly.completion.toFixed(1)}%
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
                <AreaChart data={kpiData.trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="target" 
                    stackId="1"
                    stroke="var(--color-target)" 
                    fill="var(--color-target)"
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stackId="2"
                    stroke="var(--color-actual)" 
                    fill="var(--color-actual)"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* 详细数据表格 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>关键指标完成情况</span>
          </CardTitle>
          <CardDescription>
            {department.name}部门今日各项KPI指标详细数据
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">指标名称</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">目标</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">实际</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">完成率</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">状态</th>
                </tr>
              </thead>
              <tbody>
                {kpiData.kpiDetails.map((item, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="text-right py-3 px-4">{item.target}{item.unit}</td>
                    <td className="text-right py-3 px-4 font-medium">{item.actual}{item.unit}</td>
                    <td className={`text-right py-3 px-4 font-medium ${getStatusColor(item.completion)}`}>
                      {item.completion}%
                    </td>
                    <td className="text-center py-3 px-4">
                      {getStatusBadge(item.completion)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 本周完成情况对比 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span>本周完成情况对比</span>
          </CardTitle>
          <CardDescription>
            每日目标与实际完成情况对比分析
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kpiData.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="target" fill="var(--color-target)" name="目标" opacity={0.6} />
                  <Bar dataKey="actual" fill="var(--color-actual)" name="实际" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
