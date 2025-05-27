
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddBillingDialog } from "@/components/billing/AddBillingDialog";
import { BillingList } from "@/components/billing/BillingList";
import { useBilling, BillingItem } from "@/hooks/useBilling";
import { Skeleton } from "@/components/ui/skeleton";

export default function Billing() {
  const { billingItems, loading, addBilling } = useBilling();

  const handleAddBilling = (newBill: BillingItem) => {
    addBilling(newBill);
  };

  const filterBilling = (status: string) => {
    if (status === "all") {
      return billingItems;
    }
    return billingItems.filter(item => item.status === status);
  };

  if (loading) {
    return (
      <MainLayout title="Billing">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Billing">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Guest Billing</h2>
          <AddBillingDialog onBillingAdded={handleAddBilling} />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <BillingList items={filterBilling("all")} />
          </TabsContent>
          
          <TabsContent value="paid">
            <BillingList items={filterBilling("paid")} />
          </TabsContent>
          
          <TabsContent value="pending">
            <BillingList items={filterBilling("pending")} />
          </TabsContent>
          
          <TabsContent value="overdue">
            <BillingList items={filterBilling("overdue")} />
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Billing Overview</CardTitle>
            <CardDescription>
              Summary of all guest billing activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Billed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    ₹{billingItems.reduce((sum, item) => sum + item.amount, 0).toLocaleString('en-IN')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Outstanding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    ₹{billingItems
                      .filter(item => item.status !== "paid")
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toLocaleString('en-IN')}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Collected</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    ₹{billingItems
                      .filter(item => item.status === "paid")
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toLocaleString('en-IN')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export type { BillingItem };
