.PHONY: build-website-image build-visual-tests-image tests update-screenshots

build-website-image:
	@docker build -t govie-website . -f Dockerfile --build-arg DEPLOY_ENV=development

build-visual-tests-image:
	@docker build -t playwright-screenshot-tests . -f Dockerfile.playwright

react-visual-tests:
	pnpm storybook:build:react
	$(run-react-playwright) test

react-visual-update:
	pnpm storybook:build:react
	$(run-react-playwright) test --update-snapshots


run-react-playwright = docker run --rm \
	-v "$(CURDIR)/packages/react/storybook-static:/app/storybook-static" \
	-v "$(CURDIR)/packages/react/tests:/app/tests" \
	-v "$(CURDIR)/packages/react/playwright.config.ts:/app/playwright.config.ts" \
	-v "$(CURDIR)/packages/react/playwright-report:/app/playwright-report" \
	-v "$(CURDIR)/packages/react/test-results:/app/test-results" \
	playwright-screenshot-tests
