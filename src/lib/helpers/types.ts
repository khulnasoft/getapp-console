import type { Writable } from 'svelte/store';

export type WritableValue<T> = T extends Writable<infer U> ? U : never;

export function isHTMLElement(el: unknown): el is HTMLElement {
    return el instanceof HTMLElement;
}

export function isHTMLInputElement(el: unknown): el is HTMLInputElement {
    return el instanceof HTMLInputElement;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Prettify<T> = T & {};

const columnTypes = [
    'string',
    'integer',
    'double',
    'boolean',
    'datetime',
    'relationship',
    'enum'
] as const;
export type ColumnType = (typeof columnTypes)[number];
export type Column = {
    id: string;
    title: string;
    type: ColumnType;
    /**
     * Set to false to hide by default
     */
    show: boolean;
    width?: number;
    /**
     * Set to false to disable filtering for this column
     */
    filter?: boolean;
    array?: boolean;
    format?: string;
    elements?: string[] | { value: string | number; label: string }[];
};

export function isValueOfStringEnum<T extends Record<string, string>>(
    enumType: T,
    value: string
): value is T[keyof T] {
    return Object.values<string>(enumType).includes(value);
}
