var synthh = window.speechSynthesis;
const text = document.querySelector("#text");
const rateValue = document.querySelector("#rateValue");
const pitchValue = document.querySelector("#pitchValue");
const language = document.querySelector("#language");
const btn = document.querySelector("#btnSubmit");
const rate = document.querySelector("#rate");
const pitch = document.querySelector("#pitch");
const body = document.querySelector("body");
var voices = []
function getVoices(){
	voices = synthh.getVoices();
	var output = '';
	voices.map(voice=>{
		output += `
			<option data-lang = '${voice.lang}' data-name = "${voice.name}"> ${voice.name} (${voice.lang})</option>
		`
	}).join('');
	language.innerHTML = output;
}
if(synthh.onvoiceschanged!==undefined){
	synthh.onvoiceschanged = getVoices;
}
const speech = ()=>{
	if(synthh.speaking){
		console.log('Please Wait until Finish');
		return ;
	}
    if(text.value!==''){
    	body.style.backgroundImage = 'url(src/tenor.gif)';
    	body.style.backgroundPosition = 'center center';
    	body.style.backgroundRepeat  = 'repeat-x';
    	var speechText = new SpeechSynthesisUtterance(text.value);
    }
    speechText.onend = e =>{
    	body.style.background = 'black';
    	console.log("end");
    }
    speechText.onerror = e=>{
    	console.error('some thing wrong ');
    }
    var selectedVoice = language.selectedOptions[0].getAttribute('data-name');
    voices.forEach(voice=>{
    	if(voice.name === selectedVoice)
    		speechText.voice = voice;
    })
    speechText.rate = rate.value;
    speechText.pitch = pitch.value;
    synthh.speak(speechText);
}
btn.addEventListener('click',e=>{
	e.preventDefault();
	speech();
})
language.addEventListener('change', speech);
rate.addEventListener('change', e=> rateValue.textContent = rate.value);
pitch.addEventListener('change',e=> pitchValue.textContent = pitch.value);



