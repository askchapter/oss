// Documentation for this file: https://prettier.io/docs/en/configuration.html
module.exports = {
    // We use a larger print width because Prettier's word-wrapping seems to be tuned
    // for plain JavaScript without type annotations
    printWidth: 110,
    // Use .gitattributes to manage newlines
    endOfLine: "auto",
    singleQuote: false,
    trailingComma: "es5",
    tabWidth: 4,

    /**
     * Normally these are resolved automatically by prettier, but its resolution is
     * incompatible with pnpm (https://github.com/jhipster/prettier-java/issues/508#issuecomment-932715476).
     */
    plugins: [
        "./common/autoinstallers/rush-prettier/node_modules/prettier-plugin-packagejson",
        "./common/autoinstallers/rush-prettier/node_modules/@trivago/prettier-plugin-sort-imports",
    ],
};
