# https://unpkg.com/tiny-test-pkg
# https://unpkg.com/medium-test-pkg
# https://unpkg.com/nested-test-pkg

# npm install --save-exact @monaco-editor/react@3.7.5 --legacy-peer-deps
# npm install monaco-editor --legacy-peer-deps

npm install prettier @types/prettier --legacy-peer-deps
npm install bulmaswatch --legacy-peer-deps

npm install --save-exact monaco-jsx-highlighter@0.0.15 jscodeshift@0.11.0 @types/jscodeshift@0.7.2  --legacy-peer-deps

npm install --save-exact react-resizable@3.0.4 @types/react-resizable@3.0.2 --legacy-peer-deps

# Mark down editor
# @uiw/react-md-editor
npm install --save-exact @uiw/react-md-editor@2.1.1 --legacy-peer-deps

npm install --save-exact react-redux redux @types/react-redux redux-thunk@2.3.0 --legacy-peer-deps

npm install immer --legacy-peer-deps

npm install @fortawesome/fontawesome-free@5.15.1 --legacy-peer-deps


npm install -g --exact lerna@3.22.1 --legacy-peer-deps

##
# cli
lerna add typescript --dev --scope=local-api
npx tsc --init
lerna add commander --scope=cli
lerna add @types/node --dev --scope=cli

##
# local-api
lerna add typescript --dev --scope=local-api
npx tsc --init
lerna add express --scope=local-api
lerna add @types/express --dev --scope=local-api
lerna add cors --scope=local-api
lerna add @types/cors --dev --scope=local-api
lerna add http-proxy-middleware --scope=local-api
lerna add local-client --scope=local-api

lerna add esbuild@0.8.26 --dev --scope=@glassball/cli

lerna publish --no-push

npx -y @glassball/cli serve
# The package is cached in ~/.npm/_npx
