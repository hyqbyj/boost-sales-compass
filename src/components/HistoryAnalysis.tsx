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
  // AI建议内容
  const aiSuggestions = [
    {
      id: 'empathy',
      title: "共情能力提升建议",
      description: "基于您当前的共情水平，建议重点提升情感识别和客户需求理解能力",
      suggestions: [
        "加强倾听技巧训练，学会捕捉客户语言中的情感信号和潜在需求",
        "练习同理心对话，从客户角度思考问题，增强情感共鸣能力",
        "学习情绪管理技巧，保持积极正面的沟通态度，避免情绪化回应",
        "通过角色扮演练习，体验不同类型客户的心理状态和需求痛点"
      ],
      color: "blue",
      icon: <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
    },
    {
      id: 'consensus',
      title: "共识建立提升建议",
      description: "您的共识能力中等，需要加强与客户建立信任和达成一致的技巧",
      suggestions: [
        "掌握SPIN提问技巧，通过引导式提问帮助客户澄清需求和期望",
        "学习价值对齐方法，找到客户关注点与产品价值的契合点",
        "提升异议处理能力，将客户疑虑转化为深度沟通的机会",
        "练习总结确认技巧，确保双方对关键信息的理解保持一致"
      ],
      color: "green",
      icon: <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
    },
    {
      id: 'action',
      title: "共行执行提升建议",
      description: "您的共行能力属于优势项目，建议保持并进一步精进",
      suggestions: [
        "优化时间管理和跟进节奏，确保承诺事项的及时执行",
        "建立客户期望管理体系，设定合理的执行时间线和里程碑",
        "加强团队协作能力，确保跨部门配合的高效执行",
        "持续改进工作流程，提升执行效率和客户满意度"
      ],
      color: "purple",
      icon: <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
    }
  ];

  // 颜色映射
  const colorMap = {
    blue: {
      border: "border-l-blue-500",
      dot: "bg-blue-500"
    },
    green: {
      border: "border-l-green-500",
      dot: "bg-green-500"
    },
    purple: {
      border: "border-l-purple-500",
      dot: "bg-purple-500"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      
      {/* AI建议部分 - 改为三列卡片布局 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <span>AI智能建议</span>
          </CardTitle>
          <CardDescription>
            基于三维能力画像分析，为您提供个性化的能力提升建议
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`border-l-4 ${colorMap[suggestion.color].border} bg-white rounded-lg shadow-sm h-full`}
              >
                <div className="p-5 h-full flex flex-col">
                  <div className="flex items-start mb-4">
                    {suggestion.icon}
                    <h3 className="text-lg font-semibold text-gray-900 ml-3">{suggestion.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{suggestion.description}</p>
                  <div className="space-y-3 flex-grow">
                    {suggestion.suggestions.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start">
                        <div className={`w-2 h-2 rounded-full mt-2 ${colorMap[suggestion.color].dot}`}></div>
                        <p className="text-gray-700 ml-2">{item}</p>
                      </div>
                    ))}
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