import { vi } from 'vitest';
import { expect, test } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { CopyInput } from '../../../src/lib/components';

const value = 'This is a test';

test('shows CopyInput component', () => {
    const { getByRole } = render(CopyInput, { value });
    const input = document.querySelector('input');
    const button = getByRole('button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('readonly');
});

test('copy to clipboard function called on click', async () => {
    const { getByRole } = render(CopyInput, { value });

    Object.assign(window.navigator, {
        clipboard: {
            writeText: vi.fn().mockImplementation(() => Promise.resolve())
        }
    });

    const button = getByRole('button');
    await fireEvent.click(button);

    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('This is a test');
});
