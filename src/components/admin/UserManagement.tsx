
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Mail, Calendar, MoreVertical, Edit, Trash2, UserCheck } from 'lucide-react';
import { InviteUserDialog } from './InviteUserDialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'learner';
  joinDate: string;
  coursesEnrolled: number;
  status: 'active' | 'inactive';
}

export const UserManagement = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'learner',
      joinDate: '2024-01-15',
      coursesEnrolled: 3,
      status: 'active'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'learner',
      joinDate: '2024-02-20',
      coursesEnrolled: 2,
      status: 'active'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      role: 'admin',
      joinDate: '2024-01-10',
      coursesEnrolled: 0,
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Manage learners and administrators</p>
        </div>
        <InviteUserDialog />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="border-0 shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {user.email}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Joined {new Date(user.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {user.coursesEnrolled} courses enrolled
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCheck className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
