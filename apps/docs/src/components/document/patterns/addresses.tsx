import { Stack, TextInput, FormField } from '@ogcio/design-system-react';

export function Addresses() {
  return (
    <>
      <div className="md:gi-w-2/3 gi-w-full">
        <Stack direction={{ base: 'column' }} gap={3}>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <FormField
              label={{ text: 'Address Line 1' }}
              hint={{ text: 'Street address, P.O. box, company name, c/o' }}
            >
              <TextInput id="address-line-1" />
            </FormField>
          </Stack>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <FormField
              label={{ text: 'Address Line 2' }}
              hint={{
                text: 'Apartment, suite, unit, building, floor, etc. (optional)',
              }}
            >
              <TextInput id="address-line-2" />
            </FormField>
          </Stack>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <FormField
              label={{ text: 'Town or City' }}
              hint={{ text: 'Your town or city' }}
            >
              <TextInput id="town-city" />
            </FormField>
            <FormField
              label={{ text: 'Country' }}
              hint={{ text: 'Your country' }}
            >
              <TextInput id="country" />
            </FormField>
          </Stack>
          <div className="gi-w-1/2">
            <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
              <FormField
                label={{ text: 'Postcode' }}
                hint={{ text: 'Your postcode or ZIP code' }}
              >
                <TextInput id="postcode" maxLength={10} />
              </FormField>
            </Stack>
          </div>
        </Stack>
      </div>
    </>
  );
}
