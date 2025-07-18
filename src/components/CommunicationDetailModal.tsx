
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, MessageCircle, Phone, Lightbulb, Target, User, Clock } from 'lucide-react';

interface CommunicationDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: any;
}

export const CommunicationDetailModal = ({ open, onOpenChange, client }: CommunicationDetailModalProps) => {
  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0 flex flex-col">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-white border-b p-6 pb-4">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>{client.name} - 沟通建议详细</span>
            </DialogTitle>
          </DialogHeader>
        </div>
        
        {/* Scrollable Content */}
        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="space-y-6">
            {/* Client Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>客户概况</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">客户名称</p>
                    <p className="font-medium">{client.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">联系人</p>
                    <p className="font-medium">{client.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">客户阶段</p>
                    <Badge variant="secondary">{client.stage}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">成功率</p>
                    <p className="font-medium">{client.successRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>沟通分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">客户标签</p>
                    <div className="flex flex-wrap gap-2">
                      {client.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">主要关注点</p>
                    <div className="flex flex-wrap gap-2">
                      {client.concerns.map((concern: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {concern}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">客户背景分析</p>
                    <p className="text-sm text-gray-700">{client.analysisBackground}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>详细沟通建议</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">沟通策略</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{client.suggestion}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">下步行动计划</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{client.nextAction}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>行动建议</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">立即行动</p>
                      <p className="text-xs text-gray-600">根据客户特点准备针对性材料</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">跟进计划</p>
                      <p className="text-xs text-gray-600">制定详细的跟进时间表和沟通要点</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">风险预警</p>
                      <p className="text-xs text-gray-600">关注客户可能的反对意见并提前准备应对方案</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
