import { createSelector } from 'reselect';

const animalSelector = state => state.animalListState.animals
const animalNameFilterSelector = state => state.filter.animalName
const animalSpeciesFilterSelector = state => state.filter.animalSpecies
const animalGenderFilterSelector = state => state.filter.animalGender
const animalSizeFilterSelector = state => state.filter.size

const getAnimals = (animal, animalFilter) => {
  return animals;
}
