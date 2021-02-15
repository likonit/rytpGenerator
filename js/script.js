const cuttingTime = 3.5
        
var videoEl = document.getElementsByTagName('video')[0],
    statusElm = document.getElementsByClassName('statusElm'),
    arrayLines = [], _status = {count: 0, _max: 0, _type: 0},
    possibilities = []
    

function createList(e) {
    _status.count++
    
    var rand = Math.round(Math.random() * (arrayLines.length-1)),
        time = (arrayLines[rand][1] - arrayLines[rand][0]) * 1000

    videoEl.currentTime = arrayLines[rand][1]

    statusElm[0].innerText = `${_status.count}/${_status._max}`

    setTimeout(() => {
        arrayLines.splice(rand, 1)
        if (arrayLines.length !== 0 && possibilities[e] === true) createList(e)
    }, time)
}

function toPlay() {
    _status._type = 1
    possibilities.map((_, i) => possibilities[i] = false)
    possibilities[possibilities.length] = true
    createList(possibilities.length-1)
}

videoEl.addEventListener('click', () => {
    if (_status._type == 2) {
        videoEl.play(); toPlay()
        return null
    }

    if (_status._type === 1) {
        videoEl.pause()
        _status._type = 2
        possibilities.map((_, i) => possibilities[i] = false)
    }

    if (_status._type === 0) {
        videoEl.play()
        for (var i = 0; i < Math.floor(videoEl.duration / cuttingTime); i++) {
            arrayLines.push([i*cuttingTime, (i+1)*cuttingTime])
        }
        arrayLines.push([i*cuttingTime, videoEl.duration])
        _status._max = arrayLines.length; toPlay()
    }
})

videoEl.addEventListener('ended', function () {
    if (arrayLines.length !== 0) {
        videoEl.play()
        createList()
    }
}, false)