
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Clock, CheckCircle, BookOpen } from 'lucide-react';

interface LearningMaterialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: any;
}

export const LearningMaterialModal = ({ open, onOpenChange, material }: LearningMaterialModalProps) => {
  if (!material) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>学习资料详情</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{material.title || '学习资料'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>预计学习时间: 30分钟</span>
                  </Badge>
                  <Badge variant="outline">
                    {material.type === 'continue' ? '继续学习' : '开始学习'}
                  </Badge>
                </div>
                
                <div className="text-gray-600">
                  <p>这是一个关于销售技巧提升的学习资料，包含实用的沟通方法和案例分析。</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>{material.type === 'continue' ? '继续学习' : '开始学习'}</span>
                  </Button>
                  <Button variant="outline">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    标记为已完成
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
