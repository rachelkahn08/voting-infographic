function addEventListeners() {
	var checkboxes = document.getElementsByClassName('checkbox');
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].addEventListener('click', toggleCheckbox);
	}
}

function toggleCheckbox() {
	var ballotContainer = this.parentElement.parentElement;
	var candidatePoints = this.parentElement.dataset.points;

	if (!this.classList.contains('active') && ballotContainer.dataset.selectionMade == 'false') {
		this.classList.add('active');
		candidatePoints = 1;
		
		ballotContainer.setAttribute('data-selection-made', true);
	} else if (this.classList.contains('active')) {
		this.classList.remove('active');
		ballotContainer.setAttribute('data-selection-made', false);
		candidatePoints = 0;
		
	}
}

function ballotSetup() {
	var ballots = document.getElementsByClassName('ballot');
	for (var i = 0; i < ballots.length; i++) {
		addCandidates(ballots[i]);
		var submitButton = document.createElement('div');
			submitButton.classList.add('submit');
			submitButton.innerHTML = 'Submit Ballot';
		ballots[i].appendChild(submitButton);

		if (ballots[i].classList.contains('fptp')) {
			console.log('fptp');
			ballots[i].setAttribute('data-selection-made', false);
		}
	}
	
	function addCandidates(ballot) {
		
		var candidates = [
			{
				candidateID: 'candidateA',
				candidateDisplay: 'Candidate A'
			}, 
			{
				candidateID: 'candidateB', 
				candidateDisplay: 'Candidate B'
			},
			{
				candidateID: 'candidateC', 
				candidateDisplay: 'Candidate C'
			}
		];

		for (var i = 0; i < candidates.length; i++) {
			var candidateContainer = document.createElement('div');
				candidateContainer.classList.add('candidate');
			var candidateID = candidates[i].candidateID;
				candidateContainer.classList.add(candidateID);
				candidateContainer.setAttribute('data-candidate-ID', candidateID);
				candidateContainer.setAttribute('data-points', 0);
			
			var candidateName = document.createElement('div');
				candidateName.innerHTML = candidates[i].candidateDisplay;

			candidateContainer.appendChild(candidateName);

			if (ballot.classList.contains('fptp')) {
				addSingleCheckbox(candidateContainer);
			}

			ballot.appendChild(candidateContainer);
		}

		function addSingleCheckbox(container) {
			var checkbox = document.createElement('div');
				checkbox.classList.add('checkbox');
			container.appendChild(checkbox);
		}
	}
	
}

function pageSetup() {
	ballotSetup();
	addEventListeners();
}

pageSetup();