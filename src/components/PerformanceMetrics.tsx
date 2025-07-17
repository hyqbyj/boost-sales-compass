
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

  // 专业数据看板配色方案
  const chartConfig = {
    target: {
      label: "目标",
      color: "hsl(var(--chart-1))",
    },
    actual: {
      label: "实际",
      color: "hsl(var(--chart-2))",
    },
    completed: {
      label: "已完成",
      color: "hsl(var(--chart-2))",
    },
    remaining: {
      label: "剩余",
      color: "hsl(var(--chart-5))",
    },
    yesterday: {
      label: "昨日",
      color: "hsl(var(--chart-6))",
    },
    lastWeek: {
      label: "上周",
      color: "hsl(var(--chart-7))",
    },
    lastMonth: {
      label: "上月",
      color: "hsl(var(--chart-8))",
    },
    value: {
      label: "今日",
      color: "hsl(var(--chart-1))",
    }
  };

  // 专业配色调色板
  const COLORS = [
    'hsl(var(--chart-1))',  // 主蓝色
    'hsl(var(--chart-2))',  // 成功绿色
    'hsl(var(--chart-3))',  // 警告红色
    'hsl(var(--chart-4))',  // 提醒橙色
    'hsl(var(--chart-5))',  // 浅蓝色
    'hsl(var(--chart-6))',  // 深蓝色
    'hsl(var(--chart-7))',  // 辅助青色
    'hsl(var(--chart-8))',  // 辅助紫色
    'hsl(var(--chart-9))',  // 辅助绿色
    'hsl(var(--chart-10))'  // 辅助橙色
  ];

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
          { name: '优秀(90%+)', value: 15, color: 'hsl(var(--chart-2))' },
          { name: '良好(70-89%)', value: 45, color: 'hsl(var(--chart-1))' },
          { name: '一般(50-69%)', value: 30, color: 'hsl(var(--chart-4))' },
          { name: '待改进(<50%)', value: 10, color: 'hsl(var(--chart-3))' }
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
          { name: '优秀(90%+)', value: 12, color: 'hsl(var(--chart-2))' },
          { name: '良好(70-89%)', value: 38, color: 'hsl(var(--chart-1))' },
          { name: '一般(50-69%)', value: 35, color: 'hsl(var(--chart-4))' },
          { name: '待改进(<50%)', value: 15, color: 'hsl(var(--chart-3))' }
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
          { name: '优秀(90%+)', value: 20, color: 'hsl(var(--chart-2))' },
          { name: '良好(70-89%)', value: 35, color: 'hsl(var(--chart-1))' },
          { name: '一般(50-69%)', value: 30, color: 'hsl(var(--chart-4))' },
          { name: '待改进(<50%)', value: 15, color: 'hsl(var(--chart-3))' }
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
    if (completion >= 90) return 'text-success';
    if (completion >= 70) return 'text-primary';
    if (completion >= 50) return 'text-warning';
    return 'text-error';
  };

  const getStatusBadge = (completion: number) => {
    if (completion >= 90) return <Badge variant="default" className="bg-success/10 text-success border-success/20 hover:bg-success/20">优秀</Badge>;
    if (completion >= 70) return <Badge variant="default" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">良好</Badge>;
    if (completion >= 50) return <Badge variant="default" className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20">待提升</Badge>;
    return <Badge variant="default" className="bg-error/10 text-error border-error/20 hover:bg-error/20">需改进</Badge>;
  };

  const getTrendIcon = (trendUp: boolean) => {
    return trendUp ? 
      <ArrowUp className="w-4 h-4 text-success" /> : 
      <ArrowDown className="w-4 h-4 text-error" />;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN');
  };

  return (
    <div className="space-y-6 p-4">
      {/* 时间维度选择器 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-heading">业绩数据分析</h2>
          <p className="text-text-muted mt-1">实时监控业绩表现，洞察数据趋势</p>
        </div>
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-auto">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="today" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">日报表</TabsTrigger>
            <TabsTrigger value="week" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">周报表</TabsTrigger>
            <TabsTrigger value="month" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">月报表</TabsTrigger>
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
          <Card className="relative overflow-hidden border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-background">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-heading">今日业绩</p>
                    <p className="text-xs text-text-muted">vs 昨日: {kpiData.historicalComparison.yesterday.value}</p>
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
                      <span className="text-2xl font-bold text-primary">{kpiData.today.current}</span>
                      <span className="text-sm text-text-muted">/ {kpiData.today.target}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(kpiData.today.trendUp)}
                      <span className={`text-sm font-medium ${kpiData.today.trendUp ? 'text-success' : 'text-error'}`}>
                        {kpiData.today.trend}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">{kpiData.today.completion}%</p>
                    <p className="text-xs text-text-muted">完成率</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={kpiData.today.completion} className="h-2" />
                  <div className="flex justify-between text-xs text-text-muted">
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
          <Card className="relative overflow-hidden border-l-4 border-l-success bg-gradient-to-br from-success/5 to-background">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-success/10">
                    <BarChart3 className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-heading">本周业绩</p>
                    <p className="text-xs text-text-muted">vs 上周: {kpiData.historicalComparison.lastWeek.value}</p>
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
                      <span className="text-2xl font-bold text-success">{kpiData.weekly.current}</span>
                      <span className="text-sm text-text-muted">/ {kpiData.weekly.target}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(kpiData.weekly.trendUp)}
                      <span className={`text-sm font-medium ${kpiData.weekly.trendUp ? 'text-success' : 'text-error'}`}>
                        {kpiData.weekly.trend}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-success">{kpiData.weekly.completion}%</p>
                    <p className="text-xs text-text-muted">完成率</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={kpiData.weekly.completion} className="h-2" />
                  <div className="flex justify-between text-xs text-text-muted">
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
          <Card className="relative overflow-hidden border-l-4 border-l-warning bg-gradient-to-br from-warning/5 to-background">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Target className="w-4 h-4 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-heading">本月业绩</p>
                    <p className="text-xs text-text-muted">vs 上月: {kpiData.historicalComparison.lastMonth.value}</p>
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
                      <span className="text-2xl font-bold text-warning">{kpiData.monthly.current}</span>
                      <span className="text-sm text-text-muted">/ {kpiData.monthly.target}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(kpiData.monthly.trendUp)}
                      <span className={`text-sm font-medium ${kpiData.monthly.trendUp ? 'text-success' : 'text-error'}`}>
                        {kpiData.monthly.trend}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-warning">{kpiData.monthly.completion.toFixed(1)}%</p>
                    <p className="text-xs text-text-muted">完成率</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={kpiData.monthly.completion} className="h-2" />
                  <div className="flex justify-between text-xs text-text-muted">
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
          <Card className="relative overflow-hidden border-l-4 border-l-info bg-gradient-to-br from-info/5 to-background">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-info/10">
                  <Activity className="w-4 h-4 text-info" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-heading">效率分析</p>
                  <p className="text-xs text-text-muted">综合效率评估</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-info">{kpiData.efficiencyMetrics.avgCallDuration}min</p>
                    <p className="text-xs text-text-muted">平均通话</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-success">{kpiData.efficiencyMetrics.conversionRate}%</p>
                    <p className="text-xs text-text-muted">转化率</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-warning">{kpiData.efficiencyMetrics.avgResponseTime}s</p>
                    <p className="text-xs text-text-muted">响应时间</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{kpiData.efficiencyMetrics.customerSatisfaction}</p>
                    <p className="text-xs text-text-muted">满意度</p>
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
              <span className="text-text-heading">历史对比趋势</span>
            </CardTitle>
            <CardDescription className="text-text-muted">
              当期与历史同期业绩对比分析
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <ComposedChart data={kpiData.trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--text-muted))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--text-muted))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="target" 
                  fill="hsl(var(--chart-5))" 
                  fillOpacity={0.3}
                  name="目标"
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={3}
                  name="今日"
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="yesterday" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="昨日"
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="lastWeek" 
                  stroke="hsl(var(--chart-6))" 
                  strokeWidth={2}
                  strokeDasharray="10 5"
                  name="上周"
                  dot={{ fill: "hsl(var(--chart-6))", strokeWidth: 2, r: 3 }}
                />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 业绩分布饼图 */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              <span className="text-text-heading">业绩分布情况</span>
            </CardTitle>
            <CardDescription className="text-text-muted">
              各绩效等级人员分布
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <PieChart>
                <Pie
                  data={kpiData.performanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {kpiData.performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* KPI详细表格 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-primary" />
            <span className="text-text-heading">KPI详细分析</span>
          </CardTitle>
          <CardDescription className="text-text-muted">
            各项关键指标详细数据与完成情况
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-3 text-text-heading font-semibold">指标名称</th>
                  <th className="text-center p-3 text-text-heading font-semibold">目标</th>
                  <th className="text-center p-3 text-text-heading font-semibold">实际</th>
                  <th className="text-center p-3 text-text-heading font-semibold">完成率</th>
                  <th className="text-center p-3 text-text-heading font-semibold">缺口</th>
                  <th className="text-center p-3 text-text-heading font-semibold">日均</th>
                  <th className="text-center p-3 text-text-heading font-semibold">状态</th>
                </tr>
              </thead>
              <tbody>
                {kpiData.kpiDetails.map((kpi, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-all duration-200">
                    <td className="p-3 font-medium text-text-body">{kpi.name}</td>
                    <td className="text-center p-3 text-text-body font-semibold">{kpi.target}{kpi.unit}</td>
                    <td className="text-center p-3 text-text-body font-semibold">{kpi.actual}{kpi.unit}</td>
                    <td className="text-center p-3">
                      <span className={`font-bold ${getStatusColor(kpi.completion)}`}>
                        {kpi.completion}%
                      </span>
                    </td>
                    <td className="text-center p-3 text-text-secondary font-medium">{kpi.gap}{kpi.unit}</td>
                    <td className="text-center p-3 text-text-secondary font-medium">{kpi.avgDaily}{kpi.unit}</td>
                    <td className="text-center p-3">
                      {getStatusBadge(kpi.completion)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 能力雷达图 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span className="text-text-heading">综合能力评估</span>
          </CardTitle>
          <CardDescription className="text-text-muted">
            多维度能力雷达图分析
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <RadarChart data={kpiData.radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="indicator" tick={{ fill: 'hsl(var(--text-body))', fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: 'hsl(var(--text-muted))', fontSize: 10 }}
              />
              <Radar
                name="当前能力"
                dataKey="A"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
