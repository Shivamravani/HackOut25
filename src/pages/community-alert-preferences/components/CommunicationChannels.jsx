import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CommunicationChannels = ({ preferences, onPreferenceChange }) => {
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: preferences?.contactInfo?.phone || '',
    email: preferences?.contactInfo?.email || '',
    emergencyContact: preferences?.contactInfo?.emergencyContact || ''
  });

  const channels = [
    {
      id: 'push_notifications',
      name: 'Push Notifications',
      icon: 'Bell',
      description: 'Instant alerts through the app (recommended for emergencies)',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      available: true,
      requiresSetup: false
    },
    {
      id: 'sms',
      name: 'SMS Text Messages',
      icon: 'MessageSquare',
      description: 'Text messages to your mobile phone',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      available: true,
      requiresSetup: true,
      setupField: 'phone'
    },
    {
      id: 'email',
      name: 'Email Alerts',
      icon: 'Mail',
      description: 'Detailed alerts sent to your email address',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      available: true,
      requiresSetup: true,
      setupField: 'email'
    },
    {
      id: 'community_bulletin',
      name: 'Community Bulletin',
      icon: 'Users',
      description: 'Public announcements in community centers and boards',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      available: true,
      requiresSetup: false
    },
    {
      id: 'radio_broadcast',
      name: 'Emergency Radio',
      icon: 'Radio',
      description: 'Broadcasts on local emergency radio frequencies',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      available: true,
      requiresSetup: false
    },
    {
      id: 'social_media',
      name: 'Social Media',
      icon: 'Share2',
      description: 'Updates through official social media channels',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      available: false,
      requiresSetup: false,
      comingSoon: true
    }
  ];

  const deliveryTimeOptions = [
    { value: 'immediate', label: 'Immediate (within 1 minute)' },
    { value: 'fast', label: 'Fast (within 5 minutes)' },
    { value: 'standard', label: 'Standard (within 15 minutes)' },
    { value: 'digest', label: 'Daily Digest (once per day)' }
  ];

  const handleChannelToggle = (channelId, checked) => {
    const updatedChannels = checked 
      ? [...preferences?.communicationChannels, channelId]
      : preferences?.communicationChannels?.filter(id => id !== channelId);
    
    onPreferenceChange('communicationChannels', updatedChannels);
  };

  const handleContactInfoSave = () => {
    onPreferenceChange('contactInfo', contactInfo);
    setIsEditingContact(false);
  };

  const handleContactInfoCancel = () => {
    setContactInfo({
      phone: preferences?.contactInfo?.phone || '',
      email: preferences?.contactInfo?.email || '',
      emergencyContact: preferences?.contactInfo?.emergencyContact || ''
    });
    setIsEditingContact(false);
  };

  const isChannelSetupComplete = (channel) => {
    if (!channel?.requiresSetup) return true;
    if (channel?.setupField === 'phone') return !!preferences?.contactInfo?.phone;
    if (channel?.setupField === 'email') return !!preferences?.contactInfo?.email;
    return true;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="MessageCircle" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Communication Channels</h3>
          <p className="text-sm text-muted-foreground">Choose how you want to receive alerts</p>
        </div>
      </div>
      {/* Contact Information Section */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-foreground">Contact Information</h4>
          {!isEditingContact ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingContact(true)}
              iconName="Edit"
            >
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleContactInfoCancel}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleContactInfoSave}
              >
                Save
              </Button>
            </div>
          )}
        </div>

        {isEditingContact ? (
          <div className="space-y-4">
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 7016700053"
              value={contactInfo?.phone}
              onChange={(e) => setContactInfo({...contactInfo, phone: e?.target?.value})}
              description="Required for SMS alerts"
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="shivamravani259@gmail.com"
              value={contactInfo?.email}
              onChange={(e) => setContactInfo({...contactInfo, email: e?.target?.value})}
              description="Required for email alerts"
            />
            <Input
              label="Emergency Contact"
              type="tel"
              placeholder="+91 9687070890"
              value={contactInfo?.emergencyContact}
              onChange={(e) => setContactInfo({...contactInfo, emergencyContact: e?.target?.value})}
              description="Optional: Backup contact for critical alerts"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground">
                {preferences?.contactInfo?.phone || 'No phone number set'}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground">
                {preferences?.contactInfo?.email || 'No email address set'}
              </span>
            </div>
            {preferences?.contactInfo?.emergencyContact && (
              <div className="flex items-center space-x-3">
                <Icon name="UserCheck" size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground">
                  Emergency: {preferences?.contactInfo?.emergencyContact}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Communication Channels */}
      <div className="space-y-4 mb-6">
        {channels?.map((channel) => (
          <div key={channel?.id} className={`${channel?.bgColor} rounded-lg p-4 border border-border/50 ${
            !channel?.available ? 'opacity-60' : ''
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm`}>
                <Icon name={channel?.icon} size={18} className={channel?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    label={channel?.name}
                    checked={preferences?.communicationChannels?.includes(channel?.id)}
                    onChange={(e) => handleChannelToggle(channel?.id, e?.target?.checked)}
                    disabled={!channel?.available}
                    className="mb-0"
                  />
                  {channel?.comingSoon && (
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                      Coming Soon
                    </span>
                  )}
                  {channel?.requiresSetup && !isChannelSetupComplete(channel) && 
                   preferences?.communicationChannels?.includes(channel?.id) && (
                    <span className="px-2 py-1 text-xs bg-warning/20 text-warning rounded-full">
                      Setup Required
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{channel?.description}</p>
                
                {channel?.requiresSetup && preferences?.communicationChannels?.includes(channel?.id) && 
                 !isChannelSetupComplete(channel) && (
                  <div className="mt-2 p-2 bg-warning/10 border border-warning/20 rounded text-xs text-warning">
                    <Icon name="AlertCircle" size={12} className="inline mr-1" />
                    Please update your contact information to enable this channel
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Delivery Timing */}
      <div className="mb-6">
        <Select
          label="Alert Delivery Speed"
          description="How quickly should non-emergency alerts be delivered?"
          options={deliveryTimeOptions}
          value={preferences?.deliveryTiming}
          onChange={(value) => onPreferenceChange('deliveryTiming', value)}
          placeholder="Select delivery speed..."
        />
      </div>
      {/* Test Alert Section */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-foreground">Test Your Settings</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Send a test alert to verify your communication channels are working
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Send"
            disabled={preferences?.communicationChannels?.length === 0}
          >
            Send Test Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationChannels;