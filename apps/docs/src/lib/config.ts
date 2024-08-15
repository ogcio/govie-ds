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
  isGitHubPages: () => boolean;
  showDrafts: () => boolean;
  buildingBlocksHomeUrl: string;
  feedbackFormUrl: string;
  signUpFormUrl: string;
};

type DocumentSiteEnvironment = 'development' | 'staging' | 'uat' | 'production';

type Configurations = Record<
  DocumentSiteEnvironment,
  Partial<DocumentSiteConfiguration>
>;

function getConfiguration(
  environment: DocumentSiteEnvironment,
): DocumentSiteConfiguration {
  const defaultConfiguration: DocumentSiteConfiguration = {
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

function getDeployEnvironment(): DocumentSiteEnvironment {
  switch (process.env.DEPLOY_ENV) {
    case 'production': {
      return 'production';
    }
    case 'staging': {
      return 'staging';
    }
    case 'uat': {
      return 'uat';
    }
    default: {
      return 'development';
    }
  }
}

export const config: DocumentSiteConfiguration = getConfiguration(
  getDeployEnvironment(),
);
