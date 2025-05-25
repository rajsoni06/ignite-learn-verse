
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, BookOpen, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  students: number;
  duration: string;
  status: 'published' | 'draft';
  sections: number;
}

export const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Learn the basics of React development',
      instructor: 'John Doe',
      students: 45,
      duration: '8 weeks',
      status: 'published',
      sections: 5
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      description: 'Deep dive into JavaScript concepts',
      instructor: 'Jane Smith',
      students: 32,
      duration: '6 weeks',
      status: 'draft',
      sections: 4
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: ''
  });

  const { toast } = useToast();

  const handleCreateCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      instructor: formData.instructor,
      duration: formData.duration,
      students: 0,
      status: 'draft',
      sections: 0
    };

    setCourses([...courses, newCourse]);
    setFormData({ title: '', description: '', instructor: '', duration: '' });
    setIsCreateOpen(false);
    
    toast({
      title: "Course created!",
      description: "Your new course has been created successfully.",
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
    toast({
      title: "Course deleted",
      description: "The course has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Course Management</h3>
          <p className="text-sm text-gray-600">Create and manage your learning content</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Add a new course to your learning platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter course description"
                />
              </div>
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  placeholder="Enter instructor name"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 8 weeks"
                />
              </div>
              <Button onClick={handleCreateCourse} className="w-full">
                Create Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {course.sections} sections
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {course.students} students
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {course.duration}
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Manage Content
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
