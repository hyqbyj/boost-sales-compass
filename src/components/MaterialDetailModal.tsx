
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Eye, Clock, Tag } from 'lucide-react';

interface MaterialDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: {
    title: string;
    description: string;
    type: string;
  } | null;
}

export const MaterialDetailModal = ({ open, onOpenChange, material }: MaterialDetailModalProps) => {
  if (!material) {
    return null;
  }

  const materialDetails = {
    '同行业成功案例': {
      content: `# 北京协和医院智能CRM系统实施案例

## 项目背景
北京协和医院作为国内顶级医疗机构，面临着患者管理效率低下、复诊率不高等挑战。

## 解决方案
1. **智能患者分析系统**
   - AI驱动的患者行为分析
   - 个性化治疗方案推荐
   - 自动化随访提醒

2. **多渠道沟通平台**
   - 微信小程序集成
   - 短信自动发送
   - 电话智能外呼

## 实施效果
- 患者复诊率提升 **340%**
- 患者满意度达到 **98%**  
- 医生工作效率提升 **25%**
- 医院收入增长 **15%**

## 关键成功因素
1. 院方高层全力支持
2. 医护人员积极配合培训
3. 系统与HIS无缝集成
4. 持续的技术支持服务`,
      tags: ['成功案例', '医疗行业', 'ROI证明'],
      downloadUrl: '/materials/beijing-hospital-case.pdf',
      viewCount: 245,
      lastUpdated: '2024-01-15'
    },
    'ROI分析报告': {
      content: `# 智能CRM系统投资回报分析报告

## 成本构成分析
### 初期投资成本
- 软件授权费用：¥150,000/年
- 实施部署费用：¥80,000
- 培训费用：¥30,000
- **总初期投资：¥260,000**

### 运营成本
- 年度维护费用：¥45,000/年
- 系统升级费用：¥20,000/年
- **年运营成本：¥65,000**

## 收益分析
### 直接收益
1. **患者复诊率提升**
   - 提升幅度：35%
   - 年增收入：¥2,800,000

2. **运营效率提升**
   - 人力成本节省：¥180,000/年
   - 管理效率提升：¥120,000/年

3. **患者满意度提升**
   - 口碑传播价值：¥300,000/年
   - 品牌价值提升：¥200,000/年

### 投资回报计算
- **第一年ROI：540%**
- **投资回收期：3.2个月**
- **三年净收益：¥8,650,000**

## 风险评估
- 技术风险：低
- 市场风险：低  
- 运营风险：中等`,
      tags: ['ROI分析', '财务报告', '投资回报'],
      downloadUrl: '/materials/roi-analysis.pdf',
      viewCount: 189,
      lastUpdated: '2024-01-10'
    },
    '产品功能演示': {
      content: `# 智能CRM产品功能演示

## 核心功能模块

### 1. 智能客户分析
- **AI客户画像生成**
  - 自动分析客户通话记录
  - 生成详细的客户标签
  - 预测客户需求和行为

- **客户意向度评分**
  - 基于多维度数据分析
  - 实时更新意向度分数
  - 智能排序客户优先级

### 2. 自动化营销
- **个性化内容推送**
  - 根据客户特征推送相关内容
  - 多渠道内容分发
  - 效果追踪和优化

- **智能外呼系统**
  - 自动拨号和通话录音
  - 实时通话分析和提醒
  - 通话质量评估

### 3. 业绩分析dashboard
- **实时数据dashboard**
  - 关键指标实时监控
  - 个人和团队业绩对比
  - 趋势分析和预测

## 产品优势
1. **AI驱动** - 先进的人工智能技术
2. **易于使用** - 直观的用户界面设计
3. **高度定制** - 灵活的配置选项
4. **安全可靠** - 企业级安全保障

## 演示视频
- 基础功能演示：5分钟
- 高级功能演示：10分钟
- 客户案例分享：8分钟`,
      tags: ['产品演示', '功能介绍', '视频资料'],
      downloadUrl: '/materials/product-demo.mp4',
      viewCount: 167,
      lastUpdated: '2024-01-12'
    }
  };

  const currentMaterial = materialDetails[material.title as keyof typeof materialDetails] || {
    content: '详细内容加载中...',
    tags: [],
    downloadUrl: '#',
    viewCount: 0,
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>{material.title} - 详细内容</span>
          </DialogTitle>
          <DialogDescription>
            {material.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col space-y-4">
          {/* 素材信息 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">浏览 {currentMaterial.viewCount} 次</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">更新于 {currentMaterial.lastUpdated}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {currentMaterial.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* 素材内容 */}
          <ScrollArea className="flex-1">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-sm text-gray-700">
                    {currentMaterial.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollArea>

          {/* 操作按钮 */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                预览
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                下载原文件
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                关闭
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                发送给客户
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
