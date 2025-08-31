import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PreferenceSummary = ({ preferences, onSave, onReset, isSaving }) => {
  const getSummaryStats = () => {
    return {
      threatTypes: preferences?.threatTypes?.length || 0,
      monitoredAreas: preferences?.monitoredAreas?.length || 0,
      severityLevels: preferences?.severityLevels?.length || 0,
      communicationChannels: preferences?.communicationChannels?.length || 0,
      isComplete: (preferences?.threatTypes?.length > 0 && 
                   preferences?.monitoredAreas?.length > 0 && 
                   preferences?.severityLevels?.length > 0 && 
                   preferences?.communicationChannels?.length > 0)
    };
  };

  const stats = getSummaryStats();

  const getChannelName = (channelId) => {
    const channelNames = {
      'push_notifications': 'Push Notifications',
      'sms': 'SMS',
      'email': 'Email',
      'community_bulletin': 'Community Bulletin',
      'radio_broadcast': 'Emergency Radio',
      'social_media': 'Social Media'
    };
    return channelNames?.[channelId] || channelId;
  };

  const getThreatName = (threatId) => {
    const threatNames = {
      'sea_level_rise': 'Sea Level Rise',
      'weather_warnings': 'Weather Warnings',
      'algal_blooms': 'Algal Blooms',
      'illegal_dumping': 'Illegal Dumping',
      'marine_pollution': 'Marine Pollution',
      'erosion_alerts': 'Coastal Erosion'
    };
    return threatNames?.[threatId] || threatId;
  };

  const getSeverityName = (severityId) => {
    const severityNames = {
      'info': 'Informational',
      'advisory': 'Advisory',
      'watch': 'Watch',
      'warning': 'Warning',
      'emergency': 'Emergency'
    };
    return severityNames?.[severityId] || severityId;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
          <Icon name="CheckCircle" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Preference Summary</h3>
          <p className="text-sm text-muted-foreground">Review your alert preferences before saving</p>
        </div>
      </div>
      {/* Configuration Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className={`text-2xl font-bold ${stats?.threatTypes > 0 ? 'text-success' : 'text-muted-foreground'}`}>
            {stats?.threatTypes}
          </div>
          <div className="text-xs text-muted-foreground">Threat Types</div>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className={`text-2xl font-bold ${stats?.monitoredAreas > 0 ? 'text-success' : 'text-muted-foreground'}`}>
            {stats?.monitoredAreas}
          </div>
          <div className="text-xs text-muted-foreground">Areas</div>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className={`text-2xl font-bold ${stats?.severityLevels > 0 ? 'text-success' : 'text-muted-foreground'}`}>
            {stats?.severityLevels}
          </div>
          <div className="text-xs text-muted-foreground">Severity Levels</div>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <div className={`text-2xl font-bold ${stats?.communicationChannels > 0 ? 'text-success' : 'text-muted-foreground'}`}>
            {stats?.communicationChannels}
          </div>
          <div className="text-xs text-muted-foreground">Channels</div>
        </div>
      </div>
      {/* Detailed Summary */}
      <div className="space-y-4 mb-6">
        {/* Threat Types Summary */}
        {preferences?.threatTypes?.length > 0 && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Monitoring Threats</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences?.threatTypes?.map((threatId) => (
                <span key={threatId} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {getThreatName(threatId)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Geographic Areas Summary */}
        {preferences?.monitoredAreas?.length > 0 && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">Monitored Areas</span>
            </div>
            <div className="space-y-1">
              {preferences?.monitoredAreas?.slice(0, 3)?.map((area) => (
                <div key={area?.id} className="text-xs text-green-700">• {area?.name}</div>
              ))}
              {preferences?.monitoredAreas?.length > 3 && (
                <div className="text-xs text-green-600">
                  +{preferences?.monitoredAreas?.length - 3} more areas
                </div>
              )}
            </div>
            {preferences?.monitoringRadius && (
              <div className="text-xs text-green-600 mt-2">
                Radius: {preferences?.monitoringRadius} miles
              </div>
            )}
          </div>
        )}

        {/* Communication Channels Summary */}
        {preferences?.communicationChannels?.length > 0 && (
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MessageCircle" size={16} className="text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Alert Channels</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences?.communicationChannels?.map((channelId) => (
                <span key={channelId} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {getChannelName(channelId)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Severity Levels Summary */}
        {preferences?.severityLevels?.length > 0 && (
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Gauge" size={16} className="text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Alert Severity</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferences?.severityLevels?.map((severityId) => (
                <span key={severityId} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                  {getSeverityName(severityId)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Configuration Status Alert */}
      {!stats?.isComplete && (
        <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Incomplete Configuration</p>
              <p className="text-xs text-warning/80 mt-1">
                Please configure all sections to receive alerts. Missing configurations may result in no alerts being delivered.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={onSave}
          loading={isSaving}
          disabled={!stats?.isComplete}
          iconName="Save"
          className="flex-1"
        >
          {isSaving ? 'Saving Preferences...' : 'Save Preferences'}
        </Button>
        
        <Button
          variant="outline"
          onClick={onReset}
          disabled={isSaving}
          iconName="RotateCcw"
          className="sm:w-auto"
        >
          Reset to Defaults
        </Button>
      </div>
      {/* Last Updated Info */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: August 30, 2025 at 6:31 PM</span>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>Auto-save enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenceSummary;