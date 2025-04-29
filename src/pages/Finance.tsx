
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart2, 
  CreditCard, 
  DollarSign, 
  Receipt, 
  Wallet, 
  CircleDollarSign,
  CirclePercent 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RevenueChart from "@/components/dashboard/RevenueChart";

// Sample financial data
const expenses = [
  { id: 1, category: "Utilities", amount: 2450, date: "2025-04-12" },
  { id: 2, category: "Supplies", amount: 1875, date: "2025-04-10" },
  { id: 3, category: "Maintenance", amount: 3200, date: "2025-04-08" },
  { id: 4, category: "Staff Payroll", amount: 12500, date: "2025-04-05" },
  { id: 5, category: "Marketing", amount: 1650, date: "2025-04-02" },
];

const invoices = [
  { id: "INV-001", guest: "Michael Brown", amount: 1250, status: "paid", date: "2025-04-15" },
  { id: "INV-002", guest: "Emma Watson", amount: 2350, status: "pending", date: "2025-04-14" },
  { id: "INV-003", guest: "James Smith", amount: 1850, status: "paid", date: "2025-04-12" },
  { id: "INV-004", guest: "Olivia Davis", amount: 3100, status: "overdue", date: "2025-04-08" },
  { id: "INV-005", guest: "William Johnson", amount: 950, status: "paid", date: "2025-04-05" },
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout title="Financial Management">
      <div className="space-y-6">
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-blue-800">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">$148,250</div>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <span className="inline-block mr-1">↑</span> 12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-green-800">Expenses</CardTitle>
              <CreditCard className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">$42,180</div>
              <p className="text-sm text-red-600 mt-2 flex items-center">
                <span className="inline-block mr-1">↑</span> 8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-purple-800">Profit Margin</CardTitle>
              <CirclePercent className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">32.4%</div>
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <span className="inline-block mr-1">↑</span> 3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-amber-800">Outstanding</CardTitle>
              <CircleDollarSign className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900">$14,580</div>
              <p className="text-sm text-red-600 mt-2 flex items-center">
                <span className="inline-block mr-1">↓</span> 5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Management Tabs */}
        <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6 bg-muted/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              <span>Invoices</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span>Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Analysis of your monthly revenue</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] pt-4">
                <RevenueChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Invoices</CardTitle>
                    <CardDescription>Manage your customer invoices</CardDescription>
                  </div>
                  <Button size="sm">New Invoice</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Invoice</th>
                        <th className="text-left py-3 px-4">Guest</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(invoice => (
                        <tr key={invoice.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">{invoice.id}</td>
                          <td className="py-3 px-4">{invoice.guest}</td>
                          <td className="py-3 px-4">${invoice.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">{invoice.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              invoice.status === 'paid' 
                                ? 'bg-green-100 text-green-800' 
                                : invoice.status === 'pending' 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm">View All Invoices</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Expenses</CardTitle>
                    <CardDescription>Track your business expenses</CardDescription>
                  </div>
                  <Button size="sm">Record Expense</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Category</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map(expense => (
                        <tr key={expense.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">{expense.category}</td>
                          <td className="py-3 px-4">${expense.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">{expense.date}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm">View All Expenses</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Financial Reports</CardTitle>
                    <CardDescription>Generate and export financial reports</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Monthly P&L</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center py-6">
                      <BarChart2 className="h-16 w-16 text-blue-500" />
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">Generate Report</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Revenue Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center py-6">
                      <DollarSign className="h-16 w-16 text-green-500" />
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">Generate Report</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
