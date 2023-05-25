import './ui-slider';

// FS max
const S_max = 1370;
// Stefan-Boltzmann constant
const sigma = 5.670374419e-8;

// ELEMENTS

const surfaceTemp = document.getElementById('surfaceTemp');

// SLIDERS

const sliders = {
	S: document.getElementById('solar-flux'),
	A: document.getElementById('albedo'),
	tVIS: document.getElementById('visible-transimittance'),
	tIR: document.getElementById('infrared-transimittance')
};

Object.keys(sliders).forEach(key => {
	sliders[key].addEventListener('input', e => updateScene());
});

function updateScene() {
	// update temp
	const Temp = calc_T(
		S_max * (sliders.S.value / 100),
		sliders.A.value * 0.01,
		sliders.tVIS.value * 0.01,
		sliders.tIR.value * 0.01,
	);

	document.querySelector('.arrow-flux').style.setProperty('--arrow-scale', sliders.S.value / 100);
	document.querySelector('.arrow-albedo').style.setProperty('--arrow-scale', sliders.A.value / 100);
	document.querySelector('.arrow-infrared').style.setProperty('--arrow-scale', sliders.tIR.value / 100);

	document.querySelector('.earth').style.setProperty('--atmos-size', 1 - (sliders.tIR.value / 100));
	document.querySelector('.sun').style.setProperty('--sun-strength', sliders.S.value / 100);
	document.querySelector('.earth').style.setProperty('--albedo-effect', (sliders.A.value / 100));

	// update scene
	surfaceTemp.textContent = Temp.Celius + '°C';
}


// MATHS

function calc_T(S = 1370, A = 0.3, tVIS = 0.8, tIR = 0.1) {
	const FS = S / 4;
	// Surface temp (K)
	const T = Math.pow((FS * (1 - A)) * (1 + tVIS) / (sigma * (1 + tIR)), 0.25);
	// in degrees
	const T_degrees = (T - 273.15).toFixed(1);
	// outpur
	return {
		Kelvin: T,
		Celius: T_degrees
	};
}

// INIT

updateScene();