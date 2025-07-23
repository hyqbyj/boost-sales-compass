
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, MessageSquare, Users, BookOpen, Target, Copy, X, Heart, Handshake, CheckCircle } from 'lucide-react';
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
  if (!client) {
    return null;
  }

  // 基于八步法和共情共识共行的沟通建议
  const communicationDetails = {
    empathy: {
      title: "共情建议（需求洞察与情感连接）",
      content: `针对${client.name}的沟通建议：

1. 情感连接策略：
   - 开场时表达对医疗行业工作压力的理解和敬意
   - 主动询问当前工作中遇到的具体挑战
   - 用同理心语言："我理解您在成本控制方面的压力..."

2. 需求洞察技巧：
   - 使用开放式问题深入了解业务痛点
   - 倾听客户言语背后的真实需求
   - 识别客户的情绪变化和关注焦点

3. 信任建立方法：
   - 分享相似客户的成功案例
   - 展示对医疗行业的专业理解
   - 承诺提供持续的专业支持`,
      icon: <Heart className="w-4 h-4 text-red-500" />,
      bgColor: "bg-red-50"
    },
    consensus: {
      title: "共识建议（方案匹配与价值对齐）",
      content: `与${client.contact}达成共识的策略：

1. 价值对齐方法：
   - 将产品功能与客户关注点直接对应
   - 用量化数据证明投资回报率
   - 强调解决方案的行业针对性

2. 方案匹配技巧：
   - 根据客户预算制定分阶段实施计划
   - 提供灵活的配置选项
   - 突出与竞品的差异化优势

3. 共识确认步骤：
   - 总结客户认可的关键价值点
   - 确认解决方案的优先级排序
   - 获得客户对实施时间线的认同`,
      icon: <Handshake className="w-4 h-4 text-blue-500" />,
      bgColor: "bg-blue-50"
    },
    action: {
      title: "共行建议（落地执行与持续共赢）",
      content: `与${client.name}协同执行的计划：

1. 执行推进策略：
   - 设定明确的里程碑和时间节点
   - 建立定期沟通机制
   - 提供实施过程中的技术支持

2. 问题解决机制：
   - 建立快速响应的服务团队
   - 预设常见问题的解决方案
   - 定期收集客户反馈并优化

3. 持续共赢路径：
   - 定期评估实施效果
   - 根据业务发展调整服务方案
   - 建立长期合作伙伴关系`,
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      bgColor: "bg-green-50"
    },
    eightSteps: {
      title: "八步法实施指南",
      content: `完整的八步法沟通流程：

开场白：${client.contact}您好，关于我们讨论的智能化升级方案，我想分享一些新的进展...

话天地：了解到您最近在处理的业务挑战，我们很多医疗客户都面临类似问题...

挖需求：能否详细了解一下您目前在成本控制方面的具体考量？

拉伤口：如果这些问题不解决，可能会影响到医院的整体运营效率...

撒盐巴：竞争对手已经开始使用类似系统，时间窗口越来越紧迫...

试缔结：基于我们的讨论，您认为这个方案能解决您的核心问题吗？

排异议：关于您担心的实施风险，我们已经为300+医疗机构成功实施...

再缔结：我建议我们下周安排一次深度演示，您看什么时间合适？`,
      icon: <BookOpen className="w-4 h-4 text-purple-500" />,
      bgColor: "bg-purple-50"
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0 flex flex-col my-8 bg-white rounded-lg">
        <div className="sticky top-0 z-50 bg-white border-b p-6 pb-4 relative">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">{client.name} - 沟通建议详情</span>
            </DialogTitle>
          </DialogHeader>
          
          <DialogClose className="
            absolute
            right-6 top-6
            p-1 rounded-sm
            opacity-70
            transition-opacity
            hover:opacity-100
            hover:bg-gray-100
            focus:outline-none
          ">
            <X className="h-5 w-5 text-gray-600" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50">
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* 客户概况 */}
            <Card className="bg-white border border-gray-300 rounded-md">
              <CardHeader className="p-4 border-b border-gray-200 bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">客户概况</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3 bg-blue-50 rounded-b-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">联系人</p>
                    <p className="font-medium text-gray-800">{client.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">客户阶段</p>
                    <Badge variant="outline" className="bg-white border border-gray-300 text-gray-800">
                      {client.stage}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-2">关注点</p>
                    <div className="flex flex-wrap gap-1">
                      {client.concerns.map((concern, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs bg-white border border-gray-300 text-gray-700"
                        >
                          {concern}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 共情建议 */}
            <Card className="bg-white border border-gray-300 rounded-md">
              <CardHeader className="p-4 border-b border-gray-200 bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  {communicationDetails.empathy.icon}
                  <span className="font-semibold">{communicationDetails.empathy.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className={`p-4 pt-3 ${communicationDetails.empathy.bgColor} rounded-b-md`}>
                <div className="p-4 mb-2 bg-white border border-gray-200 rounded-md">
                  <pre className="text-sm whitespace-pre-wrap text-gray-800">{communicationDetails.empathy.content}</pre>
                </div>
              </CardContent>
            </Card>

            {/* 共识建议 */}
            <Card className="bg-white border border-gray-300 rounded-md">
              <CardHeader className="p-4 border-b border-gray-200 bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  {communicationDetails.consensus.icon}
                  <span className="font-semibold">{communicationDetails.consensus.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className={`p-4 pt-3 ${communicationDetails.consensus.bgColor} rounded-b-md`}>
                <div className="p-4 mb-2 bg-white border border-gray-200 rounded-md">
                  <pre className="text-sm whitespace-pre-wrap text-gray-800">{communicationDetails.consensus.content}</pre>
                </div>
              </CardContent>
            </Card>

            {/* 共行建议 */}
            <Card className="bg-white border border-gray-300 rounded-md">
              <CardHeader className="p-4 border-b border-gray-200 bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  {communicationDetails.action.icon}
                  <span className="font-semibold">{communicationDetails.action.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className={`p-4 pt-3 ${communicationDetails.action.bgColor} rounded-b-md`}>
                <div className="p-4 mb-2 bg-white border border-gray-200 rounded-md">
                  <pre className="text-sm whitespace-pre-wrap text-gray-800">{communicationDetails.action.content}</pre>
                </div>
              </CardContent>
            </Card>

            {/* 八步法实施指南 */}
            <Card className="bg-white border border-gray-300 rounded-md">
              <CardHeader className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between w-full">
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    {communicationDetails.eightSteps.icon}
                    <span className="font-semibold">{communicationDetails.eightSteps.title}</span>
                  </CardTitle>
                  <Button variant="outline" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100">
                    复制模板
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={`p-4 pt-3 ${communicationDetails.eightSteps.bgColor} rounded-b-md`}>
                <div className="p-4 mb-2 bg-white border border-gray-200 rounded-md">
                  <pre className="text-sm whitespace-pre-wrap text-gray-800">{communicationDetails.eightSteps.content}</pre>
                </div>
              </CardContent>
            </Card>

            {/* 下步行动 */}
            <Card className="bg-white border border-gray-300 rounded-md">
              <CardHeader className="p-4 bg-white border-b border-gray-200">
                <CardTitle className="text-gray-800 font-semibold">下步行动计划</CardTitle>
              </CardHeader>
              <CardContent className="p-4 bg-blue-50 rounded-b-md">
                <p className="text-sm font-medium text-gray-800 p-3 bg-white rounded-md">
                  {client.nextAction}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
