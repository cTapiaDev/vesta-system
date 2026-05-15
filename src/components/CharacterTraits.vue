<template>
    <div
        class="w-full md:max-w-4xl mx-auto bg-stone-900/70 p-4 md:p-8 border border-stone-800 shadow-2xl backdrop-blur-md"
    >
        <VestaHeading tag="h1" size="md">III. Capacidades y Rasgos</VestaHeading>

        <div
            class="mb-8 p-4 border flex justify-between items-center transition-colors"
            :class="
                puntosRestantes === 0
                    ? 'bg-stone-950/80 border-stone-800 text-stone-400'
                    : 'bg-red-950/30 border-red-900 text-red-400'
            "
        >
            <div class="max-w-[70%]">
                <h3 class="text-xs uppercase tracking-widest font-bold">Balance de Puntos</h3>
                <p class="text-[10px] mt-1 opacity-80">
                    Cada Virtud cuesta 3 pts. Un Vicio otorga 2 pts o anula el coste de una Virtud.
                </p>
            </div>
            <div class="text-right">
                <span class="text-3xl font-serif font-bold block">{{ puntosRestantes }}</span>
                <span class="text-[9px] uppercase tracking-tighter">Puntos Restantes</span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <div class="flex justify-between items-center border-b border-stone-800 pb-2 mb-4">
                    <h3 class="text-stone-500 uppercase tracking-widest text-xs font-bold">
                        Virtudes (Edges)
                    </h3>
                </div>
                <div class="flex flex-col gap-3">
                    <label
                        v-for="virtud in virtudesDisponibles"
                        :key="virtud"
                        class="flex items-start gap-3 cursor-pointer group"
                    >
                        <div class="relative flex items-center">
                            <input
                                type="checkbox"
                                :value="virtud"
                                v-model="vestaState.virtudesElegidas"
                                class="appearance-none w-4 h-4 border border-stone-600 checked:bg-red-900 checked:border-red-900 transition-colors cursor-pointer"
                            />
                        </div>
                        <span
                            class="text-sm text-stone-400 group-hover:text-stone-100 transition-colors"
                            >{{ virtud }}</span
                        >
                    </label>
                </div>
            </div>

            <div>
                <div class="flex justify-between items-center border-b border-stone-800 pb-2 mb-4">
                    <h3 class="text-stone-500 uppercase tracking-widest text-xs font-bold">
                        Vicios (Hindrances)
                    </h3>
                    <span
                        :class="[
                            'text-xs font-bold',
                            vestaState.viciosElegidos.length === 3
                                ? 'text-red-900'
                                : 'text-stone-600',
                        ]"
                    >
                        {{ vestaState.viciosElegidos.length }} / 3
                    </span>
                </div>
                <div class="flex flex-col gap-3">
                    <label
                        v-for="vicio in viciosDisponibles"
                        :key="vicio"
                        class="flex items-start gap-3 group"
                        :class="[
                            vestaState.viciosElegidos.length >= 3 &&
                            !vestaState.viciosElegidos.includes(vicio)
                                ? 'opacity-30 cursor-not-allowed'
                                : 'cursor-pointer',
                        ]"
                    >
                        <div class="relative flex items-center">
                            <input
                                type="checkbox"
                                :value="vicio"
                                v-model="vestaState.viciosElegidos"
                                :disabled="
                                    vestaState.viciosElegidos.length >= 3 &&
                                    !vestaState.viciosElegidos.includes(vicio)
                                "
                                class="appearance-none w-4 h-4 border border-stone-600 checked:bg-stone-400 checked:border-stone-400 disabled:cursor-not-allowed transition-colors"
                            />
                        </div>
                        <span
                            class="text-sm text-stone-400 group-hover:text-stone-100 transition-colors"
                            >{{ vicio }}</span
                        >
                    </label>
                </div>
            </div>
        </div>

        <div class="mt-10 flex gap-4">
            <VestaButton
                text="Atrás (Atributos)"
                @click="vestaState.currentStep = 2"
                class="bg-transparent! border-stone-700 text-stone-500 hover:text-stone-300"
            />
            <VestaButton
                text="Siguiente"
                :disabled="puntosRestantes !== 0"
                @click="vestaState.currentStep = 4"
            />
        </div>
    </div>
</template>

<script setup>
import {
    vestaState,
    virtudesDisponibles,
    viciosDisponibles,
    puntosRestantes,
} from '../store/vestaState';
import VestaHeading from './ui/VestaHeading.vue';
import VestaButton from './ui/VestaButton.vue';
</script>
