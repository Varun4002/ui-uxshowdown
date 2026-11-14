// Character metadata, kept out of Characters.jsx so that file stays a pure
// component module (React fast-refresh requires it).
import { Benny, Mimi, Oliver, Pip, Tilly } from './Characters.jsx';

export const CAST = [
  {
    name: 'Benny the Bear',
    animal: 'bear',
    bag: 'butter',
    likes: 'Exploring new places',
    fact: 'Packs his bag the night before, every single day.',
    Component: Benny,
  },
  {
    name: 'Mimi the Bunny',
    animal: 'bunny',
    bag: 'coral',
    likes: 'Painting and crafts',
    fact: 'Mixes her own colours and names every single one.',
    Component: Mimi,
  },
  {
    name: 'Oliver the Fox',
    animal: 'fox',
    bag: 'sage',
    likes: 'Discovering new things',
    fact: 'Asks “why?” more times before breakfast than anyone counts.',
    Component: Oliver,
  },
  {
    name: 'Pip the Penguin',
    animal: 'penguin',
    bag: 'sky',
    likes: 'Music and dancing',
    fact: 'Turns any wait in a queue into a little dance routine.',
    Component: Pip,
  },
  {
    name: 'Tilly the Turtle',
    animal: 'turtle',
    bag: 'lavender',
    likes: 'Books and storytelling',
    fact: 'Never finishes a story without inventing a better ending.',
    Component: Tilly,
  },
];
