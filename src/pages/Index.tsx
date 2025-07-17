
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, QrCode, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const navigate = useNavigate();

  const handlePhoneLogin = async () => {
    if (!showCodeInput) {
      // Simulate sending SMS
      setShowCodeInput(true);
      return;
    }
    
    // Simulate successful login - redirect to department-specific dashboard
    // In real implementation, this would check user's department from API
    const userDepartment = 'dept1'; // Mock department
    navigate(`/dashboard/${userDepartment}`);
  };

  const handleDingTalkLogin = () => {
    // Simulate DingTalk OAuth login
    const userDepartment = 'dept1'; // Mock department
    navigate(`/dashboard/${userDepartment}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">销售部员工AI助理</h1>
          <p className="text-gray-600">提升销售效率，智能业绩管理</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-center">企业登录</CardTitle>
            <CardDescription className="text-center">
              选择您的登录方式
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dingtalk" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dingtalk" className="flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  钉钉登录
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  手机验证
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dingtalk" className="mt-6">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">钉钉扫码登录</p>
                    </div>
                  </div>
                  <Button onClick={handleDingTalkLogin} className="w-full bg-blue-600 hover:bg-blue-700">
                    模拟钉钉登录
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="phone" className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">手机号码</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="请输入手机号码"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                {showCodeInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <Label htmlFor="code">验证码</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="请输入验证码"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  </motion.div>
                )}

                <Button 
                  onClick={handlePhoneLogin} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!phone}
                >
                  {showCodeInput ? '登录' : '获取验证码'}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          仅限企业内部员工使用
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
