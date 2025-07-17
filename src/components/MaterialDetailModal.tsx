
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Download, Eye, Play, BarChart3, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface MaterialDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: {
    title: string;
    type: string;
    description: string;
  };
}

export const MaterialDetailModal = ({ open, onOpenChange, material }: MaterialDetailModalProps) => {
  const materialData = {
    basicInfo: {
      title: material?.title || '产品功能深度解析',
      type: material?.type || '技术文档',
      description: material?.description || '详细介绍AI智能客服系统的核心功能和技术优势',
      version: 'v2.1',
      updateDate: '2024-01-15',
      size: '2.8MB',
      format: 'PDF',
      author: '产品团队'
    },
    content: {
      sections: [
        {
          title: '1. AI智能客服核心功能',
          subsections: [
            '1.1 智能对话引擎',
            '1.2 多轮对话管理',
            '1.3 情感识别与分析',
            '1.4 知识库智能检索'
          ]
        },
        {
          title: '2. 系统技术架构',
          subsections: [
            '2.1 云原生架构设计',
            '2.2 微服务技术栈',
            '2.3 数据安全保障',
            '2.4 系统性能优化'
          ]
        },
        {
          title: '3. 业务场景应用',
          subsections: [
            '3.1 医疗行业解决方案',
            '3.2 电商客服场景',
            '3.3 金融服务应用',
            '3.4 教育培训领域'
          ]
        }
      ],
      keyFeatures: [
        {
          name: '99.9%在线率',
          description: '7*24小时稳定服务，系统可用性达到99.9%',
          benefit: '确保客户服务不间断'
        },
        {
          name: 'AI智能学习',
          description: '基于深度学习算法，持续优化对话质量',
          benefit: '服务质量不断提升'
        },
        {
          name: '多渠道接入',
          description: '支持网页、微信、APP等多种渠道统一接入',
          benefit: '提升客户体验一致性'
        }
      ]
    },
    usage: {
      downloadCount: 1247,
      viewCount: 3892,
      lastAccessed: '2小时前',
      avgRating: 4.8,
      feedback: [
        { user: '张经理', rating: 5, comment: '内容详实，技术说明清晰' },
        { user: '李主管', rating: 5, comment: '对产品理解很有帮助' },
        { user: '王总监', rating: 4, comment: '希望增加更多实际案例' }
      ]
    },
    relatedMaterials: [
      { title: 'ROI分析报告', type: '数据报告', size: '1.2MB' },
      { title: '产品演示视频', type: '视频文件', size: '45MB' },
      { title: '客户成功案例', type: '案例文档', size: '800KB' },
      { title: '技术白皮书', type: '技术文档', size: '3.1MB' }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>素材详情 - {materialData.basicInfo.title}</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-6 pr-4">
            {/* 基本信息 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>基本信息</CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Eye className="w-4 h-4 mr-1" />
                      预览
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      下载
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">文档标题</p>
                      <p className="font-medium">{materialData.basicInfo.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">文档类型</p>
                      <Badge className="bg-blue-100 text-blue-800">{materialData.basicInfo.type}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">版本信息</p>
                      <p className="font-medium">{materialData.basicInfo.version}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">创建者</p>
                      <p className="font-medium">{materialData.basicInfo.author}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">更新时间</p>
                      <p className="font-medium">{materialData.basicInfo.updateDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">文件大小</p>
                      <p className="font-medium">{materialData.basicInfo.size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">文件格式</p>
                      <Badge variant="outline">{materialData.basicInfo.format}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">文档描述</p>
                      <p className="text-sm text-gray-700">{materialData.basicInfo.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 使用统计 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span>使用统计</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Download className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{materialData.usage.downloadCount}</p>
                    <p className="text-sm text-gray-600">下载次数</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Eye className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{materialData.usage.viewCount}</p>
                    <p className="text-sm text-gray-600">浏览次数</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-lg font-bold text-purple-600">{materialData.usage.lastAccessed}</p>
                    <p className="text-sm text-gray-600">最后访问</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-yellow-600 text-xl">★</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">{materialData.usage.avgRating}</p>
                    <p className="text-sm text-gray-600">平均评分</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 内容概览 */}
            <Card>
              <CardHeader>
                <CardTitle>内容概览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">目录结构</h4>
                    <div className="space-y-2">
                      {materialData.content.sections.map((section, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-l-4 border-blue-500 pl-4"
                        >
                          <p className="font-medium text-gray-900">{section.title}</p>
                          <div className="ml-4 mt-1 space-y-1">
                            {section.subsections.map((sub, subIndex) => (
                              <p key={subIndex} className="text-sm text-gray-600">• {sub}</p>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">核心特性</h4>
                    <div className="grid gap-3">
                      {materialData.content.keyFeatures.map((feature, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-blue-600">{feature.name}</h5>
                            <Badge variant="outline" className="bg-green-50 text-green-700">优势</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                          <p className="text-sm text-blue-700 font-medium">✓ {feature.benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 用户反馈 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>用户反馈</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {materialData.usage.feedback.map((item, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.user}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 相关素材 */}
            <Card>
              <CardHeader>
                <CardTitle>相关素材推荐</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {materialData.relatedMaterials.map((item, index) => (
                    <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{item.title}</span>
                        <Badge variant="outline" className="text-xs">{item.type}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">{item.size}</p>
                    </div>
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
