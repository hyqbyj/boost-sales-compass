
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, TrendingUp, AlertCircle, CheckCircle, Clock, User } from 'lucide-react';

interface ClientAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: any;
}

export const ClientAnalysisModal = ({ open, onOpenChange, client }: ClientAnalysisModalProps) => {
  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>客户沟通解析 - {client.name}</span>
          </DialogTitle>
          <DialogDescription>
            基于AI分析的客户沟通深度解析报告
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-6 pr-4">
            {/* 客户基本信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>客户基本信息</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">客户名称：</span>
                    <span className="font-medium">{client.name}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">联系人：</span>
                    <span className="font-medium">{client.contact}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">客户阶段：</span>
                    <Badge variant="secondary" className="ml-2">{client.stage}</Badge>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">成功率预测：</span>
                    <span className="font-medium text-green-600">{client.successRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 沟通记录分析 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>沟通记录分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">对话轮次分析</h4>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm">总对话条数：<span className="font-medium">{client.dialogCount}</span></p>
                      <p className="text-sm">平均回复长度：45字</p>
                      <p className="text-sm">情感倾向：积极 (78%)</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">关键话题提取</h4>
                    <div className="flex flex-wrap gap-2">
                      {client.concerns.map((concern: string, index: number) => (
                        <Badge key={index} variant="outline">{concern}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">客户意图识别</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">产品功能了解 - 85%匹配度</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">价格敏感度 - 中等</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">决策紧迫性 - 较高</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI建议分析 */}
            <Card>
              <CardHeader>
                <CardTitle>AI智能建议</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-green-600">优势分析</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• 客户对产品功能表现出浓厚兴趣</li>
                      <li>• 决策层级较高，推进效率快</li>
                      <li>• 预算充足，价格不是主要障碍</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-orange-600">风险点</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• 对竞品方案仍在比较中</li>
                      <li>• 实施周期要求较紧</li>
                      <li>• 需要更多技术细节支撑</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 text-blue-600">下步行动建议</h4>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm font-medium mb-2">推荐话术：</p>
                      <p className="text-sm text-gray-700">
                        "{client.contact}，根据我们的沟通，我了解到您最关心的是{client.concerns[0]}。
                        我们的解决方案在这方面有明显优势，特别是..."
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            关闭
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            导出报告
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
