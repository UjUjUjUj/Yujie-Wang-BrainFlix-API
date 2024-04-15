
const { timeStamp } = require('console')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')



router.get('/', (req, res)=>{
    
    const videoFullData= JSON.parse(fs.readFileSync('./data/videos.json'))

    const videoSmallData= videoFullData.map(video =>{
        return{
            id: video.id,
            title: video.title,
            channel: video.channel,
            image: video.image

        }
    })
    
    res.status(200).json(videoSmallData)
})
router.post('/',(req, res)=>{
    const newVideoData = req.body
    

    const videoData= JSON.parse(fs.readFileSync('./data/videos.json'))
    const timestamp = Date.now(); 
    const newVideoEntry ={
        id: uuidv4(),
        ...newVideoData,
        timestamp:timestamp,
    }
    videoData.push(newVideoEntry)
    fs.writeFileSync('./data/videos.json', JSON.stringify(videoData))
    res.status(201).json(newVideoEntry)
})


router.get('/:videoId',(req, res)=>{
    const videoData= JSON.parse(fs.readFileSync('./data/videos.json'))
    const { videoId }= req.params
    const requestedVideo = videoData.find(video => videoId === video.id)
    
    if (!requestedVideo) {
        res.status(404).json(`No Video with id ${videoId} found`);
    }

    res.status(200).json(requestedVideo)
})


module.exports = router;