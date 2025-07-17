
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Target, Users, Star, Calendar, FileText, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface HistoryAnalysisProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const HistoryAnalysis = ({ department }: HistoryAnalysisProps) => {
  const [activeTab, setActiveTab] = useState('materials');

  // 学习资料数据
  const learningMaterials = [
    {
      id: 1,
      title: '医疗销售话术精华版',
      category: '话术技巧',
      status: '已完成',
      progress: 100,
      duration: '30分钟',
      rating: 4.8,
      lastStudied: '2024-01-15',
      description: '专业医疗产品销售话术，包含开场白、产品介绍、异议处理等核心技巧'
    },
    {
      id: 2,
      title: '客户心理分析与沟通策略',
      category: '心理学',
      status: '学习中',
      progress: 65,
      duration: '45分钟',
      rating: 4.9,
      lastStudied: '2024-01-14',
      description: '深入了解客户心理，掌握不同类型客户的沟通方式和技巧'
    },
    {
      id: 3,
      title: '电话销售实战案例分析',
      category: '案例分析',
      status: '待学习',
      progress: 0,
      duration: '60分钟',
      rating: 4.7,
      lastStudied: null,
      description: '真实电话销售案例分解，学习成功销售的关键要素'
    },
    {
      id: 4,
      title: '异议处理技巧大全',
      category: '销售技巧',
      status: '已完成',
      progress: 100,
      duration: '40分钟',
      rating: 4.6,
      lastStudied: '2024-01-13',
      description: '常见客户异议的专业处理方法，提升成交率的核心技能'
    }
  ];

  // 个人学习计划
  const studyPlan = {
    currentWeek: {
      target: 5,
      completed: 3,
      remaining: 2,
      tasks: [
        { name: '医疗销售话术精华版', status: 'completed', dueDate: '周一' },
        { name: '客户心理分析与沟通策略', status: 'completed', dueDate: '周二' },
        { name: '电话销售实战案例分析', status: 'completed', dueDate: '周三' },
        { name: '异议处理技巧大全', status: 'pending', dueDate: '周四' },
        { name: '销售流程优化指南', status: 'pending', dueDate: '周五' }
      ]
    },
    nextWeek: {
      target: 4,
      tasks: [
        { name: '高效沟通技巧训练', dueDate: '周一' },
        { name: '客户关系维护策略', dueDate: '周二' },
        { name: '销售数据分析方法', dueDate: '周三' },
        { name: '团队协作与管理', dueDate: '周四' }
      ]
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '已完成':
        return <Badge className="bg-green-100 text-green-800 border-green-200">已完成</Badge>;
      case '学习中':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">学习中</Badge>;
      case '待学习':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">待学习</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTaskStatusIcon = (status: string) => {
    if (status === 'completed') {
      return <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>;
    }
    return <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">历史工作分析</h2>
          <p className="text-muted-foreground mt-1">学习资料管理与个人成长计划</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {department.name}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="materials" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>学习资料</span>
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>学习计划</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="mt-6">
          <div className="grid gap-4">
            {learningMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <CardTitle className="text-lg font-semibold text-foreground">
                            {material.title}
                          </CardTitle>
                          {getStatusBadge(material.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <FileText className="w-3 h-3" />
                            <span>{material.category}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{material.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span>{material.rating}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {material.progress}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {material.lastStudied && `最后学习: ${material.lastStudied}`}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4">
                      {material.description}
                    </CardDescription>
                    
                    {material.progress > 0 && material.progress < 100 && (
                      <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${material.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>进度: {material.progress}%</span>
                          <span>还需学习 {Math.round((100 - material.progress) * parseInt(material.duration) / 100)} 分钟</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end mt-4">
                      <Button 
                        variant={material.status === '待学习' ? 'default' : 'outline'} 
                        size="sm"
                        className="min-w-[80px]"
                      >
                        {material.status === '已完成' ? '复习' : 
                         material.status === '学习中' ? '继续学习' : '开始学习'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plan" className="mt-6">
          <div className="grid gap-6">
            {/* 本周学习计划 */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span>本周学习计划</span>
                </CardTitle>
                <CardDescription>
                  本周目标: {studyPlan.currentWeek.target} 个学习任务
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <Award className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="font-medium text-green-800">
                          已完成 {studyPlan.currentWeek.completed} / {studyPlan.currentWeek.target} 个任务
                        </div>
                        <div className="text-sm text-green-600">
                          完成率 {Math.round((studyPlan.currentWeek.completed / studyPlan.currentWeek.target) * 100)}%
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-700">
                        剩余 {studyPlan.currentWeek.remaining} 个
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {studyPlan.currentWeek.tasks.map((task, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        {getTaskStatusIcon(task.status)}
                        <div className="flex-1">
                          <div className={`font-medium ${task.status === 'completed' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                            {task.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            截止时间: {task.dueDate}
                          </div>
                        </div>
                        {task.status === 'completed' && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            已完成
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 下周学习计划 */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>下周学习计划</span>
                </CardTitle>
                <CardDescription>
                  计划学习 {studyPlan.nextWeek.target} 个新主题
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studyPlan.nextWeek.tasks.map((task, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="w-4 h-4 rounded-full border-2 border-blue-300 bg-blue-50"></div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">
                          {task.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          计划时间: {task.dueDate}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        待安排
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">学习建议</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2 leading-relaxed">
                    根据您的学习进度和部门业绩要求，建议重点关注客户沟通技巧和销售流程优化。
                    可以结合实际工作案例进行学习，提升学习效果。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
