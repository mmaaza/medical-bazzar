import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const SettingsPage = () => {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      accountAlerts: true
    },
    pushNotifications: {
      orderUpdates: true,
      promotions: true,
      stockAlerts: false,
      priceDrops: true
    },
    privacy: {
      showProfile: true,
      shareActivity: false
    }
  });

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSaveSettings = () => {
    // Implementation for saving settings
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="bg-white rounded-lg shadow-mobile">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
            <div className="space-y-4">
              {Object.entries(settings.emailNotifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {key.split(/(?=[A-Z])/).join(' ')}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Receive {key.split(/(?=[A-Z])/).join(' ').toLowerCase()} via email
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('emailNotifications', key)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                      value ? 'bg-primary-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        value ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-white rounded-lg shadow-mobile">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
            <div className="space-y-4">
              {Object.entries(settings.pushNotifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {key.split(/(?=[A-Z])/).join(' ')}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Receive {key.split(/(?=[A-Z])/).join(' ').toLowerCase()} notifications
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('pushNotifications', key)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                      value ? 'bg-primary-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        value ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-lg shadow-mobile">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
            <div className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {key.split(/(?=[A-Z])/).join(' ')}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {key === 'showProfile' 
                        ? 'Allow other users to see your profile' 
                        : 'Share your activity with other users'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('privacy', key)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                      value ? 'bg-primary-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        value ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-lg shadow-mobile">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
            <div className="space-y-4">
              <button className="w-full md:w-auto text-sm font-medium text-secondary-500 hover:text-secondary-600">
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;