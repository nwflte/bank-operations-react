import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    ribEmetteur: 'RIB111111',
    ribBeneficiaire: 'RIB111221',
    amount: 151211,
    date: '2020-01-01',
    motif: 'Virement',
  },
  {
    id: uuid(),
    ribEmetteur: 'RIB111111',
    ribBeneficiaire: 'RIB111111',
    amount: 15121,
    date: '2020-01-01',
    motif: 'Virement',
  }
];
