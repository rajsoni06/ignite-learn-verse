
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, BookOpen, Play, CheckCircle, Lock, Clock, Users } from 'lucide-react';

const CourseView = () => {
  const { courseId } = useParams();
  
  // Mock course data - replace with API call
  const course = {
    id: courseId,
    title: 'React Fundamentals',
    instructor: 'John Doe',
    description: 'Master the fundamentals of React development with hands-on projects and real-world examples.',
    totalChapters: 24,
    completedChapters: 16,
    progress: 65,
    estimatedTime: '8 weeks',
    students: 1247,
    sections: [
      {
        id: '1',
        title: 'Introduction to React',
        units: [
          {
            id: '1-1',
            title: 'Getting Started',
            chapters: [
              { id: '1-1-1', title: 'What is React?', completed: true, duration: '15 min' },
              { id: '1-1-2', title: 'Setting up Development Environment', completed: true, duration: '20 min' },
              { id: '1-1-3', title: 'Creating Your First React App', completed: true, duration: '25 min' }
            ]
          },
          {
            id: '1-2',
            title: 'React Basics',
            chapters: [
              { id: '1-2-1', title: 'JSX Syntax', completed: true, duration: '18 min' },
              { id: '1-2-2', title: 'Components and Props', completed: true, duration: '22 min' },
              { id: '1-2-3', title: 'Handling Events', completed: false, duration: '20 min' }
            ]
          }
        ]
      },
      {
        id: '2',
        title: 'State Management',
        units: [
          {
            id: '2-1',
            title: 'React Hooks',
            chapters: [
              { id: '2-1-1', title: 'useState Hook', completed: false, duration: '25 min' },
              { id: '2-1-2', title: 'useEffect Hook', completed: false, duration: '30 min' },
              { id: '2-1-3', title: 'Custom Hooks', completed: false, duration: '35 min' }
            ]
          }
        ]
      }
    ]
  };

  const getChapterStatus = (chapter: any) => {
    if (chapter.completed) return 'completed';
    // Check if this is the next chapter to unlock
    const allChapters = course.sections.flatMap(section => 
      section.units.flatMap(unit => unit.chapters)
    );
    const currentIndex = allChapters.findIndex(c => c.id === chapter.id);
    const completedCount = allChapters.slice(0, currentIndex).filter(c => c.completed).length;
    return completedCount === currentIndex ? 'current' : 'locked';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">{course.title}</h1>
              <p className="text-sm text-gray-600">by {course.instructor}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {course.totalChapters} chapters
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.estimatedTime}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students} students
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {course.sections.map((section) => (
                    <AccordionItem key={section.id} value={section.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">{section.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {section.units.map((unit) => (
                            <div key={unit.id} className="ml-4">
                              <h4 className="font-medium text-gray-900 mb-3">{unit.title}</h4>
                              <div className="space-y-2">
                                {unit.chapters.map((chapter) => {
                                  const status = getChapterStatus(chapter);
                                  return (
                                    <div key={chapter.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                                      status === 'completed' ? 'bg-green-50 border-green-200' :
                                      status === 'current' ? 'bg-blue-50 border-blue-200' :
                                      'bg-gray-50 border-gray-200'
                                    }`}>
                                      <div className="flex items-center space-x-3">
                                        {status === 'completed' ? (
                                          <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : status === 'current' ? (
                                          <Play className="w-5 h-5 text-blue-600" />
                                        ) : (
                                          <Lock className="w-5 h-5 text-gray-400" />
                                        )}
                                        <div>
                                          <p className={`font-medium ${
                                            status === 'locked' ? 'text-gray-400' : 'text-gray-900'
                                          }`}>
                                            {chapter.title}
                                          </p>
                                          <p className="text-sm text-gray-500">{chapter.duration}</p>
                                        </div>
                                      </div>
                                      {status !== 'locked' && (
                                        <Link to={`/course/${courseId}/chapter/${chapter.id}`}>
                                          <Button size="sm" variant={status === 'completed' ? 'outline' : 'default'}>
                                            {status === 'completed' ? 'Review' : 'Start'}
                                          </Button>
                                        </Link>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{course.completedChapters}</div>
                      <div className="text-xs text-gray-600">Completed</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">{course.totalChapters - course.completedChapters}</div>
                      <div className="text-xs text-gray-600">Remaining</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{course.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Instructor:</span>
                      <span className="font-medium">{course.instructor}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{course.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Badge className="bg-green-100 text-green-800">
                      Certificate Available
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
