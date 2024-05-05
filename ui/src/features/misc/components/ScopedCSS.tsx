import { Global } from "@emotion/react";

const css = String.raw;

const vhPolyfill = css`
  :root,
  :host {
    --chakra-vh: 100vh;
    --toast-z-index: 17000000;
  }

  @supports (height: -webkit-fill-available) {
    :root,
    :host {
      --chakra-vh: -webkit-fill-available;
    }
  }

  @supports (height: -moz-fill-available) {
    :root,
    :host {
      --chakra-vh: -moz-fill-available;
    }
  }

  @supports (height: 100dvh) {
    :root,
    :host {
      --chakra-vh: 100dvh;
    }
  }
`;

export const CSSPolyfill = () => <Global styles={vhPolyfill} />;

export type ScopedCSSProps = {
  /**
   * The selector to scope the css reset styles to.
   */
  scope?: string;
};

export const ScopedCSS = ({ scope = "" }: ScopedCSSProps) => (
  <Global
    styles={css`
      ${scope} {
        @import 'tailwindcss/base';
        @import 'tailwindcss/components';
        @import 'tailwindcss/utilities';
      }
      
      ${vhPolyfill}
    `}
  />
);
