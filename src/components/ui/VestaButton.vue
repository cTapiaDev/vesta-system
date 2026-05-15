<script setup>
defineProps({
    text: { type: String, default: 'Continuar' },
    type: { type: String, default: 'button' },
    disabled: { type: Boolean, default: false },
});
</script>

<template>
    <button
        :type="type"
        :disabled="disabled"
        class="relative w-full py-4 overflow-hidden bg-red-950 text-red-200 border border-red-900 hover:bg-red-900 hover:text-white transition-all uppercase font-bold tracking-[0.3em] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group"
    >
        <div
            class="absolute inset-0 w-1/2 h-full bg-white/5 -skew-x-12 -translate-x-full group-hover:animate-shine"
        ></div>

        <span class="relative z-10 flex items-center justify-center gap-2">
            <slot>{{ text }}</slot>
        </span>
    </button>
</template>

<style scoped>
@keyframes shine {
    100% {
        transform: translateX(300%);
    }
}
.animate-shine {
    animation: shine 1.5s ease-in-out infinite;
}
</style>
