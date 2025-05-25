
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, Clock, Award, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearnerDashboard = () => {
  const { user, logout } = useAuth();

  const enrolledCourses = [
    {
      id: '1',
      title: 'React Fundamentals',
      instructor: 'John Doe',
      progress: 65,
      totalChapters: 24,
      completedChapters: 16,
      nextChapter: 'State Management with Hooks',
      estimatedTime: '2h 30m remaining',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      instructor: 'Jane Smith',
      progress: 30,
      totalChapters: 18,
      completedChapters: 5,
      nextChapter: 'Async/Await Patterns',
      estimatedTime: '4h 15m remaining',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400'
    },
    {
      id: '3',
      title: 'Node.js Backend Development',
      instructor: 'Mike Johnson',
      progress: 10,
      totalChapters: 32,
      completedChapters: 3,
      nextChapter: 'Express.js Setup',
      estimatedTime: '8h 45m remaining',
      thumbnail: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'
    }
  ];

  const achievements = [
    { title: 'First Course', description: 'Completed your first course', earned: true },
    { title: 'Fast Learner', description: 'Completed 5 chapters in one day', earned: true },
    { title: 'Consistent', description: '7-day learning streak', earned: false },
    { title: 'Expert', description: 'Completed 3 courses', earned: false }
  ];

  const stats = [
    { label: 'Courses Enrolled', value: '3', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Hours Learned', value: '24', icon: Clock, color: 'text-green-600' },
    { label: 'Certificates', value: '1', icon: Award, color: 'text-purple-600' },
    { label: 'Streak Days', value: '5', icon: TrendingUp, color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Learning Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Browse Courses
              </Button>
              <Button onClick={logout} variant="ghost" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{course.title}</h4>
                      <p className="text-sm text-gray-600">by {course.instructor}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{course.completedChapters}/{course.totalChapters} chapters</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <p className="text-sm text-blue-600 mt-1">Next: {course.nextChapter}</p>
                    </div>
                    <Link to={`/course/${course.id}`}>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning progress this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Completed', item: 'React Hooks Chapter', time: '2 hours ago' },
                    { action: 'Started', item: 'State Management Quiz', time: '1 day ago' },
                    { action: 'Earned', item: 'Fast Learner Badge', time: '2 days ago' },
                    { action: 'Completed', item: 'JavaScript Arrays Chapter', time: '3 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action} {activity.item}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Streak */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-100" />
                <div className="text-3xl font-bold mb-2">5 Days</div>
                <div className="text-blue-100">Learning Streak</div>
                <div className="text-sm text-blue-200 mt-2">
                  Keep it up! You're doing great.
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your learning milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                      <Award className={`w-6 h-6 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${achievement.earned ? 'text-green-900' : 'text-gray-600'}`}>
                          {achievement.title}
                        </p>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Earned
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
