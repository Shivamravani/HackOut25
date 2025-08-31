import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AdvancedSettings = ({ preferences, onPreferenceChange }) => {
  const [quietHoursStart, setQuietHoursStart] = useState(preferences?.quietHours?.start || '22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState(preferences?.quietHours?.end || '07:00');

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español (Spanish)' },
    { value: 'fr', label: 'Français (French)' },
    { value: 'pt', label: 'Português (Portuguese)' },
    { value: 'zh', label: '中文 (Chinese)' },
    { value: 'ja', label: '日本語 (Japanese)' },
    { value: 'ko', label: '한국어 (Korean)' },
    { value: 'ar', label: 'العربية (Arabic)' }
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
    { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST)' },
    { value: 'America/Puerto_Rico', label: 'Atlantic Time (AST)' }
  ];

  const alertFrequencyOptions = [
    { value: 'immediate', label: 'Immediate - Every alert' },
    { value: 'hourly', label: 'Hourly - Maximum once per hour' },
    { value: 'daily', label: 'Daily - Maximum once per day' },
    { value: 'weekly', label: 'Weekly - Summary once per week' }
  ];

  const handleQuietHoursUpdate = () => {
    onPreferenceChange('quietHours', {
      enabled: preferences?.quietHours?.enabled || false,
      start: quietHoursStart,
      end: quietHoursEnd
    });
  };

  const handleQuietHoursToggle = (enabled) => {
    onPreferenceChange('quietHours', {
      enabled,
      start: quietHoursStart,
      end: quietHoursEnd
    });
  };

  const familyMembers = [
    {
      id: 'member_1',
      name: 'Silpa Shetty',
      relationship: 'Spouse',
      phone: '+91 12345098765',
      alertsEnabled: true
    },
    {
      id: 'member_2',
      name: 'Rahul Shetty',
      relationship: 'Son',
      phone: '+91 1357924680',
      alertsEnabled: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Language & Localization */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Globe" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Language & Location</h3>
            <p className="text-sm text-muted-foreground">Customize language and regional settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Alert Language"
            description="Language for alert messages"
            options={languageOptions}
            value={preferences?.language}
            onChange={(value) => onPreferenceChange('language', value)}
            placeholder="Select language..."
          />
          
          <Select
            label="Timezone"
            description="Your local timezone for alert timing"
            options={timezoneOptions}
            value={preferences?.timezone}
            onChange={(value) => onPreferenceChange('timezone', value)}
            placeholder="Select timezone..."
          />
        </div>
      </div>
      {/* Quiet Hours */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
            <Icon name="Moon" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quiet Hours</h3>
            <p className="text-sm text-muted-foreground">Limit non-emergency alerts during specific hours</p>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Enable Quiet Hours"
            description="Emergency alerts will still come through during quiet hours"
            checked={preferences?.quietHours?.enabled || false}
            onChange={(e) => handleQuietHoursToggle(e?.target?.checked)}
          />

          {preferences?.quietHours?.enabled && (
            <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Time"
                type="time"
                value={quietHoursStart}
                onChange={(e) => setQuietHoursStart(e?.target?.value)}
                onBlur={handleQuietHoursUpdate}
              />
              <Input
                label="End Time"
                type="time"
                value={quietHoursEnd}
                onChange={(e) => setQuietHoursEnd(e?.target?.value)}
                onBlur={handleQuietHoursUpdate}
              />
            </div>
          )}
        </div>
      </div>
      {/* Alert Frequency */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="Clock" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Alert Frequency</h3>
            <p className="text-sm text-muted-foreground">Control how often you receive similar alerts</p>
          </div>
        </div>

        <Select
          label="Maximum Alert Frequency"
          description="Prevents alert fatigue by limiting repeated similar alerts"
          options={alertFrequencyOptions}
          value={preferences?.alertFrequency}
          onChange={(value) => onPreferenceChange('alertFrequency', value)}
          placeholder="Select frequency..."
        />
      </div>
      {/* Family/Group Management */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
              <Icon name="Users" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Family & Group Alerts</h3>
              <p className="text-sm text-muted-foreground">Manage alerts for family members and groups</p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Plus">
            Add Member
          </Button>
        </div>

        <div className="space-y-3">
          {familyMembers?.map((member) => (
            <div key={member?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{member?.name}</p>
                  <p className="text-xs text-muted-foreground">{member?.relationship} • {member?.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={member?.alertsEnabled}
                  onChange={() => {}}
                  className="mb-0"
                />
                <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Data & Privacy */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="Shield" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Data & Privacy</h3>
            <p className="text-sm text-muted-foreground">Control your data sharing and privacy settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Share Anonymous Usage Data"
            description="Help improve the system by sharing anonymous usage statistics"
            checked={preferences?.dataSharing?.anonymous || false}
            onChange={(e) => onPreferenceChange('dataSharing', {
              ...preferences?.dataSharing,
              anonymous: e?.target?.checked
            })}
          />
          
          <Checkbox
            label="Community Feedback Program"
            description="Participate in community feedback to improve alert accuracy"
            checked={preferences?.dataSharing?.feedback || false}
            onChange={(e) => onPreferenceChange('dataSharing', {
              ...preferences?.dataSharing,
              feedback: e?.target?.checked
            })}
          />
          
          <Checkbox
            label="Location-Based Improvements"
            description="Allow location data to improve local alert accuracy"
            checked={preferences?.dataSharing?.location || false}
            onChange={(e) => onPreferenceChange('dataSharing', {
              ...preferences?.dataSharing,
              location: e?.target?.checked
            })}
          />
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Privacy Notice</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your personal information is never shared with third parties. All data sharing is optional and can be disabled at any time. 
                View our complete privacy policy for more details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;