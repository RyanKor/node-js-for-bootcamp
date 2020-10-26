import express from 'express'
import util from 'util'
import googleMaps from '@google/maps'

import History from '../schemas/history'
import Favorite from '../schemas/favorite'
const router = express.Router()

const googleMapsClient = googleMaps.createClient({
    key: process.env.PLACES_API_KEY,
})

router.get('/', async (req,res)=>{
    try{
        const favorite = await Favorite.find({})
        res.render('index', {results: favorite})
    }catch(error){
        console.error(error)
        next(error)
    }

})
router.get('/autocomplete/:query', (req,res,next)=>{
    googleMapsClient.placesAutoComplete({
        input: req.params.query,
        language: "ko",
    }, (err,response)=>{
        if(err){
            return next(err)
        }
        return res.json(response.json.predictions)
    })
})

router.get('/search/:query', async (req,res,next)=>{
    const googlePlaces = util.promisify(googleMapsClient.places)
    const googlePlacesNearby = util.promisify(googleMapsClient.placesNearby)
    const {lat, lng, type} = req.query
    try{
        const history = new History({query: req.params.query})
        await history.save()
        let response;
        if(lat && lng){
        response = await googlePlacesNearby({
            keyword: req.params.query,
            location : `${lat},${lng}`,
            rankby: 'distance', // 가까운 거리순으로 정렬하는 방법
            // radius : 5000, // 인기순으로 정렬하기 (반경 내 장소들을 인기순으로 정렬)
            language: "ko",
            type,
        })
    }else{
        response = await googlePlaces({
            query: req.params.query,
            language: "ko",
            type
        })
    }
        res.render('result', {
            title : `${req.params.query} search result`,
            results: response.json.results,
            query: req.params.query
        })
    }catch(err){
        console.error(err)
        next(err)
    }
})

router.post('/location/:id/favorite', async(req,res,next)=>{
    try{
        const favorite = await Favorite.create({
            placeId : req.params.id,
            name: req.body.name,
            location: [req.body.lng, req.body.lat],
        })
        res.send(favorite)
    }catch(err){
        console.error(err)
        next(err)
    }
})

module.exports = router