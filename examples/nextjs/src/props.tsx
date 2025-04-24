import { Heading, Paragraph, Button, Link } from '@govie-ds/react';

export const CookieBannerProps = {
  children: (
    <>
      <Heading as="h3">Title</Heading>
      <Paragraph>
        We use some essential cookies to make this service work.
        <br />
        <br />
        We’d also like to use analytics cookies so we can understand how you use
        the service and make improvements.
      </Paragraph>
    </>
  ),
  accept: <Button>Accept cookies</Button>,
  reject: <Button>Reject cookies</Button>,
  cookieLink: <Link href="#">See Cookies</Link>,
  showConsent: true,
};

export const ComboBoxProps = {
  organisationOptions: [
    {
      label: 'An Bord Pleanála',
      value: '15431907-an-bord-pleanala',
    },
    {
      label: 'An Garda Síochána',
      value: 'an-garda-siochana',
    },
    {
      label: 'Bord Bia (Irish Food Board)',
      value: '14061907-bord-bia-irish-food-board',
    },
    {
      label: 'Capital Works Management Framework',
      value: '7c2ea-capital-works-management-framework',
    },
    {
      label: 'Carlow County Council',
      value: 'carlow-county-council',
    },
    {
      label: 'Cavan County Council',
      value: 'cavan-county-council',
    },
    {
      label: 'Central Bank of Ireland',
      value: '10032007-central-bank-of-ireland',
    },
  ],
  categoryOptions: [
    {
      label: 'Agencies',
      value: 'agencies',
    },
    {
      label: 'Aquaculture licences',
      value: 'aquaculture_licence',
    },
    {
      label: 'Biographies',
      value: 'biographies',
    },
    {
      label: 'Campaigns',
      value: 'campaigns',
    },
    {
      label: 'Circulars',
      value: 'circulars',
    },
    {
      label: 'Collections',
      value: 'collections',
    },
    {
      label: 'Consultations',
      value: 'consultations',
    },
    {
      label: 'Coroner cases',
      value: 'coroner_cases',
    },
    {
      label: 'Departments',
      value: 'departments',
    },
    {
      label: 'Forms',
      value: 'forms',
    },
    {
      label: 'IGEES Publications',
      value: 'igees_publication',
    },
    {
      label: 'Local authorities',
      value: 'local_authorities',
    },
    {
      label: 'News',
      value: 'news',
    },
  ],
  topicOptions: [
    {
      label: 'Brexit',
      value: 'brexit',
    },
    {
      label: 'Business and industry',
      value: 'business-and-industry',
    },
    {
      label: 'COVID-19',
      value: 'covid-19',
    },
    {
      label: 'Corporate information',
      value: 'corporate-information',
    },
    {
      label: 'Crime, justice and law',
      value: 'crime-justice-and-law',
    },
    {
      label: 'Defence and armed forces',
      value: 'defence-and-armed-force',
    },
    {
      label: 'Education, training and skills',
      value: 'education-training-and-skills',
    },
    {
      label: 'News',
      value: 'news',
    },
    {
      label: 'Organisation information',
      value: 'organisation_information',
    },
    {
      label: 'Policies',
      value: 'policies',
    },
    {
      label: 'Policy information',
      value: 'policy_information',
    },
    {
      label: 'Press releases',
      value: 'press_releases',
    },
  ],
};
