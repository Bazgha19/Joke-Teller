const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable or enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

function tellMe(joke){
    const jokeString = joke.trim().replace(/ /g, '%20');
    VoiceRSS.speech({
        key: '2ea74e86e5984301901a581b79392798',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get jokes from jokeApi
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else{
            joke = data.joke;
        }
        //Text to speech
        tellMe(joke);

        //Disable Button
        toggleButton();
    } catch(error){
        //Catch Errors Here
        console.log('Whoops', error);
    }
}

//Event Listeners

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);