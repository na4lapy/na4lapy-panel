export const animalInitialState = {
  gender: 'UNKNOWN',
  species: 'DOG',
  activity: 'UNKNOWN',
  training: 'UNKNOWN',
  vaccination: 'UNKNOWN',
  sterilization: 'UNKNOWN',
  status: 'ACTIVE',
  animalStatus: 'NEW'

};

export const filterInitialState = {
  animalFilter: {
    name: '',
    species: 'ANY',
    gender: 'ANY',
    size: 'ANY',
    status: 'ANY'
  }
};


export const shelterInitialState = {
  accountNumber: '',
  adoptionRules: '',
  buildingNumber: '',
  city: '',
  email: '',
  facebookProfile: '',
  name: '',
  phoneNumber: '',
  postalCode: '',
  street: '',
  voivodeship: '',
  website: ''
};


export const voivodeships = [
  'dolnośląskie',
  'kujawsko-pomorskie',
  'lubelskie',
  'lubuskie',
  'łódzkie',
  'małopolskie',
  'mazowieckie',
  'opolskie',
  'podkarpackie',
  'podlaskie',
  'pomorskie',
  'śląskie',
  'świętokrzyskie',
  'warmińsko-mazurskie',
  'wielkopolskie',
  'zachodniopomorskie'
];
