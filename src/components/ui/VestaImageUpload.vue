<script setup>
import { ref } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const fileInput = ref(null);
const previewUrl = ref(props.modelValue || null);

const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        previewUrl.value = e.target.result;
        emit('update:modelValue', e.target.result);
    };
    reader.readAsDataURL(file);
};
</script>

<template>
    <div class="flex flex-col gap-1 mb-4 h-full">
        <label class="text-xs uppercase font-bold text-stone-500 tracking-widest ml-1"
            >Imagen del Personaje</label
        >

        <div
            @click="triggerFileInput"
            class="relative flex-1 min-h-[250px] border border-stone-800 bg-stone-950 flex flex-col items-center justify-center cursor-pointer group overflow-hidden transition-colors hover:border-red-900/80"
        >
            <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileChange"
            />

            <template v-if="previewUrl">
                <img
                    :src="previewUrl"
                    alt="Retrato"
                    class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent"
                ></div>
                <span
                    class="absolute bottom-4 text-xs tracking-widest text-stone-300 uppercase z-10 group-hover:text-red-400 transition-colors"
                >
                    Cambiar Imagen
                </span>
            </template>

            <template v-else>
                <div
                    class="flex flex-col items-center opacity-50 group-hover:opacity-100 transition-opacity text-stone-500 group-hover:text-red-800"
                >
                    <svg
                        class="w-12 h-12 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                    </svg>
                    <span class="text-xs tracking-[0.2em] uppercase font-bold">Subir Imagen</span>
                </div>
            </template>
        </div>
    </div>
</template>
