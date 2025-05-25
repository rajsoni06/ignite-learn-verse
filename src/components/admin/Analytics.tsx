
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const enrollmentData = [
  { month: 'Jan', enrollments: 45 },
  { month: 'Feb', enrollments: 52 },
  { month: 'Mar', enrollments: 68 },
  { month: 'Apr', enrollments: 73 },
  { month: 'May', enrollments: 85 },
];

const courseCompletionData = [
  { course: 'React Fundamentals', completed: 78, total: 100 },
  { course: 'JavaScript Advanced', completed: 65, total: 80 },
  { course: 'Node.js Basics', completed: 45, total: 60 },
  { course: 'Python Intro', completed: 89, total: 95 },
];

const learningPathData = [
  { name: 'Frontend', value: 45, color: '#3B82F6' },
  { name: 'Backend', value: 30, color: '#8B5CF6' },
  { name: 'Mobile', value: 15, color: '#10B981' },
  { name: 'DevOps', value: 10, color: '#F59E0B' },
];

export const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
        <p className="text-sm text-gray-600">Track platform performance and user engagement</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Enrollments */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Monthly Enrollments</CardTitle>
            <CardDescription>New student registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="enrollments" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Completion Rates */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Course Completion Rates</CardTitle>
            <CardDescription>Student progress across different courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Learning Path Distribution */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Learning Path Distribution</CardTitle>
            <CardDescription>Popular learning tracks among students</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={learningPathData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {learningPathData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {learningPathData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key platform statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Average Completion Time</p>
                  <p className="text-2xl font-bold text-blue-600">3.2 weeks</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">Student Satisfaction</p>
                  <p className="text-2xl font-bold text-green-600">4.8/5</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-900">Knowledge Retention</p>
                  <p className="text-2xl font-bold text-purple-600">87%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
