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

  // 模拟客户数据 - 更丰富的数据结构
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
      tags: ['在意低价', '意向阶段', '提及竞品', '决策权限', '预算充足'],
      concerns: ['价格敏感', '功能对比', 'ROI关注'],
      recordUrl: '#',
      suggestion: '基于客户价格敏感特点，建议强调产品ROI和分期付款方案。重点介绍相比竞品的成本优势，提供详细的投资回报分析报告。',
      nextAction: '准备ROI分析材料，安排产品演示',
      successRate: 78
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
      tags: ['决策者', '潜在阶段', '关注效果', '技术导向', '谨慎型'],
      concerns: ['技术稳定性', '实施周期', '培训成本'],
      recordUrl: '#',
      suggestion: '客户为决策层且技术导向，建议准备详细的技术方案和成功案例。重点展示系统稳定性和技术优势，提供同行业标杆客户案例。',
      nextAction: '发送技术白皮书，预约技术交流',
      successRate: 85
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
      tags: ['预算充足', '意向阶段', '急需解决方案', '时间紧迫', '已有初步意向'],
      concerns: ['实施速度', '服务保障', '合同条款'],
      recordUrl: '#',
      suggestion: '客户需求紧急且预算充足，建议立即安排产品演示和技术对接。准备快速实施方案和专属服务承诺，可适当让利换取快速成交。',
      nextAction: '紧急安排产品演示，准备合同草案',
      successRate: 92
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
      tags: ['初步了解', '兴趣阶段', '多方比较', '流程导向'],
      concerns: ['产品功能', '服务质量', '价格水平'],
      recordUrl: '#',
      suggestion: '客户处于初步了解阶段，建议先建立信任关系。发送基础产品介绍和客户案例，重点展示服务优势和产品稳定性。',
      nextAction: '发送产品手册，安排初步交流',
      successRate: 65
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

      {/* Fixed modal props - removed onMaterialDetailClick and onLearningClick from CommunicationDetailModal */}
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
