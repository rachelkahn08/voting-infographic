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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2FuZGlkYXRlcztcblxuLy8gZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4vLyBcdHZhciBjaGVja2JveGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2hlY2tib3gnKTtcbi8vIFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGVja2JveGVzLmxlbmd0aDsgaSsrKSB7XG4vLyBcdFx0Y2hlY2tib3hlc1tpXS5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ2hlY2tib3gpO1xuLy8gXHR9XG4vLyB9XG5cbmZ1bmN0aW9uIHRvZ2dsZUNoZWNrYm94KCkge1xuXHR2YXIgYmFsbG90Q29udGFpbmVyID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuXHR2YXIgY2FuZGlkYXRlUG9pbnRzID0gdGhpcy5kYXRhc2V0LnBvaW50cyAtIDA7XG5cblx0aWYgKCF0aGlzLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykgJiYgYmFsbG90Q29udGFpbmVyLmRhdGFzZXQuc2VsZWN0aW9uTWFkZSA9PSAnZmFsc2UnKSB7XG5cdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblx0XHRjYW5kaWRhdGVQb2ludHMgKz0gMTtcblx0XHR0aGlzLnNldEF0dHJpYnV0ZSgnZGF0YS1wb2ludHMnLCBjYW5kaWRhdGVQb2ludHMpO1xuXHRcdGJhbGxvdENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0aW9uLW1hZGUnLCB0cnVlKTtcblx0fSBlbHNlIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHRcdGJhbGxvdENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0aW9uLW1hZGUnLCBmYWxzZSk7XG5cdFx0Y2FuZGlkYXRlUG9pbnRzID0gMDtcblx0XHR0aGlzLnNldEF0dHJpYnV0ZSgnZGF0YS1wb2ludHMnLCBjYW5kaWRhdGVQb2ludHMpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGJhbGxvdFNldHVwKCkge1xuXHR2YXIgYmFsbG90cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JhbGxvdCcpO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGJhbGxvdHMubGVuZ3RoOyBpKyspIHtcblx0XHRhZGRDYW5kaWRhdGVzKGJhbGxvdHNbaV0pO1xuXHRcdHZhciBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzdWJtaXQnKTtcblx0XHRcdHN1Ym1pdEJ1dHRvbi5pbm5lckhUTUwgPSAnU3VibWl0IEJhbGxvdCc7XG5cdFx0XHRzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN1Ym1pdEJhbGxvdCk7XG5cdFx0YmFsbG90c1tpXS5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuXG5cdFx0aWYgKGJhbGxvdHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdmcHRwJykpIHtcblx0XHRcdGJhbGxvdHNbaV0uc2V0QXR0cmlidXRlKCdkYXRhLXNlbGVjdGlvbi1tYWRlJywgZmFsc2UpO1xuXHRcdH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gYWRkQ2FuZGlkYXRlcyhiYWxsb3QpIHtcblx0XHRcblx0XHRjYW5kaWRhdGVzID0gW1xuXHRcdFx0e1xuXHRcdFx0XHRjYW5kaWRhdGVJRDogJ2NhbmRpZGF0ZUEnLFxuXHRcdFx0XHRjYW5kaWRhdGVEaXNwbGF5OiAnQ2FuZGlkYXRlIEEnXG5cdFx0XHR9LCBcblx0XHRcdHtcblx0XHRcdFx0Y2FuZGlkYXRlSUQ6ICdjYW5kaWRhdGVCJywgXG5cdFx0XHRcdGNhbmRpZGF0ZURpc3BsYXk6ICdDYW5kaWRhdGUgQidcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdGNhbmRpZGF0ZUlEOiAnY2FuZGlkYXRlQycsIFxuXHRcdFx0XHRjYW5kaWRhdGVEaXNwbGF5OiAnQ2FuZGlkYXRlIEMnXG5cdFx0XHR9XG5cdFx0XTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGNhbmRpZGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRjYW5kaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY2FuZGlkYXRlJyk7XG5cdFx0XHR2YXIgY2FuZGlkYXRlSUQgPSBjYW5kaWRhdGVzW2ldLmNhbmRpZGF0ZUlEO1xuXHRcdFx0XHRjYW5kaWRhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZChjYW5kaWRhdGVJRCk7XG5cdFx0XHRcdGNhbmRpZGF0ZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2RhdGEtY2FuZGlkYXRlLUlEJywgY2FuZGlkYXRlSUQpO1xuXHRcdFx0XHRjYW5kaWRhdGVDb250YWluZXIuc2V0QXR0cmlidXRlKCdkYXRhLXBvaW50cycsIDApO1xuXHRcdFx0XG5cdFx0XHR2YXIgY2FuZGlkYXRlTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRjYW5kaWRhdGVOYW1lLmlubmVySFRNTCA9IGNhbmRpZGF0ZXNbaV0uY2FuZGlkYXRlRGlzcGxheTtcblxuXHRcdFx0Y2FuZGlkYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmRpZGF0ZU5hbWUpO1xuXG5cdFx0XHRpZiAoYmFsbG90LmNsYXNzTGlzdC5jb250YWlucygnZnB0cCcpKSB7XG5cdFx0XHRcdGFkZFNpbmdsZUNoZWNrYm94KGNhbmRpZGF0ZUNvbnRhaW5lcik7XG5cdFx0XHRcdGNhbmRpZGF0ZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlQ2hlY2tib3gpO1xuXHRcdFx0fVxuXG5cdFx0XHRiYWxsb3QuYXBwZW5kQ2hpbGQoY2FuZGlkYXRlQ29udGFpbmVyKTtcblx0XHR9XG5cblx0XHRpZiAoYmFsbG90LmNsYXNzTGlzdC5jb250YWlucygncmFuaycpKSB7XG5cdFx0XHRzZXR1cFJhbmtpbmdCYWxsb3QoYmFsbG90KTtcblx0XHR9IGVsc2UgaWYgKGJhbGxvdC5jbGFzc0xpc3QuY29udGFpbnMoJ3JhbmdlJykpIHtcblx0XHRcdHNldHVwUmFuZ2VCYWxsb3QoYmFsbG90KTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBhZGRTaW5nbGVDaGVja2JveChjb250YWluZXIpIHtcblx0XHRcdHZhciBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRjaGVja2JveC5jbGFzc0xpc3QuYWRkKCdjaGVja2JveCcpO1xuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcblx0XHRcdHJldHVybiBjaGVja2JveDtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBhZGRNdWx0aXBsZUNoZWNrYm94ZXMoY2FuZGlkYXRlQ29udGFpbmVyLCBudW1iZXIpIHtcblx0XHRcdHZhciBpID0gbnVtYmVyO1xuXHRcdFx0dmFyIHBvaW50cyA9IDA7XG5cdFx0XHR3aGlsZSAoaSA+IDApIHtcblx0XHRcdFx0dmFyIGN1cnJlbnRDaGVja2JveCA9IGFkZFNpbmdsZUNoZWNrYm94KGNhbmRpZGF0ZUNvbnRhaW5lcik7XG5cdFx0XHRcdGN1cnJlbnRDaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBvaW50c1wiLCBwb2ludHMpO1xuXHRcdFx0XHRjdXJyZW50Q2hlY2tib3guY2xhc3NMaXN0LmFkZChcInJhbmdlLWNoZWNrYm94XCIpO1xuXHRcdFx0XHRjdXJyZW50Q2hlY2tib3guaW5uZXJIVE1MID0gcG9pbnRzO1xuXHRcdFx0XHQvL2N1cnJlbnRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgXCJyYW5nZUNoZWNrYm94TGlzdGVuZXJcIik7XG5cdFx0XHRcdGktLTtcblx0XHRcdFx0cG9pbnRzKys7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0dXBSYW5raW5nQmFsbG90KHJhbmtlZEJhbGxvdCkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhyYW5rZWRCYWxsb3QpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldHVwUmFuZ2VCYWxsb3QocmFuZ2VCYWxsb3QpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgKHJhbmdlQmFsbG90LmNoaWxkcmVuLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0XHR2YXIgY2FuZGlkYXRlQ29udGFpbmVyID0gcmFuZ2VCYWxsb3QuY2hpbGRyZW5baV07XG5cdFx0XHRcdGFkZE11bHRpcGxlQ2hlY2tib3hlcyhjYW5kaWRhdGVDb250YWluZXIsIDUpO1xuXHRcdFx0XHRzZXR1cFJhbmdlVmFsdWVzKGNhbmRpZGF0ZUNvbnRhaW5lcik7XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIHNldHVwUmFuZ2VWYWx1ZXMoY2FuZGlkYXRlQ29udGFpbmVyKSB7XG5cdFx0XHRcdHZhciByYW5nZUJveGVzID0ge307XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2FuZGlkYXRlQ29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKGNhbmRpZGF0ZUNvbnRhaW5lci5jaGlsZHJlbltpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2NoZWNrYm94JykpIHtcblx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coY2FuZGlkYXRlQ29udGFpbmVyLmNoaWxkcmVuW2ldKTtcblx0XHRcdFx0XHRcdC8vcmFuZ2VCb3hlcy5jYW5kaWRhdGVzICs9IGNhbmRpZGF0ZUNvbnRhaW5lci5jaGlsZHJlbltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKHJhbmdlQm94ZXMpO1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGNhbmRpZGF0ZUNvbnRhaW5lci5jaGlsZHJlbik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0fVxuXG5cdHJldHVybiBjYW5kaWRhdGVzO1xuXHRcbn1cblxuZnVuY3Rpb24gc3VibWl0QmFsbG90KCkge1xuXG5cdHZhciBiYWxsb3QgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XG5cdHZhciBiYWxsb3RPcHRpb25zID0gYmFsbG90LmNoaWxkcmVuO1xuXHR2YXIgYmFsbG90RGF0YSA9IHt9O1xuXG5cdGlmIChiYWxsb3QuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZnB0cFwiKSkge1xuXHRcdGJhbGxvdERhdGEuYmFsbG90VHlwZSA9IFwiZnB0cFwiO1xuXHR9IGVsc2UgaWYgKGJhbGxvdC5jbGFzc0xpc3QuY29udGFpbnMoXCJyYW5rXCIpKSB7XG5cdFx0YmFsbG90RGF0YS5iYWxsb3RUeXBlID0gXCJyYW5rXCI7XG5cdH0gZWxzZSBpZiAoYmFsbG90LmNsYXNzTGlzdC5jb250YWlucyhcInJhbmdlXCIpKSB7XG5cdFx0YmFsbG90RGF0YS5iYWxsb3RUeXBlID0gXCJyYW5nZVwiO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiYWxsb3RPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBvaW50cyA9IGJhbGxvdE9wdGlvbnNbaV0uZGF0YXNldC5wb2ludHM7XG5cdFx0dmFyIGNhbmRpZGF0ZSA9IGJhbGxvdE9wdGlvbnNbaV0uZGF0YXNldC5jYW5kaWRhdGVJZDtcblx0XHRcblx0XHRpZiAocG9pbnRzID4gMCkge1xuXHRcdFx0YmFsbG90RGF0YS5jYW5kaWRhdGVJZCA9IGNhbmRpZGF0ZTtcblx0XHRcdGJhbGxvdERhdGEucG9pbnRzID0gcG9pbnRzO1xuXHRcdFx0dXBkYXRlQ2FuZGlkYXRlU2NvcmVzKGJhbGxvdERhdGEpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDYW5kaWRhdGVTY29yZXMoZGF0YSkge1xuXHRjb25zb2xlLmxvZyhkYXRhKTtcbn1cblxuZnVuY3Rpb24gcGFnZVNldHVwKCkge1xuXHRiYWxsb3RTZXR1cCgpO1xuXHRhZGRFdmVudExpc3RlbmVycygpO1xufVxuXG5wYWdlU2V0dXAoKTsiXX0=
