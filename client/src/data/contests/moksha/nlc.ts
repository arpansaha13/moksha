import type { Contest } from '~/types'

export const nlc: Contest[] = [
    {
        id: 45,
        slug: 'oxford-union-debate',
        name: 'Oxford Union Debate',
        subtitle: 'Debate Competition',
        type: ['duo'],
        image: {
            src: '/images/contests/generic-poster.png',
        },
        description: [
            {
                bold: true,
                p: 'The Oxford Union Debates: Fostering Intellectual Discourse and Debate Excellence'
            },
            {
                p: "The Oxford Union Debates serve as a prestigious forum where the brightest minds, thought leaders, and influential figures converge to engage in spirited discussions on a diverse range of topics. These debates are a reflection of the Union's enduring commitment to promoting free speech, critical thinking, and the art of persuasive argumentation.",
            },
            {
                bold: true,
                p: 'Event Leads:'
            },
            {
                ul: ['Divyam Raj Singh : +91 92649 15363', 'Rohan Singh : +91 62064 12301', 'Ishika : +91 91422 09056']
            }

        ],
        allowedTeamSize: 2,

        instructions: [
            {
                heading: 'Format'
            },
            {
                ul: ['Team Size: Team of 2', 'Mode : Offline']
            },
            {
                heading: 'Rules'
            },
            {
                p: 'The competition will be held in 4 rounds : Preliminary (3 rounds), Quarters, Semis and Finals.'
            },
            {
                bold: true,
                p: 'Sequence:'
            },
            {
                ul: ['The First Speaker for the Proposition.', 'The First Speaker for the Opposition.', 'The Second Speaker for the Proposition.', 'The Second Speaker for the Opposition.', 'Rebuttal : Time will be allocated for a rebuttal by either side. The rebuttal speech is usually made by the first speaker for each side.']
            },
            {
                p: 'Speakers will be informed about the Motions and  Draws 20 minutes before each round.'
            },
            {
                heading: 'General Guidelines'
            },
            {
                ul: [
                    "There will be a limited number i.e., 3 topics under a common theme given to the participants prior to the commencement of the competition To ensure fairness in the competition, the speakers will be allowed to choose the topic they are most comfortable with.",
                    'The proposition and opposition teams are expected to mark the given 3 topics as Most favourable, least favourable and vetoed.',
                    'The total speech time should be 4 minutes, exceeding it will lead to deduction of points.',
                    'The language of communication should be English',
                    'Rules will be released later.'

                ]
            },
            { heading: "Marking Scheme" },
            {
                p: 'There will be three main criteria for marking any participant:'
            },
            {
                ul: ['Matter: Validity of arguments and the explanation provided by the speaker. Supporting examples can also be introduced here.',
                    'Method: The way speaker has structured the above arguments in a coherent manner with proper continuity.',
                    'Manner: This includes confidence, clarity, body language, and intonation in speech.'
                ]
            },

            {
                heading: 'Points to be noted'
            },
            {
                ul: ['The speakers and audience are expected to maintain decorum during the event. Jeering or any form of personal insults is strictly disallowed.',
                    'Usage of the internet is prohibited for participants, as the background will be provided along with the topic.',
                    'In case of any dispute/disagreement, the discretion of the judges and event organizers will be final.',
                    'The speakers need to take the equity calls seriously.']
            }

        ]

    },

    {
        id: 46,
        slug: 'open-mic',
        name: 'Open Mic',
        subtitle: 'Open Mic Competition',
        type: ['solo'],
        image: {
            src: '/images/contests/generic-poster.png',
        },
        description: [
            {
                p: 'It is a solo entry competition wherein participants can partake in one of the given 2 formats - Poetry (and Shayaris) & Standup Comedy. The event will provide a platform for budding poets and comedians to showcase their talent.'
            },
            {
                bold: true,
                p: 'Event Leads:'
            },
            {
                ul: ['Harshad Sangale : +91 99223 49783', 'T. Sharmitha : +91 63005 29828']
            }
        ],

        instructions: [
            {
                heading: 'Format'
            },
            {
                ul: ['Participation: Solo', 'Mode : Offline', 'What participants may bring: Props which might be needed.', 'A participant can only register for 1 category, either Poetry or Standup Comedy.']
            },
            {
                heading: 'Rules - Poetry'
            },

            {
                bold: true,
                p: 'Round 1: Preliminary'
            },
            {
                ul: ['Participants need to submit a poem penned down by them based on the theme which will be released soon (open to interpretation of the participant), to participate in the event.', 'The length of the poetry should be such that it takes a minimum of 2-3 minutes to recite it comfortably.', 'The poetry (written) submissions must be in PDF format.', 'Naming Convention: OpenMic_ParticipantName_CollegeName', 'Shortlisted participants will be informed by email.']
            },

            {
                bold: true,
                p: 'Round 2: Finals'
            },
            {
                ul: ['The shortlisted participants will be performing their already submitted poetry, live on the day of the event, in front of the judge(s).', 'Time Limit: Maximum 3-4 minutes', 'The performance will be evaluated as per the judge’s criteria.', 'The top 2 best performers will be awarded prizes.']
            },


            {
                heading: 'Rules - Standup Comedy'
            },

            {
                bold: true,
                p: 'Round 1: Preliminary'
            },
            {
                ul: ['Participants need to perform a standup act, originally written by them.', 'Time Limit: 3-4 minutes', 'Shortlisted participants will be informed by email.']
            },

            {
                bold: true,
                p: 'Round 2: Finals'
            },
            {
                ul: ['The shortlisted participants will perform a live standup act on the day of the event, in front of a judge(s).', 'Time Limit: 4-5 minutes', 'Participants should ensure a stable internet connection during the event.', 'The performance will be evaluated as per the judge’s criteria. The best 2 standup artists would be declared winners.']
            },
            { heading: 'General Instructions' },
            {
                p: 'The following are the parameters on which a participant would be judged:-'
            },
            {
                ul: ['The content performed by the participants should be original.', "The content shouldn't disrespect any gender, religion, community, race, or political party.", 'The performance can be in English and/or Hindi.', 'Participants will be evaluated on the basis of the specified judging criteria.', "The organizers' and the judge's decisions will be final and binding.", 'Failure to comply with the rules will result in immediate dismissal from the competition.']
            },
            {
                bold: true,
                p: 'Note: If the participants require on-campus accommodations, they can avail so at an extra charge borne by them.'
            }
        ]

    }
    ,
    {
        id: 47,
        slug: 'plot-twist',
        name: 'Plot-Twist',
        subtitle: 'Writing Competition',
        type: ['solo'],
        image: {
            src: '/images/contests/generic-poster.png',
        },
        description: [
            {
                p: 'This is a movie-inspired writing event, bristling with creativity and celebrating the spirit of the quintessential cinephiles. This will be a pan-India event hosted on Unstop.'
            },
            {
                bold: true,
                p: 'Event Leads:'
            },
            {
                ul: ['Sayukta Das : +91 76299 12681', 'Prathmesh Shitre : +91 87677 14582', 'Daliya : +91 87877 34431']
            }
        ],

        instructions: [
            {
                p: 'The event will be held entirely online hosted on Unstop. The participants will be provided two highly contrasting plots(eg: A victorian romance and a sci-fi thriller) on the spot and you have to combine them together to create a movie plot that could break the box office!'
            },
            {
                heading: 'Rules'
            },
            {
                ul: ['Platform: Unstop',
                    'Deadline for submission: 13th October',
                    'Any instance of vulgarity or disturbing content of any order will lead to a forceful halt of performance and immediate disqualification.',
                    'Should be original. plagiarism will result in direct disqualification.',
                    'Participation fee: Really? Why?']
            },

            { heading: 'Judging Criteria:' },
            {
                ul: ['Storyline', 'Theme', 'Character Development', 'Wordplay']
            }

        ]

    },

    {
        id: 48,
        slug: 'treasure-hunt',
        name: 'Treasure Hunt',
        subtitle: 'Treasure Hunt',
        type: ['team'],
        image: {
            src: '/images/contests/generic-poster.png',
        },
        allowedTeamSize: { min: 1, max: 4 },
        description: [
            {
                p: "Get ready to embark on an exhilarating adventure of wits and exploration at our college campus-wide treasure hunt event! Join fellow students in an exciting quest to uncover hidden clues, solve puzzles, and follow the trail that leads to a mysterious treasure hidden somewhere on our sprawling campus. With teamwork and sharp problem-solving skills, you'll navigate through campus landmarks, decode riddles, and unearth the secrets of our historic grounds. This thrilling and fun-filled event promises not only fantastic prizes for the victors but also unforgettable memories and a chance to connect with your fellow students in an exciting and unique way. Are you up for the challenge? The hunt is on!"
            },
            {
                bold: true,
                p: 'Event Leads:'
            },
            {
                ul: ['Omisha Bajoria : +91 92375 29330', 'Diya Chaudhary : +91 99873 50545']
            }
        ],

        instructions: [
            {
                heading: 'Format'
            },
            {
                ul: ['Participation: Single or Group of maximum 4',
                    'Mode of Participation: Offline']
            },

            {
                heading: 'Rules'
            },
            {
                ul: ['Team Formation: Participants must form teams, with a maximum and minimum number of members per team (e.g., 2-4 members).',
                    'Registration: All teams register before the event begins.Please provide a designated registration time and location.',
                    'Time Limit: Set a specific time limit for the treasure hunt. Teams must return to the finish line within this time frame.',
                    'Treasure Map: Each team will receive a map with mark starting and ending points, as well as a list of clues or riddles that will lead them to different locations on campus.',
                    'Clues: Teams must follow the clues in sequence, solving one clue will leave them to the next location.',
                    'NO Outside help: Teams cannot receive assistance from individuals who are not participating in the event including using electronic devices to look up answers.',
                    'Respect campus rules: Participants must follow all campus rules and regulations. No damage or destruction to campus property or activities is allowed.',
                    'Safety: Emphasize safety. Participants must be aware of their surroundings and not engage in any risky behavior.',
                    'Fair Play: fair play and sportsmanship is encouraged. No aggressive behavior, cheating or sabotaging other teams is allowed.',
                    'Treasure retrieval: The first team to reach the final location and retrieve the hidden treasure or reach the finish line is the winner.',
                    'Judges: There will be judges and event organizers stationed at various checkpoints to ensure fair play and to provide assistance if needed.',
                    'Prizes: look at a prices and awards will be waiting for the winning teams based on completion time or and other specific criteria',
                    'Debriefing: After the event, participants must gather for a debriefing session to share experiences, stories and insights.']
            }
        ]

    }
]

