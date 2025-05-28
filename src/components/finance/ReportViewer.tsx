
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ReportViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportData: {
    type: string;
    startDate: string;
    endDate: string;
    format: string;
    includeCharts: boolean;
    includeBreakdown: boolean;
  } | null;
}

export function ReportViewer({ open, onOpenChange, reportData }: ReportViewerProps) {
  if (!reportData) return null;

  const mockData = {
    totalRevenue: 1230475,
    totalExpenses: 350094,
    netProfit: 880381,
    profitMargin: 71.5,
    transactions: [
      { date: "2025-05-27", description: "Room Revenue", amount: 45000, type: "income" },
      { date: "2025-05-26", description: "Restaurant Revenue", amount: 28000, type: "income" },
      { date: "2025-05-25", description: "Utilities", amount: -15000, type: "expense" },
      { date: "2025-05-24", description: "Room Revenue", amount: 52000, type: "income" },
      { date: "2025-05-23", description: "Staff Payroll", amount: -85000, type: "expense" },
    ]
  };

  const handleDownload = () => {
    // Create a simple CSV content for download
    const csvContent = `Date,Description,Amount,Type\n${mockData.transactions
      .map(t => `${t.date},${t.description},${t.amount},${t.type}`)
      .join('\n')}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-report-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Financial Report - {reportData.type.charAt(0).toUpperCase() + reportData.type.slice(1)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Report Header */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Report Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Period</div>
                  <div className="font-medium">
                    {format(new Date(reportData.startDate), "MMM dd")} - {format(new Date(reportData.endDate), "MMM dd, yyyy")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Report Type</div>
                  <div className="font-medium capitalize">{reportData.type}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Generated</div>
                  <div className="font-medium">{format(new Date(), "MMM dd, yyyy")}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Format</div>
                  <div className="font-medium uppercase">{reportData.format}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">₹{mockData.totalRevenue.toLocaleString('en-IN')}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">₹{mockData.totalExpenses.toLocaleString('en-IN')}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Net Profit</p>
                    <p className="text-2xl font-bold text-blue-600">₹{mockData.netProfit.toLocaleString('en-IN')}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Profit Margin</p>
                    <p className="text-2xl font-bold text-purple-600">{mockData.profitMargin}%</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Details */}
          {reportData.includeBreakdown && (
            <Card>
              <CardHeader>
                <CardTitle>Transaction Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Description</th>
                        <th className="text-right py-2">Amount</th>
                        <th className="text-center py-2">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.transactions.map((transaction, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{format(new Date(transaction.date), "MMM dd, yyyy")}</td>
                          <td className="py-2">{transaction.description}</td>
                          <td className={`py-2 text-right font-medium ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            ₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                          </td>
                          <td className="py-2 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              transaction.type === 'income' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {transaction.type === 'income' ? 'Income' : 'Expense'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Charts Placeholder */}
          {reportData.includeCharts && (
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Download Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
