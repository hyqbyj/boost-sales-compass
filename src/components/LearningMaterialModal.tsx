
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Play, CheckCircle, Clock, Award, Target, ArrowRight, FileText, Video, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

interface LearningMaterialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: {
    title: string;
    type: string;
    progress?: number;
  };
}

export const LearningMaterialModal = ({ open, onOpenChange, material }: LearningMaterialModalProps) => {
  const [activeSection, setActiveSection] = useState(0);

  const learningData = {
    course: {
      title: material?.title || '客户异议处理技巧训练',
      description: '掌握有效的客户异议处理方法，提升成交转化率',
      duration: '30分钟',
      difficulty: '中级',
      progress: material?.progress || 0,
      instructor: '销售培训师 - 李导师',
      rating: 4.8,
      completedBy: 342
    },
    sections: [
      {
        title: '第一章：异议识别与分类',
        duration: '8分钟',
        type: 'video',
        completed: true,
        content: [
          { type: 'video', title: '常见异议类型分析', duration: '3分钟' },
          { type: 'text', title: '异议背后的真实需求', duration: '2分钟' },
          { type: 'quiz', title: '知识检测', duration: '3分钟' }
        ]
      },
      {
        title: '第二章：价格异议处理技巧',
        duration: '12分钟',
        type: 'video',
        completed: false,
        current: true,
        content: [
          { type: 'video', title: '价值展示技巧', duration: '5分钟' },
          { type: 'text', title: 'ROI计算方法', duration: '3分钟' },
          { type: 'audio', title: '实战对话示例', duration: '4分钟' }
        ]
      },
      {
        title: '第三章：竞品对比处理',
        duration: '10分钟',
        type: 'video',
        completed: false,
        content: [
          { type: 'video', title: '差异化优势展示', duration: '4分钟' },
          { type: 'text', title: '竞品分析框架', duration: '3分钟' },
          { type: 'practice', title: '角色扮演练习', duration: '3分钟' }
        ]
      }
    ],
    keyPoints: [
      '理解客户异议的根本原因',
      '掌握4种核心处理技巧',
      '学会价值量化展示方法',
      '提升客户信任度建立技巧'
    ],
    practiceExercises: [
      {
        title: '价格异议模拟对话',
        description: '与AI助手进行价格异议处理练习',
        difficulty: '中级',
        estimatedTime: '10分钟'
      },
      {
        title: '竞品对比话术练习',
        description: '练习竞品对比的标准话术流程',
        difficulty: '高级',
        estimatedTime: '15分钟'
      }
    ],
    relatedCourses: [
      { title: '高效电话开场技巧', progress: 100, rating: 4.9 },
      { title: '客户需求挖掘方法', progress: 60, rating: 4.7 },
      { title: '成交信号识别训练', progress: 0, rating: 4.8 }
    ]
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      case 'text':
        return <FileText className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>{learningData.course.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex gap-6 min-h-0">
          {/* 左侧课程目录 */}
          <div className="w-80 border-r pr-4">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {/* 课程概览 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-blue-100 text-blue-800">{learningData.course.difficulty}</Badge>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm">{learningData.course.rating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">总时长</p>
                        <p className="font-medium">{learningData.course.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">学习进度</p>
                        <Progress value={learningData.course.progress} className="mt-1" />
                        <p className="text-xs text-gray-500 mt-1">{learningData.course.progress}% 已完成</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">讲师</p>
                        <p className="font-medium text-sm">{learningData.course.instructor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 章节列表 */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">课程章节</h3>
                  {learningData.sections.map((section, index) => (
                    <motion.div
                      key={index}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        activeSection === index 
                          ? 'border-blue-500 bg-blue-50' 
                          : section.current 
                          ? 'border-orange-300 bg-orange-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveSection(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {section.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : section.current ? (
                            <Play className="w-4 h-4 text-orange-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="text-sm font-medium">{section.title}</span>
                        </div>
                        {section.current && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs">进行中</Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{section.duration}</span>
                        <span>{section.content.length} 个内容</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* 右侧内容区域 */}
          <div className="flex-1">
            <ScrollArea className="h-full">
              <div className="space-y-6 pr-4">
                {/* 当前章节内容 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{learningData.sections[activeSection].title}</span>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-1" />
                        开始学习
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {learningData.sections[activeSection].content.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            {getContentIcon(item.type)}
                            <div>
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-xs text-gray-500">{item.duration}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 学习要点 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span>学习要点</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {learningData.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{point}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 实践练习 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span>实践练习</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {learningData.practiceExercises.map((exercise, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{exercise.title}</h4>
                            <Button size="sm" variant="outline">
                              开始练习
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <Badge variant="outline">{exercise.difficulty}</Badge>
                            <span>预计时间：{exercise.estimatedTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 相关课程推荐 */}
                <Card>
                  <CardHeader>
                    <CardTitle>相关课程推荐</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {learningData.relatedCourses.map((course, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{course.title}</span>
                              <div className="flex items-center space-x-1">
                                <span className="text-yellow-400 text-sm">★</span>
                                <span className="text-xs">{course.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Progress value={course.progress} className="flex-1 h-1" />
                              <span className="text-xs text-gray-500">{course.progress}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
