export default {
  '*': 'prettier --write --ignore-unknown',
  'apps/web/**/*.{js,jsx,ts,tsx}': (filenames) =>
    `pnpm --filter @mihrab/web exec eslint --fix --max-warnings 0 --no-inline-config ${filenames.join(' ')}`,
};
