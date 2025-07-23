
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Target, Users, Lightbulb, X } from 'lucide-react';

interface ClientAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: {
    name: string;
    contact: string;
    stage: string;
    analysisBackground: string;
  } | null;
}

export const ClientAnalysisModal = ({ open, onOpenChange, client }: ClientAnalysisModalProps) => {
  if (!client) {
    return null;
  }

  // 基于八步法的聊天记录分析
  const eightStepAnalysis = {
    opening: {
      title: "开场白",
      content: "销售人员采用专业化开场，提及之前的产品方案讨论，快速建立连接。开场较为自然，但可以更加个性化。",
      score: 8,
      suggestion: "建议在开场时加入更多个人化元素，如具体提及客户上次关注的功能点。"
    },
    rapport: {
      title: "话天地", 
      content: "与客户建立了基本的沟通氛围，但在寻找共同话题和拉近距离方面还有提升空间。",
      score: 7,
      suggestion: "可以多了解客户的行业背景和工作挑战，找到更多共同话题。"
    },
    needs: {
      title: "挖需求",
      content: "成功识别出客户对成本控制和效率提升的核心需求，但对深层次的业务痛点挖掘不够深入。",
      score: 8,
      suggestion: "建议使用更多开放式问题，深入了解客户的具体业务场景和挑战。"
    },
    pain: {
      title: "拉伤口",
      content: "有效触及客户在人工成本和效率方面的痛点，但情感层面的触动还不够深刻。",
      score: 7,
      suggestion: "可以通过具体的案例和数据来强化客户对现状问题的认知。"
    },
    urgency: {
      title: "撒盐巴",
      content: "提及了竞争压力和成本上升的紧迫性，但未充分放大不解决问题的后果。",
      score: 6,
      suggestion: "建议量化不解决问题的损失，增强客户的紧迫感。"
    },
    trial: {
      title: "试缔结",
      content: "尝试了解客户的决策流程和时间安排，但缔结尝试不够明确和有力。",
      score: 7,
      suggestion: "可以提出更具体的合作建议，测试客户的真实意向。"
    },
    objection: {
      title: "排异议",
      content: "回应了客户关于价格和实施的担忧，但处理方式较为被动，未主动预防异议。",
      score: 6,
      suggestion: "建议主动预防常见异议，用成功案例来化解客户疑虑。"
    },
    close: {
      title: "再缔结",
      content: "最后的缔结较为温和，缺乏强有力的推动和明确的下一步行动计划。",
      score: 6,
      suggestion: "建议提出明确的时间节点和具体的下一步行动，增强缔结的有效性。"
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] p-0 flex flex-col my-8 bg-white rounded-lg">
        <div className="sticky top-0 z-50 bg-white border-b p-6 pb-4 relative">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">{client.name} - 八步法分析报告</span>
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
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* 客户基本信息 */}
            <Card className="bg-white border border-gray-300 rounded-md">
              <CardHeader className="p-4 border-b border-gray-200 bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">客户基本信息</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3 bg-blue-50 rounded-b-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">客户名称</p>
                    <p className="font-medium text-gray-800">{client.name}</p>
                  </div>
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
                  <div>
                    <p className="text-sm text-gray-600 mb-1">综合评分</p>
                    <p className="font-medium text-gray-800">
                      {Math.round(Object.values(eightStepAnalysis).reduce((acc, step) => acc + step.score, 0) / 8)}/10
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 八步法详细分析 */}
            <Card className="bg-white border border-gray-300 rounded-md">
              <CardHeader className="p-4 border-b border-gray-200 bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">八步法详细分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3 bg-blue-50 rounded-b-md">
                <div className="space-y-6">
                  {Object.entries(eightStepAnalysis).map(([key, step], index) => (
                    <div key={key} className="bg-white border border-gray-200 rounded-md p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span>{step.title}</span>
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${getScoreColor(step.score)}`}>
                            {step.score}/10
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <Progress value={step.score * 10} className="h-2" />
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{step.content}</p>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                        <p className="text-sm text-yellow-800">
                          <strong>改进建议：</strong>{step.suggestion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 客户背景分析 */}
            <Card className="bg-white border border-gray-300 rounded-md">
              <CardHeader className="p-4 border-b border-gray-200 bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">客户背景分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3 bg-blue-50 rounded-b-md">
                <p className="text-sm text-gray-800 p-3 bg-white rounded-md">
                  {client.analysisBackground}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
