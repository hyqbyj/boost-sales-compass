
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
  ArrowDown,
  Activity,
  Zap,
  Timer,
  Calculator,
  PieChart as PieChartIcon,
  AlertCircle
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
  AreaChart,
  ComposedChart,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
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
    },
    yesterday: {
      label: "昨日",
      color: "hsl(var(--chart-3))",
    },
    lastWeek: {
      label: "上周",
      color: "hsl(var(--chart-4))",
    },
    lastMonth: {
      label: "上月",
      color: "hsl(var(--chart-5))",
    }
  };

  const COLORS = [
    'hsl(var(--primary))', 
    'hsl(var(--chart-1))', 
    'hsl(var(--chart-2))', 
    'hsl(var(--chart-3))', 
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))'
  ];

  // 根据部门类型生成对应的KPI数据
  const getKpiData = () => {
    const baseData = {
      // 历史对比数据
      historicalComparison: {
        yesterday: { value: 35, target: 40, completion: 87.5 },
        lastWeek: { value: 178, target: 200, completion: 89 },
        lastMonth: { value: 720, target: 800, completion: 90 },
        today: { value: 32, target: 40, completion: 80 },
        thisWeek: { value: 168, target: 200, completion: 84 },
        thisMonth: { value: 545, target: 800, completion: 68.1 }
      },
      // 缺口分析
      gapAnalysis: {
        dailyGap: 8, // 今日还需完成
        weeklyGap: 32, // 本周还需完成
        monthlyGap: 255 // 本月还需完成
      },
      // 效率分析
      efficiencyMetrics: {
        avgCallDuration: 4.2,
        avgResponseTime: 23,
        conversionRate: 12.5,
        customerSatisfaction: 4.3
      },
      // 预测分析
      forecast: {
        dailyPrediction: 36,
        weeklyPrediction: 185,
        monthlyPrediction: 680
      }
    };

    if (department.type === 'medical-telemarketing') {
      return {
        ...baseData,
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
          { name: '30S有效外呼', target: 40, actual: 32, completion: 80, unit: '个', gap: 8, avgDaily: 35 },
          { name: '60S/接通率', target: 65, actual: 52, completion: 80, unit: '%', gap: 13, avgDaily: 58 },
          { name: '10分钟时长', target: 100, actual: 75, completion: 75, unit: '分钟', gap: 25, avgDaily: 88 },
          { name: '外呼总数', target: 200, actual: 156, completion: 78, unit: '个', gap: 44, avgDaily: 175 },
          { name: '接通数', target: 80, actual: 68, completion: 85, unit: '个', gap: 12, avgDaily: 72 }
        ],
        trendData: [
          { time: '09:00', value: 8, target: 10, yesterday: 9, lastWeek: 7 },
          { time: '10:00', value: 15, target: 18, yesterday: 16, lastWeek: 14 },
          { time: '11:00', value: 22, target: 25, yesterday: 24, lastWeek: 20 },
          { time: '12:00', value: 26, target: 30, yesterday: 28, lastWeek: 25 },
          { time: '14:00', value: 29, target: 35, yesterday: 32, lastWeek: 28 },
          { time: '15:00', value: 32, target: 40, yesterday: 35, lastWeek: 31 },
        ],
        weeklyData: [
          { day: '周一', target: 40, actual: 35, lastWeek: 38 },
          { day: '周二', target: 40, actual: 38, lastWeek: 36 },
          { day: '周三', target: 40, actual: 32, lastWeek: 35 },
          { day: '周四', target: 40, actual: 34, lastWeek: 39 },
          { day: '周五', target: 40, actual: 29, lastWeek: 33 }
        ],
        performanceDistribution: [
          { name: '优秀(90%+)', value: 15, color: 'hsl(var(--chart-1))' },
          { name: '良好(70-89%)', value: 45, color: 'hsl(var(--chart-2))' },
          { name: '一般(50-69%)', value: 30, color: 'hsl(var(--chart-3))' },
          { name: '待改进(<50%)', value: 10, color: 'hsl(var(--chart-4))' }
        ],
        radarData: [
          { indicator: '外呼量', A: 80, fullMark: 100 },
          { indicator: '接通率', A: 75, fullMark: 100 },
          { indicator: '通话时长', A: 70, fullMark: 100 },
          { indicator: '转化率', A: 65, fullMark: 100 },
          { indicator: '客户满意度', A: 85, fullMark: 100 },
          { indicator: '及时性', A: 90, fullMark: 100 }
        ]
      };
    } else if (department.type === 'wechat-marketing') {
      return {
        ...baseData,
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
          { name: '微信深聊(3+5条)', target: 25, actual: 18, completion: 72, unit: '个', gap: 7, avgDaily: 22 },
          { name: '微信深聊+1分钟电话', target: 20, actual: 12, completion: 60, unit: '个', gap: 8, avgDaily: 16 },
          { name: '新增微信好友数', target: 15, actual: 8, completion: 53, unit: '个', gap: 7, avgDaily: 12 },
          { name: '触达数量', target: 250, actual: 185, completion: 74, unit: '个', gap: 65, avgDaily: 220 },
          { name: '朋友圈互动', target: 80, actual: 57, completion: 71, unit: '个', gap: 23, avgDaily: 68 }
        ],
        trendData: [
          { time: '09:00', value: 3, target: 6, yesterday: 4, lastWeek: 3 },
          { time: '10:00', value: 6, target: 10, yesterday: 7, lastWeek: 5 },
          { time: '11:00', value: 9, target: 13, yesterday: 11, lastWeek: 8 },
          { time: '12:00', value: 12, target: 16, yesterday: 14, lastWeek: 11 },
          { time: '14:00', value: 15, target: 20, yesterday: 17, lastWeek: 14 },
          { time: '15:00', value: 18, target: 25, yesterday: 20, lastWeek: 17 },
        ],
        weeklyData: [
          { day: '周一', target: 25, actual: 22, lastWeek: 24 },
          { day: '周二', target: 25, actual: 19, lastWeek: 21 },
          { day: '周三', target: 25, actual: 18, lastWeek: 20 },
          { day: '周四', target: 25, actual: 20, lastWeek: 23 },
          { day: '周五', target: 25, actual: 16, lastWeek: 18 }
        ],
        performanceDistribution: [
          { name: '优秀(90%+)', value: 12, color: 'hsl(var(--chart-1))' },
          { name: '良好(70-89%)', value: 38, color: 'hsl(var(--chart-2))' },
          { name: '一般(50-69%)', value: 35, color: 'hsl(var(--chart-3))' },
          { name: '待改进(<50%)', value: 15, color: 'hsl(var(--chart-4))' }
        ],
        radarData: [
          { indicator: '深聊质量', A: 72, fullMark: 100 },
          { indicator: '好友增长', A: 53, fullMark: 100 },
          { indicator: '响应速度', A: 80, fullMark: 100 },
          { indicator: '互动频率', A: 71, fullMark: 100 },
          { indicator: '转化效果', A: 65, fullMark: 100 },
          { indicator: '维护质量', A: 78, fullMark: 100 }
        ]
      };
    } else {
      return {
        ...baseData,
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
          { name: '新增KP', target: 4, actual: 2, completion: 50, unit: '个', gap: 2, avgDaily: 3 },
          { name: '30S有效外呼', target: 40, actual: 28, completion: 70, unit: '个', gap: 12, avgDaily: 35 },
          { name: '外呼总数', target: 180, actual: 145, completion: 81, unit: '个', gap: 35, avgDaily: 165 },
          { name: '接通数', target: 72, actual: 58, completion: 81, unit: '个', gap: 14, avgDaily: 65 },
          { name: '接通率', target: 40, actual: 40, completion: 100, unit: '%', gap: 0, avgDaily: 40 }
        ],
        trendData: [
          { time: '09:00', value: 0, target: 1, yesterday: 1, lastWeek: 0 },
          { time: '10:00', value: 0, target: 1, yesterday: 1, lastWeek: 1 },
          { time: '11:00', value: 1, target: 2, yesterday: 2, lastWeek: 1 },
          { time: '12:00', value: 1, target: 2, yesterday: 2, lastWeek: 1 },
          { time: '14:00', value: 2, target: 3, yesterday: 3, lastWeek: 2 },
          { time: '15:00', value: 2, target: 4, yesterday: 3, lastWeek: 2 },
        ],
        weeklyData: [
          { day: '周一', target: 4, actual: 3, lastWeek: 4 },
          { day: '周二', target: 4, actual: 2, lastWeek: 3 },
          { day: '周三', target: 4, actual: 2, lastWeek: 2 },
          { day: '周四', target: 4, actual: 3, lastWeek: 4 },
          { day: '周五', target: 4, actual: 2, lastWeek: 3 }
        ],
        performanceDistribution: [
          { name: '优秀(90%+)', value: 20, color: 'hsl(var(--chart-1))' },
          { name: '良好(70-89%)', value: 35, color: 'hsl(var(--chart-2))' },
          { name: '一般(50-69%)', value: 30, color: 'hsl(var(--chart-3))' },
          { name: '待改进(<50%)', value: 15, color: 'hsl(var(--chart-4))' }
        ],
        radarData: [
          { indicator: 'KP开发', A: 50, fullMark: 100 },
          { indicator: '外呼量', A: 70, fullMark: 100 },
          { indicator: '接通率', A: 81, fullMark: 100 },
          { indicator: '质量度', A: 65, fullMark: 100 },
          { indicator: '持续性', A: 60, fullMark: 100 },
          { indicator: '转化率', A: 55, fullMark: 100 }
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
    if (completion >= 90) return <Badge variant="default" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">优秀</Badge>;
    if (completion >= 70) return <Badge variant="default" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">良好</Badge>;
    if (completion >= 50) return <Badge variant="default" className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100">待提升</Badge>;
    return <Badge variant="default" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100">需改进</Badge>;
  };

  const getTrendIcon = (trendUp: boolean) => {
    return trendUp ? 
      <ArrowUp className="w-4 h-4 text-green-600" /> : 
      <ArrowDown className="w-4 h-4 text-red-600" />;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN');
  };

  return (
    <div className="space-y-6">
      {/* 时间维度选择器 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">业绩数据分析</h2>
          <p className="text-muted-foreground mt-1">实时监控业绩表现，洞察数据趋势</p>
        </div>
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">日报表</TabsTrigger>
            <TabsTrigger value="week">周报表</TabsTrigger>
            <TabsTrigger value="month">月报表</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 关键指标概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 今日业绩 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="relative overflow-hidden border-l-4 border-l-primary bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">今日业绩</p>
                    <p className="text-xs text-muted-foreground">vs 昨日: {kpiData.historicalComparison.yesterday.value}</p>
                  </div>
                </div>
                {getStatusBadge(kpiData.today.completion)}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-foreground">{kpiData.today.current}</span>
                      <span className="text-sm text-muted-foreground">/ {kpiData.today.target}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(kpiData.today.trendUp)}
                      <span className={`text-sm font-medium ${kpiData.today.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                        {kpiData.today.trend}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{kpiData.today.completion}%</p>
                    <p className="text-xs text-muted-foreground">完成率</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={kpiData.today.completion} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>还需: {kpiData.gapAnalysis.dailyGap}</span>
                    <span>预测: {kpiData.forecast.dailyPrediction}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 本周业绩 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-l-4 border-l-chart-1 bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-chart-1/10">
                    <BarChart3 className="w-4 h-4 text-chart-1" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">本周业绩</p>
                    <p className="text-xs text-muted-foreground">vs 上周: {kpiData.historicalComparison.lastWeek.value}</p>
                  </div>
                </div>
                {getStatusBadge(kpiData.weekly.completion)}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-foreground">{kpiData.weekly.current}</span>
                      <span className="text-sm text-muted-foreground">/ {kpiData.weekly.target}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(kpiData.weekly.trendUp)}
                      <span className={`text-sm font-medium ${kpiData.weekly.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                        {kpiData.weekly.trend}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{kpiData.weekly.completion}%</p>
                    <p className="text-xs text-muted-foreground">完成率</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={kpiData.weekly.completion} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>还需: {kpiData.gapAnalysis.weeklyGap}</span>
                    <span>预测: {kpiData.forecast.weeklyPrediction}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 本月业绩 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-l-4 border-l-chart-2 bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-chart-2/10">
                    <Target className="w-4 h-4 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">本月业绩</p>
                    <p className="text-xs text-muted-foreground">vs 上月: {kpiData.historicalComparison.lastMonth.value}</p>
                  </div>
                </div>
                {getStatusBadge(kpiData.monthly.completion)}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-foreground">{kpiData.monthly.current}</span>
                      <span className="text-sm text-muted-foreground">/ {kpiData.monthly.target}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(kpiData.monthly.trendUp)}
                      <span className={`text-sm font-medium ${kpiData.monthly.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                        {kpiData.monthly.trend}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{kpiData.monthly.completion.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">完成率</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={kpiData.monthly.completion} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>还需: {kpiData.gapAnalysis.monthlyGap}</span>
                    <span>预测: {kpiData.forecast.monthlyPrediction}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 效率指标 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="relative overflow-hidden border-l-4 border-l-chart-3 bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-chart-3/10">
                  <Activity className="w-4 h-4 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">效率分析</p>
                  <p className="text-xs text-muted-foreground">综合效率评估</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{kpiData.efficiencyMetrics.avgCallDuration}min</p>
                    <p className="text-xs text-muted-foreground">平均通话</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{kpiData.efficiencyMetrics.conversionRate}%</p>
                    <p className="text-xs text-muted-foreground">转化率</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{kpiData.efficiencyMetrics.avgResponseTime}s</p>
                    <p className="text-xs text-muted-foreground">响应时间</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-foreground">{kpiData.efficiencyMetrics.customerSatisfaction}</p>
                    <p className="text-xs text-muted-foreground">满意度</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 数据对比分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 历史对比趋势 */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>历史对比趋势</span>
            </CardTitle>
            <CardDescription>
              当期与历史同期业绩对比分析
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={kpiData.trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="time" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="target" 
                      fill="hsl(var(--muted))" 
                      fillOpacity={0.3}
                      name="目标"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      name="今日"
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="yesterday" 
                      stroke="hsl(var(--chart-3))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="昨日"
                      dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lastWeek" 
                      stroke="hsl(var(--chart-4))" 
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      name="上周同期"
                      dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 3 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* 业绩分布分析 */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="w-5 h-5 text-chart-1" />
              <span>业绩分布分析</span>
            </CardTitle>
            <CardDescription>
              团队成员业绩完成度分布情况
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={kpiData.performanceDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {kpiData.performanceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 能力雷达图和详细数据表 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 能力雷达图 */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-chart-2" />
              <span>能力评估</span>
            </CardTitle>
            <CardDescription>
              多维度能力分析雷达图
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={kpiData.radarData}>
                    <PolarGrid gridType="polygon" stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="indicator" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <PolarRadiusAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      tickCount={6}
                    />
                    <Radar
                      name="能力评分"
                      dataKey="A"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        {/* 详细KPI数据表 */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-chart-3" />
              <span>KPI详细数据</span>
            </CardTitle>
            <CardDescription>
              {department.name}各项关键指标完成情况及缺口分析
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-semibold text-foreground">指标名称</th>
                      <th className="text-right py-4 px-4 font-semibold text-foreground">目标</th>
                      <th className="text-right py-4 px-4 font-semibold text-foreground">实际</th>
                      <th className="text-right py-4 px-4 font-semibold text-foreground">完成率</th>
                      <th className="text-right py-4 px-4 font-semibold text-foreground">缺口</th>
                      <th className="text-center py-4 px-4 font-semibold text-foreground">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpiData.kpiDetails.map((item, index) => (
                      <motion.tr 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-4 font-medium text-foreground">{item.name}</td>
                        <td className="text-right py-4 px-4 text-muted-foreground">{formatNumber(item.target)}{item.unit}</td>
                        <td className="text-right py-4 px-4 font-semibold text-foreground">{formatNumber(item.actual)}{item.unit}</td>
                        <td className={`text-right py-4 px-4 font-bold ${getStatusColor(item.completion)}`}>
                          {item.completion}%
                        </td>
                        <td className="text-right py-4 px-4 text-red-600 font-medium">
                          {item.gap > 0 ? `${item.gap}${item.unit}` : '已达成'}
                        </td>
                        <td className="text-center py-4 px-4">
                          {getStatusBadge(item.completion)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 周度对比分析 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Timer className="w-5 h-5 text-chart-4" />
            <span>周度完成情况对比</span>
          </CardTitle>
          <CardDescription>
            本周与上周同期业绩对比，发现规律和问题
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kpiData.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="target" 
                    fill="hsl(var(--muted))" 
                    fillOpacity={0.4}
                    name="目标"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar 
                    dataKey="actual" 
                    fill="hsl(var(--primary))" 
                    name="本周实际"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar 
                    dataKey="lastWeek" 
                    fill="hsl(var(--chart-3))" 
                    name="上周同期"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* 预警提醒卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-background">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <CardTitle className="text-sm font-semibold text-yellow-800">日目标预警</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-bold text-yellow-700">{kpiData.gapAnalysis.dailyGap}</p>
            <p className="text-sm text-yellow-600 mt-1">距离日目标还需完成</p>
            <div className="mt-2 text-xs text-yellow-600">
              预计完成时间: {kpiData.forecast.dailyPrediction > kpiData.today.target ? '可能超额' : '需要加油'}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-background">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <CardTitle className="text-sm font-semibold text-orange-800">周目标预警</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-bold text-orange-700">{kpiData.gapAnalysis.weeklyGap}</p>
            <p className="text-sm text-orange-600 mt-1">距离周目标还需完成</p>
            <div className="mt-2 text-xs text-orange-600">
              按当前进度预测: {kpiData.forecast.weeklyPrediction}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-background">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <CardTitle className="text-sm font-semibold text-red-800">月目标预警</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-bold text-red-700">{kpiData.gapAnalysis.monthlyGap}</p>
            <p className="text-sm text-red-600 mt-1">距离月目标还需完成</p>
            <div className="mt-2 text-xs text-red-600">
              月末预测: {kpiData.forecast.monthlyPrediction} ({kpiData.forecast.monthlyPrediction >= kpiData.monthly.target ? '有望达成' : '存在风险'})
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
