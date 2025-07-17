
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, MessageCircle, Phone, Mic, FileText, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface TodayTasksProps {
  department: {
    name: string;
    type: string;
    kpis: any[];
  };
}

export const TodayTasks = ({ department }: TodayTasksProps) => {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  // Mock client data
  const clients = [
    {
      id: '1',
      name: '北京协和医院',
      lastContact: 'kcall语音',
      dialogCount: 15,
      tags: ['在意低价', '意向阶段', '提及竞品'],
      recordUrl: '#',
      suggestion: '基于客户价格敏感特点，建议强调产品ROI和分期付款方案'
    },
    {
      id: '2', 
      name: '上海仁济医院',
      lastContact: '微信聊天',
      dialogCount: 8,
      tags: ['决策者', '潜在阶段', '关注效果'],
      recordUrl: '#',
      suggestion: '客户为决策层，建议准备详细的产品演示和成功案例'
    },
    {
      id: '3',
      name: '广州中山医院',
      lastContact: '微信语音', 
      dialogCount: 12,
      tags: ['预算充足', '意向阶段', '急需解决方案'],
      recordUrl: '#',
      suggestion: '客户需求紧急，建议尽快安排产品演示和技术对接'
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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>重点客户列表</span>
            </CardTitle>
            <CardDescription>
              今日需要跟进的重点客户，基于昨日沟通情况智能排序
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">客户名</TableHead>
                    <TableHead className="font-semibold">昨日沟通方式</TableHead>
                    <TableHead className="font-semibold">沟通记录溯源</TableHead>
                    <TableHead className="font-semibold">对话条数</TableHead>
                    <TableHead className="font-semibold">客户标签</TableHead>
                    <TableHead className="font-semibold">沟通建议</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client, index) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedClient(client.id)}
                    >
                      <TableCell className="font-medium text-gray-900">
                        {client.name}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={`flex items-center space-x-1 ${getContactBadgeColor(client.lastContact)}`}
                        >
                          {getContactIcon(client.lastContact)}
                          <span>{client.lastContact}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <FileText className="w-3 h-3" />
                          <span>查看解析</span>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {client.dialogCount}条
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {client.tags.map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex}
                              variant="secondary"
                              className="text-xs bg-yellow-100 text-yellow-800"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {client.suggestion}
                          </p>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">批量外呼</h3>
                <p className="text-sm text-gray-500">一键开始今日外呼任务</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">微信跟进</h3>
                <p className="text-sm text-gray-500">查看待回复微信消息</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">素材库</h3>
                <p className="text-sm text-gray-500">获取销售话术和素材</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
