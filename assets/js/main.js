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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjYW5kaWRhdGVzO1xuXG5mdW5jdGlvbiBzZWxlY3RDaGVja2JveCgpIHtcblx0dmFyIGNoZWNrYm94ID0gdGhpcztcblx0dmFyIGNoZWNrYm94Q29udGFpbmVyID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuXG5cdGlmIChjaGVja2JveENvbnRhaW5lci5kYXRhc2V0LnNlbGVjdGlvbk1hZGUgPT0gJ2ZhbHNlJykge1xuXHRcdHRoaXMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblx0XHRjaGVja2JveENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNlbGVjdGlvbi1tYWRlXCIsIHRydWUpO1xuXHR9IGVsc2UgaWYgKGNoZWNrYm94Q29udGFpbmVyLmRhdGFzZXQuc2VsZWN0aW9uTWFkZSA9PSAndHJ1ZScpIHtcblx0XHRjbGVhckNoZWNrYm94ZXMoY2hlY2tib3hDb250YWluZXIpO1xuXHRcdHRoaXMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblx0fVxuXG5cdGlmIChjaGVja2JveENvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJmcHRwXCIpKSB7XG5cdFx0dG9nZ2xlQ2hlY2tib3godGhpcyk7XHRcblx0fVxufVxuXG5mdW5jdGlvbiBjbGVhckNoZWNrYm94ZXMoY2hlY2tib3hDb250YWluZXIpIHtcdFxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGNoZWNrYm94Q29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGN1cnJlbnRDaGVja2JveCA9IGNoZWNrYm94Q29udGFpbmVyLmNoaWxkcmVuW2ldO1xuXHRcdGlmIChjdXJyZW50Q2hlY2tib3guY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG5cdFx0XHRjdXJyZW50Q2hlY2tib3guY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlQ2hlY2tib3goY2hlY2tib3gpIHtcblx0dmFyIGNoZWNrYm94Q29udGFpbmVyID0gY2hlY2tib3gucGFyZW50RWxlbWVudDtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGVja2JveENvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjdXJyZW50Q2hlY2tib3ggPSBjaGVja2JveENvbnRhaW5lci5jaGlsZHJlbltpXTtcblx0XHRpZiAoY3VycmVudENoZWNrYm94LmRhdGFzZXQucG9pbnRzID0gMSkge1xuXHRcdFx0Y3VycmVudENoZWNrYm94LnNldEF0dHJpYnV0ZShcImRhdGEtcG9pbnRzXCIsIDApO1xuXHRcdH1cblx0fVxuXG5cdGNoZWNrYm94LnNldEF0dHJpYnV0ZShcImRhdGEtcG9pbnRzXCIsIDEpO1xufVxuXG5mdW5jdGlvbiBiYWxsb3RTZXR1cCgpIHtcblx0dmFyIGJhbGxvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdiYWxsb3QnKTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiYWxsb3RzLmxlbmd0aDsgaSsrKSB7XG5cdFx0YWRkQ2FuZGlkYXRlcyhiYWxsb3RzW2ldKTtcblx0XHR2YXIgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3VibWl0Jyk7XG5cdFx0XHRzdWJtaXRCdXR0b24uaW5uZXJIVE1MID0gJ1N1Ym1pdCBCYWxsb3QnO1xuXHRcdFx0c3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdWJtaXRCYWxsb3QpO1xuXHRcdGJhbGxvdHNbaV0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcblxuXHRcdGlmIChiYWxsb3RzW2ldLmNsYXNzTGlzdC5jb250YWlucygnZnB0cCcpKSB7XG5cdFx0XHRiYWxsb3RzW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS1zZWxlY3Rpb24tbWFkZScsIGZhbHNlKTtcblx0XHR9XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGFkZENhbmRpZGF0ZXMoYmFsbG90KSB7XG5cdFx0XG5cdFx0Y2FuZGlkYXRlcyA9IFtcblx0XHRcdHtcblx0XHRcdFx0Y2FuZGlkYXRlSWQ6ICdjYW5kaWRhdGVBJyxcblx0XHRcdFx0Y2FuZGlkYXRlRGlzcGxheTogJ0NhbmRpZGF0ZSBBJ1xuXHRcdFx0fSwgXG5cdFx0XHR7XG5cdFx0XHRcdGNhbmRpZGF0ZUlkOiAnY2FuZGlkYXRlQicsIFxuXHRcdFx0XHRjYW5kaWRhdGVEaXNwbGF5OiAnQ2FuZGlkYXRlIEInXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRjYW5kaWRhdGVJZDogJ2NhbmRpZGF0ZUMnLCBcblx0XHRcdFx0Y2FuZGlkYXRlRGlzcGxheTogJ0NhbmRpZGF0ZSBDJ1xuXHRcdFx0fVxuXHRcdF07XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBjYW5kaWRhdGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0Y2FuZGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NhbmRpZGF0ZScpO1xuXHRcdFx0dmFyIGNhbmRpZGF0ZUlkID0gY2FuZGlkYXRlc1tpXS5jYW5kaWRhdGVJZDtcblx0XHRcdFx0Y2FuZGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY2FuZGlkYXRlSWQpO1xuXHRcdFx0XHRjYW5kaWRhdGVDb250YWluZXIuc2V0QXR0cmlidXRlKCdkYXRhLWNhbmRpZGF0ZS1pZCcsIGNhbmRpZGF0ZUlkKTtcblx0XHRcdFx0Y2FuZGlkYXRlQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZGF0YS1wb2ludHMnLCAwKTtcblx0XHRcdFxuXHRcdFx0dmFyIGNhbmRpZGF0ZU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0Y2FuZGlkYXRlTmFtZS5pbm5lckhUTUwgPSBjYW5kaWRhdGVzW2ldLmNhbmRpZGF0ZURpc3BsYXk7XG5cblx0XHRcdGNhbmRpZGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5kaWRhdGVOYW1lKTtcblxuXHRcdFx0aWYgKGJhbGxvdC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZwdHAnKSkge1xuXHRcdFx0XHRhZGRTaW5nbGVDaGVja2JveChjYW5kaWRhdGVDb250YWluZXIpO1xuXHRcdFx0XHRjYW5kaWRhdGVDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdENoZWNrYm94KTtcblx0XHRcdH1cblxuXHRcdFx0YmFsbG90LmFwcGVuZENoaWxkKGNhbmRpZGF0ZUNvbnRhaW5lcik7XG5cdFx0fVxuXG5cdFx0aWYgKGJhbGxvdC5jbGFzc0xpc3QuY29udGFpbnMoJ3JhbmsnKSkge1xuXHRcdFx0c2V0dXBSYW5rZWRCYWxsb3QoYmFsbG90KTtcblx0XHR9IGVsc2UgaWYgKGJhbGxvdC5jbGFzc0xpc3QuY29udGFpbnMoJ3JhbmdlJykpIHtcblx0XHRcdHNldHVwUmFuZ2VCYWxsb3QoYmFsbG90KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBhZGRTaW5nbGVDaGVja2JveChjb250YWluZXIpIHtcblx0XHRcdHZhciBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRjaGVja2JveC5jbGFzc0xpc3QuYWRkKCdjaGVja2JveCcpO1xuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblx0XHRcdHJldHVybiBjaGVja2JveDtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBhZGRNdWx0aXBsZUNoZWNrYm94ZXMoY2FuZGlkYXRlQ29udGFpbmVyLCBudW1iZXIpIHtcblx0XHRcdHZhciBpID0gbnVtYmVyO1xuXHRcdFx0dmFyIHBvaW50cyA9IDA7XG5cdFx0XHR3aGlsZSAoaSA+IDApIHtcblx0XHRcdFx0dmFyIGN1cnJlbnRDaGVja2JveCA9IGFkZFNpbmdsZUNoZWNrYm94KGNhbmRpZGF0ZUNvbnRhaW5lcik7XG5cdFx0XHRcdGN1cnJlbnRDaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBvaW50c1wiLCBwb2ludHMpO1xuXHRcdFx0XHRjdXJyZW50Q2hlY2tib3guY2xhc3NMaXN0LmFkZChcInJhbmdlLWNoZWNrYm94XCIpO1xuXHRcdFx0XHRjdXJyZW50Q2hlY2tib3guaW5uZXJIVE1MID0gcG9pbnRzO1xuXHRcdFx0XHRjdXJyZW50Q2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdENoZWNrYm94KTtcblx0XHRcdFx0aS0tO1xuXHRcdFx0XHRwb2ludHMrKztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZXR1cFJhbmtlZEJhbGxvdChyYW5rZWRCYWxsb3QpIHtcblx0XHRcdHZhciBmaXJzdENhbmRpZGF0ZSA9IHJhbmtlZEJhbGxvdC5maXJzdENoaWxkO1xuXHRcdFx0dmFyIHJhbmtpbmdCb3hlc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRyYW5raW5nQm94ZXNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJhbmtpbmctYm94ZXMtY29udGFpbmVyXCIpO1xuXHRcdFx0XHR2YXIgZmlyc3RQbGFjZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRcdGZpcnN0UGxhY2VDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1yYW5rXCIsIDEpO1xuXHRcdFx0XHRcdGZpcnN0UGxhY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJhbmtpbmctYm94XCIpO1xuXHRcdFx0XHR2YXIgc2Vjb25kUGxhY2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0XHRzZWNvbmRQbGFjZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLXJhbmtcIiwgMik7XG5cdFx0XHRcdFx0c2Vjb25kUGxhY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJhbmtpbmctYm94XCIpO1xuXHRcdFx0XHR2YXIgdGhpcmRQbGFjZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRcdHRoaXJkUGxhY2VDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1yYW5rXCIsIDMpO1xuXHRcdFx0XHRcdHRoaXJkUGxhY2VDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJhbmtpbmctYm94XCIpO1xuXHRcdFx0XHRyYW5raW5nQm94ZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoZmlyc3RQbGFjZUNvbnRhaW5lcik7XG5cdFx0XHRcdHJhbmtpbmdCb3hlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWNvbmRQbGFjZUNvbnRhaW5lcik7XG5cdFx0XHRcdHJhbmtpbmdCb3hlc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlyZFBsYWNlQ29udGFpbmVyKTtcblx0XHRcdHJhbmtlZEJhbGxvdC5pbnNlcnRCZWZvcmUocmFua2luZ0JveGVzQ29udGFpbmVyLCBmaXJzdENhbmRpZGF0ZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0dXBSYW5nZUJhbGxvdChyYW5nZUJhbGxvdCkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAocmFuZ2VCYWxsb3QuY2hpbGRyZW4ubGVuZ3RoKTsgaSsrKSB7XG5cdFx0XHRcdHZhciBjYW5kaWRhdGVDb250YWluZXIgPSByYW5nZUJhbGxvdC5jaGlsZHJlbltpXTtcblx0XHRcdFx0YWRkTXVsdGlwbGVDaGVja2JveGVzKGNhbmRpZGF0ZUNvbnRhaW5lciwgNSk7XG5cdFx0XHRcdGNhbmRpZGF0ZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNlbGVjdGlvbi1tYWRlXCIsIGZhbHNlKTtcblx0XHRcdH1cblx0XHR9XG5cblxuXHR9XG5cblx0cmV0dXJuIGNhbmRpZGF0ZXM7XG5cdFxufVxuXG5mdW5jdGlvbiBzdWJtaXRCYWxsb3QoKSB7XG5cdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN1Ym1pdEJhbGxvdCk7XG5cdHRoaXMuaW5uZXJIVE1MID0gXCJTdWJtaXR0ZWQhXCI7XG5cblx0dmFyIGJhbGxvdCA9IHRoaXMucGFyZW50RWxlbWVudDtcblx0dmFyIGNhbmRpZGF0ZXMgPSBiYWxsb3QuY2hpbGRyZW47XG5cdHZhciBiYWxsb3REYXRhID0ge307XG5cdC8vdmFyIGNhbmRpZGF0ZTtcblxuXHRpZiAoYmFsbG90LmNsYXNzTGlzdC5jb250YWlucyhcImZwdHBcIikpIHtcblx0XHRkaXNhYmxlQ2xpY2tzKGJhbGxvdCk7XG5cdFx0YmFsbG90RGF0YS5iYWxsb3RUeXBlID0gXCJmcHRwXCI7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiYWxsb3QuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChiYWxsb3QuY2hpbGRyZW5baV0uZGF0YXNldC5wb2ludHMgPT0gMSkge1xuXHRcdFx0XHRiYWxsb3REYXRhLmNhbmRpZGF0ZUlkID0gYmFsbG90LmNoaWxkcmVuW2ldLmRhdGFzZXQuY2FuZGlkYXRlSWQ7XG5cdFx0XHRcdGJhbGxvdERhdGEucG9pbnRzID0gMTtcblx0XHRcdFx0dXBkYXRlQ2FuZGlkYXRlU2NvcmVzKGJhbGxvdERhdGEpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmIChiYWxsb3QuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmFua1wiKSkge1xuXHRcdGJhbGxvdERhdGEuYmFsbG90VHlwZSA9IFwicmFua1wiO1xuXHRcdGV4dHJhY3RQb2ludHMoYmFsbG90LCBiYWxsb3REYXRhKTtcblx0fSBlbHNlIGlmIChiYWxsb3QuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmFuZ2VcIikpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGJhbGxvdC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0ZGlzYWJsZUNsaWNrcyhiYWxsb3QuY2hpbGRyZW5baV0pO1xuXHRcdH1cblx0XHRiYWxsb3REYXRhID0gZXh0cmFjdFJhbmdlUG9pbnRzKGJhbGxvdCwgYmFsbG90RGF0YSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZXh0cmFjdFJhbmdlUG9pbnRzKGJhbGxvdCwgZGF0YSkge1xuXHR2YXIgY2FuZGlkYXRlcyA9IGJhbGxvdC5jaGlsZHJlbjtcblxuXHR2YXIgYmFsbG90RGF0YSA9IHt9O1xuXHR2YXIgY2FuZGlkYXRlSWQ7IFxuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICghY2FuZGlkYXRlc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzdWJtaXRcIikpIHtcblx0XHRcdGJhbGxvdERhdGEuYmFsbG90VHlwZSA9ICdyYW5nZSc7XG5cdFx0XHRiYWxsb3REYXRhLmNhbmRpZGF0ZUlkID0gY2FuZGlkYXRlc1tpXS5kYXRhc2V0LmNhbmRpZGF0ZUlkO1xuXHRcdFx0YmFsbG90RGF0YS5wb2ludHMgPSB1cGRhdGVQb2ludHMoY2FuZGlkYXRlc1tpXSk7XG5cdFx0XHR1cGRhdGVDYW5kaWRhdGVTY29yZXMoYmFsbG90RGF0YSk7XG5cdFx0fVxuXHR9XG5cdFxuXHRmdW5jdGlvbiB1cGRhdGVQb2ludHMoY2FuZGlkYXRlKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjYW5kaWRhdGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChjYW5kaWRhdGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG5cdFx0XHRcdHZhciBwb2ludHMgPSBjYW5kaWRhdGUuY2hpbGRyZW5baV0uZGF0YXNldC5wb2ludHM7XG5cdFx0XHRcdHJldHVybiBwb2ludHM7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNhbmRpZGF0ZVNjb3JlcyhkYXRhKSB7XG5cdGNvbnNvbGUubG9nKGRhdGEpO1xufVxuXG5mdW5jdGlvbiBkaXNhYmxlQ2xpY2tzKGJhbGxvdCkge1xuXHR2YXIgY2hlY2tib3hlcztcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGJhbGxvdC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdGJhbGxvdC5jaGlsZHJlbltpXS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0Q2hlY2tib3gpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHBhZ2VTZXR1cCgpIHtcblx0YmFsbG90U2V0dXAoKTtcbn1cblxucGFnZVNldHVwKCk7Il19
