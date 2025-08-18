import '../css/app.css';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import axios from 'axios';

// Configure axios CSRF token
const token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    const csrfToken = token.getAttribute('content');
    if (csrfToken) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
        // Also configure for Inertia.js
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        
        // Configure Inertia router to use CSRF token
        router.on('before', (event) => {
            if (event.detail.visit.method !== 'get') {
                event.detail.visit.headers = {
                    ...event.detail.visit.headers,
                    'X-CSRF-TOKEN': csrfToken,
                };
            }
        });
    }
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
