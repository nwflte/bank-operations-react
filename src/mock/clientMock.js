import uuid from 'uuid/v1';
import moment from 'moment';

import mock from 'utils/mock';

mock.onGet('/api/clients').reply(200, {
  clients: [
    {
      id: uuid(),
      firstName: 'Ekaterina',
      lastName: 'Tankova',
      gender: 'female',
      username: 'username',
      email: 'email',
      birthDate: new Date(),
      avatar: '/images/avatars/avatar_2.png',
      ville: 'ville',
      adresse1: 'Adresse 1',
      adresse2: 'Adresse 2'
    },
    {
      id: uuid(),
      name: 'Ekaterina Tankova',
      email: 'ekaterina.tankova@devias.io',
      avatar: '/images/avatars/avatar_2.png',
      spent: '500.00',
      currency: '$',
      type: 'Agency',
      projects: '1',
      rating: 5,
      location: 'West Virginia, USA'
    },
    {
      id: uuid(),
      name: 'Cao Yu',
      email: 'cao.yu@devias.io',
      avatar: '/images/avatars/avatar_3.png',
      spent: '300.00',
      type: 'Freelancer',
      currency: '$',
      projects: '3',
      rating: 4.3,
      location: 'Bristow'
    },
    {
      id: uuid(),
      name: 'Alexa Richardson',
      email: 'alexa.richardson@devias.io',
      avatar: '/images/avatars/avatar_4.png',
      spent: '2,600.00',
      type: 'Enterprise',
      currency: '$',
      projects: '0',
      rating: 4.5,
      location: 'Georgia, USA'
    },
    {
      id: uuid(),
      name: 'Anje Keizer',
      email: 'anje.keizer@devias.io',
      avatar: '/images/avatars/avatar_5.png',
      spent: '5,600.00',
      type: 'Enterprise',
      currency: '$',
      projects: '6',
      rating: 4,
      location: 'Ohio, USA'
    },
    {
      id: uuid(),
      name: 'Clarke Gillebert',
      email: 'clarke.gillebert@devias.io',
      avatar: '/images/avatars/avatar_6.png',
      spent: '500.00',
      type: 'Agency',
      currency: '$',
      projects: '1',
      rating: 3.5,
      location: 'Texas, USA'
    },
    {
      id: uuid(),
      name: 'Adam Denisov',
      email: 'adam.denisov@devias.io',
      avatar: '/images/avatars/avatar_7.png',
      spent: '5,230.00',
      type: 'Agency',
      currency: '$',
      projects: '0',
      rating: 3,
      location: 'California, USA'
    },
    {
      id: uuid(),
      name: 'Ava Gregoraci',
      email: 'ava.gregoraci@devias.io',
      avatar: '/images/avatars/avatar_8.png',
      spent: '300.00',
      type: 'Freelancer',
      currency: '$',
      projects: '0',
      rating: 4,
      location: 'California, USA'
    },
    {
      id: uuid(),
      name: 'Emilee Simchenko',
      email: 'emilee.simchenko@devias.io',
      avatar: '/images/avatars/avatar_9.png',
      spent: '100.00',
      type: 'Agency',
      currency: '$',
      projects: '4',
      rating: 4.5,
      location: 'Nevada, USA'
    },
    {
      id: uuid(),
      name: 'Kwak Seong-Min',
      email: 'kwak.seong.min@devias.io',
      avatar: '/images/avatars/avatar_10.png',
      spent: '1,000.00',
      type: 'Freelancer',
      currency: '$',
      projects: '2',
      rating: 5,
      location: 'Michigan, USA'
    },
    {
      id: uuid(),
      name: 'Shen Zhi',
      email: 'shen.zhi@devias.io',
      avatar: '/images/avatars/avatar_11.png',
      spent: '2,300.00',
      type: 'Agency',
      currency: '$',
      projects: '0',
      rating: 3.9,
      location: 'Utah, USA'
    },
    {
      id: uuid(),
      name: 'Merrile Burgett',
      email: 'merrile.burgett@devias.io',
      avatar: '/images/avatars/avatar_12.png',
      spent: '200.00',
      type: 'Enterprise',
      currency: '$',
      projects: '7',
      rating: 4.2,
      location: 'Utah, USA'
    }
  ]
});

mock.onGet('/api/clients/1').reply(200, {
  summary: {
    id: uuid(),
    firstName: 'Ekaterina',
    lastName: 'Tankova',
    gender: 'female',
    username: 'username',
    email: 'email',
    birthDate: new Date(),
    avatar: '/images/avatars/avatar_2.png',
    ville: 'ville',
    adresse1: 'Adresse 1',
    adresse2: 'Adresse 2'
  }
});

mock.onGet('/api/clients/1/compte').reply(200, {
  compte: {
    id: uuid(),
    rib: '1564623647879655521320',
    solde: 100.6,
    blocked: false
  }
});

mock.onGet('/api/clients/1/compte/virements').reply(200, {
  virements: [
    {
      id: uuid(),
      ribEmetteur: '644444444444631',
      ribBeneficiaire: '544444132433333',
      motif: 'motif',
      amount: 132,
      date: moment(),
      status: 'accepted'
    }
  ]
});

mock.onGet('/api/management/clients/1/logs').reply(200, {
  logs: [
    {
      id: uuid(),
      status: 200,
      method: 'POST',
      route: '/api/purchase',
      desc: 'Purchase',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(2, 'minutes')
        .subtract(56, 'seconds')
    },
    {
      id: uuid(),
      status: 522,
      error: 'Invalid credit card',
      method: 'POST',
      route: '/api/purchase',
      desc: 'Purchase',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(2, 'minutes')
        .subtract(56, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'DELETE',
      route: '/api/products/d65654e/remove',
      desc: 'Cart remove',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(8, 'minutes')
        .subtract(23, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products/d65654e/add',
      desc: 'Cart add',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(20, 'minutes')
        .subtract(54, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products/c85727f/add',
      desc: 'Cart add',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(34, 'minutes')
        .subtract(16, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products/c85727f',
      desc: 'View product',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(54, 'minutes')
        .subtract(30, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'GET',
      route: '/api/products',
      desc: 'Get products',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(56, 'minutes')
        .subtract(40, 'seconds')
    },
    {
      id: uuid(),
      status: 200,
      method: 'POST',
      route: '/api/login',
      desc: 'Login',
      IP: '84.234.243.42',
      created_at: moment()
        .subtract(2, 'days')
        .subtract(57, 'minutes')
        .subtract(5, 'seconds')
    }
  ]
});
