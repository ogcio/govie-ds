import { deepmerge } from '@govie-ds/deepmerge';

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export type DocumentSiteConfiguration = {
  showDrafts: () => boolean;
  buildingBlocksHomeUrl: string;
  feedbackFormUrl: string;
  signUpFormUrl: string;
};

type DocumentSiteEnvironment = 'dev' | 'prod';

type Configurations = Record<
  DocumentSiteEnvironment,
  Partial<DocumentSiteConfiguration>
>;

function getConfiguration(
  environment: DocumentSiteEnvironment,
): DocumentSiteConfiguration {
  const defaultConfiguration: DocumentSiteConfiguration = {
    showDrafts: () => {
      // Show drafts setting takes precedence
      if (process.env.NEXT_PUBLIC_SHOW_DRAFTS) {
        return process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true';
      }

      // Otherwise, only show drafts in non-production environments
      return !isProduction();
    },
    buildingBlocksHomeUrl: 'https://dev.blocks.gov.ie/en/',
    feedbackFormUrl: 'https://forms.preprod.gov.ie/en/668be8b9d55bcd0026b990fa',
    signUpFormUrl: 'https://forms.preprod.gov.ie/en/668be8cdd55bcd0026b9916b',
  };

  const configurationOverrides: Configurations = {
    dev: {},
    prod: {
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
    case 'prod': {
      return 'prod';
    }
    default: {
      return 'dev';
    }
  }
}

export const config: DocumentSiteConfiguration = getConfiguration(
  getDeployEnvironment(),
);
