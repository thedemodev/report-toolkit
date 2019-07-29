import {createDebugPipe, observable} from '@report-toolkit/common';
import stringify from 'fast-safe-stringify';

const {map, toArray} = observable;
const debug = createDebugPipe('transformers', 'json');
/**
 * @type {TransformerMeta}
 */
export const meta = {
  defaults: /**
   * @type {Partial<JSONTransformOptions>}
   */ ({
    pretty: false
  }),
  description: 'JSON',
  id: 'json',
  input: ['string', 'object', 'number', 'report'],
  output: 'string'
};

/**
 * Emits a single JSON blob.
 * @param {Partial<JSONTransformOptions>} [opts]
 * @returns {TransformFunction<object,string>}
 */
export const transform = ({pretty = false} = {}) => observable =>
  observable.pipe(
    toArray(),
    debug(values => [
      `transforming value %O to JSON with pretty = ${pretty}`,
      values
    ]),
    map(
      pretty
        ? values => stringify(values, null, 2)
        : values => stringify(values)
    )
  );

/**
 * @typedef {object} JSONTransformOptions
 * @property {TransformerField[]} fields
 * @property {boolean} pretty
 */
/**
 * @typedef {import('@report-toolkit/report').Report} Report
 * @typedef {import('./transformer.js').TransformerMeta} TransformerMeta
 * @typedef {import('./transformer.js').TransformerField} TransformerField
 */
/**
 * @template T,U
 * @typedef {import('./transformer.js').TransformFunction<T,U>} TransformFunction
 */