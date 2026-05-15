<script setup>
const props = defineProps({
    tag: { type: String, default: 'h2' },
    size: { type: String, default: 'md' },
});

const sizeClasses = {
    lg: 'text-5xl py-4 mb-8 text-center border-double border-b-4',
    md: 'text-2xl py-2 italic',
    sm: 'text-lg py-1 uppercase tracking-widest',
};
</script>

<template>
    <component
        :is="tag"
        :class="[
            'font-serif uppercase tracking-tighter text-stone-200 border-b border-red-900/50 mb-6',
            sizeClasses[size],
        ]"
    >
        <slot />
    </component>
</template>
