import { Stack, TextInput, FormField, FormFieldLabel, FormFieldHint } from '@ogcio/design-system-react';

export function Addresses() {
  return (
    <div className="md:gi-w-2/3 gi-w-full">
      <Stack direction={{ base: 'column' }} gap={3}>
        <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
          <FormField>
            <FormFieldLabel htmlFor="address-line-1">
              Address Line 1
            </FormFieldLabel>
            <FormFieldHint>
              Street address, P.O. box, company name, c/o
            </FormFieldHint>
            <TextInput id="address-line-1" />
          </FormField>
        </Stack>

        <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
          <FormField>
            <FormFieldLabel htmlFor="address-line-2">
              Address Line 2
            </FormFieldLabel>
            <FormFieldHint>
              Apartment, suite, unit, building, floor, etc. (optional)
            </FormFieldHint>
            <TextInput id="address-line-2" />
          </FormField>
        </Stack>

        <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
          <FormField>
            <FormFieldLabel htmlFor="town-city">Town or City</FormFieldLabel>
            <FormFieldHint>Your town or city</FormFieldHint>
            <TextInput id="town-city" />
          </FormField>

          <FormField>
            <FormFieldLabel htmlFor="country">Country</FormFieldLabel>
            <FormFieldHint>Your country</FormFieldHint>
            <TextInput id="country" />
          </FormField>
        </Stack>

        <div className="gi-w-1/2">
          <Stack direction={{ md: 'row', base: 'column' }} gap={3}>
            <FormField>
              <FormFieldLabel htmlFor="postcode">Postcode</FormFieldLabel>
              <FormFieldHint>Your postcode or ZIP code</FormFieldHint>
              <TextInput id="postcode" maxLength={10} />
            </FormField>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
