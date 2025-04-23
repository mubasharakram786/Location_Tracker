const express = require('express')

const router = express.Router;

const DUMMY_USERS= [
    {
        id:'u1',
        name:'Mubahar Akram',
        email:'mubashar1418@gmail.com',
         DUMMY_PLACES: [
            {
                id:"p1",
                title: "Minar-e-Pakistan",
                coordinates: {
                    latitude: 31.5925,
                    longitude: 74.3091
                },
                address: "Minar-e-Pakistan, Iqbal Park, Lahore, Punjab, Pakistan",
                description: "Minar-e-Pakistan is a national monument located in Iqbal Park, Lahore. It was built to commemorate the Lahore Resolution passed on 23rd March 1940, which eventually led to the creation of Pakistan. The tower represents a blend of Mughal, Islamic, and modern architecture and is a symbol of national pride.",
                creator:'u1'
            },
            {
                id:"p2",
                title:'Badshahi Mosque',
                description:"The Badshahi Mosque is one of the most iconic and historic landmarks in Lahore. Built in 1673 during the Mughal era by Emperor Aurangzeb, it is one of the largest mosques in the world. Known for its massive courtyard, grand architecture, and red sandstone construction, it is a symbol of Lahore's rich cultural heritage.",
                location:{
                    lat:'31.5889',
                    lag:'74.3094'
                },
                address:'Badshahi Mosque, Walled City of Lahore, Lahore, Punjab, Pakistan',
                creator:'u1'
            },
        
        
        ]
        

    }
]

router.get('/:uid', (req,res,next)=>{
    const userId = req.params.uid;
    const userPlaces = DUMMY_USERS.find(user=> user.id === userId)
    res.json({
        user:"Anas Jameel",
        places:userPlaces.DUMMY_PLACES
    })
})