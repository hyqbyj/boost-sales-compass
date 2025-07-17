
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Target, MessageSquare, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface HistoryAnalysisProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const HistoryAnalysis = ({ department }: HistoryAnalysisProps) => {
  // Mock historical analysis data
  const skillAnalysis = {
    communication: 85,
    negotiation: 72,
    closing: 68,
    relationship: 90,
    product_knowledge: 78
  };

  const monthlyTrends = [
    { month: '1月', calls: 820, conversion: 12.5 },
    { month: '2月', calls: 950, conversion: 15.2 },
    { month: '3月', calls: 1100, conversion: 18.7 },
    { month: '4月', calls: 1250, conversion: 22.1 }
  ];

  const improvements = [
    {
      category: '话术优化',
      suggestion: '在价格异议处理环节，建议学习销冠张三的分期方案介绍技巧',
      priority: 'high',
      resource: '销冠SOP-价格异议处理.pdf'
    },
    {
      category: '产品介绍',
      suggestion: '针对医疗行业客户，加强AI客服ROI计算方法的掌握',
      priority: 'medium', 
      resource: '医疗行业成功案例合集.docx'
    },
    {
      category: '客户关系',
      suggestion: '保持现有优势，继续发挥在客户关系维护方面的强项',
      priority: 'low',
      resource: '客户关系维护最佳实践.pdf'
    }
  ];

  const getSkillColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">高优先级</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">中优先级</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">低优先级</Badge>;
      default:
        return <Badge variant="secondary">普通</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Skill Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span>能力画像分析</span>
            </CardTitle>
            <CardDescription>
              基于历史工作数据的综合能力评估
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {Object.entries(skillAnalysis).map(([skill, score], index) => {
                const skillNames = {
                  communication: '沟通能力',
                  negotiation: '谈判技巧', 
                  closing: '成交能力',
                  relationship: '客户关系',
                  product_knowledge: '产品知识'
                };
                
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-center space-y-3"
                  >
                    <div className="relative w-20 h-20 mx-auto">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={score >= 80 ? "#10B981" : score >= 70 ? "#F59E0B" : "#EF4444"}
                          strokeWidth="2"
                          strokeDasharray={`${score}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-lg font-bold ${getSkillColor(score)}`}>
                          {score}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {skillNames[skill as keyof typeof skillNames]}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {score >= 80 ? '优秀' : score >= 70 ? '良好' : '需提升'}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>历史业绩趋势</span>
            </CardTitle>
            <CardDescription>
              近4个月工作表现趋势分析
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {monthlyTrends.map((trend, index) => (
                <motion.div
                  key={trend.month}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <h3 className="font-semibold text-gray-900">{trend.month}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">外呼量</p>
                    <p className="text-lg font-bold text-blue-600">{trend.calls}</p>
                    <p className="text-sm text-gray-600">转化率</p>
                    <p className="text-lg font-bold text-green-600">{trend.conversion}%</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Improvement Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span>技能提升建议</span>
            </CardTitle>
            <CardDescription>
              基于销冠SOP系统的个性化改进建议
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {improvements.map((improvement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <h3 className="font-medium text-gray-900">{improvement.category}</h3>
                    </div>
                    {getPriorityBadge(improvement.priority)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{improvement.suggestion}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 font-medium">
                      📎 {improvement.resource}
                    </span>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      查看详情 →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
