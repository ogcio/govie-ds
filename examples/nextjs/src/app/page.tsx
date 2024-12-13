"use client";
import { ComboBoxProps, CookieBannerProps } from "@/props";
import {
  Container,
  Footer,
  Header,
  Heading,
  Icon,
  IconButton,
  Link,
  Paragraph,
  PhaseBanner,
  RadiosGroup,
  TextArea,
  Modal,
  Button,
  CookieBanner,
  TypeEnum,
  List,
  Combobox,
  Chip,
  Stack,
  Alert,
  Breadcrumbs,
  Toast,
  BreadcrumbCurrentLink,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  SummaryListRow,
  SummaryList,
  SummaryListAction,
  SummaryListValue,
  ProgressStepper,
  Checkbox,
  CheckboxesGroup,
} from "@govie-ds/react";

export default function Home() {
  return (
    <>
      <Header
        logo={{ href: "/" }}
        tools={{ search: { action: "/search-page" } }}
        navLinks={[
          {
            href: "#",
            label: "News",
          },
          {
            href: "#",
            label: "Departments",
          },
          {
            href: "#",
            label: "Services",
          },
        ]}
        languages={[
          {
            href: "#",
            label: "Gaeilge",
          },
        ]}
      />
      <CookieBanner {...CookieBannerProps} />
      <Container>
        <Toast title="This is a toast" />
        <Toast
          title="Toast triggered"
          variant="success"
          trigger={<Button>Trigger Toast</Button>}
        />
        <div className="flex flex-col gap-4 my-4">
          <Breadcrumbs>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            <BreadcrumbEllipsis />
            <BreadcrumbLink href="/documentation">Documentation</BreadcrumbLink>
            <BreadcrumbCurrentLink href="/travel">Travel</BreadcrumbCurrentLink>
          </Breadcrumbs>
          <Heading>Heading</Heading>
          <PhaseBanner level="alpha">This is a pre-release version</PhaseBanner>
          <Link
            href="https://www.google.com"
            external={true}
            noUnderline={true}
            noVisited={true}
          >
            Link
          </Link>
          <Icon icon="thumb_up" />
          <IconButton
            icon={{
              icon: "send",
              ariaLabel: "Send",
            }}
          />
          <Combobox {...ComboBoxProps} />
          <h2>Checkboxes Group</h2>
          <CheckboxesGroup
            groupId="field-Id"
            items={[
              { label: "Irish", value: "irish" },
              { label: "British", value: "british" },
              {
                label: "Citizen of another country",
                value: "citizen-of-another-country",
              },
            ]}
          />
          <br />
          <h2>Checkbox</h2>
          <Checkbox checkboxId="checkbox-id" value="value-1" label="Checkbox" />
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Paragraph>
          <hr />
          <Paragraph as="span">Span paragraph</Paragraph>
          <hr />
          <RadiosGroup
            title={{
              value: "Where do you live?",
              asHeading: {
                size: "md",
                as: "h2",
              },
            }}
            items={[
              {
                label: "England",
                value: "england",
              },
              {
                label: "Scotland",
                value: "scotland",
              },
              {
                label: "Ireland",
                value: "ireland",
              },
            ]}
            groupId="uniqueId"
          />
          <TextArea
            hint={{
              text: "Hint: This is a helpful hint.",
            }}
            id="textarea-id"
            maxChars={50}
            label={{
              text: "Textarea text",
              htmlFor: "textarea-id",
            }}
          />

          <span className="material-symbols-outlined">face</span>
          <Modal triggerButton={<Button>Open Modal</Button>}>
            <Heading as="h2">Title</Heading>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              esse magnam quis sit soluta cupiditate at deserunt exercitationem
              voluptas doloribus asperiores
            </Paragraph>
            <div className="gi-flex gi-gap-6 gi-justify-end">
              <Button variant="secondary" appearance="dark">
                Cancel action
              </Button>
              <Button>Primary action</Button>
            </div>
          </Modal>
          <List items={["Item 1", "Item 2", "Item 3"]} type={TypeEnum.Bullet} />
          <Chip label="Chip" onClose={() => null} />
          <div className="gi-h-[300px] gi-bg-gray-50 gi-overflow-auto gi-p-2">
            <Stack
              direction={{ sm: "column", base: "row" }}
              itemsAlignment="start"
              itemsDistribution="start"
              gap={5}
              hasDivider
            >
              <div className="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center sm:gi-text-red-500">
                Item 1
              </div>
              <div className="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">
                Item 2
              </div>
              <div className="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">
                Item 3
              </div>
            </Stack>
          </div>
          <Alert title="Info Alert" dismissible>
            <Paragraph>This is the content</Paragraph>
          </Alert>

          <SummaryList>
            <SummaryListRow label="Name">
              <SummaryListValue>John Smith</SummaryListValue>
              <SummaryListAction href="/change-name">
                Change name
              </SummaryListAction>
            </SummaryListRow>
            <SummaryListRow label="Date of Birth">
              <SummaryListValue>8 November 1982</SummaryListValue>
              <SummaryListAction href="/change-dob">
                Change date of birth
              </SummaryListAction>
            </SummaryListRow>
            <SummaryListRow label="Address">
              <SummaryListValue>
                72 Guild Street
                <br />
                London
                <br />
                SE23 6FH
              </SummaryListValue>
              <SummaryListAction href="/change-address">
                Change address
              </SummaryListAction>
            </SummaryListRow>
          </SummaryList>

          <ProgressStepper
            currentStepIndex={3}
            steps={[
              "Step 1",
              "Step 2",
              "Step 3",
              "Step 4",
              "Step 5",
              "Step 6",
              "Step 7",
            ]}
          />
        </div>
      </Container>

      <Footer />
    </>
  );
}
