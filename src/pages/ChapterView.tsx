
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ChapterView = () => {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Mock chapter data - replace with API call
  const chapter = {
    id: chapterId,
    title: 'Handling Events',
    courseTitle: 'React Fundamentals',
    content: `
      In React, handling events is similar to handling events on DOM elements. React events are named using camelCase, 
      rather than lowercase. With JSX you pass a function as the event handler, rather than a string.
      
      Let's explore how to handle different types of events in React components.
    `,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'Which is the correct way to handle a click event in React?',
        options: [
          'onClick="handleClick()"',
          'onClick={handleClick}',
          'onclick={handleClick}',
          'on-click={handleClick}'
        ],
        correctAnswer: 'onClick={handleClick}',
        explanation: 'In React, event handlers are passed as functions, not strings, and use camelCase naming.'
      },
      {
        id: 2,
        type: 'fill-blank',
        question: 'Complete the code: <button ______={handleClick}>Click me</button>',
        correctAnswer: 'onClick',
        explanation: 'The onClick prop is used to handle click events in React.'
      },
      {
        id: 3,
        type: 'text',
        question: 'Explain the difference between onClick={handleClick} and onClick={handleClick()}',
        correctAnswer: 'onClick={handleClick} passes the function reference, while onClick={handleClick()} calls the function immediately',
        explanation: 'Passing the function reference allows React to call it when the event occurs, while calling it immediately would execute on render.'
      }
    ]
  };

  const currentQuestion = chapter.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / chapter.questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: value
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < chapter.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    chapter.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      if (userAnswer && userAnswer.toLowerCase().includes(question.correctAnswer.toLowerCase())) {
        correctCount++;
      }
    });
    
    const finalScore = (correctCount / chapter.questions.length) * 100;
    setScore(finalScore);
    setSubmitted(true);
    
    toast({
      title: "Chapter completed!",
      description: `You scored ${finalScore.toFixed(0)}% on this chapter.`,
    });
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'mcq':
        return (
          <div className="space-y-4">
            <RadioGroup
              value={answers[currentQuestionIndex] || ''}
              onValueChange={handleAnswerChange}
            >
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      
      case 'fill-blank':
        return (
          <div className="space-y-4">
            <Input
              value={answers[currentQuestionIndex] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Type your answer here..."
              className="text-lg"
            />
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-4">
            <Textarea
              value={answers[currentQuestionIndex] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[120px]"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Chapter Completed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-4xl font-bold text-green-600">{score.toFixed(0)}%</div>
            <p className="text-gray-600">
              Great job! You've completed "{chapter.title}" from {chapter.courseTitle}.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to={`/course/${courseId}`}>
                <Button variant="outline">Back to Course</Button>
              </Link>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Next Chapter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to={`/course/${courseId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Course
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{chapter.title}</h1>
                <p className="text-sm text-gray-600">{chapter.courseTitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentQuestionIndex + 1} of {chapter.questions.length}
              </div>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentQuestionIndex === 0 && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle>Chapter Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {chapter.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                Question {currentQuestionIndex + 1}
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="capitalize">{currentQuestion.type.replace('-', ' ')}</span>
                {currentQuestion.type === 'audio' && (
                  <Button variant="ghost" size="sm">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg font-medium text-gray-900 leading-relaxed">
              {currentQuestion.question}
            </div>
            
            {renderQuestion()}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex space-x-3">
                {currentQuestionIndex === chapter.questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!answers[currentQuestionIndex]}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Submit Chapter
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestionIndex]}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChapterView;
