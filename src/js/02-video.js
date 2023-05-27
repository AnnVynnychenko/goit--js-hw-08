import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

import '../sass/common.scss';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const savePauseTime = function (data) {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
};

player.on('timeupdate', throttle(savePauseTime, 1000));
      
const currentTime = localStorage.getItem('videoplayer-current-time')
const parsedTime = JSON.parse(currentTime)

player.setCurrentTime(parsedTime).then(function(seconds) {
        // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the videos duration
            break;

        default:
            // some other error occurred
            break;
    }
});

     
