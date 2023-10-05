import { Event } from '~/types'

export const fineArts: Event[] = [
    {
        id: 17,
        slug: 'blazing-spirit',
        name: 'Blazing Spirit',
        club: 'Fine Arts Club',
        image: {
          src: '/images/events/generic-poster.png',
        },
        description: [
          {
            p: '3D art of Moksha bird using waste materials only.',
          },
          {
            bold:true,
            p: 'Event Managers'
          },
          {
            ul: [
                'Soumyadeep Shome',
                'Pradipta Chakraborty', 
                'Himanshi Meena',
            ],
          },
        ],
    },
    {
        id: 17,
        slug: 'celebrity-portrait',
        name: 'Celebrity Portrait',
        club: 'Fine Arts Club',
        image: {
          src: '/images/events/generic-poster.png',
        },
        description: [
          {
            p: 'Use of small musical symbols to make the portrait of our invited honorable celebrity is the main attraction of this event.It will be in the form of a collage. We will first display it to everyone and lastly it will be gifted to the artist.',
          },
          {
            bold:true,
            p: 'Event Managers'
          },
          {
            ul: [
                'Deepratip Nandi',
                'Anubha',
            ],
          },
        ],
    },
    {
        id: 17,
        slug: 'ink-splash',
        name: 'InkSplash',
        club: 'Fine Arts Club',
        image: {
          src: '/images/events/generic-poster.png',
        },
        description: [
          {
            p: 'Open canvas is a canvas where any of the artists can draw any of their thoughts, which will be provided by us. The canvas will be painted by using hand Prints only(no brushes will be allowed) and after the canvas is fully covered with paints, the outline of Moksha bird will be highlighted using the outline previously made.',
          },
        ],
        instructions: [
            {
                heading: 'Rules',
            },
            {
                ul: [
                    'No Brushes Will be provided.',
                    'Open for All.',
                ]
            }
        ],
    },
    {
        id: 17,
        slug: 'asgards-gallery',
        name: "Asgard's Gallery",
        club: 'Fine Arts Club',
        image: {
          src: '/images/events/generic-poster.png',
        },
        description: [
          {
            p: 'The exhibition will be divided into three sections:',
          },
          {
            ul: [
                'No Brushes Will be provided.',
                'Open for All.',
            ]
          },
        ],
    },
    {
        id: 19,
        slug: 'graffiti',
        name: "Graffiti/Mural Graffiti",
        club: 'Fine Arts Club',
        image: {
          src: '/images/events/generic-poster.png',
        },
        description: [
          {
            p: 'It is art that is written, painted or drawn on a wall or other surface The Graffiti is already completed and it is done in collaboration with Graffitube (well-known graffiti artists).We have done the Graffiti of Moksha viii, in a comic inspired fashion.',
          },
        ],
    },
]
