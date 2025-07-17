
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  User, 
  Calendar, 
  BookOpen, 
  Award, 
  MessageSquare, 
  Lightbulb,
  ChevronDown,
  Play,
  FileText,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface HistoryAnalysisProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const HistoryAnalysis = ({ department }: HistoryAnalysisProps) => {
  const [selectedTab, setSelectedTab] = useState('ability');
  const [expandedSections, setExpandedSections] = useState<string[]>(['learning-plan']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  // 能力雷达图数据
  const abilityData = [
    { skill: '沟通技巧', current: 85, target: 90, improvement: 5 },
    { skill: '产品知识', current: 78, target: 85, improvement: 7 },
    { skill: '客户洞察', current: 82, target: 88, improvement: 6 },
    { skill: '谈判技巧', current: 71, target: 80, improvement: 9 },
    { skill: '时间管理', current: 88, target: 90, improvement: 2 },
    { skill: '情绪管理', current: 75, target: 85, improvement: 10 }
  ];

  // 学习计划数据
  const learningPlan = {
    currentWeek: {
      title: "本周学习计划",
      tasks: [
        { 
          title: "客户异议处理技巧训练", 
          duration: "30分钟",
          progress: 80,
          type: "video",
          completed: false
        },
        { 
          title: "产品功能深度解析", 
          duration: "45分钟",
          progress: 60,
          type: "course",
          completed: false
        },
        { 
          title: "销冠话术模拟练习", 
          duration: "25分钟",
          progress: 100,
          type: "practice",
          completed: true
        }
      ]
    },
    recommendations: [
      {
        category: "沟通技巧提升",
        priority: "高",
        items: [
          {
            title: "高效电话开场白技巧",
            description: "学习如何在30秒内抓住客户注意力，提高通话接续率",
            duration: "20分钟",
            type: "视频课程",
            link: "#"
          },
          {
            title: "客户需求挖掘方法",
            description: "掌握SPIN提问技巧，深度了解客户真实需求",
            duration: "35分钟",
            type: "互动课程",
            link: "#"
          }
        ]
      },
      {
        category: "产品知识强化",
        priority: "中",
        items: [
          {
            title: "AI智能客服核心功能详解",
            description: "深入了解产品核心功能，提升专业度和说服力",
            duration: "40分钟",
            type: "产品手册",
            link: "#"
          },
          {
            title: "竞品对比分析",
            description: "了解市场竞品优劣势，准备有效应对话术",
            duration: "30分钟",
            type: "分析报告",
            link: "#"
          }
        ]
      },
      {
        category: "案例实战训练",
        priority: "高",
        items: [
          {
            title: "医疗行业成功案例分析",
            description: "学习同行业成功销售案例，掌握行业特点和话术",
            duration: "50分钟",
            type: "案例分析",
            link: "#"
          },
          {
            title: "疑难客户攻坚实战",
            description: "针对性解决疑难客户问题，提升成交转化率",
            duration: "45分钟",
            type: "实战演练",
            link: "#"
          }
        ]
      }
    ]
  };

  const chartConfig = {
    current: {
      label: "当前水平",
      color: "hsl(var(--chart-1))",
    },
    target: {
      label: "目标水平", 
      color: "hsl(var(--chart-2))",
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case '高': return 'bg-red-100 text-red-800 border-red-200';
      case '中': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '低': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
      case '视频课程':
        return <Play className="w-4 h-4 text-blue-600" />;
      case 'course':
      case '互动课程':
        return <BookOpen className="w-4 h-4 text-green-600" />;
      case 'practice':
      case '实战演练':
        return <Award className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">工作天数</p>
                  <p className="text-2xl font-bold text-gray-900">128</p>
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">沟通记录</p>
                  <p className="text-2xl font-bold text-gray-900">2,456</p>
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">综合评分</p>
                  <p className="text-2xl font-bold text-gray-900">82</p>
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">成长指数</p>
                  <p className="text-2xl font-bold text-gray-900">+15%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ability">能力画像</TabsTrigger>
          <TabsTrigger value="learning">学习资料</TabsTrigger>
        </TabsList>

        <TabsContent value="ability" className="space-y-6 mt-6">
          {/* 能力雷达图 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>六维能力画像</span>
              </CardTitle>
              <CardDescription>
                基于历史工作数据分析的能力评估，蓝色为当前水平，红色为目标水平
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-80">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={abilityData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                        <Radar
                          name="当前水平"
                          dataKey="current"
                          stroke="var(--color-current)"
                          fill="var(--color-current)"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Radar
                          name="目标水平"
                          dataKey="target"
                          stroke="var(--color-target)"
                          fill="var(--color-target)"
                          fillOpacity={0.1}
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <div className="space-y-4">
                  {abilityData.map((ability, index) => (
                    <motion.div
                      key={ability.skill}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{ability.skill}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{ability.current}/100</span>
                          {ability.improvement > 0 && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                              +{ability.improvement}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Progress value={ability.current} className="h-2" />
                      <div className="text-xs text-gray-500">
                        距离目标还需提升 {ability.target - ability.current} 分
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6 mt-6">
          {/* 当前学习进度 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>{learningPlan.currentWeek.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPlan.currentWeek.tasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${task.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(task.type)}
                        <div>
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {task.duration}
                          </p>
                        </div>
                      </div>
                      {task.completed ? (
                        <Badge className="bg-green-100 text-green-800">已完成</Badge>
                      ) : (
                        <Button variant="outline" size="sm">继续学习</Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>学习进度</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 个人学习计划 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <span>个人学习计划</span>
              </CardTitle>
              <CardDescription>
                基于能力评估和业绩分析，为您量身定制的提升计划
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningPlan.recommendations.map((category, categoryIndex) => (
                <Collapsible
                  key={categoryIndex}
                  open={expandedSections.includes(`learning-plan-${categoryIndex}`)}
                  onOpenChange={() => toggleSection(`learning-plan-${categoryIndex}`)}
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base">{category.category}</h3>
                          <p className="text-sm text-gray-600">{category.items.length} 个学习项目</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getPriorityColor(category.priority)} font-medium`}
                        >
                          {category.priority}优先级
                        </Badge>
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.includes(`learning-plan-${categoryIndex}`) ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <div className="space-y-3 pl-8">
                      {category.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                          className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                {getTypeIcon(item.type)}
                                <h4 className="font-medium text-gray-900 text-base leading-tight">{item.title}</h4>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed mb-3">{item.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {item.duration}
                                </span>
                                <span className="flex items-center">
                                  <FileText className="w-3 h-3 mr-1" />
                                  {item.type}
                                </span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="ml-4 shrink-0">
                              开始学习
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
