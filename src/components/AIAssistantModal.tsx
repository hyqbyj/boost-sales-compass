
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Lightbulb, FileText, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAssistantModalProps {
  open: boolean;
  onClose: () => void;
}

export const AIAssistantModal = ({ open, onClose }: AIAssistantModalProps) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      content: '您好！我是您的销售AI助理，可以帮您解答销售话术、分析客户情况、查看业绩数据等。请选择您需要的帮助：',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const presetPrompts = [
    {
      icon: <Lightbulb className="w-4 h-4" />,
      text: '如何跟进价格敏感客户？',
      category: '销售技巧'
    },
    {
      icon: <FileText className="w-4 h-4" />,
      text: '展示医疗版拓客CRM话术',
      category: '产品话术'
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      text: '生成我的业绩报告摘要',
      category: '数据分析'
    }
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: 'bot' as const,
        content: generateAIResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (message: string) => {
    if (message.includes('价格敏感')) {
      return `针对价格敏感客户，建议采用以下策略：

1. **强调价值而非价格**
   - 突出产品ROI和长期收益
   - 提供具体的成本节约案例

2. **分期付款方案**
   - 提供灵活的付款选择
   - 降低客户的资金压力

3. **竞品对比**
   - 展示我们产品的性价比优势
   - 提供功能对比表

4. **试用期优惠**
   - 提供免费试用机会
   - 让客户体验产品价值

需要具体的话术模板吗？我可以为您提供更详细的对话脚本。`;
    }

    if (message.includes('医疗版') || message.includes('CRM')) {
      return `医疗版拓客CRM推荐话术：

**开场白：**
"您好[客户姓名]，我是[公司名]的[姓名]。了解到贵院在患者管理方面一直很注重，我们专门为医疗机构开发了一套智能拓客CRM系统..."

**核心卖点：**
• 专为医疗行业设计的患者管理系统
• AI智能分析患者需求和行为
• 提升患者满意度和复诊率
• 合规的医疗数据处理

**成功案例：**
"北京协和医院使用我们系统后，患者复诊率提升了35%，客户满意度达到了98%..."

需要完整的对话流程图吗？`;
    }

    if (message.includes('业绩') || message.includes('报告')) {
      return `您的业绩报告摘要：

**本月表现：**
• 30S有效外呼：32/40 (80% 达标率)
• 微信深聊：18/25 (72% 达标率)
• 客户转化率：15.2% (↑2.1% vs上月)

**优势领域：**
• 客户关系维护：90分 (优秀)
• 沟通能力：85分 (优秀)

**待提升点：**
• 成交能力：68分，建议加强价格异议处理技巧
• 产品知识：78分，建议深入学习AI客服ROI计算方法

**本周目标：**
• 每日外呼量需增加2个以达标
• 重点跟进3个高意向客户

需要详细的改进计划吗？`;
    }

    return `我理解您的问题。作为您的销售AI助理，我可以帮您：

• 提供销售话术和技巧指导
• 分析客户情况和跟进建议  
• 生成业绩数据和改进建议
• 推荐相关的销售素材和案例

请告诉我您具体需要哪方面的帮助，我会为您提供更精准的建议。`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <span>销售AI助理</span>
          </DialogTitle>
          <DialogDescription>
            智能销售助手，随时为您提供专业建议
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col space-y-4">
          {/* Preset Prompts */}
          <div className="flex flex-wrap gap-2">
            {presetPrompts.map((prompt, index) => (
              <motion.button
                key={index}
                onClick={() => handleSendMessage(prompt.text)}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {prompt.icon}
                <span>{prompt.text}</span>
              </motion.button>
            ))}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-600' : 'bg-gray-100'}`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className={`px-4 py-2 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="输入您的问题..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
              className="flex-1"
            />
            <Button 
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
