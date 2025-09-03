set -ex

if [ -t 0 ] ; then
   ARGS="-i"
else
   ARGS=""
fi

docker run ${ARGS} --rm \
 -p 9323:9323 \
 -v "$PWD/storybook-static:/app/storybook-static" \
 -v "$PWD/tests/:/app/tests" \
 -v "$PWD/playwright.config.ts:/app/playwright.config.ts" \
 -v "$PWD/playwright-report/:/app/playwright-report" \
 -v "$PWD/test-results:/app/test-results" \
 -e "CI=${CI}" \
 --add-host=host.docker.internal:host-gateway \
 -t playwright-screenshot-tests \
 "$@"
