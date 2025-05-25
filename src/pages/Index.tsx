
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, TrendingUp, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user, logout } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Courses",
      description: "Structured learning paths with engaging content and real-time feedback"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience"
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn recognized certificates upon course completion"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IgniteLearn
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                    <Button variant="outline" size="sm">Dashboard</Button>
                  </Link>
                  <Button onClick={logout} variant="ghost" size="sm">Logout</Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Learn. Grow.{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Excel.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your skills with our interactive learning platform. Access expert-designed courses, 
              track your progress, and achieve your learning goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user && (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                      Start Learning
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose IgniteLearn?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with proven learning methodologies 
              to deliver an exceptional educational experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners who have transformed their careers with IgniteLearn.
          </p>
          {!user && (
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">IgniteLearn</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 IgniteLearn. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
