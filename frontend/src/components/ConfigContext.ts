import React from 'react';
import Config from '../domain/Config';

/**
 * Provides app configuration to any React component that desires it.
 */
const ConfigContext = React.createContext<Config>({
    /* Provide some default values per React requirements, but users should never see this. */
    title: 'You should never see this',
    introduction: 'You should never see this',
});

export default ConfigContext;