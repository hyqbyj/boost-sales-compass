import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, MessageCircle, Phone, Mic, FileText, Lightbulb, Search, Filter, Clock, User, Star, Expand } from 'lucide-react';
import { motion } from 'framer-motion';
import { CommunicationDetailModal } from './CommunicationDetailModal';
import { ClientAnalysisModal } from './ClientAnalysisModal';
import { MaterialDetailModal } from './MaterialDetailModal';
import { LearningMaterialModal } from './LearningMaterialModal';

interface TodayTasksProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const TodayTasks = ({ department }: TodayTasksProps) => {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [communicationModalOpen, setCommunicationModalOpen] = useState(false);
  const [selectedClientForModal, setSelectedClientForModal] = useState<any>(null);
  const [clientAnalysisModalOpen, setClientAnalysisModalOpen] = useState(false);
  const [selectedClientForAnalysis, setSelectedClientForAnalysis] = useState<any>(null);
  const [materialDetailModalOpen, setMaterialDetailModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [learningModalOpen, setLearningModalOpen] = useState(false);
  const [selectedLearningMaterial, setSelectedLearningMaterial] = useState<any>(null);

  // 模拟客户数据 - 四个不同的客户背景
  const clients = [
    {
      id: '1',
      name: '北京协和医院',
      contact: '张主任',
      lastContact: 'kcall语音',
      dialogCount: 15,
      lastContactTime: '昨日 14:30',
      stage: '意向阶段',
      priority: 'high',
      tags: ['价格敏感', '意向强烈', '决策权限', '预算充足', '对比竞品'],
      concerns: ['成本控制', 'ROI分析', '实施周期'],
      recordUrl: '#',
      suggestion: '客户对价格高度敏感，建议重点展示产品的成本效益优势。准备详细的ROI分析报告，强调长期收益。可以提供分期付款方案，降低初期投资压力。重点对比竞品的性价比优势。',
      nextAction: '准备成本效益分析材料，制定分期方案',
      successRate: 78,
      analysisBackground: '医疗行业决策者，注重成本控制和投资回报，具有丰富的采购经验，倾向于理性决策。'
    },
    {
      id: '2', 
      name: '上海仁济医院',
      contact: '李院长',
      lastContact: '微信聊天',
      dialogCount: 8,
      lastContactTime: '昨日 16:45',
      stage: '潜在阶段',
      priority: 'high',
      tags: ['技术导向', '谨慎决策', '关注稳定性', '团队决策', '质量优先'],
      concerns: ['技术可靠性', '系统稳定性', '技术支持'],
      recordUrl: '#',
      suggestion: '客户为技术导向型决策者，高度重视产品的技术实力和稳定性。建议安排技术专家进行深度交流，提供详细的技术白皮书和架构说明。重点展示系统的稳定性测试报告和技术支持体系。',
      nextAction: '安排技术专家会议，准备技术文档',
      successRate: 85,
      analysisBackground: '院长级别决策者，技术背景深厚，注重产品的技术先进性和长期稳定性，决策过程较为严谨。'
    },
    {
      id: '3',
      name: '广州中山医院',
      contact: '王科长',
      lastContact: '微信语音', 
      dialogCount: 12,
      lastContactTime: '昨日 09:15',
      stage: '意向阶段',
      priority: 'urgent',
      tags: ['需求紧急', '时间敏感', '预算明确', '快速决策', '执行力强'],
      concerns: ['实施速度', '上线时间', '培训周期'],
      recordUrl: '#',
      suggestion: '客户需求非常紧急，时间是关键因素。建议立即提供快速实施方案，承诺加急服务。准备专门的实施团队和培训计划，确保快速上线。可以适当调整价格策略以换取时间优势。',
      nextAction: '制定快速实施方案，安排专项团队',
      successRate: 92,
      analysisBackground: '中层管理者，执行导向，面临紧急业务需求压力，需要快速解决方案，决策效率高。'
    },
    {
      id: '4',
      name: '深圳人民医院',
      contact: '陈主管',
      lastContact: 'kcall语音',
      dialogCount: 6,
      lastContactTime: '昨日 11:20',
      stage: '兴趣阶段',
      priority: 'medium',
      tags: ['初步了解', '多方比较', '流程规范', '审批严格', '风险规避'],
      concerns: ['合规性', '审批流程', '风险控制'],
      recordUrl: '#',
      suggestion: '客户处于初步了解阶段，注重流程规范和风险控制。建议先建立信任关系，提供详细的合规性文件和资质证明。重点介绍服务流程的标准化和风险控制措施，帮助客户理解审批要点。',
      nextAction: '准备合规资料，建立信任关系',
      successRate: 65,
      analysisBackground: '部门主管级别，严格按照制度流程执行，注重合规性和风险控制，决策需要上级审批。'
    }
  ];

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'kcall语音':
        return <Phone className="w-4 h-4" />;
      case '微信聊天':
        return <MessageCircle className="w-4 h-4" />;
      case '微信语音':
        return <Mic className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getContactBadgeColor = (type: string) => {
    switch (type) {
      case 'kcall语音':
        return 'bg-blue-100 text-blue-800';
      case '微信聊天':
        return 'bg-green-100 text-green-800';
      case '微信语音':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case '意向阶段':
        return 'bg-green-100 text-green-800';
      case '潜在阶段':
        return 'bg-blue-100 text-blue-800';
      case '兴趣阶段':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || client.stage === filterStage;
    const matchesMethod = filterMethod === 'all' || client.lastContact === filterMethod;
    return matchesSearch && matchesStage && matchesMethod;
  });

  const handleCommunicationDetailClick = (client: any) => {
    setSelectedClientForModal(client);
    setCommunicationModalOpen(true);
  };

  const handleAnalysisDetailClick = (client: any) => {
    setSelectedClientForAnalysis(client);
    setClientAnalysisModalOpen(true);
  };

  const handleMaterialDetailClick = (material: any) => {
    setSelectedMaterial(material);
    setMaterialDetailModalOpen(true);
  };

  const handleLearningClick = (material: any, type: 'continue' | 'start') => {
    setSelectedLearningMaterial({ ...material, type });
    setLearningModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* 页面头部统计 */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">重点客户</p>
                  <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">今日跟进</p>
                  <p className="text-2xl font-bold text-gray-900">{clients.filter(c => c.priority === 'urgent' || c.priority === 'high').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">高意向客户</p>
                  <p className="text-2xl font-bold text-gray-900">{clients.filter(c => c.stage === '意向阶段').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">平均成功率</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.round(clients.reduce((acc, c) => acc + c.successRate, 0) / clients.length)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 筛选和搜索 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span>重点客户列表</span>
              </CardTitle>
              <CardDescription>
                根据昨日沟通情况和客户意向度智能排序的重点跟进客户
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="搜索客户名称或联系人"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-60"
                />
              </div>
              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="客户阶段" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部阶段</SelectItem>
                  <SelectItem value="意向阶段">意向阶段</SelectItem>
                  <SelectItem value="潜在阶段">潜在阶段</SelectItem>
                  <SelectItem value="兴趣阶段">兴趣阶段</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterMethod} onValueChange={setFilterMethod}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="沟通方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部方式</SelectItem>
                  <SelectItem value="kcall语音">kcall语音</SelectItem>
                  <SelectItem value="微信聊天">微信聊天</SelectItem>
                  <SelectItem value="微信语音">微信语音</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold w-48">客户信息</TableHead>
                  <TableHead className="font-semibold w-36">昨日沟通</TableHead>
                  <TableHead className="font-semibold w-32">记录溯源</TableHead>
                  <TableHead className="font-semibold w-24">对话条数</TableHead>
                  <TableHead className="font-semibold w-64">客户标签</TableHead>
                  <TableHead className="font-semibold">沟通建议与下步行动</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client, index) => (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors cursor-pointer border-b"
                    onClick={() => setSelectedClient(client.id)}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{client.name}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(client.priority)}`}
                          >
                            {client.priority === 'urgent' ? '紧急' : 
                             client.priority === 'high' ? '重要' : '一般'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{client.contact}</div>
                        <div className="flex items-center space-x-1">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getStageColor(client.stage)}`}
                          >
                            {client.stage}
                          </Badge>
                          <span className="text-xs text-gray-500">成功率: {client.successRate}%</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Badge 
                          variant="secondary" 
                          className={`flex items-center space-x-1 ${getContactBadgeColor(client.lastContact)}`}
                        >
                          {getContactIcon(client.lastContact)}
                          <span>{client.lastContact}</span>
                        </Badge>
                        <div className="text-xs text-gray-500">{client.lastContactTime}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center space-x-1 hover:bg-blue-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAnalysisDetailClick(client);
                        }}
                      >
                        <FileText className="w-3 h-3" />
                        <span>查看解析</span>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {client.dialogCount}条
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {client.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex}
                              variant="secondary"
                              className="text-xs bg-blue-100 text-blue-800"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {client.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{client.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-600">
                          关注点: {client.concerns.join(', ')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="space-y-3">
                        <div className="text-sm text-gray-700 line-clamp-2">
                          {client.suggestion}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center space-x-1 hover:bg-blue-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCommunicationDetailClick(client);
                          }}
                        >
                          <Expand className="w-3 h-3" />
                          <span>查看详细建议</span>
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredClients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>暂无符合条件的客户数据</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <CommunicationDetailModal 
        open={communicationModalOpen}
        onOpenChange={setCommunicationModalOpen}
        client={selectedClientForModal}
      />

      <ClientAnalysisModal
        open={clientAnalysisModalOpen}
        onOpenChange={setClientAnalysisModalOpen}
        client={selectedClientForAnalysis}
      />

      <MaterialDetailModal
        open={materialDetailModalOpen}
        onOpenChange={setMaterialDetailModalOpen}
        material={selectedMaterial}
      />

      <LearningMaterialModal
        open={learningModalOpen}
        onOpenChange={setLearningModalOpen}
        material={selectedLearningMaterial}
      />
    </motion.div>
  );
};
