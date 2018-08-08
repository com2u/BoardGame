# BoardGame
A simple html board game engine

I want to have a simple website which can display the components of a board game. I want to safe space in my luggage when I go into holidays and have my games with me as a virtual board. For cards or dices I will us the real one. 
The board game consists of three components: background image, component image and component json.
The background should be always the background of the website. This is the board.
The component image is one image which needs to be spitted into several sub images based on the json definition.
The components should be added on top as smart objects. The start position of each component is defined in the json file. Maybe components can be on top of each other. 
You can move the components by drag&drop on the board. 
When an component was clicked provide a handle to rotate the object.
During moving or rotation of the component the component should be displayed.
On the bottom of the web site add a button “Save” the button will update the component positions in the component json file. 

Some component consist of stack images. Each image for the stack is defined as sprite. The sprites will be added to the component. When double click a component the next image of the stack will be shown. When the stack size was reached it will start from the beginning. 
Add a type and a category to the components. The type can be "stack" or "piece". 
A “piece” is always on top of a “stack”. 
With the type “stack” an area can be defined where components can be shuffled. A control to shuffle the components a control is needed. Shuffle will change the display order of the component. To do this each component has a z order. 
A reset" button - moves all "piece" items with same "category" as stack to the location of the "stack" 
A "shuffle" button - randomizes "z" coordinate for all "piece" items with same "category" 
On the bottom of the web site add a button “Undo”. This button should undo the last user operation. For the undo operation is a stack of the history. By pressing undo several times the game goes several steps backwards. 
It should be possible to load a background image, component image and component.json file to create a new game.
