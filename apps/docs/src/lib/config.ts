export const config = {
  isProduction:
    process.env.NODE_ENV === 'production' && !Boolean(process.env.GITHUB_PAGES),
  buildingBlocksHomeUrl: 'https://dev.blocks.gov.ie/en/',
  feedbackFormUrl:
    'https://www.formsg.testing.gov.ie/en/664c61ba5f7c9800231db294',
  signUpFormUrl:
    'https://www.formsg.testing.gov.ie/en/664b6de45f7c9800231daf22',
};
