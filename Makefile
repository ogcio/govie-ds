.PHONY: build-visual-tests-image start-react-storybook stop-react-storybook tests update-screenshots	

build-visual-tests-image:
	@docker build -t playwright-screenshot-tests . -f Dockerfile.playwright

start-react-storybook:
	pnpm react:storybook:build
	cd packages/react/ds && pnpm storybook dev --ci -p 6006 &

stop-react-storybook:
	npx -y kill-port 6006

tests: start-react-storybook
	cd packages/react/ds && ./visual-regression-tests.sh test

update-screenshots: start-react-storybook
	cd packages/react/ds && ./visual-regression-tests.sh test --update-snapshots
