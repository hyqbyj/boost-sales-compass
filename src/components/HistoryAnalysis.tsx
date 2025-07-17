
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { History, User, Brain, TrendingUp, Award, Target, Lightbulb, FileText, Headphones, MessageSquare, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface HistoryAnalysisProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const HistoryAnalysis = ({ department }: HistoryAnalysisProps) => {
  const [selectedTab, setSelectedTab] = useState('profile');

  // 能力画像数据
  const abilityProfile = {
    overall: 78,
    dimensions: [
      { name: '沟通技巧', score: 85, trend: 12, description: '客户沟通表达清晰，善于倾听客户需求' },
      { name: '产品知识', score: 72, trend: -3, description: '对产品功能理解较好，但竞品对比需加强' },
      { name: '客户洞察', score: 88, trend: 15, description: '能够准确识别客户痛点和决策偏好' },
      { name: '时间管理', score: 65, trend: 8, description: '工作效率有所提升，但时间分配仍需优化' },
      { name: '成交转化', score: 75, trend: 5, description: '跟进流程较规范，临门一脚技巧需提升' },
      { name: '关系维护', score: 82, trend: 10, description: '客户关系维护良好，回访及时到位' }
    ]
  };

  // 历史数据统计
  const historicalData = {
    totalCalls: 2845,
    totalWechatChats: 1256,
    totalClients: 186,
    successfulDeals: 23,
    averageCallDuration: 4.2,
    clientSatisfaction: 4.6,
    periods: [
      { month: '1月', calls: 245, deals: 3, satisfaction: 4.2 },
      { month: '2月', calls: 198, deals: 2, satisfaction: 4.3 },
      { month: '3月', calls: 289, deals: 4, satisfaction: 4.5 },
      { month: '4月', calls: 312, deals: 5, satisfaction: 4.7 },
      { month: '5月', calls: 298, deals: 4, satisfaction: 4.6 },
      { month: '6月', calls: 325, deals: 5, satisfaction: 4.8 }
    ]
  };

  // 技能提升建议
  const improvementSuggestions = [
    {
      category: '产品知识提升',
      priority: 'high',
      suggestions: [
        {
          title: '竞品对比分析培训',
          description: '深入学习主要竞品功能差异，掌握差异化销售话术',
          resources: ['竞品分析手册', '对比演示视频', '实战案例集'],
          timeframe: '2周内完成'
        },
        {
          title: '新功能更新学习',
          description: '及时掌握产品新功能和优化点，提升专业度',
          resources: ['产品更新文档', '功能演示录屏', '客户FAQ'],
          timeframe: '持续更新'
        }
      ]
    },
    {
      category: '时间管理优化',
      priority: 'medium',
      suggestions: [
        {
          title: '高效外呼时段分析',
          description: '分析个人外呼成功率高的时间段，优化工作安排',
          resources: ['时间管理工具', '数据分析模板', '效率提升指南'],
          timeframe: '1周内调整'
        },
        {
          title: '客户分级管理',
          description: '建立客户优先级体系，集中精力跟进高价值客户',
          resources: ['客户分级标准', 'CRM使用指南', '跟进模板'],
          timeframe: '即时应用'
        }
      ]
    },
    {
      category: '成交技巧强化',
      priority: 'high',
      suggestions: [
        {
          title: '异议处理技巧',
          description: '学习销冠的异议处理方法，提升成交转化率',
          resources: ['异议处理话术库', '销冠实战录音', '角色扮演训练'],
          timeframe: '3周集中训练'
        },
        {
          title: '临门一脚技巧',
          description: '掌握促成交易的关键话术和时机把握',
          resources: ['成交话术集', '心理学技巧', '成功案例分析'],
          timeframe: '2周强化练习'
        }
      ]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* 整体能力概览 */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-2">
                <User className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{abilityProfile.overall}</p>
                  <p className="text-sm text-gray-600">综合能力分</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-2">
                <FileText className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">{historicalData.totalClients}</p>
                  <p className="text-sm text-gray-600">服务客户数</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-2">
                <Award className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{historicalData.successfulDeals}</p>
                  <p className="text-sm text-gray-600">成功签单</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-2">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">{historicalData.clientSatisfaction}</p>
                  <p className="text-sm text-gray-600">客户满意度</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 详细分析选项卡 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5 text-blue-600" />
            <span>历史工作分析</span>
          </CardTitle>
          <CardDescription>
            基于历史工作数据的深度分析和个性化能力提升建议
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">能力画像</TabsTrigger>
              <TabsTrigger value="data">数据统计</TabsTrigger>
              <TabsTrigger value="improvement">提升建议</TabsTrigger>
              <TabsTrigger value="materials">学习资料</TabsTrigger>
            </TabsList>

            {/* 能力画像 */}
            <TabsContent value="profile" className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-6">
                {abilityProfile.dimensions.map((dimension, index) => (
                  <motion.div
                    key={dimension.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`rounded-lg p-4 ${getScoreBg(dimension.score)}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{dimension.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`text-lg font-bold ${getScoreColor(dimension.score)}`}>
                          {dimension.score}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={dimension.trend > 0 ? 'text-green-600' : 'text-red-600'}
                        >
                          {dimension.trend > 0 ? '+' : ''}{dimension.trend}%
                        </Badge>
                      </div>
                    </div>
                    
                    <Progress 
                      value={dimension.score} 
                      className="h-2 mb-2"
                    />
                    
                    <p className="text-sm text-gray-600">
                      {dimension.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Brain className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">AI能力分析总结</h4>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        您在客户洞察和沟通技巧方面表现优秀，说明具备良好的销售天赋。
                        建议重点提升产品知识和时间管理能力，这将显著提高您的整体业绩表现。
                        特别是在异议处理和临门一脚环节，还有较大提升空间。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 数据统计 */}
            <TabsContent value="data" className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">历史业绩数据</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">累计外呼次数</span>
                      <span className="font-medium">{historicalData.totalCalls.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">微信沟通次数</span>
                      <span className="font-medium">{historicalData.totalWechatChats.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">平均通话时长</span>
                      <span className="font-medium">{historicalData.averageCallDuration}分钟</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">成交转化率</span>
                      <span className="font-medium text-green-600">
                        {((historicalData.successfulDeals / historicalData.totalClients) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">月度趋势分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {historicalData.periods.slice(-3).map((period, index) => (
                        <div key={period.month} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{period.month}</span>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>外呼: {period.calls}</span>
                            <span>签单: {period.deals}</span>
                            <span className="text-yellow-600">满意度: {period.satisfaction}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">工作记录分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Headphones className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">856</p>
                      <p className="text-sm text-gray-600">kcall录音</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">1,256</p>
                      <p className="text-sm text-gray-600">微信记录</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-600">24</p>
                      <p className="text-sm text-gray-600">周月报总结</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 提升建议 */}
            <TabsContent value="improvement" className="space-y-6 mt-6">
              {improvementSuggestions.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          <span>{category.category}</span>
                        </CardTitle>
                        <Badge className={getPriorityColor(category.priority)}>
                          {category.priority === 'high' ? '高优先级' : '中优先级'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.suggestions.map((suggestion, suggestionIndex) => (
                          <div key={suggestionIndex} className="border-l-4 border-blue-200 pl-4 py-2">
                            <h4 className="font-medium text-gray-900 mb-2">{suggestion.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {suggestion.resources.map((resource, resourceIndex) => (
                                  <Badge key={resourceIndex} variant="outline" className="text-xs">
                                    {resource}
                                  </Badge>
                                ))}
                              </div>
                              <span className="text-xs text-blue-600 font-medium">{suggestion.timeframe}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-green-900 mb-2">销冠SOP个性化建议</h4>
                      <p className="text-sm text-green-800 leading-relaxed mb-3">
                        基于您的沟通风格和客户偏好分析，推荐以下个性化改进方案：
                      </p>
                      <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                        <li>保持现有的亲和力沟通风格，增加专业度展示</li>
                        <li>在产品介绍环节增加数据支撑和案例佐证</li>
                        <li>针对价格敏感客户，提前准备ROI计算模型</li>
                        <li>建立客户跟进提醒机制，提高跟进及时性</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 学习资料 */}
            <TabsContent value="materials" className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">推荐学习资料</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">销售心理学实战手册</span>
                      <Button size="sm" variant="outline">下载</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">异议处理话术集锦</span>
                      <Button size="sm" variant="outline">下载</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">竞品分析对比表</span>
                      <Button size="sm" variant="outline">下载</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">客户需求挖掘技巧</span>
                      <Button size="sm" variant="outline">下载</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">销冠实战录音</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">价格异议处理案例</span>
                      <Button size="sm" variant="outline">播放</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">决策者沟通技巧</span>
                      <Button size="sm" variant="outline">播放</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">成交临门一脚</span>
                      <Button size="sm" variant="outline">播放</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">客户关系维护</span>
                      <Button size="sm" variant="outline">播放</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-purple-900 mb-2">个人学习计划</h4>
                      <div className="space-y-2 text-sm text-purple-800">
                        <div className="flex justify-between">
                          <span>第1周: 产品知识强化</span>
                          <span className="text-xs">竞品对比+新功能学习</span>
                        </div>
                        <div className="flex justify-between">
                          <span>第2-3周: 销售技巧提升</span>
                          <span className="text-xs">异议处理+成交技巧</span>
                        </div>
                        <div className="flex justify-between">
                          <span>第4周: 实战练习</span>
                          <span className="text-xs">角色扮演+案例分析</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};
