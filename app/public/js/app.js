// Array for Questions
var allQuestions = [
	"I tend to repeat myself when I have a few drinks",
	"I become the life of the room after some drinks",
	"Shots, baby",
	"I can't wait to get to Friday so that I can just rest. Ha Yeah Right. Let's go to the Bar!",
	"A one on one with a drink and good discussion is an awesome night",
	"I tend to befriend strangers when I go out",
	"Forget the bar. I'd rather go to a lounge",
	"I tend to spend money I didn't plan on spending when I meet new people because I'm buying rounds",
	"I can hold my liquor. Time for another round",
	"Life moves on, so we should not have regrets"
];

// Answer array
var choices = [
	"Strongly Agree",
	"Agree",
	"Unsure",
	"Disagree",
	"Strongly Disagree"
];

var currentURL = window.location.origin;
var questions = $('questions');

// function that self invokes itself to populate 
(function () {
	for(i = 0; i < allQuestions.length; i++){
		var quesHeader = $("<h3></h3>").text("Question " + (i + 1));
		questions.append(quesHeader);
		var question = $("<h4></h4>").text(allQuestions[i]);
		questions.append(question);
		answerChoices(i);
	}
})();
//function that is called after a question has been populated; creates the answer choices for the user
function answerChoices(questionNum){
	for(j = 0; j < 5; j++){
		var divInput = "<div class='radio'><label><input type='radio' id='answ" + (questionNum + 1) + "' name='answ" + (questionNum + 1) + "' value='" + (j + 1) + "'>" + choices[j] + "</label></div>";
		$("#questions").append(divInput);
	}
}
//when sumbit is clicked
$("#submit").click(function(e){
	e.preventDefault();
	var currentURL = window.location.origin;

	var newFriend = {
		name: $("#inputName").val().trim(),
		photo: $("#inputPicURL").val().trim(),
		scores: []
	};

//checks to see if the user input their name
		if(!newFriend.name){
			alert("Please enter your name");
			return;
		}
//checks to see if user has input a URL for their photo
		if(!newFriend.photo){
			alert("Please enter a URL for your photo");
			return;
		}
//checks to see if questions have been answered
		for(i = 0; i < allQuestions.length; i++){
			if($("#answ" + (i + 1) + ":checked").val()){
				newFriend.scores[i] = parseInt($("#answ" + (i + 1) + ":checked").val());
			}
			else if (!$("#answ" + (i + 1) + ":checked").val()){
				alert("Please answer all questions");
				return;
			}
		}
	friendQuery(newFriend);
});
// function to check user compatability with each user in friend array.
//Compares user's answers with preset friends
function friendQuery(newFriend){

		// GET info from friends API
		$.ajax({url: currentURL + "/api/friends", method: "GET"})
			.done(function(friendData) {
				var compat = [];

				// Cycles through friends already in array
				for(i = 0; i < friendData.length; i++) {
					var friendScore = friendData[i].scores;
					var totalDif = 0;

					//shows each friend's data in console
					console.log(friendData[i].name + ": " + friendScore);
					console.log("Your Score: " + newFriend.scores);
					var compare = [];

					//for loop to taking difference between each user
					for(j = 0; j < 10; j++){
						compare[j] = Math.abs(friendScore[j] - newFriend.scores[j]);
						totalDif += compare[j];
					}

					//shows the complete difference between each friend
					console.log(friendData[i].name + " Compatibility: " + totalDif);
					compat[i] = totalDif;

				}

				var bestMatch = compat[0];
				var bestFriend = friendData[0].name;
				var friendImage = friendData[0].photo;
				//first friend in array is the best drinking listener
				//other friend is the best person to drink with
				for(i = 1; i < friendData.length; i++) {
					if(compat[i] < bestMatch){
						bestMatch = compat[i];
						bestFriend = friendData[i].name;
						friendImage = friendData[i].photo;
					}
				}
				//Shows the lowest score and friend match
				console.log("Best Drinking Listener: " + bestMatch);
				console.log("Best Drinking Friend: " + bestFriend);

				//Appends friend match into modal
				$("#matchDisplay").append('<h4>' + bestFriend + '</h4><img src="' + friendImage + '"width=700>"');
				$("#friendModal").show();
	// Posts user's data into friends API
	$.post(currentURL + "/api/friends",
			newFriend,
			function(){

			});
		});

	}

//clears modal when X is clicked. Exits and clears form
$(".close").click(function(){
	$("#matchDisplay").empty();
	$("#friendModal").hide();
	$("#formInfo").trigger("reset");

});