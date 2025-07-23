
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Calendar, 
  Award, 
  MessageSquare, 
  Lightbulb,
  Brain
} from 'lucide-react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface HistoryAnalysisProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const HistoryAnalysis = ({ department }: HistoryAnalysisProps) => {
  // AI建议内容
  const aiSuggestions = [
    {
      id: 'empathy',
      title: "共情能力分析",
      description: "理解客户痛点、情绪与未明确表达的需求，建立信任关系",
      advantages: [
        "能够准确识别客户的情绪变化和语言信号",
        "在沟通过程中表现出良好的倾听能力",
        "能够从客户角度思考问题，理解客户需求"
      ],
      disadvantages: [
        "对客户深层次的情感需求挖掘不够深入",
        "在面对客户抱怨时情绪管理能力有待提升",
        "缺乏对不同类型客户的个性化共情策略"
      ],
      suggestions: [
        "加强情感识别训练，学会捕捉客户语言中的细微情感变化",
        "练习同理心对话技巧，建立更深层次的情感连接",
        "学习情绪调节方法，在客户情绪波动时保持专业和耐心",
        "针对不同客户类型制定个性化的共情沟通方案"
      ],
      color: "blue",
      icon: <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
    },
    {
      id: 'consensus',
      title: "共识建立分析",
      description: "基于共情成果，与客户达成解决方案共识，明确合作目标与路径",
      advantages: [
        "善于总结和确认客户的关键需求点",
        "能够有效地将产品价值与客户需求进行匹配",
        "在方案讨论中表现出良好的逻辑思维能力"
      ],
      disadvantages: [
        "在价值对齐过程中缺乏足够的说服力",
        "对客户异议的预判和处理能力不足",
        "在复杂方案讨论中容易失去客户的关注点"
      ],
      suggestions: [
        "掌握SPIN提问技巧，通过结构化提问建立共识",
        "学习价值量化方法，用数据和案例增强说服力",
        "提升异议处理技能，将客户疑虑转化为深度沟通机会",
        "建立方案确认机制，确保双方理解一致"
      ],
      color: "green",
      icon: <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
    },
    {
      id: 'action',
      title: "共行执行分析",
      description: "与客户协同推进方案落地，解决执行问题，实现预期价值",
      advantages: [
        "具备良好的项目推进和时间管理能力",
        "能够建立有效的客户沟通和反馈机制",
        "在执行过程中表现出较强的问题解决能力"
      ],
      disadvantages: [
        "在设定执行里程碑时缺乏足够的细致度",
        "对客户期望的管理和调整能力有待加强",
        "在跨部门协作中的沟通效率需要提升"
      ],
      suggestions: [
        "建立详细的执行计划和里程碑管理体系",
        "加强客户期望管理，及时调整和优化执行方案",
        "提升跨部门协作能力，确保团队高效配合",
        "建立持续改进机制，不断优化执行流程和效果"
      ],
      color: "purple",
      icon: <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
    }
  ];

  // 颜色映射
  const colorMap = {
    blue: {
      border: "border-l-blue-500",
      dot: "bg-blue-500",
      text: "text-blue-700"
    },
    green: {
      border: "border-l-green-500",
      dot: "bg-green-500",
      text: "text-green-700"
    },
    purple: {
      border: "border-l-purple-500",
      dot: "bg-purple-500",
      text: "text-purple-700"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* AI建议部分 - 填充整个页面 */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <span>AI智能建议</span>
          </CardTitle>
          <CardDescription>
            基于共情、共识、共行理论，为您提供个性化的能力提升建议
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`border-l-4 ${colorMap[suggestion.color].border} bg-white rounded-lg shadow-sm h-full`}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-start mb-4">
                    {suggestion.icon}
                    <h3 className="text-lg font-semibold text-gray-900 ml-3">{suggestion.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{suggestion.description}</p>
                  
                  <div className="space-y-6 flex-grow">
                    {/* 优点 */}
                    <div>
                      <h4 className={`font-semibold mb-3 ${colorMap[suggestion.color].text}`}>优点</h4>
                      <div className="space-y-2">
                        {suggestion.advantages.map((advantage, advIndex) => (
                          <div key={advIndex} className="flex items-start">
                            <div className={`w-2 h-2 rounded-full mt-2 ${colorMap[suggestion.color].dot}`}></div>
                            <p className="ml-3 text-sm text-black">{advantage}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 缺点 */}
                    <div>
                      <h4 className={`font-semibold mb-3 ${colorMap[suggestion.color].text}`}>缺点</h4>
                      <div className="space-y-2">
                        {suggestion.disadvantages.map((disadvantage, disIndex) => (
                          <div key={disIndex} className="flex items-start">
                            <div className={`w-2 h-2 rounded-full mt-2 ${colorMap[suggestion.color].dot}`}></div>
                            <p className="ml-3 text-sm text-black">{disadvantage}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 改进建议 */}
                    <div>
                      <h4 className={`font-semibold mb-3 ${colorMap[suggestion.color].text}`}>改进建议</h4>
                      <div className="space-y-2">
                        {suggestion.suggestions.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start">
                            <div className={`w-2 h-2 rounded-full mt-2 ${colorMap[suggestion.color].dot}`}></div>
                            <p className="ml-3 text-sm text-black">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
