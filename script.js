//get the input values from user by html id (ie: name or adjectives)
function getUserInput(htmlElementId) {
    return document.getElementById(htmlElementId).value;
  }

  //Go through the input  to get the values and push them into the array
  function getAdjectives(baseAdjectiveId, numberOfAdjectives) {
    let adjectiveArray = [];
    for (let i = 1; i <= numberOfAdjectives; i++) {
      let adjNum = i;
      let adjId = baseAdjectiveId + adjNum;
      adjectiveArray.push(getUserInput(adjId));
    }
    // console.log("adjectives are " + adjectiveArray)
    return adjectiveArray;
  }

  //adds all the input values
  function getAllUserInputs() {
    const personName = getUserInput("userName");
    const goodAdjs = getAdjectives("goodAdj", 5);
    const badAdjs = getAdjectives("badAdj", 5);

    let error = [];
    // console.log("good adjs are " + goodAdjs);

    // error check to make sure all the fields are filled
    if( personName == "") {
      // console.log("Name is empty")
      error.push("Name is empty.<br>");
    }

    if (goodAdjs.includes("")) {
      // console.log("Need more good adjectives")
      error.push("Need more good adjectives<br>")
    }

    if (badAdjs.includes("")) {
      // console.log("Need more bad adjectives")
      error.push("Need more bad adjectives <br>")
    }

    // console.log("test " + error)
    //creates a object
    const adlibWords = {
      name: personName,
      positiveAdjectives: goodAdjs,
      negativeAdjectives: badAdjs
    };
    return [adlibWords, error];
  }

  // adds the new adjectives into the story
  function addAdjectivesToStory(currentStory, adjectiveArray) {
    const arrayLength = adjectiveArray.length;
    for (let i = 0; i < arrayLength ; i++) {
      if (i === arrayLength - 1) {
        currentStory += ("and " + adjectiveArray[i] + ".\n<br>" );
      } else {
        currentStory += (adjectiveArray[i] + ", ");
      }

    }

    return currentStory;
  }

  //creates the story and prints it out
  function createStory(inputObject) {
    const name = inputObject.name;
    let story = "Once upon a time there was a person named ";
    story += name;
    story += ".\n <br>" + name + " was ";
    story = addAdjectivesToStory(story, inputObject.positiveAdjectives);
    story += name + "\'s nemesis was ";
    story = addAdjectivesToStory(story, inputObject.negativeAdjectives);

    return story;
  }

  // main function to call after hitting the submit button to write the story
  function startMadLib() {
    const storyArea = document.getElementById("storyArea");
    // console.log("result area " + storyArea)
    const errorMessages = document.getElementById("errors");
    // console.log("error messages " + errorMessages.valueOf())

    const [userInputObject, errors] = getAllUserInputs();

    // console.log("errors length is " + errors.length)
    if (errors.length > 0) {
      // console.log("can you see this in errors")
      for(let i=0; i < errors.length; i++) {
      console.log(errors[i]);

      errorMessages.innerHTML = errors;
      }

      storyArea.innerHTML = "";

      return;
    }
    // console.log("can you see")
    const madlibStory = createStory(userInputObject);
    console.log(madlibStory);

    storyArea.innerHTML = madlibStory;
    errorMessages.innerHTML = "";

    // console.log(errors)
  }
