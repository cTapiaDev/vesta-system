<!-- <template>
    <div
        class="p-3 bg-[#020202] border-t-4 text-center"
        :style="{ borderColor: border || '#1c1917' }"
    >
        <p class="text-[9px] uppercase text-stone-700 font-bold mb-1">{{ label }}</p>
        <p class="text-2xl font-black text-white leading-none">{{ val }}</p>
        <p class="text-[8px] text-stone-800 uppercase mt-2 tracking-tighter">{{ sub }}</p>
    </div>
</template>
<script setup>
defineProps(['label', 'val', 'sub', 'border']);
</script> -->

<template>
    <div class="stat-box-container" :style="{ borderTopColor: border || '#1c1917' }">
        <p class="stat-label">{{ label }}</p>
        <p class="stat-val">{{ val }}</p>
        <p class="stat-sub">{{ sub }}</p>
    </div>
</template>

<script setup>
// 🟢 Propiedades para el componente de estadísticas
defineProps(['label', 'val', 'sub', 'border']);
</script>

<style scoped>
/* 🟢 CSS con HEX y fuentes mínimas de 12px */
.stat-box-container {
    padding: 1rem;
    background-color: #050505;
    border-top-width: 4px;
    border-top-style: solid;
    text-align: center;
}
.stat-label {
    font-size: 12px;
    text-transform: uppercase;
    color: #57534e;
    font-weight: bold;
    margin-bottom: 0.5rem;
}
.stat-val {
    font-size: 2rem;
    line-height: 1;
    font-weight: 900;
    color: #ffffff;
}
.stat-sub {
    font-size: 12px;
    color: #44403c;
    text-transform: uppercase;
    margin-top: 0.5rem;
    letter-spacing: 0.05em;
}
</style>
