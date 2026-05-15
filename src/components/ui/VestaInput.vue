<template>
    <div class="flex flex-col gap-1 mb-4 w-full">
        <label
            class="text-[10px] md:text-xs uppercase font-bold text-stone-500 tracking-widest ml-1"
        >
            {{ label }} <span v-if="required" class="text-red-700">*</span>
        </label>
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :type="type"
            :required="required"
            class="bg-stone-950/80 border border-stone-800 text-stone-200 p-3 md:p-4 text-sm focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900/30 transition-all placeholder:text-stone-700 w-full"
            :placeholder="placeholder"
        />
    </div>
</template>

<script setup>
defineProps({
    modelValue: String,
    label: String,
    type: { type: String, default: 'text' },
    required: { type: Boolean, default: false },
    placeholder: String,
});
defineEmits(['update:modelValue']);
</script>
