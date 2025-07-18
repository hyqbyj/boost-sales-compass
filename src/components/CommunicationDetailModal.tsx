
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lightbulb, MessageSquare, Users, BookOpen, Target, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommunicationDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: {
    name: string;
    contact: string;
    tags: string[];
    concerns: string[];
    suggestion: string;
    nextAction: string;
    stage: string;
  } | null;
}

export const CommunicationDetailModal = ({ open, onOpenChange, client }: CommunicationDetailModalProps) => {
  // Early return if client is null
  if (!client) {
    return null;
  }

  const communicationDetails = {
    greeting: {
      title: "开场问候建议",
      content: `${client.contact}您好，我是上次和您沟通过产品方案的小李。看到您之前对我们的AI智能客服比较感兴趣，今天想和您分享一些我们最新的成功案例。`,
      tips: "基于客户之前的沟通记录，采用熟悉化开场，直接切入关注点"
    },
    introduction: {
      title: "产品介绍重点",
      content: `针对${client.name}的实际需求，重点介绍：
1. AI智能客服的成本节约效果 - 可减少60%人工客服成本
2. 套电机器人的高效率 - 日均外呼量提升3倍
3. 系统稳定性保障 - 99.9%在线率，7*24小时服务`,
      tips: "结合客户标签中的'成本敏感'和'效率关注'特点定制"
    },
    salesExample: {
      title: "销冠沟通实例",
      content: `销冠张经理面对类似客户的沟通要点：
"${client.contact}，我理解您对成本的考虑。我们上个月刚帮助一家规模相当的医院实现了月省8万的人工成本。让我给您算一笔账..."
关键技巧：用具体数字说话，提供可量化的收益预期。`,
      result: "客户当场确定了试用意向，第二周签约"
    },
    template: {
      title: "个性化沟通模板",
      content: `基于您的沟通风格分析生成：

开场：${client.contact}您好，关于我们上次讨论的智能化升级方案，我这边有一些新的进展想和您分享。

核心价值传递：
- 针对您关心的成本控制，我们的方案预计可以帮您节省40-60%的相关费用
- 关于您提到的系统稳定性，我们有99.9%的在线率保障
- 我们已经服务了300+家医疗机构，有丰富的行业经验

促进行动：我建议我们安排一次15分钟的产品演示，让您直观感受一下效果，您看明天上午方便吗？`,
      style: "基于您的历史对话风格：专业、直接、数据导向"
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        {/* 固定标题区域 */}
        <div className="sticky top-0 z-10 bg-white border-b p-6 pb-4">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>{client.name} - 沟通建议详情</span>
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* 可滚动内容区域 */}
        <div className="flex-1 overflow-y-auto p-6 pt-2">
          <div className="space-y-6">
            {/* 客户概况 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>客户概况</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">联系人</p>
                    <p className="font-medium">{client.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">客户阶段</p>
                    <Badge variant="outline">{client.stage}</Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">关注点</p>
                  <div className="flex flex-wrap gap-1">
                    {client.concerns.map((concern, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {concern}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 开场问候 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>{communicationDetails.greeting.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <p className="text-sm">{communicationDetails.greeting.content}</p>
                </div>
                <p className="text-xs text-gray-600">{communicationDetails.greeting.tips}</p>
              </CardContent>
            </Card>

            {/* 产品介绍重点 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{communicationDetails.introduction.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-3 rounded-lg mb-3">
                  <pre className="text-sm whitespace-pre-wrap">{communicationDetails.introduction.content}</pre>
                </div>
                <p className="text-xs text-gray-600">{communicationDetails.introduction.tips}</p>
              </CardContent>
            </Card>

            {/* 销冠实例 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{communicationDetails.salesExample.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 p-3 rounded-lg mb-3">
                  <pre className="text-sm whitespace-pre-wrap">{communicationDetails.salesExample.content}</pre>
                </div>
                <div className="text-xs text-green-600">
                  <strong>结果：</strong>{communicationDetails.salesExample.result}
                </div>
              </CardContent>
            </Card>

            {/* 个性化模板 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Copy className="w-4 h-4" />
                    <span>{communicationDetails.template.title}</span>
                  </span>
                  <Button variant="outline" size="sm">复制模板</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-50 p-4 rounded-lg mb-3">
                  <pre className="text-sm whitespace-pre-wrap">{communicationDetails.template.content}</pre>
                </div>
                <p className="text-xs text-gray-600">{communicationDetails.template.style}</p>
              </CardContent>
            </Card>

            {/* 下步行动 */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="text-sm">下步行动计划</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-blue-700">{client.nextAction}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
