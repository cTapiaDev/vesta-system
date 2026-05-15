<template>
    <form
        @submit.prevent="handleNextStep"
        class="w-full md:max-w-4xl mx-auto bg-stone-900/70 p-4 md:p-8 border border-stone-800 shadow-2xl backdrop-blur-md relative"
    >
        <VestaHeading tag="h1" size="md">I. Identidad y Ruta</VestaHeading>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div class="w-full md:col-span-1 h-64 md:h-auto">
                <VestaImageUpload v-model="form.imagen" />
            </div>

            <div
                class="w-full md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 content-start"
            >
                <component
                    v-for="field in baseFields"
                    :key="field.id"
                    :is="field.component"
                    v-model="form[field.id]"
                    :label="field.label"
                    :required="field.required"
                    :placeholder="field.placeholder"
                    :options="field.options"
                />
            </div>
        </div>

        <div
            class="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
        >
            <component
                v-for="field in activeSpecializationFields"
                :key="field.id"
                :is="field.component"
                v-model="form[field.id]"
                :label="field.label"
                :required="field.required"
                :options="field.options"
            />
        </div>

        <div class="mt-8 md:mt-10">
            <VestaButton type="submit" text="Siguiente" />
        </div>
    </form>
</template>

<script setup>
import { reactive, computed, markRaw } from 'vue';
import { vestaState } from '../store/vestaState';
import VestaHeading from './ui/VestaHeading.vue';
import VestaInput from './ui/VestaInput.vue';
import VestaSelect from './ui/VestaSelect.vue';
import VestaButton from './ui/VestaButton.vue';
import VestaImageUpload from './ui/VestaImageUpload.vue';

const form = reactive({
    imagen: null,
    nombre: '',
    cb: '',
    linaje: '',
    ruta: '',
    senda: '',
    maestria: '',
});

const baseFields = [
    { id: 'nombre', component: markRaw(VestaInput), label: 'Nombre', required: true },
    {
        id: 'cb',
        component: markRaw(VestaInput),
        label: 'CB',
        required: false,
        placeholder: 'Opcional',
    },
    {
        id: 'linaje',
        component: markRaw(VestaSelect),
        label: 'Linaje',
        required: true,
        options: ['Humano', 'Enano', 'Elfo', 'Draconiano'],
    },
    {
        id: 'ruta',
        component: markRaw(VestaSelect),
        label: 'Ruta de Especialidad',
        required: true,
        options: ['Solo Senda', 'Solo Maestría', 'Versátil'],
    },
];

const activeSpecializationFields = computed(() => {
    const fields = [];
    const requiresSenda = ['Solo Senda', 'Versátil'].includes(form.ruta);
    const requiresMaestria = ['Solo Maestría', 'Versátil'].includes(form.ruta);

    if (requiresSenda) {
        fields.push({
            id: 'senda',
            component: markRaw(VestaSelect),
            label: 'Senda Manifestada',
            required: true,
            options: ['Adeptos', 'Elemental', 'Guerrero', 'Aliento', 'Rastro'],
        });
    }

    if (requiresMaestria) {
        fields.push({
            id: 'maestria',
            component: markRaw(VestaSelect),
            label: 'Maestría de Combate',
            required: true,
            options: ['Combate', 'Alquimia', 'Ingeniería', 'Engaño', 'Domador'],
        });
    }

    return fields;
});

const handleNextStep = () => {
    if (!vestaState.form) {
        vestaState.form = {};
    }
    Object.assign(vestaState.form, form);
    vestaState.currentStep = 2;
};
</script>
