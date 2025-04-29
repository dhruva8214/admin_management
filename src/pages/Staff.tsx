
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NewStaffDialog } from "@/components/staff/NewStaffDialog";

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: "housekeeping" | "front-desk" | "maintenance" | "kitchen" | "management";
  status: "active" | "on-leave" | "terminated";
  joinDate: string;
}

const initialStaff: Staff[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 234 567 890',
    position: 'Manager',
    department: 'management',
    status: 'active',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 234 567 891',
    position: 'Receptionist',
    department: 'front-desk',
    status: 'active',
    joinDate: '2023-03-10'
  }
];

const departmentColors = {
  'housekeeping': 'bg-purple-100 text-purple-800 border-purple-200',
  'front-desk': 'bg-blue-100 text-blue-800 border-blue-200',
  'maintenance': 'bg-amber-100 text-amber-800 border-amber-200',
  'kitchen': 'bg-green-100 text-green-800 border-green-200',
  'management': 'bg-gray-100 text-gray-800 border-gray-200'
};

const statusColors = {
  'active': 'bg-green-100 text-green-800 border-green-200',
  'on-leave': 'bg-amber-100 text-amber-800 border-amber-200',
  'terminated': 'bg-red-100 text-red-800 border-red-200'
};

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState('');
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff);

  const filteredStaff = staffList.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = (newStaff: Staff) => {
    setStaffList(prev => [...prev, newStaff]);
  };

  return (
    <MainLayout title="Staff Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="w-72">
            <Input 
              placeholder="Search staff..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <NewStaffDialog onStaffAdded={handleAddStaff} />
        </div>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell>{staff.position}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(departmentColors[staff.department])}>
                      {staff.department.charAt(0).toUpperCase() + staff.department.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(statusColors[staff.status])}>
                      {staff.status === 'on-leave' ? 'On Leave' : staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(staff.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{staff.email}</p>
                      <p className="text-muted-foreground">{staff.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
