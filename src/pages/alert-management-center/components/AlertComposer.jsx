import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AlertComposer = ({ isOpen, onClose, onSave, editingAlert = null }) => {
  const [formData, setFormData] = useState({
    title: editingAlert?.title || '',
    threatType: editingAlert?.threatType || '',
    severity: editingAlert?.severity || 'moderate',
    location: editingAlert?.location || '',
    description: editingAlert?.description || '',
    affectedArea: editingAlert?.affectedArea || '',
    targetGroups: editingAlert?.targetGroups || [],
    channels: editingAlert?.channels || ['sms', 'push'],
    template: ''
  });

  const threatTypeOptions = [
    { value: 'Sea Level Rise', label: 'Sea Level Rise' },
    { value: 'Algal Bloom', label: 'Algal Bloom' },
    { value: 'Illegal Dumping', label: 'Illegal Dumping' },
    { value: 'Cyclone', label: 'Cyclone' },
    { value: 'Tsunami', label: 'Tsunami' },
    { value: 'Storm Surge', label: 'Storm Surge' }
  ];

  const severityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const targetGroupOptions = [
    { value: 'all', label: 'All Community Members' },
    { value: 'fisherfolk', label: 'Fisherfolk Community' },
    { value: 'officials', label: 'Government Officials' },
    { value: 'emergency', label: 'Emergency Responders' },
    { value: 'ngos', label: 'NGO Partners' },
    { value: 'coastal_residents', label: 'Coastal Residents' }
  ];

  const alertTemplates = {
    'Sea Level Rise': `URGENT: Abnormal sea level rise detected in {location}. Current level: {level}m above normal. Residents in low-lying areas should prepare for potential flooding. Monitor updates closely.`,
    'Algal Bloom': `ALERT: Harmful algal bloom detected in {location}. Avoid contact with water. Do not consume fish from affected areas. Health advisory in effect.`,
    'Illegal Dumping': `REPORT: Illegal dumping activity detected in {location}. Environmental hazard present. Authorities have been notified. Avoid the area.`,
    'Cyclone': `CYCLONE WARNING: {name} approaching {location}. Expected landfall: {time}. Seek immediate shelter. Follow evacuation orders if issued.`,
    'Tsunami': `TSUNAMI WARNING: Potential tsunami threat for {location}. Move to higher ground immediately. This is not a drill.`,
    'Storm Surge': `STORM SURGE ALERT: Dangerous storm surge expected in {location}. Coastal flooding likely. Evacuate low-lying areas immediately.`
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-populate template when threat type changes
    if (field === 'threatType' && alertTemplates?.[value]) {
      setFormData(prev => ({
        ...prev,
        description: alertTemplates?.[value]
      }));
    }
  };

  const handleChannelToggle = (channel) => {
    setFormData(prev => ({
      ...prev,
      channels: prev?.channels?.includes(channel)
        ? prev?.channels?.filter(c => c !== channel)
        : [...prev?.channels, channel]
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="AlertTriangle" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-semibold text-foreground">
                {editingAlert ? 'Modify Alert' : 'Create New Alert'}
              </h2>
              <p className="text-sm text-muted-foreground font-caption">
                Configure and distribute coastal threat notification
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-base font-heading font-semibold text-foreground">
              Alert Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Alert Title"
                type="text"
                placeholder="Enter alert title"
                value={formData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                required
              />
              
              <Select
                label="Threat Type"
                options={threatTypeOptions}
                value={formData?.threatType}
                onChange={(value) => handleInputChange('threatType', value)}
                placeholder="Select threat type"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Severity Level"
                options={severityOptions}
                value={formData?.severity}
                onChange={(value) => handleInputChange('severity', value)}
                required
              />
              
              <Input
                label="Location"
                type="text"
                placeholder="e.g., Mumbai Coastal Area"
                value={formData?.location}
                onChange={(e) => handleInputChange('location', e?.target?.value)}
                required
              />
            </div>

            <Input
              label="Affected Area"
              type="text"
              placeholder="e.g., 5km radius from coordinates"
              value={formData?.affectedArea}
              onChange={(e) => handleInputChange('affectedArea', e?.target?.value)}
              required
            />

            <div>
              <label className="block text-sm font-caption font-medium text-foreground mb-2">
                Alert Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={4}
                placeholder="Enter detailed alert description..."
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                required
              />
            </div>
          </div>

          {/* Target Groups */}
          <div className="space-y-4">
            <h3 className="text-base font-heading font-semibold text-foreground">
              Target Recipients
            </h3>
            
            <Select
              label="Target Groups"
              options={targetGroupOptions}
              value={formData?.targetGroups}
              onChange={(value) => handleInputChange('targetGroups', value)}
              placeholder="Select target groups"
              multiple
              searchable
              required
            />
          </div>

          {/* Distribution Channels */}
          <div className="space-y-4">
            <h3 className="text-base font-heading font-semibold text-foreground">
              Distribution Channels
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: 'sms', label: 'SMS', icon: 'MessageSquare', color: 'text-primary' },
                { key: 'push', label: 'Push Notification', icon: 'Bell', color: 'text-secondary' },
                { key: 'email', label: 'Email', icon: 'Mail', color: 'text-accent' }
              ]?.map((channel) => (
                <div
                  key={channel?.key}
                  className={`
                    flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200
                    ${formData?.channels?.includes(channel?.key)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }
                  `}
                  onClick={() => handleChannelToggle(channel?.key)}
                >
                  <Icon 
                    name={channel?.icon} 
                    size={20} 
                    className={formData?.channels?.includes(channel?.key) ? 'text-primary' : channel?.color}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-body font-medium text-foreground">
                      {channel?.label}
                    </p>
                  </div>
                  {formData?.channels?.includes(channel?.key) && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="default"
              iconName="Send"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              {editingAlert ? 'Update Alert' : 'Create & Send Alert'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertComposer;