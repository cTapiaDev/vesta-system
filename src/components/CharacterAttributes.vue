<template>
    <div
        class="w-full md:max-w-4xl mx-auto bg-stone-900/70 p-4 md:p-8 border border-stone-800 shadow-2xl backdrop-blur-md"
    >
        <VestaHeading tag="h1" size="md">II. Atributos y Especializaciones</VestaHeading>

        <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-stone-500 uppercase tracking-widest text-xs font-bold">
                    Asignar Atributos (Base 1, Máx 5)
                </h3>
                <span
                    :class="[
                        'text-xl font-serif',
                        puntosRestantes < 0 ? 'text-red-600' : 'text-red-900',
                    ]"
                >
                    Puntos: {{ puntosRestantes }}
                </span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div
                    v-for="(val, key) in vestaState.atributos"
                    :key="key"
                    class="bg-stone-950/50 border border-stone-800 p-3 flex flex-col items-center"
                >
                    <span class="text-[10px] uppercase text-stone-500 mb-2">{{ key }}</span>
                    <div class="flex items-center gap-4">
                        <button
                            @click="updateAttr(key, -1)"
                            class="text-red-900 hover:text-red-500 text-2xl font-bold cursor-pointer disabled:opacity-20"
                            :disabled="val <= 1"
                        >
                            -
                        </button>
                        <span class="text-2xl font-serif text-stone-200">{{ val }}</span>
                        <button
                            @click="updateAttr(key, 1)"
                            class="text-red-900 hover:text-red-500 text-2xl font-bold cursor-pointer disabled:opacity-20"
                            :disabled="val >= 5 || puntosRestantes <= 0"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 pt-8 border-t border-stone-800">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-stone-500 uppercase tracking-widest text-xs font-bold">
                    Especializaciones (Elegir 4)
                </h3>
                <span class="text-red-900 font-serif"
                    >{{ vestaState.especializaciones.length }} / 4</span
                >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                    v-for="(lista, attr) in especializacionesDisponibles"
                    :key="attr"
                    class="space-y-2"
                >
                    <h4
                        class="text-[10px] uppercase text-red-900 border-b border-red-900/30 pb-1 mb-2"
                    >
                        {{ attr }}
                    </h4>
                    <div class="flex flex-wrap gap-2">
                        <button
                            v-for="esp in lista"
                            :key="esp"
                            @click="toggleEspecializacion(esp)"
                            :class="[
                                'px-3 py-1 text-[11px] uppercase tracking-tighter border transition-all cursor-pointer',
                                vestaState.especializaciones.includes(esp)
                                    ? 'bg-red-900 border-red-700 text-white'
                                    : 'bg-stone-950 border-stone-800 text-stone-500 hover:border-stone-600',
                            ]"
                            :disabled="
                                !vestaState.especializaciones.includes(esp) &&
                                vestaState.especializaciones.length >= 4
                            "
                        >
                            {{ esp }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-10 flex gap-4">
            <VestaButton
                text="Atrás"
                @click="vestaState.currentStep = 1"
                class="bg-stone-900! border-stone-800!"
            />
            <VestaButton
                text="Siguiente"
                @click="vestaState.currentStep = 3"
                :disabled="puntosRestantes !== 0 || vestaState.especializaciones.length !== 4"
            />
        </div>
    </div>
</template>

<script setup>
import { vestaState, puntosRestantes, especializacionesDisponibles } from '../store/vestaState';
import VestaHeading from './ui/VestaHeading.vue';
import VestaButton from './ui/VestaButton.vue';

const updateAttr = (key, delta) => {
    const newVal = vestaState.atributos[key] + delta;
    if (newVal >= 1 && newVal <= 5) {
        if (delta > 0 && puntosRestantes.value <= 0) return;
        vestaState.atributos[key] = newVal;
    }
};

const toggleEspecializacion = (name) => {
    const index = vestaState.especializaciones.indexOf(name);
    if (index > -1) {
        vestaState.especializaciones.splice(index, 1);
    } else if (vestaState.especializaciones.length < 4) {
        vestaState.especializaciones.push(name);
    }
};
</script>
