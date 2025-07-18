import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, BookOpen, Clock, CheckCircle, Star, Award } from 'lucide-react';

interface LearningMaterialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: {
    title: string;
    duration?: string;
    progress?: number;
    type: 'continue' | 'start';
  };
}

export const LearningMaterialModal = ({ open, onOpenChange, material }: LearningMaterialModalProps) => {
  const learningContent = {
    '客户异议处理技巧训练': {
      chapters: [
        { title: '常见异议类型识别', duration: '8分钟', completed: true },
        { title: '价格异议应对策略', duration: '12分钟', completed: true },
        { title: '竞品对比技巧', duration: '10分钟', completed: false, current: true },
        { title: '异议转化机会', duration: '15分钟', completed: false }
      ],
      totalDuration: '45分钟',
      difficulty: '中级',
      points: 150,
      certificate: true,
      completed: false
    },
    '产品功能深度解析': {
      chapters: [
        { title: 'AI智能分析功能', duration: '15分钟', completed: false, current: true },
        { title: '数据dashboard应用', duration: '20分钟', completed: false },
        { title: '客户管理最佳实践', duration: '18分钟', completed: false },
        { title: '系统集成方案', duration: '12分钟', completed: false }
      ],
      totalDuration: '1小时5分钟',
      difficulty: '高级',
      points: 200,
      certificate: true,
      completed: false
    },
    '销售话术模拟训练': {
      chapters: [
        { title: '开场白标准化训练', duration: '10分钟', completed: true },
        { title: '产品介绍话术', duration: '15分钟', completed: true },
        { title: '异议处理实战', duration: '20分钟', completed: true },
        { title: '成交技巧训练', duration: '18分钟', completed: true }
      ],
      totalDuration: '1小时3分钟',
      difficulty: '初级',
      points: 120,
      certificate: true,
      completed: true
    },
    '高效电话开场白技巧': {
      chapters: [
        { title: '电话开场的重要性', duration: '5分钟', completed: false, current: true },
        { title: '开场白话术模板', duration: '10分钟', completed: false },
        { title: '声音语调训练', duration: '8分钟', completed: false },
        { title: '实战模拟练习', duration: '12分钟', completed: false }
      ],
      totalDuration: '35分钟',
      difficulty: '初级',
      points: 100,
      certificate: false,
      completed: false
    },
    '客户需求挖掘方法': {
      chapters: [
        { title: 'SPIN销售技巧', duration: '20分钟', completed: false, current: true },
        { title: '提问技巧训练', duration: '15分钟', completed: false },
        { title: '客户心理分析', duration: '18分钟', completed: false },
        { title: '需求确认方法', duration: '12分钟', completed: false }
      ],
      totalDuration: '1小时5分钟',
      difficulty: '中级',
      points: 180,
      certificate: true,
      completed: false
    }
  };

  const currentContent = learningContent[material?.title as keyof typeof learningContent] || {
    chapters: [],
    totalDuration: '0分钟',
    difficulty: '初级',
    points: 0,
    certificate: false,
    completed: false
  };

  const completedChapters = currentContent.chapters.filter(c => c.completed).length;
  const progressPercent = (completedChapters / currentContent.chapters.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>{material?.title}</span>
          </DialogTitle>
          <DialogDescription>
            {material?.type === 'continue' ? '继续学习进度' : '开始新的学习计划'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col space-y-4">
          {/* 课程信息概览 */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm text-gray-600">总时长</div>
                  <div className="font-medium">{currentContent.totalDuration}</div>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                  <div className="text-sm text-gray-600">难度</div>
                  <Badge variant="outline" className="mt-1">{currentContent.difficulty}</Badge>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-sm text-gray-600">学习积分</div>
                  <div className="font-medium">{currentContent.points} 分</div>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-sm text-gray-600">完成证书</div>
                  <div className="font-medium">{currentContent.certificate ? '是' : '否'}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 学习进度 */}
          {material?.type === 'continue' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">学习进度</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>已完成 {completedChapters}/{currentContent.chapters.length} 章节</span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* 章节列表 */}
          <ScrollArea className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">课程章节</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentContent.chapters.map((chapter, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        chapter.completed ? 'bg-green-50 border-green-200' :
                        chapter.current ? 'bg-blue-50 border-blue-200' :
                        'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          chapter.completed ? 'bg-green-500' :
                          chapter.current ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`}>
                          {chapter.completed ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : chapter.current ? (
                            <Play className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-white text-sm">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{chapter.title}</div>
                          <div className="text-sm text-gray-600">{chapter.duration}</div>
                        </div>
                      </div>
                      <div>
                        {chapter.completed ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            已完成
                          </Badge>
                        ) : chapter.current ? (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Play className="w-3 h-3 mr-1" />
                            {material?.type === 'continue' ? '继续学习' : '开始学习'}
                          </Button>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            待学习
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollArea>

          {/* 操作按钮 */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-600">
              {currentContent.completed ? (
                <span className="text-green-600 font-medium">恭喜！您已完成此课程</span>
              ) : (
                <span>完成学习后可获得 {currentContent.points} 积分</span>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                关闭
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                {material?.type === 'continue' ? '继续学习' : '开始学习'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
