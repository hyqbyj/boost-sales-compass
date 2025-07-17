
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, TrendingUp, AlertCircle, CheckCircle, Clock, User, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClientAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: any;
}

export const ClientAnalysisModal = ({ open, onOpenChange, client }: ClientAnalysisModalProps) => {
  if (!client) return null;

  const analysisData = {
    basicInfo: {
      name: client.name,
      contact: client.contact,
      industry: '医疗健康',
      scale: '大型三甲医院',
      location: '北京市',
      establishedYear: '1985'
    },
    communicationAnalysis: {
      totalCalls: 24,
      avgCallDuration: '8分32秒',
      peakTime: '14:00-16:00',
      preferredChannel: 'kcall语音',
      responseRate: '85%',
      sentiment: '积极'
    },
    behaviorInsights: [
      {
        category: '价格敏感度',
        level: '高',
        description: '客户在多次对话中反复提及价格问题，对成本控制较为关注',
        suggestion: '准备详细的ROI分析报告，强调长期收益'
      },
      {
        category: '决策周期',
        level: '中等',
        description: '预计决策周期2-3个月，需要多轮沟通确认',
        suggestion: '建立定期跟进机制，每周至少联系一次'
      },
      {
        category: '技术关注',
        level: '高',
        description: '对产品技术细节和稳定性表现出强烈兴趣',
        suggestion: '安排技术专家进行深度交流'
      }
    ],
    riskAssessment: [
      {
        type: '竞品风险',
        level: '中',
        description: '客户提及正在评估2-3家供应商',
        mitigation: '强化差异化优势展示'
      },
      {
        type: '预算风险',
        level: '低',
        description: '客户有明确预算规划',
        mitigation: '提供灵活的付款方案'
      }
    ],
    nextSteps: [
      {
        priority: '高',
        action: '准备技术方案演示',
        deadline: '3天内',
        responsible: '技术团队'
      },
      {
        priority: '中',
        action: '发送ROI分析报告',
        deadline: '1周内',
        responsible: '销售代表'
      },
      {
        priority: '中',
        action: '安排现场考察',
        deadline: '2周内',
        responsible: '客户经理'
      }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>客户分析报告 - {client.name}</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-6 pr-4">
            {/* 基本信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>基本信息</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">机构名称</p>
                    <p className="font-medium">{analysisData.basicInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">联系人</p>
                    <p className="font-medium">{analysisData.basicInfo.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">行业类型</p>
                    <p className="font-medium">{analysisData.basicInfo.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">机构规模</p>
                    <p className="font-medium">{analysisData.basicInfo.scale}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">所在地区</p>
                    <p className="font-medium">{analysisData.basicInfo.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">成立时间</p>
                    <p className="font-medium">{analysisData.basicInfo.establishedYear}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 沟通分析 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>沟通数据分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{analysisData.communicationAnalysis.totalCalls}</p>
                    <p className="text-sm text-gray-600">总通话次数</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{analysisData.communicationAnalysis.avgCallDuration}</p>
                    <p className="text-sm text-gray-600">平均通话时长</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{analysisData.communicationAnalysis.responseRate}</p>
                    <p className="text-sm text-gray-600">响应率</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">最佳沟通时段</p>
                    <p className="font-medium">{analysisData.communicationAnalysis.peakTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">偏好沟通方式</p>
                    <Badge className="bg-blue-100 text-blue-800">{analysisData.communicationAnalysis.preferredChannel}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 行为洞察 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>行为洞察分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.behaviorInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{insight.category}</h4>
                        <Badge 
                          variant={insight.level === '高' ? 'destructive' : insight.level === '中等' ? 'default' : 'secondary'}
                          className={
                            insight.level === '高' 
                              ? 'bg-red-100 text-red-800' 
                              : insight.level === '中等' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }
                        >
                          {insight.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-sm text-blue-700">
                          <strong>建议：</strong>{insight.suggestion}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 风险评估 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <span>风险评估</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisData.riskAssessment.map((risk, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium">{risk.type}</span>
                          <Badge 
                            variant={risk.level === '高' ? 'destructive' : risk.level === '中' ? 'default' : 'secondary'}
                            className={
                              risk.level === '高' 
                                ? 'bg-red-100 text-red-800' 
                                : risk.level === '中' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }
                          >
                            {risk.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{risk.description}</p>
                        <p className="text-sm text-blue-600 mt-1">
                          <strong>应对策略：</strong>{risk.mitigation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 下一步行动 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>下一步行动计划</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisData.nextSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge 
                            variant={step.priority === '高' ? 'destructive' : 'default'}
                            className={
                              step.priority === '高' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-blue-100 text-blue-800'
                            }
                          >
                            {step.priority}优先级
                          </Badge>
                          <span className="font-medium">{step.action}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{step.deadline}</span>
                          </div>
                          <span>负责人：{step.responsible}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
