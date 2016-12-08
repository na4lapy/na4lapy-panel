import { createSelector } from 'reselect';
import _ from 'lodash';
const animalSelector = state => state.animalListState.animals;
const animalFilterSelector = state => state.animalFilter;
const animalSorterSelector = state => state.sorting;

const getAnimals = (animals, animalFilter, animalSorter) => {

  const shouldFilterFeature = (key) => typeof animalFilter[key] !== 'undefined' && key != 'name' && animalFilter[key] !== 'ANY';
  const shouldFilterName = (key) => key == 'name' && animalFilter[key] && animalFilter[key].length != 0;
  const doesFilterContainsAnimalName = (animal) => animal.name && animal.name != 0 && animal.name.toUpperCase().indexOf(animalFilter.name.toUpperCase()) >= 0;

  let filteredAnimals = animals;
  for (let key in animalFilter) {
    if (shouldFilterFeature(key)) {

      filteredAnimals = _.filter(filteredAnimals, animal => animal[key] === animalFilter[key] );
    } else if (shouldFilterName(key)) {
      filteredAnimals = _.filter(filteredAnimals, animal =>  doesFilterContainsAnimalName(animal));
    }
  }

  let sortedObjects = _.sortBy(filteredAnimals, animalSorter.sortingKey);
  if (animalSorter.order === 'ASC') {
    sortedObjects.reverse();
  }

  return sortedObjects;
};

export default createSelector(
  animalSelector,
  animalFilterSelector,
  animalSorterSelector,
  getAnimals
);
