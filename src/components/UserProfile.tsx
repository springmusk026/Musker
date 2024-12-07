import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiCalendar, FiEdit2, FiSave, FiX } from 'react-icons/fi';

interface UserData {
  email: string;
  created_at: string;
  last_sign_in_at: string;
}

const UserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserData({
          email: user.email || '',
          created_at: user.created_at || '',
          last_sign_in_at: user.last_sign_in_at || ''
        });
      }
    } catch (error: any) {
      setError('Failed to fetch user data');
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("New passwords don't match");
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;
      
      setSuccess('Password updated successfully!');
      setIsEditingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-t-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 rounded-full p-4">
              <FiUser className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
              <p className="text-gray-400">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800/50 p-6 space-y-6">
          {/* Alerts */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError('')} className="text-red-500 hover:text-red-400">
                <FiX className="w-5 h-5" />
              </button>
            </div>
          )}
          {success && (
            <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded flex items-center justify-between">
              <span>{success}</span>
              <button onClick={() => setSuccess('')} className="text-green-500 hover:text-green-400">
                <FiX className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* User Information */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-3 text-gray-300 mb-2">
                <FiMail className="w-5 h-5" />
                <span className="font-semibold">Email Address</span>
              </div>
              <p className="text-white pl-8">{userData?.email}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-3 text-gray-300 mb-2">
                <FiCalendar className="w-5 h-5" />
                <span className="font-semibold">Account Created</span>
              </div>
              <p className="text-white pl-8">
                {userData?.created_at ? formatDate(userData.created_at) : 'N/A'}
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-3 text-gray-300 mb-2">
                <FiCalendar className="w-5 h-5" />
                <span className="font-semibold">Last Sign In</span>
              </div>
              <p className="text-white pl-8">
                {userData?.last_sign_in_at ? formatDate(userData.last_sign_in_at) : 'N/A'}
              </p>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <FiLock className="w-5 h-5" />
                <span className="font-semibold">Password</span>
              </div>
              <button
                onClick={() => setIsEditingPassword(!isEditingPassword)}
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-400 transition-colors"
              >
                {isEditingPassword ? (
                  <>
                    <FiX className="w-5 h-5" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <FiEdit2 className="w-5 h-5" />
                    <span>Change Password</span>
                  </>
                )}
              </button>
            </div>

            {isEditingPassword && (
              <form onSubmit={handlePasswordUpdate} className="space-y-4 mt-4">
                <div>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordData.confirmNewPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  <FiSave className="w-5 h-5" />
                  <span>{loading ? 'Updating...' : 'Update Password'}</span>
                </button>
              </form>
            )}
          </div>

          <div className="border-t border-gray-700 pt-6">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
