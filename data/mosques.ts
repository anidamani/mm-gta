import type { Mosque } from "@/types/mosque"

export const mosques: Mosque[] = [
  {
    id: "1",
    mosque_name: "Islamic Foundation of Toronto",
    address: "441 Nugget Ave",
    city: "Scarborough",
    additional_notes: "Ample parking available. Separate prayer areas for brothers and sisters.",
    website: "https://islamicfoundation.ca",
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:15" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:30" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:45" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:15", notes: "English Khutbah" },
        { prayer_number: 2, prayer_time: "14:30", notes: "Arabic Khutbah" },
      ],
    },
  },
  {
    id: "2",
    mosque_name: "Jame Masjid Mississauga",
    address: "2200 South Sheridan Way",
    city: "Mississauga",
    additional_notes: "Easily accessible, close to major highways.",
    website: "https://www.jamemasjid.ca/",
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:00" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:15" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:30" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:00", notes: "English" },
        { prayer_number: 2, prayer_time: "14:15", notes: "Urdu" },
      ],
    },
  },
  {
    id: "3",
    mosque_name: "Meadowvale Islamic Centre",
    address: "6585 Meadowvale Town Centre Cir",
    city: "Mississauga",
    additional_notes: "A vibrant community center.",
    website: "https://micmasjid.com/",
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "20:45" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:00" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:15" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:30", notes: "Regular" },
      ],
    },
  },
  {
    id: "4",
    mosque_name: "Masjid Usman",
    address: "58 Antrim Crescent",
    city: "Scarborough",
    additional_notes: "Known for its peaceful environment.",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:00" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:15" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:30" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:00", notes: "English" },
      ],
    },
  },
  {
    id: "5",
    mosque_name: "Baitul Mukarram Masjid",
    address: "2800 Danforth Ave",
    city: "Toronto",
    additional_notes: "Located in the heart of Danforth.",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "20:45" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:00" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:15" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:15", notes: "Bengali & English" },
      ],
    },
  },
  {
    id: "6",
    mosque_name: "Abu Bakr Siddique Masjid",
    address: "3390 Bayview Ave",
    city: "Toronto",
    additional_notes: "Offers various community programs.",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:15" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:30" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:45" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:00", notes: "English" },
      ],
    },
  },
  {
    id: "7",
    mosque_name: "Masjid Al Farooq",
    address: "1251 Bridletowne Cir",
    city: "Scarborough",
    additional_notes: "Provides religious education.",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "20:45" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:00" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:15" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:30", notes: "Urdu/English" },
      ],
    },
  },
  {
    id: "8",
    mosque_name: "Islamic Centre of Etobicoke",
    address: "129 Kipling Ave",
    city: "Etobicoke",
    additional_notes: "Offers diverse programs for the community.",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:00" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:15" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:30" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:00", notes: "English" },
      ],
    },
  },
  {
    id: "9",
    mosque_name: "Milton Community Masjid",
    address: "1188 Bronte St S",
    city: "Milton",
    additional_notes: "New facility, growing community.",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:15" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:30" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:45" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:15", notes: "English" },
      ],
    },
  },
  {
    id: "10",
    mosque_name: "Masjid Al-Aqsa",
    address: "5865 Montevideo Rd",
    city: "Mississauga",
    additional_notes: "Active youth programs.",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "20:45" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:00" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:15" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:00", notes: "English" },
      ],
    },
  },
  {
    id: "11",
    mosque_name: "Dar Al-Tawheed Islamic Centre",
    address: "5560 McAdam Rd",
    city: "Mississauga",
    additional_notes: "Offers Islamic courses and lectures.",
    website: "https://www.daraltawheed.com/",
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:00" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:15" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:30" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:30", notes: "English" },
      ],
    },
  },
    {
    id: "12",
    mosque_name: "Masjid Al-Huda",
    address: "720 Burnhamthorpe Rd W",
    city: "Mississauga",
    additional_notes: "Known for its welcoming atmosphere and community support.",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "20:45" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:00" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:15" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:00", notes: "English" },
      ],
    },
  },
  {
    id: "13",
    mosque_name: "An Noor Islamic Centre",
    address: "1085 Bellamy Rd N",
    city: "Scarborough",
    additional_notes: "Provides Islamic education and community services.",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:15" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:30" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:45" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:30", notes: "English/Urdu" },
      ],
    },
  },
   {
    id: "14",
    mosque_name: "Masjid Imam Ali",
    address: "12 Banigan Dr",
    city: "North York",
    additional_notes: "Provides a range of religious and social services.",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "20:45" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:00" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:15" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:15", notes: "Arabic/English" },
      ],
    },
  },
  {
    id: "15",
    mosque_name: "Islamic Information & Education Centre Canada",
    address: "116 Oakdale Rd",
    city: "North York",
    additional_notes: "Offers a variety of educational programs.",
    website: "https://iiec-canada.com/",
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:00" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:15" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:30" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:00", notes: "English" },
      ],
    },
  },
  {
    id: "16",
    mosque_name: "Sayyida Khadija Centre",
    address: "7150 Edwards Blvd",
    city: "Mississauga",
    additional_notes: "Focuses on women's education and empowerment.",
    website: "https://sayyidakhadija.com/",
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:15" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:30" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:45" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:15", notes: "English" },
      ],
    },
  },
   {
    id: "17",
    mosque_name: "Masjid Quba",
    address: "5060 Ninth Line",
    city: "Mississauga",
    additional_notes: "Dedicated to serving the local Muslim community.",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "20:45" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:00" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:15" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:00", notes: "English" },
      ],
    },
  },
    {
    id: "18",
    mosque_name: "Taric Islamic Centre",
    address: "99 Mcmaster Ave",
    city: "Ajax",
    additional_notes: "Offers a range of programs for youth and adults",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:00" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:15" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:30" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:30", notes: "English" },
      ],
    },
  },
  {
    id: "19",
    mosque_name: "Whitby Islamic Centre",
    address: "300 Gordon St",
    city: "Whitby",
    additional_notes: "A hub for Islamic learning and activities",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "21:15" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:30" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:45" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:15", notes: "English" },
      ],
    },
  },
   {
    id: "20",
    mosque_name: "Markham Islamic Community Center",
    address: "280 Main St N",
    city: "Markham",
    additional_notes: "Provides a place for worship and community gatherings",
    website: undefined,
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "20:45" },
        { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:00" },
        { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:15" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "13:00", notes: "English" },
      ],
    },
  },
    {
      id: "21",
      "mosque_name": "Jami Mosque",
      "address": "56 Boustead Ave",
      "city": "Toronto",
      "additional_notes": "One of the oldest mosques in Toronto.",
      "website": undefined,
      "taraweeh": {
        "rakaat": 20,
        "times": [
          { start_date: "2025-03-01", end_date: "2025-03-10", prayer_time: "20:45" },
          { start_date: "2025-03-11", end_date: "2025-03-20", prayer_time: "21:00" },
          { start_date: "2025-03-21", end_date: "2025-03-30", prayer_time: "21:15" }
        ]
      },
      "jumuah": {
        "times": [
          { "prayer_number": 1, "prayer_time": "13:00", "notes": "English" }
        ]
      }
    },
];