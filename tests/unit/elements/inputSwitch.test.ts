import { expect, test } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { InputSwitch } from '../../../src/lib/elements/forms';

test('shows boolean input', () => {
    const { getByText, getByRole } = render(InputSwitch, { id: 'input', label: 'Bool' });
    const checkbox = getByRole('switch');

    expect(getByText('Bool')).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
});

test('shows boolean input - disabled', () => {
    const { getByRole } = render(InputSwitch, { id: 'input', label: 'Bool', disabled: true });

    expect(getByRole('switch')).toBeDisabled();
});

test('state', async () => {
    const { getByRole, component } = render(InputSwitch, { id: 'input', label: 'Bool' });
    const checkbox = getByRole('switch');

    expect(checkbox).not.toBeChecked();
    expect(component.value).toStrictEqual(false);

    await fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(component.value).toStrictEqual(true);

    await fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(component.value).toStrictEqual(false);

    component.value = true;
    expect(checkbox).toBeChecked();
    expect(component.value).toStrictEqual(true);

    component.value = false;
    expect(checkbox).not.toBeChecked();
    expect(component.value).toStrictEqual(false);
});
