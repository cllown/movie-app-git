import { Movie } from '../app/models/movie';

export const movies: Movie[] = [
  {
    backdrop_path: '../assets/img/theFallGuy.jpg',
    id: 1,
    description:
      "A down-and-out stuntman must find the missing star of his ex-girlfriend's blockbuster film.",
    release_date: 'February 22, 2024',
    title: 'The Fall Guy',
    rating: '7.0',
    duration: 7560,
  },
  {
    backdrop_path: '../assets/img/doctorStrangeInTheMultiverseOfMadness.jpg',
    id: 2,
    description:
      'Doctor Strange teams up with a mysterious teenage girl who can travel across multiverses, to battle other-universe versions of himself which threaten to wipe out the multiverse. They seek help from the Scarlet Witch, Wong and others.',
    release_date: 'May 06, 2022',
    title: 'Doctor Strange in the Multiverse of Madness',
    rating: '6.9',
    duration: 7560,
  },
  {
    backdrop_path: '../assets/img/anyonebutYou.jpg',
    id: 3,
    description:
      "After an amazing first date, Bea and Ben's fiery attraction turns ice-cold--until they find themselves unexpectedly reunited at a wedding in Australia. So they do what any two mature adults would do: pretend to be a couple.",
    release_date: 'December 22, 2023',
    title: 'Anyone But You',
    rating: '6.1',
    duration: 6180,
  },
  {
    backdrop_path: '../assets/img/homeAlone.jpg',
    id: 4,
    description:
      'An eight-year-old troublemaker, mistakenly left home alone, must defend his home against a pair of burglars on Christmas Eve.',
    release_date: 'November 16, 1990',
    title: 'Home Alone',
    rating: '7.7',
    duration: 6180,
  },
  {
    backdrop_path: '../assets/img/tarot.jpg',
    id: 5,
    description:
      'When a group of friends recklessly violates the sacred rule of Tarot readings, they unknowingly unleash an unspeakable evil trapped within the cursed cards. One by one, they come face to face with fate and end up in a race against death.',
    release_date: 'May 16, 2024',
    title: 'Tarot',
    rating: '4.8',
    duration: 5520,
  },
];
