import '@testing-library/jest-dom';
import 'whatwg-fetch';

import { TextEncoder, TextDecoder } from 'node:util';

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
