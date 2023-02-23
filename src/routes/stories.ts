import { Router } from "express";
import { StoriesModel, IStories } from "../models/stories";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const story: IStories[] = await StoriesModel.find().exec();
    // Build an array of objects containing the title and content of each story
    const storyData = story.map((storyObj) => {
    return {
      title: storyObj.title,
      content: storyObj.content,
    };
  });


//    const title = "Stories Section";
   const emptyBodyTitle = storyData.length > 0 ? storyData[0].title : "No stories available";
   const emptyBodyContent = storyData.length > 0 ? storyData[0].content : "No stories available";


    // Build an HTML string with the title and stories
    const html = `

<html>
    <head>
        <script>
        document.addEventListener("DOMContentLoaded", function() {
var emptyBody = '${emptyBodyTitle}';
var titleEmpty = '${emptyBodyContent}';

var leftButton = document.createElement('button');
leftButton.innerHTML = 'Left';
leftButton.style.position = 'absolute';
leftButton.style.left = '0px';
leftButton.style.top = '0px';
document.body.appendChild(leftButton);

var rightButton = document.createElement('button');
rightButton.innerHTML = 'Right';
rightButton.style.position = 'absolute';
rightButton.style.right = '0px';
rightButton.style.top = '0px';
document.body.appendChild(rightButton);

var centerButtons = function() {
  var windowHeight = window.innerHeight;
  var buttonHeight = leftButton.offsetHeight;
  var top = (windowHeight - buttonHeight) / 2;
  leftButton.style.top = top + 'px';
  rightButton.style.top = top + 'px';
};
centerButtons();
window.addEventListener('resize', centerButtons);

var setBackground = function() {
  var leftColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
  var rightColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
  document.body.style.background = 'linear-gradient(to right, ' + leftColor + ', ' + rightColor + ')';
};
setBackground();
leftButton.addEventListener('click', setBackground);
rightButton.addEventListener('click', setBackground);


var images = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
  'https://media.moddb.com/images/members/5/4550/4549205/duck.jpg',
  'https://media.istockphoto.com/id/173682323/photo/says.jpg?s=612x612&w=0&k=20&c=7jnXQrYzUWNTnLhjPgimxHIbjsaHvZmAMALGVzYNARQ='
];

var imageDiv = document.createElement('div');
imageDiv.style.position = 'absolute';
imageDiv.style.left = '0px';
imageDiv.style.top = '0px';
imageDiv.style.width = '35%';
imageDiv.style.height = '35%';
imageDiv.style.backgroundImage = 'url(' + images[0] + ')';
imageDiv.style.backgroundSize = 'cover';
imageDiv.style.backgroundPosition = 'center';
document.body.appendChild(imageDiv);

var centerImage = function() {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var imageWidth = imageDiv.offsetWidth;
  var imageHeight = imageDiv.offsetHeight;
  var left = (windowWidth - imageWidth) / 2;
  var top = (windowHeight - imageHeight) / 2 -85;
  imageDiv.style.left = left + 'px';
  imageDiv.style.top = 5 + top + 'px';
};
centerImage();
window.addEventListener('resize', centerImage);

var topDiv = document.createElement('div');
topDiv.style.position = 'absolute';
topDiv.style.left = '2%';
topDiv.style.top = '10px';
topDiv.style.width = '95%';
topDiv.style.height = '15%';
topDiv.style.background = 'transparent';
topDiv.style.border = '3px solid white';
topDiv.style.boxShadow = '0 0 10px white';
document.body.appendChild(topDiv);

topDiv.style.borderRadius = '5%';

var titles = [
  'Alas, a good tale to be told',
  'Hooray! we have found another one of us!',
  'Wait, are you serious'
];

var bodies = [
  'There was once a man, who lived in a shoe. This man was from Paru and his name was nothing less than Aruu',
  'It has been centuries since we began our search but its finally here',
  'No way will smith wins an award tonight'
];

var contentDiv = document.createElement('div');
contentDiv.style.position = 'absolute';
contentDiv.style.left = '17%';
contentDiv.style.top = '60%';
contentDiv.style.width = '65%';
contentDiv.style.height = '35%';
contentDiv.style.background = 'transparent';
contentDiv.style.border = '3px solid white';
contentDiv.style.boxShadow = '0 0 10px white';
document.body.appendChild(contentDiv);

contentDiv.style.borderRadius = '2%';

topDiv.innerHTML = titleEmpty;
contentDiv.innerHTML = emptyBody;




const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var currentDate = new Date().toLocaleString('en-US', { timeZone: timezone }).split(',')[0].split('/');
currentDate = currentDate[2] + '-' + currentDate[0].padStart(2, '0') + '-' + currentDate[1].padStart(2, '0');



var dateDiv = document.createElement('div');
dateDiv.style.position = 'absolute';
dateDiv.style.right = '8%';
topDiv.innerHTML = titleEmpty;dateDiv.style.top = '8%';
dateDiv.style.color = 'white';
dateDiv.innerHTML = currentDate;
document.body.appendChild(dateDiv);

dateDiv.style.fontSize = '2em';


var rightButtonClicked = function() {
  currentDate = new Date(currentDate);
  currentDate.setDate(currentDate.getDate() +1);
  currentDate = currentDate.toISOString().slice(0, 10);
  if (currentDate >= new Date().toISOString().slice(0, 10)) {
    topDiv.innerHTML = titleEmpty;
    contentDiv.innerHTML = emptyBody;
  } else {
    topDiv.innerHTML = titles[Math.floor(Math.random() * titles.length)];
    contentDiv.innerHTML = bodies[Math.floor(Math.random() * bodies.length)];
    imageDiv.style.backgroundImage = 'url(' + images[Math.floor(Math.random() * images.length)] + ')';
  }
  dateDiv.innerHTML = currentDate;
};
rightButton.addEventListener('click', rightButtonClicked);

var leftButtonClicked = function() {
  currentDate = new Date(currentDate);
  currentDate.setDate(currentDate.getDate() -1);
  currentDate = currentDate.toISOString().slice(0, 10);
  if (currentDate > new Date().toISOString().slice(0, 10)) {
    topDiv.innerHTML = titleEmpty;
    contentDiv.innerHTML = emptyBody;
  } else {
    topDiv.innerHTML = titles[Math.floor(Math.random() * titles.length)];
    contentDiv.innerHTML = bodies[Math.floor(Math.random() * bodies.length)];
    imageDiv.style.backgroundImage = 'url(' + images[Math.floor(Math.random() * images.length)] + ')';
  }
  dateDiv.innerHTML = currentDate;
};
leftButton.addEventListener('click', leftButtonClicked);

topDiv.style.textAlign = 'center';
topDiv.style.fontSize = '2em';

contentDiv.style.fontSize = '1.5em';

contentDiv.style.textAlign = 'center';
});
        </script>
    </head>
    <body style="margin: 0;">
    </body>
</html>



    `;

    res.send(html);
    return res.json(story);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});


routes.post("/", async (req, res) => {
  try {
    const stories: IStories = req.body;

    const storiesExists = await StoriesModel.findOne({
      name: stories.date,
    }).exec();

    if (storiesExists) {
      return res
        .status(409)
        .json({ error: "There is already another stories with this date" });
    }

    const newStory = await StoriesModel.create(stories);
    return res.status(201).json(newStory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

export default routes;
