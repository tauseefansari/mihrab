export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow Gitmoji prefixes (e.g. "✨ feat(scope): subject")
    'header-max-length': [2, 'always', 100],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'style',
        'docs',
        'perf',
        'test',
        'i18n',
        'arch',
        'chore',
        'ci',
        'build',
        'revert',
      ],
    ],
  },
  parserPreset: {
    parserOpts: {
      // Strip leading emoji so commitlint can parse the conventional type
      headerPattern:
        /^(?:(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji})(?:\u{FE0F}|\p{Emoji_Modifier_Base})?(?:\u{200D}(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}))*\s*)?(\w+)(?:\(([^)]*)\))?!?:\s(.+)$/u,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
};
