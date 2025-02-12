import { Stack, TextInput } from '@govie-ds/react';

export function Addresses() {
  return (
    <>
      <div className="md:gi-w-2/3 gi-w-full">
        <Stack direction={{ base: 'column' }} gap={3}>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <TextInput
              id="address-line-1"
              label={{ text: 'Address Line 1' }}
              hint={{ text: 'Street address, P.O. box, company name, c/o' }}
            />
          </Stack>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <TextInput
              id="address-line-2"
              label={{ text: 'Address Line 2' }}
              hint={{
                text: 'Apartment, suite, unit, building, floor, etc. (optional)',
              }}
            />
          </Stack>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <TextInput
              id="town-city"
              label={{ text: 'Town or City' }}
              hint={{ text: 'Your town or city' }}
            />
            <TextInput
              id="country"
              label={{ text: 'Country' }}
              hint={{ text: 'Your country' }}
            />
          </Stack>
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <TextInput
              id="postcode"
              label={{ text: 'Postcode' }}
              hint={{ text: 'Your postcode or ZIP code' }}
              maxLength={10}
            />
          </Stack>
        </Stack>
      </div>
    </>
  );
}
