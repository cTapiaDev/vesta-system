<template>
    <div class="flex flex-col gap-1 mb-4 w-full text-left">
        <label
            class="text-[10px] md:text-xs uppercase font-bold text-stone-500 tracking-widest ml-1"
        >
            {{ label }} <span v-if="required" class="text-red-700">*</span>
        </label>

        <div class="relative w-full">
            <select
                :value="modelValue"
                @change="$emit('update:modelValue', $event.target.value)"
                @focus="isOpen = true"
                @blur="isOpen = false"
                :required="required"
                class="bg-stone-950/80 border border-stone-800 text-stone-200 p-3 md:p-4 pr-10 text-sm focus:outline-none focus:border-red-900 appearance-none cursor-pointer w-full transition-colors"
            >
                <option value="" disabled selected hidden>Seleccionar...</option>
                <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
            </select>

            <div
                class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-stone-600 transition-transform duration-300"
                :class="{ 'rotate-180': isOpen }"
            >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    modelValue: String,
    label: String,
    options: Array,
    required: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);

const isOpen = ref(false);
</script>
