import { SEO } from './SEO';

interface AuthSEOProps {
  type: 'login' | 'signup' | 'forgot-password' | 'verify-email';
}

export const AuthSEO = ({ type }: AuthSEOProps) => {
  const seoProps = {
    login: {
      title: 'Login to Musker',
      description: 'Log in to your Musker account to continue your AI conversations and access your personalized chat history.',
      keywords: 'login, sign in, Musker account, AI chat access',
    },
    signup: {
      title: 'Sign Up for Musker',
      description: 'Create your Musker account today and start experiencing next-generation AI conversations powered by SpringMusk technology.',
      keywords: 'sign up, create account, join Musker, AI chatbot registration',
    },
    'forgot-password': {
      title: 'Reset Your Password | Musker',
      description: 'Reset your Musker account password securely and regain access to your AI chat experience.',
      keywords: 'password reset, forgot password, account recovery, Musker help',
    },
    'verify-email': {
      title: 'Verify Your Email | Musker',
      description: 'Verify your email address to activate your Musker account and start chatting with our AI.',
      keywords: 'email verification, account activation, verify account, Musker setup',
    },
  }[type];

  return (
    <SEO
      title={seoProps.title}
      description={seoProps.description}
      keywords={seoProps.keywords}
      ogImage="/auth-preview.png"
    />
  );
};
