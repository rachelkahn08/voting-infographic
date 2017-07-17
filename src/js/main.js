var candidates;

function selectCheckbox() {
	var checkbox = this;
	var checkboxContainer = this.parentElement;

	if (checkboxContainer.dataset.selectionMade == 'false') {
		this.classList.add("active");
		checkboxContainer.setAttribute("data-selection-made", true);
	} else if (checkboxContainer.dataset.selectionMade == 'true') {
		clearCheckboxes(checkboxContainer);
		this.classList.add("active");
	}

	if (checkboxContainer.classList.contains("fptp")) {
		toggleCheckbox(this);	
	}
}

function clearCheckboxes(checkboxContainer) {	
	for (var i = 0; i < checkboxContainer.children.length; i++) {
		var currentCheckbox = checkboxContainer.children[i];
		if (currentCheckbox.classList.contains("active")) {
			currentCheckbox.classList.remove("active");
		}
	}
}

function toggleCheckbox(checkbox) {
	var checkboxContainer = checkbox.parentElement;
	for (var i = 0; i < checkboxContainer.children.length; i++) {
		var currentCheckbox = checkboxContainer.children[i];
		if (currentCheckbox.dataset.points = 1) {
			currentCheckbox.setAttribute("data-points", 0);
		}
	}

	checkbox.setAttribute("data-points", 1);
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
				candidateId: 'candidateA',
				candidateDisplay: 'Candidate A'
			}, 
			{
				candidateId: 'candidateB', 
				candidateDisplay: 'Candidate B'
			},
			{
				candidateId: 'candidateC', 
				candidateDisplay: 'Candidate C'
			}
		];

		for (var i = 0; i < candidates.length; i++) {
			var candidateContainer = document.createElement('div');
				candidateContainer.classList.add('candidate');
			var candidateId = candidates[i].candidateId;
				candidateContainer.classList.add(candidateId);
				candidateContainer.setAttribute('data-candidate-id', candidateId);
				candidateContainer.setAttribute('data-points', 0);
			
			var candidateName = document.createElement('div');
				candidateName.innerHTML = candidates[i].candidateDisplay;

			candidateContainer.appendChild(candidateName);

			if (ballot.classList.contains('fptp')) {
				addSingleCheckbox(candidateContainer);
				candidateContainer.addEventListener("click", selectCheckbox);
			}

			ballot.appendChild(candidateContainer);
		}

		if (ballot.classList.contains('rank')) {
			setupRankedBallot(ballot);
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
				currentCheckbox.addEventListener("click", selectCheckbox);
				i--;
				points++;
			}
		}

		function setupRankedBallot(rankedBallot) {
			var firstCandidate = rankedBallot.firstChild;
			var rankingBoxesContainer = document.createElement('div');
				rankingBoxesContainer.classList.add("ranking-boxes-container");
				var firstPlaceContainer = document.createElement('div');
					firstPlaceContainer.setAttribute("data-rank", 1);
					firstPlaceContainer.classList.add("ranking-box");
				var secondPlaceContainer = document.createElement('div');
					secondPlaceContainer.setAttribute("data-rank", 2);
					secondPlaceContainer.classList.add("ranking-box");
				var thirdPlaceContainer = document.createElement('div');
					thirdPlaceContainer.setAttribute("data-rank", 3);
					thirdPlaceContainer.classList.add("ranking-box");
				rankingBoxesContainer.appendChild(firstPlaceContainer);
				rankingBoxesContainer.appendChild(secondPlaceContainer);
				rankingBoxesContainer.appendChild(thirdPlaceContainer);
			rankedBallot.insertBefore(rankingBoxesContainer, firstCandidate);
		}

		function setupRangeBallot(rangeBallot) {
			for (var i = 0; i < (rangeBallot.children.length); i++) {
				var candidateContainer = rangeBallot.children[i];
				addMultipleCheckboxes(candidateContainer, 5);
				candidateContainer.setAttribute("data-selection-made", false);
			}
		}


	}

	return candidates;
	
}

function submitBallot() {
	this.removeEventListener("click", submitBallot);
	this.innerHTML = "Submitted!";

	var ballot = this.parentElement;
	var candidates = ballot.children;
	var ballotData = {};
	//var candidate;

	if (ballot.classList.contains("fptp")) {
		disableClicks(ballot);
		ballotData.ballotType = "fptp";
		for (var i = 0; i < ballot.children.length; i++) {
			if (ballot.children[i].dataset.points == 1) {
				ballotData.candidateId = ballot.children[i].dataset.candidateId;
				ballotData.points = 1;
				updateCandidateScores(ballotData);
			}
		}
	} else if (ballot.classList.contains("rank")) {
		ballotData.ballotType = "rank";
		extractPoints(ballot, ballotData);
	} else if (ballot.classList.contains("range")) {
		for (var i = 0; i < ballot.children.length; i++) {
			disableClicks(ballot.children[i]);
		}
		ballotData = extractRangePoints(ballot, ballotData);
	}
}

function extractRangePoints(ballot, data) {
	var candidates = ballot.children;

	var ballotData = {};
	var candidateId; 

	for (var i = 0; i < candidates.length; i++) {
		if (!candidates[i].classList.contains("submit")) {
			ballotData.ballotType = 'range';
			ballotData.candidateId = candidates[i].dataset.candidateId;
			ballotData.points = updatePoints(candidates[i]);
			updateCandidateScores(ballotData);
		}
	}
	
	function updatePoints(candidate) {
		for (var i = 0; i < candidate.children.length; i++) {
			if (candidate.children[i].classList.contains("active")) {
				var points = candidate.children[i].dataset.points;
				return points;
			}
		}
	}
}

function updateCandidateScores(data) {
	console.log(data);
}

function disableClicks(ballot) {
	var checkboxes;

	for (var i = 0; i < ballot.children.length; i++) {
		ballot.children[i].removeEventListener("click", selectCheckbox);
	}
}

function pageSetup() {
	ballotSetup();
}

pageSetup();