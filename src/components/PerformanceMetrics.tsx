
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Target, Clock, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface PerformanceMetricsProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const PerformanceMetrics = ({ department }: PerformanceMetricsProps) => {
  // Mock performance data
  const todayStats = {
    '30S有效外呼': { current: 32, target: 40, unit: '个' },
    '微信深聊(3+5条)': { current: 18, target: 25, unit: '个' },
    '新增KP': { current: 3, target: 4, unit: '个' },
    '接通率': { current: 0.68, target: 0.65, unit: '' },
    '10分钟时长': { current: 85, target: 100, unit: '分钟' }
  };

  const weeklyStats = {
    calls: 285,
    connects: 198,
    validCalls: 156,
    wechatChats: 142,
    newClients: 23
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return <Badge className="bg-green-100 text-green-800">已达标</Badge>;
    if (percentage >= 80) return <Badge className="bg-yellow-100 text-yellow-800">接近达标</Badge>;
    return <Badge className="bg-red-100 text-red-800">需努力</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Today's Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>今日业绩达标进度</span>
            </CardTitle>
            <CardDescription>
              实时跟踪当日KPI完成情况
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {department.kpis.map((kpi, index) => {
                const stat = todayStats[kpi.name as keyof typeof todayStats];
                if (!stat) return null;
                
                const progress = Math.min((stat.current / stat.target) * 100, 100);
                
                return (
                  <motion.div
                    key={kpi.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{kpi.name}</h3>
                      {getStatusBadge(stat.current, stat.target)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {stat.current}/{stat.target} {stat.unit}
                        </span>
                        <span className="font-medium">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <Progress 
                        value={progress} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      还需完成: {Math.max(0, stat.target - stat.current)} {stat.unit}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">本周外呼总数</p>
                <p className="text-2xl font-semibold text-gray-900">{weeklyStats.calls}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center space-x-1 mt-2 text-sm">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-green-600">+12%</span>
              <span className="text-gray-500">vs 上周</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">接通数</p>
                <p className="text-2xl font-semibold text-gray-900">{weeklyStats.connects}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center space-x-1 mt-2 text-sm">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-green-600">接通率 {Math.round((weeklyStats.connects / weeklyStats.calls) * 100)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">有效外呼</p>
                <p className="text-2xl font-semibold text-gray-900">{weeklyStats.validCalls}</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center space-x-1 mt-2 text-sm">
              <TrendingDown className="w-3 h-3 text-red-500" />
              <span className="text-red-600">-3%</span>
              <span className="text-gray-500">vs 上周</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">微信深聊</p>
                <p className="text-2xl font-semibold text-gray-900">{weeklyStats.wechatChats}</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center space-x-1 mt-2 text-sm">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-green-600">+8%</span>
              <span className="text-gray-500">vs 上周</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Department Specific Metrics */}
      {department.type === 'wechat-marketing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>微信营销专项指标</CardTitle>
              <CardDescription>三区专用KPI跟踪</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">微信好友总数</p>
                  <p className="text-2xl font-bold text-blue-700">1,248</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">触达数量</p>
                  <p className="text-2xl font-bold text-green-700">892</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">朋友圈互动</p>
                  <p className="text-2xl font-bold text-purple-700">156</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-600 font-medium">新增好友</p>
                  <p className="text-2xl font-bold text-yellow-700">23</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
