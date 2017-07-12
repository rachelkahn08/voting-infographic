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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuXHR2YXIgY2hlY2tib3hlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NoZWNrYm94Jyk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgY2hlY2tib3hlcy5sZW5ndGg7IGkrKykge1xuXHRcdGNoZWNrYm94ZXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDaGVja2JveCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlQ2hlY2tib3goKSB7XG5cdHZhciBiYWxsb3RDb250YWluZXIgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0dmFyIGNhbmRpZGF0ZVBvaW50cyA9IHRoaXMucGFyZW50RWxlbWVudC5kYXRhc2V0LnBvaW50cztcblxuXHRpZiAoIXRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSAmJiBiYWxsb3RDb250YWluZXIuZGF0YXNldC5zZWxlY3Rpb25NYWRlID09ICdmYWxzZScpIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXHRcdGNhbmRpZGF0ZVBvaW50cyA9IDE7XG5cdFx0XG5cdFx0YmFsbG90Q29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZGF0YS1zZWxlY3Rpb24tbWFkZScsIHRydWUpO1xuXHR9IGVsc2UgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuXHRcdHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cdFx0YmFsbG90Q29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZGF0YS1zZWxlY3Rpb24tbWFkZScsIGZhbHNlKTtcblx0XHRjYW5kaWRhdGVQb2ludHMgPSAwO1xuXHRcdFxuXHR9XG59XG5cbmZ1bmN0aW9uIGJhbGxvdFNldHVwKCkge1xuXHR2YXIgYmFsbG90cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2JhbGxvdCcpO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGJhbGxvdHMubGVuZ3RoOyBpKyspIHtcblx0XHRhZGRDYW5kaWRhdGVzKGJhbGxvdHNbaV0pO1xuXHRcdHZhciBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzdWJtaXQnKTtcblx0XHRcdHN1Ym1pdEJ1dHRvbi5pbm5lckhUTUwgPSAnU3VibWl0IEJhbGxvdCc7XG5cdFx0YmFsbG90c1tpXS5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuXG5cdFx0aWYgKGJhbGxvdHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdmcHRwJykpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdmcHRwJyk7XG5cdFx0XHRiYWxsb3RzW2ldLnNldEF0dHJpYnV0ZSgnZGF0YS1zZWxlY3Rpb24tbWFkZScsIGZhbHNlKTtcblx0XHR9XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGFkZENhbmRpZGF0ZXMoYmFsbG90KSB7XG5cdFx0XG5cdFx0dmFyIGNhbmRpZGF0ZXMgPSBbXG5cdFx0XHR7XG5cdFx0XHRcdGNhbmRpZGF0ZUlEOiAnY2FuZGlkYXRlQScsXG5cdFx0XHRcdGNhbmRpZGF0ZURpc3BsYXk6ICdDYW5kaWRhdGUgQSdcblx0XHRcdH0sIFxuXHRcdFx0e1xuXHRcdFx0XHRjYW5kaWRhdGVJRDogJ2NhbmRpZGF0ZUInLCBcblx0XHRcdFx0Y2FuZGlkYXRlRGlzcGxheTogJ0NhbmRpZGF0ZSBCJ1xuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0Y2FuZGlkYXRlSUQ6ICdjYW5kaWRhdGVDJywgXG5cdFx0XHRcdGNhbmRpZGF0ZURpc3BsYXk6ICdDYW5kaWRhdGUgQydcblx0XHRcdH1cblx0XHRdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgY2FuZGlkYXRlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdGNhbmRpZGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjYW5kaWRhdGUnKTtcblx0XHRcdHZhciBjYW5kaWRhdGVJRCA9IGNhbmRpZGF0ZXNbaV0uY2FuZGlkYXRlSUQ7XG5cdFx0XHRcdGNhbmRpZGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGNhbmRpZGF0ZUlEKTtcblx0XHRcdFx0Y2FuZGlkYXRlQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZGF0YS1jYW5kaWRhdGUtSUQnLCBjYW5kaWRhdGVJRCk7XG5cdFx0XHRcdGNhbmRpZGF0ZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2RhdGEtcG9pbnRzJywgMCk7XG5cdFx0XHRcblx0XHRcdHZhciBjYW5kaWRhdGVOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdGNhbmRpZGF0ZU5hbWUuaW5uZXJIVE1MID0gY2FuZGlkYXRlc1tpXS5jYW5kaWRhdGVEaXNwbGF5O1xuXG5cdFx0XHRjYW5kaWRhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FuZGlkYXRlTmFtZSk7XG5cblx0XHRcdGlmIChiYWxsb3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdmcHRwJykpIHtcblx0XHRcdFx0YWRkU2luZ2xlQ2hlY2tib3goY2FuZGlkYXRlQ29udGFpbmVyKTtcblx0XHRcdH1cblxuXHRcdFx0YmFsbG90LmFwcGVuZENoaWxkKGNhbmRpZGF0ZUNvbnRhaW5lcik7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gYWRkU2luZ2xlQ2hlY2tib3goY29udGFpbmVyKSB7XG5cdFx0XHR2YXIgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0Y2hlY2tib3guY2xhc3NMaXN0LmFkZCgnY2hlY2tib3gnKTtcblx0XHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChjaGVja2JveCk7XG5cdFx0fVxuXHR9XG5cdFxufVxuXG5mdW5jdGlvbiBwYWdlU2V0dXAoKSB7XG5cdGJhbGxvdFNldHVwKCk7XG5cdGFkZEV2ZW50TGlzdGVuZXJzKCk7XG59XG5cbnBhZ2VTZXR1cCgpOyJdfQ==
