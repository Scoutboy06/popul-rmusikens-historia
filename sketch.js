
const data = [
	{
		name: 'blues',
		when: '~1800-talet',
		where: 'USA',
		how: 'Före detta slavar sjöng om hur tufft de hade det.',
		songSrc: 'https://www.youtube-nocookie.com/embed/qD2jXjV9Z8A',
	},
	{
		name: 'country',
		when: '~1800-talet',
		where: 'USA',
		how: 'Vita som flyttade till USA tog med sin folkmusik. Ur detta kon countryn.',
		songSrc: 'https://www.youtube-nocookie.com/embed/yQIJuu3N5EY',
	},
	{
		name: 'spirituals & gospel',
		when: '~1800-talet',
		where: 'USA',
		how: 'Slavar i USA påtvingades kristendomen. De sjöng psalmerna "svängigt".',
		songSrc: 'https://www.youtube-nocookie.com/embed/olQrCfkvbGw',
	},
	{
		name: 'jazz',
		when: 'Början av 1900-talet',
		where: 'USA, New Orleans',
		how: 'Vita militärmarscher med blåsinstrument, svarta spelade svängigare och mer festligt. Spelades både på begravningar och på fester.',
		songSrc: 'https://www.youtube-nocookie.com/embed/6vOUYry_5Nw',
	},
	{
		name: 'rock\'n roll',
		when: '1950-talet',
		where: 'USA',
		how: 'Svarta spelade gladare blues som vita hörde och kopierade.',
		songSrc: 'https://www.youtube-nocookie.com/embed/aKyEmRRx_Vg',
	},
	{
		name: 'brittiska vågen',
		when: '1960-talet',
		where: 'Storbritannien',
		how: 'Brittiska band som spelade pop blev väldigt populära.',
		songSrc: 'https://www.youtube-nocookie.com/embed/2Q_ZzBGPdqE',
	},
	{
		name: 'soul',
		when: '1960-talet',
		where: 'USA',
		how: 'Ray Charles blandade blues och gospel. Det blev en svängig och dansvänlig musik för svarta att vara stolta över.',
		songSrc: 'https://www.youtube-nocookie.com/embed/Cf0X7QuK4LI',
	},
	{
		name: 'disco',
		when: '1970-talet',
		where: 'USA/Europa',
		how: 'Soulmusik var bra att dansa till. Discon växer fram som renodlad dansmusik man spelar på diskotek.',
		songSrc: 'https://www.youtube-nocookie.com/embed/CS9OO0S5w2k',
	},
	{
		name: 'hårdrock',
		when: '1970-talet',
		where: 'USA/Europa',
		how: 'Elgitarr med dist (trasigt ljud) blev vanligt. Man var inspirerad av Jimi Hendrix och spelade gitarr riff.',
		songSrc: 'https://www.youtube-nocookie.com/embed/l482T0yNkeo',
	},
	{
		name: 'synth',
		when: '1970-talet',
		where: 'USA/Europa',
		how: 'Syntherzeisern uppfanns och man ville testa hur man kunde skapa elektronisk musik med den.',
		songSrc: 'https://www.youtube-nocookie.com/embed/OQIYEPe6DWY',
	},
	{
		name: 'hiphop',
		when: '1970-talet',
		where: 'USA',
		how: 'Unga i förorterna till New York och andra stora städer i USA rappade om utanförskap.',
		songSrc: 'https://www.youtube-nocookie.com/embed/PobrSpMwKk4',
	},
	{
		name: 'reggae',
		when: '1970-talet',
		where: 'Jamaica',
		how: 'Musiken som har ett skönt gung blev populär. Minst ett instrument spelar i baktakt.',
		songSrc: 'https://www.youtube-nocookie.com/embed/LanCLS_hIo4',
	},
	{
		name: 'glamrock',
		when: '1970-talet',
		where: 'USA/England',
		how: 'Band som spelade rockmusik klädde sig i paljetter och sminkade sig.',
		songSrc: null,
	},
];

let remaining = resetRemaining();

const $ = s => document.querySelector(s);

const questionEl = $('#question');
const answerEl = $('#answer');
const showBtn = $('#showBtn');
const nextBtn = $('#nextBtn');
const iframe = $('#iframe');


function next() {
	answerEl.classList.add('hidden');
	iframe.removeAttribute('src');
	iframe.classList.add('hidden');

	const genreIndex = random(0, remaining.length);
	const genre = data[genreIndex];
	const remainingGenre = remaining[genreIndex];
	const questionIndex = random(remainingGenre);
	
	// alert(remainingGenre);
	// alert(questionIndex);

	let question, answer;

	if (questionIndex === 3) {
		if (!genre.songSrc) return next();

		questionEl.textContent = 'Vilken genre är detta?'
		iframe.classList.remove('hidden');
		iframe.src = genre.songSrc;
		answerEl.textContent = genre.name;
	}

	else {
		switch (questionIndex) {
			case 0: // När?
				question = `När bildades ${genre.name}?`;
				answer = genre.when;
				break;
			case 1: // Var?
				question = `Var bildades ${genre.name}?`;
				answer = genre.where;
				break;
			case 2: // Hur?
				question = `Hur bildades ${genre.name}?`;
				answer = genre.how;
				break;
		}

		questionEl.textContent = question;
		answerEl.textContent = answer;
	}
	
	remaining[genreIndex].splice(questionIndex, 1);
	if(remaining[genreIndex].length === 0) remaining.splice(genreIndex, 1);
	if(remaining.length === 0) remaining = resetRemaining();
}

next();

function showAnswer() {
	answerEl.classList.remove('hidden');
}

function resetRemaining() {
	let res = data.map(category => {
		let arr;

		if(category.songSrc) arr = [0, 1, 2, 3];
		else arr = [0, 1, 2];
		
		return arr;
	});
	return res;
}

function random(a, b) {
  if(typeof a === 'object' && a.length) {
    return a[Math.floor(Math.random() * a.length)];
  }
  else if(typeof a === 'number' && typeof b === 'number') {
		return Math.floor(Math.random() * (b - a)) + a;
  }
}



showBtn.addEventListener('click', showAnswer);

nextBtn.addEventListener('click', next);

window.addEventListener('keydown', e => {
	if (e.key === 'ArrowRight') next();
	else if (e.key === ' ' || e.key === 'Enter') showAnswer();
});
