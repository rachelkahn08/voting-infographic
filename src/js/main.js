var candidates;

// function addEventListeners() {
// 	var checkboxes = document.getElementsByClassName('checkbox');
// 	for (var i = 0; i < checkboxes.length; i++) {
// 		checkboxes[i].parentElement.addEventListener('click', toggleCheckbox);
// 	}
// }

function toggleCheckbox() {
	var ballotContainer = this.parentElement;
	var candidatePoints = this.dataset.points - 0;

	if (!this.classList.contains('active') && ballotContainer.dataset.selectionMade == 'false') {
		this.classList.add('active');
		candidatePoints += 1;
		this.setAttribute('data-points', candidatePoints);
		ballotContainer.setAttribute('data-selection-made', true);
	} else if (this.classList.contains('active')) {
		this.classList.remove('active');
		ballotContainer.setAttribute('data-selection-made', false);
		candidatePoints = 0;
		this.setAttribute('data-points', candidatePoints);
	}
}

function ballotSetup() {
	var ballots = document.getElementsByClassName('ballot');
	for (var i = 0; i < ballots.length; i++) {
		addCandidates(ballots[i]);
		var submitButton = document.createElement('div');
			submitButton.classList.add('submit');
			submitButton.innerHTML = 'Submit Ballot';
			submitButton.addEventListener("click", submitBallot);
		ballots[i].appendChild(submitButton);

		if (ballots[i].classList.contains('fptp')) {
			ballots[i].setAttribute('data-selection-made', false);
		}
	}
	
	function addCandidates(ballot) {
		
		candidates = [
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
				candidateContainer.addEventListener("click", toggleCheckbox);
			}

			ballot.appendChild(candidateContainer);
		}

		if (ballot.classList.contains('rank')) {
			setupRankingBallot(ballot);
		} else if (ballot.classList.contains('range')) {
			setupRangeBallot(ballot);
		}

		function addSingleCheckbox(container) {
			var checkbox = document.createElement('div');
				checkbox.classList.add('checkbox');
			container.appendChild(checkbox);
			return checkbox;
		}

		function addMultipleCheckboxes(candidateContainer, number) {
			var i = number;
			var points = 0;
			while (i > 0) {
				var currentCheckbox = addSingleCheckbox(candidateContainer);
				currentCheckbox.setAttribute("data-points", points);
				currentCheckbox.classList.add("range-checkbox");
				currentCheckbox.innerHTML = points;
				//currentCheckbox.addEventListener("click", "rangeCheckboxListener");
				i--;
				points++;
			}
		}

		function setupRankingBallot(rankedBallot) {
			//console.log(rankedBallot);
		}

		function setupRangeBallot(rangeBallot) {
			for (var i = 0; i < (rangeBallot.children.length); i++) {
				var candidateContainer = rangeBallot.children[i];
				addMultipleCheckboxes(candidateContainer, 5);
				setupRangeValues(candidateContainer);
			}

			function setupRangeValues(candidateContainer) {
				var rangeBoxes = {};
				for (var i = 0; i < candidateContainer.children.length; i++) {
					if (candidateContainer.children[i].classList.contains('checkbox')) {
						//console.log(candidateContainer.children[i]);
						//rangeBoxes.candidates += candidateContainer.children[i];
					}
				}

				//console.log(rangeBoxes);
				//console.log(candidateContainer.children);
			}
		}


	}

	return candidates;
	
}

function submitBallot() {

	var ballot = this.parentElement;
	var ballotOptions = ballot.children;
	var ballotData = {};

	if (ballot.classList.contains("fptp")) {
		ballotData.ballotType = "fptp";
	} else if (ballot.classList.contains("rank")) {
		ballotData.ballotType = "rank";
	} else if (ballot.classList.contains("range")) {
		ballotData.ballotType = "range";
	}

	for (var i = 0; i < ballotOptions.length; i++) {
		var points = ballotOptions[i].dataset.points;
		var candidate = ballotOptions[i].dataset.candidateId;
		
		if (points > 0) {
			ballotData.candidateId = candidate;
			ballotData.points = points;
			updateCandidateScores(ballotData);
		}
	}
}

function updateCandidateScores(data) {
	console.log(data);
}

function pageSetup() {
	ballotSetup();
	addEventListeners();
}

pageSetup();