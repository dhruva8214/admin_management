
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PackageOpen, 
  Box, 
  Archive, 
  Settings, 
  Plus,
  AlertTriangle,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Sample inventory data
const inventory = [
  { 
    id: 1, 
    name: "Bath Towels (Large)", 
    category: "Linens", 
    stock: 245, 
    minStock: 50, 
    costPerUnit: 8.50, 
    supplier: "LinenMaster Inc." 
  },
  { 
    id: 2, 
    name: "Hand Soap (500ml)", 
    category: "Toiletries", 
    stock: 120, 
    minStock: 30, 
    costPerUnit: 3.25, 
    supplier: "CleanSupplies Co." 
  },
  { 
    id: 3, 
    name: "Toilet Paper", 
    category: "Toiletries", 
    stock: 325, 
    minStock: 100, 
    costPerUnit: 0.75, 
    supplier: "EcoProducts Ltd." 
  },
  { 
    id: 4, 
    name: "Bed Sheets (Queen)", 
    category: "Linens", 
    stock: 85, 
    minStock: 40, 
    costPerUnit: 24.99, 
    supplier: "LinenMaster Inc." 
  },
  { 
    id: 5, 
    name: "Light Bulbs (LED)", 
    category: "Maintenance", 
    stock: 48, 
    minStock: 30, 
    costPerUnit: 4.50, 
    supplier: "ElectroSupply" 
  },
  { 
    id: 6, 
    name: "Coffee Pods", 
    category: "Food & Beverage", 
    stock: 24, 
    minStock: 50, 
    costPerUnit: 0.60, 
    supplier: "GourmetCoffee Co." 
  }
];

// Sample purchase orders
const purchaseOrders = [
  { id: "PO-001", items: "Bath Towels, Hand Soap", supplier: "LinenMaster Inc.", cost: 1850, status: "delivered", date: "2025-04-12" },
  { id: "PO-002", items: "Coffee Pods, Tea Bags", supplier: "GourmetCoffee Co.", cost: 675, status: "pending", date: "2025-04-18" },
  { id: "PO-003", items: "Toilet Paper, Tissues", supplier: "EcoProducts Ltd.", cost: 980, status: "shipped", date: "2025-04-15" },
  { id: "PO-004", items: "Cleaning Supplies", supplier: "CleanSupplies Co.", cost: 1250, status: "pending", date: "2025-04-20" },
];

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter(item => item.stock <= item.minStock).length;
  const totalItems = inventory.reduce((sum, item) => sum + item.stock, 0);
  const totalValue = inventory.reduce((sum, item) => sum + (item.stock * item.costPerUnit), 0);

  return (
    <MainLayout title="Inventory & Purchasing">
      <div className="space-y-6">
        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-blue-800">Total Products</CardTitle>
              <Box className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">{inventory.length}</div>
              <p className="text-sm text-blue-700 mt-1">Categories: {new Set(inventory.map(i => i.category)).size}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-amber-800">Low Stock Items</CardTitle>
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900">{lowStockItems}</div>
              <p className="text-sm text-amber-700 mt-1">Need reordering</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium text-green-800">Inventory Value</CardTitle>
              <PackageOpen className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">${totalValue.toLocaleString()}</div>
              <p className="text-sm text-green-700 mt-1">Total items: {totalItems}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Archive className="h-4 w-4" />
              <span>Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="purchasing" className="flex items-center gap-2">
              <Box className="h-4 w-4" />
              <span>Purchase Orders</span>
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Suppliers</span>
            </TabsTrigger>
          </TabsList>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search inventory..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Linens">Linens</SelectItem>
                    <SelectItem value="Toiletries">Toiletries</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>

            <Card>
              <CardContent className="p-0 pt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock Level</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInventory.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              item.category === "Linens" ? "bg-blue-100 text-blue-800 border-blue-200" :
                              item.category === "Toiletries" ? "bg-purple-100 text-purple-800 border-purple-200" :
                              item.category === "Maintenance" ? "bg-amber-100 text-amber-800 border-amber-200" :
                              "bg-green-100 text-green-800 border-green-200"
                            }>
                              {item.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>{item.stock} in stock</span>
                                <span className={item.stock <= item.minStock ? "text-red-500" : ""}>
                                  Min: {item.minStock}
                                </span>
                              </div>
                              <Progress 
                                value={(item.stock / Math.max(item.stock, item.minStock * 2)) * 100} 
                                className={item.stock <= item.minStock ? "bg-red-100" : ""}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">${item.costPerUnit.toFixed(2)}</TableCell>
                          <TableCell>{item.supplier}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">Update</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Purchase Orders Tab */}
          <TabsContent value="purchasing" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Purchase Orders</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Order
              </Button>
            </div>

            <Card>
              <CardContent className="p-0 pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseOrders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.supplier}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            order.status === "delivered" ? "bg-green-100 text-green-800 border-green-200" :
                            order.status === "shipped" ? "bg-blue-100 text-blue-800 border-blue-200" :
                            "bg-amber-100 text-amber-800 border-amber-200"
                          }>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${order.cost.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Supplier Management</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Supplier
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>LinenMaster Inc.</CardTitle>
                  <CardDescription>Linens & Textiles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contact:</span>
                      <span>Sarah Johnson</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>orders@linenmaster.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lead Time:</span>
                      <span>3-5 days</span>
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                      <Button variant="outline" size="sm">Orders</Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>CleanSupplies Co.</CardTitle>
                  <CardDescription>Cleaning & Toiletries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contact:</span>
                      <span>Michael Roberts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>+1 (555) 987-6543</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>sales@cleansupplies.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lead Time:</span>
                      <span>2-4 days</span>
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                      <Button variant="outline" size="sm">Orders</Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>EcoProducts Ltd.</CardTitle>
                  <CardDescription>Eco-friendly Products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contact:</span>
                      <span>Emma Taylor</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>+1 (555) 456-7890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>info@ecoproducts.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lead Time:</span>
                      <span>5-7 days</span>
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
                      <Button variant="outline" size="sm">Orders</Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
