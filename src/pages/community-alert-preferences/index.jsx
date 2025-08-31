import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ThreatTypePreferences from './components/ThreatTypePreferences';
import GeographicPreferences from './components/GeographicPreferences';
import SeverityLevelSettings from './components/SeverityLevelSettings';
import CommunicationChannels from './components/CommunicationChannels';
import AdvancedSettings from './components/AdvancedSettings';
import PreferenceSummary from './components/PreferenceSummary';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CommunityAlertPreferences = () => {
  const [activeTab, setActiveTab] = useState('threats');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock user preferences data
  const [preferences, setPreferences] = useState({
    threatTypes: ['sea_level_rise', 'weather_warnings'],
    monitoredAreas: [
      { id: 'miami_beach', name: 'Miami Beach, FL', type: 'predefined' },
      { id: 'custom_1', name: 'Coral Gables Marina', type: 'custom' }
    ],
    monitoringRadius: '25',
    severityLevels: ['warning', 'emergency'],
    communicationChannels: ['push_notifications', 'sms'],
    contactInfo: {
      phone: '+1 (305) 555-0123',
      email: 'user@coastalcommunity.org',
      emergencyContact: '+1 (305) 555-0456'
    },
    deliveryTiming: 'fast',
    language: 'en',
    timezone: 'America/New_York',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '07:00'
    },
    alertFrequency: 'immediate',
    dataSharing: {
      anonymous: true,
      feedback: true,
      location: false
    }
  });

  const tabs = [
    {
      id: 'threats',
      name: 'Threat Types',
      icon: 'Shield',
      description: 'Choose alert types'
    },
    {
      id: 'areas',
      name: 'Geographic Areas',
      icon: 'MapPin',
      description: 'Select monitoring zones'
    },
    {
      id: 'severity',
      name: 'Severity Levels',
      icon: 'Gauge',
      description: 'Alert importance levels'
    },
    {
      id: 'channels',
      name: 'Communication',
      icon: 'MessageCircle',
      description: 'How to receive alerts'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      icon: 'Settings',
      description: 'Additional settings'
    },
    {
      id: 'summary',
      name: 'Summary',
      icon: 'CheckCircle',
      description: 'Review & save'
    }
  ];

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedPreferences = localStorage.getItem('coastalAlertPreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(prev => ({ ...prev, ...parsed }));
        setLastSaved(new Date(localStorage.getItem('coastalAlertPreferencesLastSaved')));
      } catch (error) {
        console.error('Error loading saved preferences:', error);
      }
    }
  }, []);

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage
      localStorage.setItem('coastalAlertPreferences', JSON.stringify(preferences));
      localStorage.setItem('coastalAlertPreferencesLastSaved', new Date()?.toISOString());
      
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      
      // Show success message (you could add a toast notification here)
      console.log('Preferences saved successfully');
      
    } catch (error) {
      console.error('Error saving preferences:', error);
      // Handle error (show error message)
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPreferences = () => {
    const defaultPreferences = {
      threatTypes: [],
      monitoredAreas: [],
      monitoringRadius: '10',
      severityLevels: ['warning', 'emergency'],
      communicationChannels: ['push_notifications'],
      contactInfo: {
        phone: '',
        email: '',
        emergencyContact: ''
      },
      deliveryTiming: 'immediate',
      language: 'en',
      timezone: 'America/New_York',
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '07:00'
      },
      alertFrequency: 'immediate',
      dataSharing: {
        anonymous: false,
        feedback: false,
        location: false
      }
    };
    
    setPreferences(defaultPreferences);
    setHasUnsavedChanges(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'threats':
        return (
          <ThreatTypePreferences
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
          />
        );
      case 'areas':
        return (
          <GeographicPreferences
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
          />
        );
      case 'severity':
        return (
          <SeverityLevelSettings
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
          />
        );
      case 'channels':
        return (
          <CommunicationChannels
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
          />
        );
      case 'advanced':
        return (
          <AdvancedSettings
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
          />
        );
      case 'summary':
        return (
          <PreferenceSummary
            preferences={preferences}
            onSave={handleSavePreferences}
            onReset={handleResetPreferences}
            isSaving={isSaving}
          />
        );
      default:
        return null;
    }
  };

  const getTabCompletionStatus = (tabId) => {
    switch (tabId) {
      case 'threats':
        return preferences?.threatTypes?.length > 0;
      case 'areas':
        return preferences?.monitoredAreas?.length > 0;
      case 'severity':
        return preferences?.severityLevels?.length > 0;
      case 'channels':
        return preferences?.communicationChannels?.length > 0;
      case 'advanced':
        return true; // Advanced settings are optional
      case 'summary':
        return true; // Summary is always accessible
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Community Alert Preferences - Coastal Threat Alert</title>
        <meta name="description" content="Customize your coastal threat alert preferences including notification types, geographic areas, severity levels, and communication channels." />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Icon name="Settings" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Alert Preferences</h1>
                <p className="text-muted-foreground">
                  Customize how and when you receive coastal threat alerts
                </p>
              </div>
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${hasUnsavedChanges ? 'bg-warning' : 'bg-success'}`} />
                  <span className="text-sm text-muted-foreground">
                    {hasUnsavedChanges ? 'Unsaved changes' : 'All changes saved'}
                  </span>
                </div>
                {lastSaved && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Last saved: {lastSaved?.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
              
              {hasUnsavedChanges && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSavePreferences}
                  loading={isSaving}
                  iconName="Save"
                >
                  Quick Save
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                <h3 className="text-sm font-semibold text-foreground mb-4">Configuration Steps</h3>
                <nav className="space-y-2">
                  {tabs?.map((tab) => {
                    const isActive = activeTab === tab?.id;
                    const isComplete = getTabCompletionStatus(tab?.id);
                    
                    return (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`
                          w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-all duration-200
                          ${isActive 
                            ? 'bg-primary text-primary-foreground shadow-sm' 
                            : 'text-foreground hover:bg-muted/50'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon name={tab?.icon} size={16} />
                          {isComplete && !isActive && (
                            <Icon name="CheckCircle" size={12} className="text-success" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{tab?.name}</div>
                          <div className={`text-xs ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                            {tab?.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                {/* Progress Indicator */}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Configuration Progress</span>
                    <span>{tabs?.filter(tab => getTabCompletionStatus(tab?.id))?.length}/{tabs?.length}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(tabs?.filter(tab => getTabCompletionStatus(tab?.id))?.length / tabs?.length) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityAlertPreferences;