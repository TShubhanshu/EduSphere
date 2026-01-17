import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: 'Rich Content',
      description: 'Create and share educational content with our powerful editor',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with learners and educators from around the world',
    },
    {
      icon: Award,
      title: 'Achievement',
      description: 'Track your progress and celebrate your learning milestones',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'Continuous learning with personalized recommendations',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-20 xl:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl xl:text-6xl font-bold tracking-tight">
              Welcome to <span className="gradient-text">Edusphere</span>
            </h1>
            <p className="text-lg xl:text-xl text-muted-foreground">
              Your comprehensive platform for learning, sharing, and growing together.
              Join our community of passionate learners and educators.
            </p>
            <div className="flex flex-col max-sm:flex-col sm:flex-row gap-4 justify-center pt-4">
              {user ? (
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">Why Choose Edusphere?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, manage, and share educational content in one place
            </p>
          </div>
          <div className="grid grid-cols-1 max-sm:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-hover transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-muted/30">
        <div className="container">
          <Card className="max-w-4xl mx-auto border-primary/20">
            <CardContent className="p-8 xl:p-12">
              <div className="text-center space-y-6">
                <h2 className="text-3xl xl:text-4xl font-bold">Ready to Start Learning?</h2>
                <p className="text-muted-foreground text-lg">
                  Join thousands of learners and educators already using Edusphere
                </p>
                {!user && (
                  <Button size="lg" asChild>
                    <Link to="/signup">
                      Create Your Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
