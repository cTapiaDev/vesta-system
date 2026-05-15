<template>
    <div class="flex flex-col items-center w-full pb-20 px-2 md:px-0">
        <div
            id="ficha-para-pdf"
            :class="[
                'font-serif flex flex-col gap-6 relative box-border transition-all',
                isExporting ? 'w-[1000px]' : 'w-full max-w-[1000px]',
            ]"
        >
            <div
                id="pdf-pagina-1"
                class="bg-[#050505] border-2 border-[#1c1917] flex flex-col overflow-hidden"
            >
                <div class="p-6 md:p-8 border-b-2 border-[#7f1d1d]/40 bg-[#080808]">
                    <h1
                        class="text-4xl md:text-7xl text-[#7f1d1d] font-black uppercase tracking-tighter leading-none mb-4 break-words"
                    >
                        {{ vestaState.form.nombre || 'ANÓNIMO' }}
                    </h1>
                    <div
                        class="grid grid-cols-2 md:grid-cols-4 gap-4 uppercase text-[12px] tracking-[0.1em] font-bold border-t border-stone-900 pt-4"
                    >
                        <div>
                            <p class="text-stone-600">Linaje</p>
                            <p class="text-stone-200">{{ vestaState.form.linaje }}</p>
                        </div>
                        <div>
                            <p class="text-stone-600">Ruta</p>
                            <p class="text-stone-200">{{ vestaState.form.ruta }}</p>
                        </div>
                        <div v-if="vestaState.form.cb">
                            <p class="text-stone-600">CB</p>
                            <p class="text-stone-200">{{ vestaState.form.cb }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-stone-600">Rango</p>
                            <p class="text-stone-200">Nivel 1 | EXP 0</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row flex-1">
                    <div
                        class="w-full md:w-[320px] border-b-2 md:border-b-0 md:border-r-2 border-[#1c1917] bg-[#030303] flex flex-col flex-shrink-0"
                    >
                        <div
                            class="w-full aspect-[2/3] border-b-2 border-[#1c1917] overflow-hidden bg-stone-900"
                        >
                            <img
                                :src="vestaState.form.imagen"
                                class="w-full h-full object-cover grayscale contrast-125"
                            />
                        </div>
                        <div
                            class="p-4 grid grid-cols-3 md:grid-cols-2 gap-2 border-b-2 border-[#1c1917]"
                        >
                            <div
                                v-for="(val, key) in vestaState.atributos"
                                :key="key"
                                class="p-2 bg-[#080808] border border-stone-900 text-center uppercase"
                            >
                                <p class="text-[12px] text-stone-600 font-bold mb-1">{{ key }}</p>
                                <p class="text-xl md:text-3xl font-black text-white leading-none">
                                    {{ val }}
                                </p>
                            </div>
                        </div>
                        <div class="p-6 flex-1 bg-[#040404]">
                            <h4
                                class="text-[12px] uppercase text-[#7f1d1d] font-bold mb-4 tracking-widest border-b border-[#7f1d1d]/20 pb-1"
                            >
                                Especializaciones
                            </h4>
                            <ul class="text-[13px] space-y-2 text-stone-400 font-bold">
                                <li v-for="skill in vestaState.especializaciones" :key="skill">
                                    • {{ skill }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="flex-1 flex flex-col bg-[#050505]">
                        <div
                            class="p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b-2 border-[#1c1917] bg-[#080808]"
                        >
                            <StatBox
                                label="Vigor"
                                :val="statsDerivadas.vigorMax"
                                sub="Vida"
                                border="#7f1d1d"
                            />
                            <StatBox
                                label="Esfuerzo"
                                :val="statsDerivadas.peMax"
                                sub="P.E"
                                border="#b45309"
                            />
                            <StatBox
                                label="Voluntad"
                                :val="statsDerivadas.pvMax"
                                sub="P.V"
                                border="#581c87"
                            />
                            <div
                                class="flex flex-col justify-center text-center p-2 border-t-2 md:border-t-4 border-[#7f1d1d] bg-[#0c0c0c]"
                            >
                                <p class="text-[12px] text-stone-600 font-bold uppercase mb-1">
                                    D. Salvaje
                                </p>
                                <p
                                    class="text-2xl md:text-3xl font-black text-[#7f1d1d] leading-none"
                                >
                                    {{ statsDerivadas.dadoSalvaje.toUpperCase() }}
                                </p>
                            </div>
                        </div>

                        <div
                            class="grid grid-cols-2 md:grid-cols-4 py-4 border-b-2 border-[#1c1917] text-center uppercase text-[12px]"
                        >
                            <div class="border-r border-stone-900">
                                <p class="text-stone-600 mb-1">Def. Pasiva</p>
                                <p class="text-xl font-bold">{{ statsDerivadas.defensaPasiva }}</p>
                            </div>
                            <div class="md:border-r border-stone-900">
                                <p class="text-stone-600 mb-1">Esquiva</p>
                                <p class="font-bold text-[#7f1d1d]">
                                    {{ statsDerivadas.esquivaActiva }}
                                </p>
                            </div>
                            <div
                                class="border-r border-stone-900 border-t-2 md:border-t-0 pt-2 md:pt-0"
                            >
                                <p class="text-stone-600 mb-1">RD Total</p>
                                <p class="text-xl font-bold">{{ statsDerivadas.rdTotal }}</p>
                            </div>
                            <div class="border-t-2 md:border-t-0 pt-2 md:pt-0">
                                <p class="text-stone-600 mb-1">Carga Máx</p>
                                <p class="text-xl font-bold text-stone-500">
                                    {{ statsDerivadas.cargaMax }}
                                </p>
                            </div>
                        </div>

                        <div
                            class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#080808] border-b-2 border-[#1c1917]"
                        >
                            <div v-if="maestriaInfo">
                                <p class="text-[12px] font-bold text-[#7f1d1d] uppercase mb-1">
                                    Maestría: {{ vestaState.form.maestria }}
                                </p>
                                <p class="text-[12px] font-bold text-stone-500 italic mb-2">
                                    G1: {{ maestriaInfo.itemG1 }}
                                </p>
                                <p
                                    class="text-lg md:text-xl font-black text-white leading-tight mb-2 uppercase"
                                >
                                    {{ maestriaInfo.core }}
                                </p>
                                <p class="text-[14px] text-stone-400 leading-snug">
                                    {{ maestriaInfo.efecto }}
                                </p>
                            </div>
                            <div v-if="sendaInfo">
                                <p class="text-[12px] font-bold text-stone-600 uppercase mb-1">
                                    Manifestación: {{ sendaInfo.latente }}
                                </p>
                                <p class="text-[14px] text-stone-400 leading-snug">
                                    {{ sendaInfo.efecto }}
                                </p>
                                <div
                                    class="p-4 bg-[#1a0505] border border-[#7f1d1d]/30 text-[12px] font-bold uppercase mt-4"
                                >
                                    <span class="text-[#7f1d1d]">Carga:</span>
                                    {{ sendaInfo.contra }}
                                </div>
                            </div>
                        </div>

                        <div class="p-6 md:p-8 bg-[#060606] border-b-2 border-[#1c1917]">
                            <h4
                                class="text-[12px] uppercase text-stone-600 font-bold mb-4 tracking-[0.3em] border-b border-stone-900 pb-1"
                            >
                                Personalidad
                            </h4>
                            <p class="text-[15px] text-stone-300 italic leading-relaxed">
                                {{ vestaState.form.personalidad }}
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 flex-1 bg-[#1c1917]">
                            <div
                                class="p-6 bg-[#060606] border-b md:border-b-0 md:border-r border-stone-900"
                            >
                                <h4
                                    class="text-[12px] font-bold uppercase text-[#7f1d1d] mb-4 tracking-widest border-b border-[#7f1d1d]/20 pb-1"
                                >
                                    Vestimenta
                                </h4>
                                <ul class="text-[13px] space-y-2 text-stone-400 font-bold">
                                    <li>• Cabeza: Capucha (+1 ESP)</li>
                                    <li>• Torso: Jubón Tachonado (RD -2)</li>
                                    <li>• Manos/Pies: Guanteletes/Botas (+2 FUE)</li>
                                    <li>• Piernas: Pantalones Lona (RD -1)</li>
                                    <li
                                        class="pt-4 text-white uppercase font-black text-[15px] border-t border-stone-900 tracking-tighter"
                                    >
                                        Arma: {{ vestaState.form.armaInicial }}
                                    </li>
                                </ul>
                            </div>
                            <div class="p-6 bg-[#080808]">
                                <div
                                    class="flex justify-between items-baseline mb-4 border-b border-stone-800 pb-1"
                                >
                                    <h4
                                        class="text-[12px] font-bold uppercase text-stone-600 tracking-widest"
                                    >
                                        Morral
                                    </h4>
                                    <span class="text-[12px] font-bold text-[#7f1d1d]"
                                        >Carga: 7 / {{ statsDerivadas.cargaMax }}</span
                                    >
                                </div>
                                <ul class="text-[13px] space-y-1.5 text-stone-400 font-bold">
                                    <li>• Odre de Agua (x3)</li>
                                    <li>• Raciones Secas (x3)</li>
                                    <li>• Farol de Aceite</li>
                                    <li>• Dosis de Aceite (x2)</li>
                                    <li>• Manta de Viaje</li>
                                    <li>• Piedra de Afilar / Kit</li>
                                    <li>• Vendas de Lino (x2)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="pdf-pagina-2"
                class="bg-[#050505] border-2 border-[#1c1917] p-8 md:p-12 space-y-10"
            >
                <section>
                    <h4
                        class="text-[12px] uppercase text-[#7f1d1d] font-bold mb-6 border-b border-[#7f1d1d]/30 pb-2 tracking-[0.4em]"
                    >
                        Historia
                    </h4>
                    <p class="text-[15px] text-stone-400 leading-relaxed whitespace-pre-wrap">
                        {{ vestaState.form.historia }}
                    </p>
                </section>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-stone-900">
                    <div>
                        <p class="text-[12px] uppercase text-stone-600 font-bold mb-2">Gustos</p>
                        <p class="text-stone-200 italic font-bold leading-relaxed">
                            {{ vestaState.form.gustos }}
                        </p>
                    </div>
                    <div>
                        <p class="text-[12px] uppercase text-stone-600 font-bold mb-2">Disgustos</p>
                        <p class="text-stone-200 italic font-bold leading-relaxed">
                            {{ vestaState.form.disgustos }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full max-w-[1000px] mt-10 flex flex-col gap-4 px-4 md:px-0">
            <VestaButton
                text="Descargar Ficha PDF"
                @click="generatePDF"
                class="w-full !py-8 !text-2xl"
            />
            <VestaButton
                text="Volver a los Datos"
                @click="vestaState.currentStep = 4"
                class="w-full !bg-stone-900 !text-stone-500"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { vestaState, statsDerivadas, MAESTRIAS_DATA, SENDAS_DATA } from '../store/vestaState';
import VestaButton from './ui/VestaButton.vue';
import StatBox from './ui/StatBox.vue';

const isExporting = ref(false);
const maestriaInfo = computed(() => MAESTRIAS_DATA[vestaState.form.maestria]);
const sendaInfo = computed(() => SENDAS_DATA[vestaState.form.senda]);

/**
 * 🟢 Generación de PDF Paginada (2 Hojas Negras)
 */
const generatePDF = async () => {
    isExporting.value = true;

    // Pequeño delay para que el DOM se ensanche a 1000px antes de capturar
    setTimeout(async () => {
        try {
            const p1 = document.getElementById('pdf-pagina-1');
            const p2 = document.getElementById('pdf-pagina-2');

            // Captura de alta fidelidad
            const img1 = await toPng(p1, { pixelRatio: 2, backgroundColor: '#050505' });
            const img2 = await toPng(p2, { pixelRatio: 2, backgroundColor: '#050505' });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const drawBlackBg = (doc) => {
                doc.setFillColor(5, 5, 5); // Negro #050505
                doc.rect(0, 0, pdfWidth, pdfHeight, 'F');
            };

            // Hoja 1
            drawBlackBg(pdf);
            const props1 = pdf.getImageProperties(img1);
            const h1 = (props1.height * pdfWidth) / props1.width;
            pdf.addImage(img1, 'PNG', 0, 0, pdfWidth, h1);

            // Hoja 2
            pdf.addPage();
            drawBlackBg(pdf);
            const props2 = pdf.getImageProperties(img2);
            const h2 = (props2.height * pdfWidth) / props2.width;
            pdf.addImage(img2, 'PNG', 0, 0, pdfWidth, h2);

            pdf.save(`Vesta_Ficha_${vestaState.form.nombre || 'Personaje'}.pdf`);
        } catch (e) {
            console.error('Error:', e);
        } finally {
            isExporting.value = false;
        }
    }, 150);
};
</script>

<style scoped>
/* 🟢 Arreglo Responsivo: El stack solo ocurre si NO estamos exportando */
@media (max-width: 768px) {
    .vesta-pdf-container:not(.export-mode) {
        width: 100% !important;
    }
}

.vesta-pdf-container {
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.5);
}
</style>
