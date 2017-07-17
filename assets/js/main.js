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
			currentCheckbox.setAttribute("data-points", 0)
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
				candidateContainer.addEventListener("click", selectCheckbox);
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
				currentCheckbox.addEventListener("click", selectCheckbox);
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
				candidateContainer.setAttribute("data-selection-made", false);
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
}

pageSetup();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2FuZGlkYXRlcztcblxuZnVuY3Rpb24gc2VsZWN0Q2hlY2tib3goKSB7XG5cdHZhciBjaGVja2JveCA9IHRoaXM7XG5cdHZhciBjaGVja2JveENvbnRhaW5lciA9IHRoaXMucGFyZW50RWxlbWVudDtcblxuXHRpZiAoY2hlY2tib3hDb250YWluZXIuZGF0YXNldC5zZWxlY3Rpb25NYWRlID09ICdmYWxzZScpIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cdFx0Y2hlY2tib3hDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1zZWxlY3Rpb24tbWFkZVwiLCB0cnVlKTtcblx0fSBlbHNlIGlmIChjaGVja2JveENvbnRhaW5lci5kYXRhc2V0LnNlbGVjdGlvbk1hZGUgPT0gJ3RydWUnKSB7XG5cdFx0Y2xlYXJDaGVja2JveGVzKGNoZWNrYm94Q29udGFpbmVyKTtcblx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cdH1cblxuXHRpZiAoY2hlY2tib3hDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZnB0cFwiKSkge1xuXHRcdHRvZ2dsZUNoZWNrYm94KHRoaXMpO1x0XG5cdH1cbn1cblxuZnVuY3Rpb24gY2xlYXJDaGVja2JveGVzKGNoZWNrYm94Q29udGFpbmVyKSB7XHRcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGVja2JveENvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjdXJyZW50Q2hlY2tib3ggPSBjaGVja2JveENvbnRhaW5lci5jaGlsZHJlbltpXTtcblx0XHRpZiAoY3VycmVudENoZWNrYm94LmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuXHRcdFx0Y3VycmVudENoZWNrYm94LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNoZWNrYm94KGNoZWNrYm94KSB7XG5cdHZhciBjaGVja2JveENvbnRhaW5lciA9IGNoZWNrYm94LnBhcmVudEVsZW1lbnQ7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY2hlY2tib3hDb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY3VycmVudENoZWNrYm94ID0gY2hlY2tib3hDb250YWluZXIuY2hpbGRyZW5baV07XG5cdFx0aWYgKGN1cnJlbnRDaGVja2JveC5kYXRhc2V0LnBvaW50cyA9IDEpIHtcblx0XHRcdGN1cnJlbnRDaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBvaW50c1wiLCAwKVxuXHRcdH1cblx0fVxuXG5cdGNoZWNrYm94LnNldEF0dHJpYnV0ZShcImRhdGEtcG9pbnRzXCIsIDEpO1xufVxuXG5mdW5jdGlvbiBiYWxsb3RTZXR1cCgpIHtcblx0dmFyIGJhbGxvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdiYWxsb3QnKTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiYWxsb3RzLmxlbmd0aDsgaSsrKSB7XG5cdFx0YWRkQ2FuZGlkYXRlcyhiYWxsb3RzW2ldKTtcblx0XHR2YXIgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3VibWl0Jyk7XG5cdFx0XHRzdWJtaXRCdXR0b24uaW5uZXJIVE1MID0gJ1N1Ym1pdCBCYWxsb3QnO1xuXHRcdFx0c3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdWJtaXRCYWxsb3QpO1xuXHRcdGJhbGxvdHNbaV0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcblxuXHRcdGlmIChiYWxsb3RzW2ldLmNsYXNzTGlzdC5jb250YWlucygnZnB0cCcpKSB7XG5cdFx0XHRiYWxsb3RzW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS1zZWxlY3Rpb24tbWFkZScsIGZhbHNlKTtcblx0XHR9XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGFkZENhbmRpZGF0ZXMoYmFsbG90KSB7XG5cdFx0XG5cdFx0Y2FuZGlkYXRlcyA9IFtcblx0XHRcdHtcblx0XHRcdFx0Y2FuZGlkYXRlSUQ6ICdjYW5kaWRhdGVBJyxcblx0XHRcdFx0Y2FuZGlkYXRlRGlzcGxheTogJ0NhbmRpZGF0ZSBBJ1xuXHRcdFx0fSwgXG5cdFx0XHR7XG5cdFx0XHRcdGNhbmRpZGF0ZUlEOiAnY2FuZGlkYXRlQicsIFxuXHRcdFx0XHRjYW5kaWRhdGVEaXNwbGF5OiAnQ2FuZGlkYXRlIEInXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHRjYW5kaWRhdGVJRDogJ2NhbmRpZGF0ZUMnLCBcblx0XHRcdFx0Y2FuZGlkYXRlRGlzcGxheTogJ0NhbmRpZGF0ZSBDJ1xuXHRcdFx0fVxuXHRcdF07XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBjYW5kaWRhdGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0Y2FuZGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NhbmRpZGF0ZScpO1xuXHRcdFx0dmFyIGNhbmRpZGF0ZUlEID0gY2FuZGlkYXRlc1tpXS5jYW5kaWRhdGVJRDtcblx0XHRcdFx0Y2FuZGlkYXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY2FuZGlkYXRlSUQpO1xuXHRcdFx0XHRjYW5kaWRhdGVDb250YWluZXIuc2V0QXR0cmlidXRlKCdkYXRhLWNhbmRpZGF0ZS1JRCcsIGNhbmRpZGF0ZUlEKTtcblx0XHRcdFx0Y2FuZGlkYXRlQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZGF0YS1wb2ludHMnLCAwKTtcblx0XHRcdFxuXHRcdFx0dmFyIGNhbmRpZGF0ZU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0Y2FuZGlkYXRlTmFtZS5pbm5lckhUTUwgPSBjYW5kaWRhdGVzW2ldLmNhbmRpZGF0ZURpc3BsYXk7XG5cblx0XHRcdGNhbmRpZGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5kaWRhdGVOYW1lKTtcblxuXHRcdFx0aWYgKGJhbGxvdC5jbGFzc0xpc3QuY29udGFpbnMoJ2ZwdHAnKSkge1xuXHRcdFx0XHRhZGRTaW5nbGVDaGVja2JveChjYW5kaWRhdGVDb250YWluZXIpO1xuXHRcdFx0XHRjYW5kaWRhdGVDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdENoZWNrYm94KTtcblx0XHRcdH1cblxuXHRcdFx0YmFsbG90LmFwcGVuZENoaWxkKGNhbmRpZGF0ZUNvbnRhaW5lcik7XG5cdFx0fVxuXG5cdFx0aWYgKGJhbGxvdC5jbGFzc0xpc3QuY29udGFpbnMoJ3JhbmsnKSkge1xuXHRcdFx0c2V0dXBSYW5raW5nQmFsbG90KGJhbGxvdCk7XG5cdFx0fSBlbHNlIGlmIChiYWxsb3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdyYW5nZScpKSB7XG5cdFx0XHRzZXR1cFJhbmdlQmFsbG90KGJhbGxvdCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYWRkU2luZ2xlQ2hlY2tib3goY29udGFpbmVyKSB7XG5cdFx0XHR2YXIgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0Y2hlY2tib3guY2xhc3NMaXN0LmFkZCgnY2hlY2tib3gnKTtcblx0XHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XG5cdFx0XHRyZXR1cm4gY2hlY2tib3g7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYWRkTXVsdGlwbGVDaGVja2JveGVzKGNhbmRpZGF0ZUNvbnRhaW5lciwgbnVtYmVyKSB7XG5cdFx0XHR2YXIgaSA9IG51bWJlcjtcblx0XHRcdHZhciBwb2ludHMgPSAwO1xuXHRcdFx0d2hpbGUgKGkgPiAwKSB7XG5cdFx0XHRcdHZhciBjdXJyZW50Q2hlY2tib3ggPSBhZGRTaW5nbGVDaGVja2JveChjYW5kaWRhdGVDb250YWluZXIpO1xuXHRcdFx0XHRjdXJyZW50Q2hlY2tib3guc2V0QXR0cmlidXRlKFwiZGF0YS1wb2ludHNcIiwgcG9pbnRzKTtcblx0XHRcdFx0Y3VycmVudENoZWNrYm94LmNsYXNzTGlzdC5hZGQoXCJyYW5nZS1jaGVja2JveFwiKTtcblx0XHRcdFx0Y3VycmVudENoZWNrYm94LmlubmVySFRNTCA9IHBvaW50cztcblx0XHRcdFx0Y3VycmVudENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzZWxlY3RDaGVja2JveCk7XG5cdFx0XHRcdGktLTtcblx0XHRcdFx0cG9pbnRzKys7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0dXBSYW5raW5nQmFsbG90KHJhbmtlZEJhbGxvdCkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhyYW5rZWRCYWxsb3QpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldHVwUmFuZ2VCYWxsb3QocmFuZ2VCYWxsb3QpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgKHJhbmdlQmFsbG90LmNoaWxkcmVuLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0XHR2YXIgY2FuZGlkYXRlQ29udGFpbmVyID0gcmFuZ2VCYWxsb3QuY2hpbGRyZW5baV07XG5cdFx0XHRcdGFkZE11bHRpcGxlQ2hlY2tib3hlcyhjYW5kaWRhdGVDb250YWluZXIsIDUpO1xuXHRcdFx0XHRjYW5kaWRhdGVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1zZWxlY3Rpb24tbWFkZVwiLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0fVxuXG5cdHJldHVybiBjYW5kaWRhdGVzO1xuXHRcbn1cblxuZnVuY3Rpb24gc3VibWl0QmFsbG90KCkge1xuXG5cdHZhciBiYWxsb3QgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XG5cdHZhciBiYWxsb3RPcHRpb25zID0gYmFsbG90LmNoaWxkcmVuO1xuXHR2YXIgYmFsbG90RGF0YSA9IHt9O1xuXG5cdGlmIChiYWxsb3QuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZnB0cFwiKSkge1xuXHRcdGJhbGxvdERhdGEuYmFsbG90VHlwZSA9IFwiZnB0cFwiO1xuXHR9IGVsc2UgaWYgKGJhbGxvdC5jbGFzc0xpc3QuY29udGFpbnMoXCJyYW5rXCIpKSB7XG5cdFx0YmFsbG90RGF0YS5iYWxsb3RUeXBlID0gXCJyYW5rXCI7XG5cdH0gZWxzZSBpZiAoYmFsbG90LmNsYXNzTGlzdC5jb250YWlucyhcInJhbmdlXCIpKSB7XG5cdFx0YmFsbG90RGF0YS5iYWxsb3RUeXBlID0gXCJyYW5nZVwiO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiYWxsb3RPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBvaW50cyA9IGJhbGxvdE9wdGlvbnNbaV0uZGF0YXNldC5wb2ludHM7XG5cdFx0dmFyIGNhbmRpZGF0ZSA9IGJhbGxvdE9wdGlvbnNbaV0uZGF0YXNldC5jYW5kaWRhdGVJZDtcblx0XHRcblx0XHRpZiAocG9pbnRzID4gMCkge1xuXHRcdFx0YmFsbG90RGF0YS5jYW5kaWRhdGVJZCA9IGNhbmRpZGF0ZTtcblx0XHRcdGJhbGxvdERhdGEucG9pbnRzID0gcG9pbnRzO1xuXHRcdFx0dXBkYXRlQ2FuZGlkYXRlU2NvcmVzKGJhbGxvdERhdGEpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDYW5kaWRhdGVTY29yZXMoZGF0YSkge1xuXHRjb25zb2xlLmxvZyhkYXRhKTtcbn1cblxuZnVuY3Rpb24gcGFnZVNldHVwKCkge1xuXHRiYWxsb3RTZXR1cCgpO1xufVxuXG5wYWdlU2V0dXAoKTsiXX0=
