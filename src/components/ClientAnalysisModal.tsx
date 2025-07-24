
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

  // 基于八步法的沟通分析
  const eightStepAnalysis = {
    opening: {
      title: "开场白",
      performance: "销售人员采用专业化开场，提及之前的产品方案讨论，快速建立连接。",
      advantages: "开场较为自然，能够迅速切入主题，表现出对客户情况的了解。",
      disadvantages: "缺乏个性化元素，未能充分体现对客户具体需求的关注。",
      examples: "张主任您好，我是上次跟您沟通智能化方案的小李，今天想跟您进一步探讨一下我们产品的具体应用。"
    },
    rapport: {
      title: "话天地", 
      performance: "与客户建立了基本的沟通氛围，但在寻找共同话题和拉近距离方面表现一般。",
      advantages: "态度友好，能够保持礼貌的沟通方式，营造轻松的对话环境。",
      disadvantages: "未能深入了解客户的行业背景和工作挑战，错过了建立更深层次连接的机会。",
      examples: "最近医院的工作应该很忙吧？我了解到现在医疗行业对智能化的需求越来越大。"
    },
    needs: {
      title: "挖需求",
      performance: "成功识别出客户对成本控制和效率提升的核心需求，表现出良好的需求挖掘能力。",
      advantages: "能够通过提问了解客户的实际业务痛点，抓住了成本和效率两个关键需求点。",
      disadvantages: "对深层次的业务场景挖掘不够深入，未能充分了解客户的具体使用环境。",
      examples: "张主任，您觉得目前医院在哪些方面最需要提升效率？人工成本这块有什么压力吗？"
    },
    pain: {
      title: "拉伤口",
      performance: "有效触及客户在人工成本和效率方面的痛点，但情感层面的触动还不够深刻。",
      advantages: "能够识别并提及客户的实际困难，让客户认识到现状的问题。",
      disadvantages: "未能充分放大问题的严重性，缺乏对客户情感的深度触动。",
      examples: "现在人工成本确实是个大问题，而且还在不断上涨，这对医院的运营压力很大吧？"
    },
    urgency: {
      title: "撒盐巴",
      performance: "提及了竞争压力和成本上升的紧迫性，但未充分放大不解决问题的后果。",
      advantages: "能够意识到创造紧迫感的重要性，提到了行业竞争和成本压力。",
      disadvantages: "紧迫感营造不够强烈，未能让客户感受到立即行动的必要性。",
      examples: "其他医院都在上这套系统，如果我们不尽快跟上，可能会在竞争中落后。"
    },
    trial: {
      title: "试缔结",
      performance: "尝试了解客户的决策流程和时间安排，但缔结尝试不够明确和有力。",
      advantages: "有缔结意识，能够探询客户的决策时间和流程。",
      disadvantages: "缔结方式过于温和，缺乏明确的推进动作和具体的合作提议。",
      examples: "张主任，您觉得这个方案如何？如果合适的话，我们什么时候可以进入下一步？"
    },
    objection: {
      title: "排异议",
      performance: "回应了客户关于价格和实施的担忧，但处理方式较为被动。",
      advantages: "能够倾听客户的疑虑，保持耐心的沟通态度。",
      disadvantages: "异议处理缺乏主动性，未能有效预防和化解客户的担忧。",
      examples: "价格确实是个考虑因素，但我们的投资回报率很高，长远来看是很划算的。"
    },
    close: {
      title: "再缔结",
      performance: "最后的缔结较为温和，缺乏强有力的推动和明确的下一步行动计划。",
      advantages: "保持了良好的客户关系，没有给客户造成压力。",
      disadvantages: "缔结力度不够，未能推动客户做出明确的决定或承诺。",
      examples: "那我们先这样，您再考虑考虑，有什么问题随时联系我。"
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] p-0 flex flex-col my-8 bg-white rounded-lg">
        <div className="sticky top-0 z-50 bg-white border-b p-6 pb-4 relative">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">{client.name} - 沟通分析报告</span>
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
            {/* 客户综合信息 */}
            <Card className="bg-white border border-gray-300 rounded-md">
              <CardHeader className="p-4 border-b border-gray-200 bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">客户综合信息</span>
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
                    <p className="text-sm text-gray-600 mb-1">昨日沟通时间</p>
                    <p className="font-medium text-gray-800">14:30-15:45</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 沟通分析 */}
            <Card className="bg-white border border-gray-300 rounded-md">
              <CardHeader className="p-4 border-b border-gray-200 bg-white">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">沟通分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-3 bg-blue-50 rounded-b-md">
                <div className="space-y-6">
                  {Object.entries(eightStepAnalysis).map(([key, step], index) => (
                    <div key={key} className="bg-white border border-gray-200 rounded-md p-4">
                      <div className="flex items-center mb-3">
                        <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span>{step.title}</span>
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">表现概述：</p>
                          <p className="text-sm text-gray-800">{step.performance}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">优点：</p>
                          <p className="text-sm text-gray-800">{step.advantages}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">缺点：</p>
                          <p className="text-sm text-gray-800">{step.disadvantages}</p>
                        </div>
                        
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">真实沟通话语举例：</p>
                          <p className="text-sm text-gray-800 italic">"{step.examples}"</p>
                        </div>
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
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">客户特征：</p>
                    <p className="text-sm text-gray-800">大型三甲医院，注重成本控制和效率提升，决策较为谨慎，需要充分的论证和案例支撑。</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">行业经验：</p>
                    <p className="text-sm text-gray-800">医疗行业资深管理者，对智能化改造有一定认知，但对新技术的投入较为保守。</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">看中的产品特点：</p>
                    <p className="text-sm text-gray-800">主要关注产品的成本效益、实施难度和长期稳定性，对智能化程度和用户体验也有一定要求。</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">目前对产品的态度：</p>
                    <p className="text-sm text-gray-800">整体持观望态度，对产品功能表现出兴趣，但对价格和实施周期存在顾虑，需要更多时间考虑。</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
