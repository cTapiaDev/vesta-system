<template>
    <div class="w-full">
        <CharacterCreator v-if="vestaState.currentStep === 1" />
        <CharacterAttributes v-else-if="vestaState.currentStep === 2" />
        <CharacterTraits v-else-if="vestaState.currentStep === 3" />
        <CharacterBackground v-else-if="vestaState.currentStep === 4" />
        <CharacterSheet v-else-if="vestaState.currentStep === 5" />
    </div>
</template>

<script setup>
import { vestaState } from '../store/vestaState';
import CharacterCreator from './CharacterCreator.vue';
import CharacterAttributes from './CharacterAttributes.vue';
import CharacterTraits from './CharacterTraits.vue';
import CharacterBackground from './CharacterBackground.vue';
import CharacterSheet from './CharacterSheet.vue';
</script>
