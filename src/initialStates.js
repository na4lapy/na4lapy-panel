export const animalInitialState = {
  name: '',
  gender: 'UNKNOWN',
  species: 'DOG',
  activity: 'UNKNOWN',
  training: 'UNKNOWN',
  vaccination: 'UNKNOWN',
  sterilization: 'UNKNOWN',
  status: 'ACTIVE',
  animal_status: 'NEW',
  shelterid: 1
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
