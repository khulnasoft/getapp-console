<script lang="ts">
    import { FormItem, FormItemPart, Helper, Label } from '.';
    import type { FormItemTag } from './formItem.svelte';

    export let id: string;
    export let label: string | undefined = undefined;
    export let ariaLabel = label;
    export let optionalText: string | undefined = undefined;
    export let showLabel = true;
    export let value: string | number | boolean | null;
    export let placeholder = '';
    export let required = false;
    export let hideRequired = false;
    export let disabled = false;
    export let wrapperTag: FormItemTag = 'li';
    export let options: {
        value: string | boolean | number | null;
        label: string;
    }[];
    export let isMultiple = false;
    export let fullWidth = false;

    let element: HTMLSelectElement;
    let error: string;

    const handleInvalid = (event: Event) => {
        event.preventDefault();

        if (element.validity.valueMissing) {
            error = 'This field is required';
            return;
        }
        error = element.validationMessage;
    };

    const isNotEmpty = (value: string | number | boolean) => {
        return typeof value === 'boolean' ? true : !!value;
    };

    $: if (required && !isNotEmpty(value)) {
        element?.setCustomValidity('This field is required');
    } else {
        element?.setCustomValidity('');
    }

    $: if (isNotEmpty(value)) {
        error = null;
    }

    $: hasNullOption = options.some((option) => option.value === null);
    $: wrapper = isMultiple ? FormItemPart : FormItem;
</script>

<svelte:component this={wrapper} {fullWidth} tag={wrapperTag}>
    {#if label}
        <Label {required} {hideRequired} {optionalText} hide={!showLabel} for={id}>
            {label}
        </Label>
    {/if}

    <div class="select">
        <select
            {id}
            {required}
            {disabled}
            aria-label={ariaLabel}
            bind:this={element}
            bind:value
            on:invalid={handleInvalid}
            on:change>
            {#if placeholder && !hasNullOption}
                <option value={null} disabled selected hidden>{placeholder}</option>
            {/if}
            {#each options as option}
                <option value={option.value} selected={option.value === value}>
                    {option.label}
                </option>
            {/each}
        </select>
        <span class="icon-cheveron-down" aria-hidden="true" />
    </div>
    {#if error}
        <Helper type="warning">{error}</Helper>
    {:else}
        <slot name="helper" />
    {/if}
</svelte:component>
