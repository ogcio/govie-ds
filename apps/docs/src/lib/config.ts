import { deepmerge } from '@govie-ds/deepmerge';

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function isUat() {
  return process.env.NODE_ENV === ('uat' as any);
}

function isStaging() {
  return process.env.NODE_ENV === ('staging' as any);
}

export type DocumentSiteConfiguration = {
  isProduction: () => boolean;
  isUat: () => boolean;
  isStaging: () => boolean;
  isGitHubPages: () => boolean;
  showDrafts: () => boolean;
  buildingBlocksHomeUrl: string;
  feedbackFormUrl: string;
  signUpFormUrl: string;
};

type DocumentSiteEnvironment = 'development' | 'uat' | 'staging' | 'production';

type Configurations = Record<
  DocumentSiteEnvironment,
  Partial<DocumentSiteConfiguration>
>;

function getConfiguration(
  environment: DocumentSiteEnvironment,
): DocumentSiteConfiguration {
  const defaultConfiguration: DocumentSiteConfiguration = {
    isProduction: () => isProduction(),
    isUat: () => isUat(),
    isStaging: () => isStaging(),
    isGitHubPages: () => process.env.GITHUB_PAGES === 'true',
    showDrafts: () => {
      // Show drafts setting takes precedence
      if (process.env.NEXT_PUBLIC_SHOW_DRAFTS) {
        return process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true';
      }

      // Otherwise, only show drafts in non-production environments
      return !isProduction();
    },
    buildingBlocksHomeUrl: 'https://dev.blocks.gov.ie/en/',
    feedbackFormUrl: 'https://www.forms.uat.gov.ie/en/664c61ba5f7c9800231db294',
    signUpFormUrl: 'https://www.forms.uat.gov.ie/en/664b6de45f7c9800231daf22',
  };

  const configurationOverrides: Configurations = {
    development: {},
    staging: {
      // TODO Review the following paths
      buildingBlocksHomeUrl: 'https://blocks.gov.ie/en/',
      feedbackFormUrl: 'https://www.forms.gov.ie/en/664ccbdb0700c50024c53899',
      signUpFormUrl: 'https://www.forms.gov.ie/en/664ccbf2b644d000246cfd78',
    },
    uat: {
      // TODO Review the following paths
      buildingBlocksHomeUrl: 'https://blocks.gov.ie/en/',
      feedbackFormUrl: 'https://www.forms.gov.ie/en/664ccbdb0700c50024c53899',
      signUpFormUrl: 'https://www.forms.gov.ie/en/664ccbf2b644d000246cfd78',
    },
    production: {
      buildingBlocksHomeUrl: 'https://blocks.gov.ie/en/',
      feedbackFormUrl: 'https://www.forms.gov.ie/en/664ccbdb0700c50024c53899',
      signUpFormUrl: 'https://www.forms.gov.ie/en/664ccbf2b644d000246cfd78',
    },
  };

  return deepmerge<DocumentSiteConfiguration>(
    defaultConfiguration,
    configurationOverrides[environment],
  );
}

const getDeployEnvironment = () => {
  if (process.env.DEPLOY_ENV === 'production') {
    return 'production';
  } else if (process.env.DEPLOY_ENV === 'staging') {
    return 'staging';
  } else if (process.env.DEPLOY_ENV === 'uat') {
    return 'uat';
  }
  return 'development';
};

export const config: DocumentSiteConfiguration = getConfiguration(
  getDeployEnvironment(),
);
