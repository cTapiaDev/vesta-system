<template>
    <div
        class="w-full md:max-w-4xl mx-auto bg-stone-900/70 p-4 md:p-8 border border-stone-800 shadow-2xl backdrop-blur-md"
    >
        <VestaHeading tag="h1" size="md">IV. Equipo y Trasfondo</VestaHeading>

        <div class="grid grid-cols-1 gap-6">
            <VestaSelect
                v-if="vestaState.form"
                v-model="vestaState.form.armaInicial"
                label="Arma Inicial (Grado 0)"
                required
                :options="[
                    'Daga de Acero Pobre',
                    'Espada Corta Mellada',
                    'Garrote Tachonado',
                    'Hacha de Mano Oxidada',
                    'Arco de Caza Simple',
                ]"
            />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <VestaTextArea
                    v-model="vestaState.form.historia"
                    label="Historia"
                    placeholder="Relata el origen de tu reo..."
                />
                <VestaTextArea
                    v-model="vestaState.form.personalidad"
                    label="Personalidad"
                    placeholder="¿Cómo se comporta ante El Manto?"
                />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <VestaTextArea v-model="vestaState.form.gustos" label="Gustos" :rows="2" />
                <VestaTextArea v-model="vestaState.form.disgustos" label="Disgustos" :rows="2" />
            </div>
        </div>

        <div class="mt-10 flex gap-4">
            <VestaButton
                text="Atrás"
                @click="vestaState.currentStep = 3"
                class="bg-transparent! border-stone-700 text-stone-500 hover:text-stone-300"
            />
            <VestaButton
                text="Finalizar Ficha"
                :disabled="!vestaState.form.armaInicial"
                @click="handleFinish"
            />
        </div>
    </div>
</template>

<script setup>
import { vestaState } from '../store/vestaState';
import VestaHeading from './ui/VestaHeading.vue';
import VestaSelect from './ui/VestaSelect.vue';
import VestaTextArea from './ui/VestaTextArea.vue';
import VestaButton from './ui/VestaButton.vue';

const handleFinish = () => {
    vestaState.currentStep = 5;
};
</script>
