const heroes = [
    {
        id: 1,
        name: 'Batman',
        owner: 'DC'
    },
    {
        id: 2,
        name: 'Spiderman',
        owner: 'Marvel'
    },
    {
        id: 3,
        name: 'Superman',
        owner: 'DC'
    },
    {
        id: 4,
        name: 'Flash',
        owner: 'DC'
    },
    {
        id: 5,
        name: 'Wolverine',
        owner: 'Marvel'
    },
];

const owners = ['DC', 'Marvel'];

const getHeroById = (id) => heroes.find((heroe) => heroe.id === id)
const heroByOwner = (owner) => heroes.filter((heroe) => heroe.owner === owner)

export { heroes, owners, getHeroById, heroByOwner };
