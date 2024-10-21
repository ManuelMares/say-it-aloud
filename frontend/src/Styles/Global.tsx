import { Global, css } from '@emotion/react';

<Global
  styles={css`
    .simple-scroll {
      overflow-y: auto;
    }
    .simple-scroll::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    .simple-scroll::-webkit-scrollbar-track {
      border-radius: 1rem;
      background-color: #dcdcdccc;
    }
    .simple-scroll::-webkit-scrollbar-thumb {
      background-color: var(--chakra-colors-blue-500); // replace with the color you want
      border-radius: 1rem;
    }
  `}
/>