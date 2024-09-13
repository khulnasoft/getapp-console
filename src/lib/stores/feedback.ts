import { browser } from '$app/environment';
import { VARS } from '$lib/system';
import { writable } from 'svelte/store';
import type { SvelteComponent } from 'svelte';
import FeedbackGeneral from '$lib/components/feedback/feedbackGeneral.svelte';
import FeedbackNps from '$lib/components/feedback/feedbackNPS.svelte';

export type Feedback = {
    elapsed: number;
    visualized: number;
    notification: boolean;
    type: 'nps' | 'general';
    show: boolean;
};

export type FeedbackData = {
    message: string;
    name?: string;
    email?: string;
    value?: number;
};

export type FeedbackOption = {
    type: Feedback['type'];
    title: string;
    desc: string;
    component: typeof SvelteComponent<unknown>;
};

export const feedbackOptions: FeedbackOption[] = [
    {
        type: 'general',
        title: 'Help us improve Appwrite',
        desc: 'Appwrite evolves with your input. Share your thoughts and help us improve Appwrite.',
        component: FeedbackGeneral
    },
    {
        type: 'nps',
        title: 'Help us improve Appwrite',
        desc: 'Appwrite evolves with your input. Share your thoughts and help us improve Appwrite. If you would like to be contacted regarding your feedback, please share your contact details below.',
        component: FeedbackNps
    }
];

export const selectedFeedback = writable<FeedbackOption>();

function createFeedbackDataStore() {
    const { set, subscribe, update } = writable<FeedbackData>({
        message: '',
        name: '',
        email: '',
        value: null
    });
    return {
        set,
        subscribe,
        update,
        reset: () => {
            update((feedbackData) => {
                feedbackData.message = '';
                feedbackData.name = '';
                feedbackData.email = '';
                feedbackData.value = null;
                return feedbackData;
            });
        }
    };
}

export const feedbackData = createFeedbackDataStore();

function createFeedbackStore() {
    const { subscribe, update } = writable<Feedback>({
        elapsed: browser ? (parseInt(localStorage.getItem('feedbackElapsed')) ?? 0) : 0,
        visualized: browser ? (parseInt(localStorage.getItem('feedbackVisualized')) ?? 0) : 0,
        notification: false,
        type: 'general',
        show: false
    });
    return {
        subscribe,
        update,
        toggleFeedback: () => {
            update((feedback) => {
                feedback.show = !feedback.show;
                return feedback;
            });
        },
        toggleNotification: () =>
            update((feedback) => {
                feedback.notification = !feedback.notification;
                return feedback;
            }),
        switchType: (feedType: Feedback['type']) =>
            update((feedback) => {
                feedback.type = feedType;
                return feedback;
            }),
        addVisualization: () =>
            update((feedback) => {
                feedback.visualized += 1;
                localStorage.setItem('feedbackVisualized', feedback.visualized.toString());
                return feedback;
            }),

        increaseElapsed: (time: number) => {
            update((feedback) => {
                feedback.elapsed += time;
                localStorage.setItem('feedbackElapsed', feedback.elapsed.toString());
                return feedback;
            });
        },
        submitFeedback: async (
            subject: string,
            message: string,
            firstname?: string,
            email?: string,
            value?: number
        ) => {
            if (!VARS.GROWTH_ENDPOINT) return;
            const response = await fetch(`${VARS.GROWTH_ENDPOINT}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subject,
                    message,
                    email,
                    firstname: firstname ? firstname : undefined,
                    customFields: value ? [{ id: '40655', value }] : undefined
                })
            });
            if (response.status >= 400) {
                throw new Error('Failed to submit feedback');
            }
        }
    };
}
export const feedback = createFeedbackStore();
