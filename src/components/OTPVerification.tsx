import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const EmailVerification: FC = () => {
  const location = useLocation();
  const email = location.state?.email || 'your email';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-blue-500/10 rounded-full p-4">
              <FiMail className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Check your email</h2>
            <p className="text-gray-400">
              We've sent a verification link to
            </p>
            <p className="text-blue-400 font-medium">{email}</p>
          </div>

          {/* Instructions */}
          <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
            <p className="text-gray-300 text-sm">
              To complete your registration:
            </p>
            <ol className="list-decimal list-inside text-gray-300 text-sm space-y-2">
              <li>Check your email inbox</li>
              <li>Click the verification link in the email</li>
              <li>Once verified, you can log in to your account</li>
            </ol>
          </div>

          {/* Additional Info */}
          <div className="text-center space-y-4">
            <p className="text-gray-400 text-sm">
              Didn't receive the email? Check your spam folder or try logging in again.
            </p>
            
            <div className="flex justify-center">
              <Link
                to="/login"
                className="flex items-center text-blue-500 hover:text-blue-400 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
