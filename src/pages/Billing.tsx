
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddBillingDialog } from "@/components/billing/AddBillingDialog";
import { BillingList } from "@/components/billing/BillingList";

export type BillingItem = {
  id: string;
  guestName: string;
  roomNumber: string;
  amount: number;
  description: string;
  date: string;
  status: "paid" | "pending" | "overdue";
}

export default function Billing() {
  const [billingItems, setBillingItems] = useState<BillingItem[]>([
    {
      id: "B12345",
      guestName: "John Doe",
      roomNumber: "302",
      amount: 12450.00,
      description: "Room service",
      date: "2025-04-28",
      status: "paid"
    },
    {
      id: "B12346",
      guestName: "Jane Smith",
      roomNumber: "405",
      amount: 6266.50,
      description: "Mini bar",
      date: "2025-04-29",
      status: "pending"
    },
    {
      id: "B12347",
      guestName: "Robert Johnson",
      roomNumber: "201",
      amount: 20750.00,
      description: "Late checkout fee",
      date: "2025-04-27",
      status: "overdue"
    }
  ]);

  const handleAddBilling = (newBill: BillingItem) => {
    setBillingItems(prev => [...prev, newBill]);
  };

  const filterBilling = (status: string) => {
    if (status === "all") {
      return billingItems;
    }
    return billingItems.filter(item => item.status === status);
  };

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
