# Mouse Tracker Library

Mouse Tracker records mouse clicks and mouse movements in your web application.
Mouse Tracker sees your site in pages. Each page can have one or more containers.
You have to set the pages and containers.

## Getting started
1. Download `mouseTracker.min.js`;

1. Import `mouseTracker.min.js` in your page;

## How to use mouseTracker Library
1. Insert specific tags `mouseTracker` in your HTML page.
   If you want analyze a specific html tag, add tag `mouseTracker` with a identifier value.
   Add id to identify the container page (there may be several containers). Tag `mouseTracker` is mandatory for container.
   
```html
   <section id='mapping' mouseTracker='section1'>
        <h1>Hello world</h1>
        <div>
            <h1 mouseTracker='sendTitle' >SEND</h1>
        </div>
   </section>
```
2. Create MouseTracker Object
```javascript
  <script>
    var mouseTracker = new mouseTracker();
  </script>
```
3. Add page
```javascript
    <script>
      var indexPage = mouseTracker.createPage('Index.html');
    </script>
```
4. Add container and associate it to the page. Second param must match with ID container.
```javascript
   <script>
     var container = mouseTracker.createAnalysisWrapper(indexPage,'mapping');
   </script>
```
5. Add listeners to the container
```javascript
   <script>
     mouseTracker.addAllListeners(container);
   </script>
```
6. Get Events List
```javascript
   <script>
     var result = mouseTracker.getMouseEvents(indexPage);
   </script>
```

## Listeners

* Click Listener - watches click in your container and save several info each click.
* Mouse movement Listener - watches mouse movement in your containers and save several info each half second.

## Outputs

Outputs are JSON.

* Click Listener Report - example
  It returns click list
```javascript
    [{"type":"click",
     "dateTime":1480340898398,
     "nameSelectedElement":"sendTitle",
     "x":31,
     "y":69,
     "wrapperName":"mapping",
     "browser":"Chrome",
     "namePage":"Index.html",
     "heightPage":324,
     "widthPage":1366}],
```
* Mouse Movement Listener Report - example
  It returns mouse movement list
```javascript
    [{"type":"move",
    "dateTime":1480340897533,
    "x":63,
    "y":28,
    "wrapperName":"mapping",
    "browser":"Chrome",
    "namePage":"Index.html",
    "heightPage":324,
    "widthPage":1366}],
```

## API
### createPage(name)
Add page with name
```javascript
    <script>
      var mouseTracker = new mouseTracker();
      var indexPage = mouseTracker.createPage('Index.html');
    </script>
```
### createAnalysisWrapper(page, eventContainer)
Add container and associate it to the page. 
EventContainer Attibute must match with container ID
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     var container = mouseTracker.createAnalysisWrapper(indexPage,'mapping');
   </script>
```
### addListener(container, listener)
addListener adds listener to the container. Listener are two:
 * CLICK 
 ```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.addListener(container, 'click');
   </script>
```
 It adds clickEventListener to your container. Container start to register click events when eventListener is added.
 
 * MOUSEMOVEMENT
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.addListener(container, 'mouseMovement');
   </script>
```
 It adds mouseMoveListener to your container. Container start to register mouse move events when eventListener is added.

### addAllListeners(wrapper)
addAllListener adds all listeners to the container.
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.addAllListener(container);
   </script>
```
### getMouseEvents(page, cached, wrappers)
getMouseEvents(page) default method, returns click and mouse-move events json list about each container in the page.
#### optional params
`cached` -> default to `false`. If cached is `true`, library keep all records. If cached is `false`, records will be delete after we'll retrieve the data.
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.getMouseEvents(indexPage,true);
   </script>
```
`wrappers` -> if you want retrieve data about specific containers, you can specify containers. Example:
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.getMouseEvents(indexPage,false,container1);
   </script>
```
It returns only container1 mouse events
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.getMouseEvents(indexPage,false,container1,container2);
   </script>
```
It returns only container1 and container2 mouse events

### getMouseMovementEvents(page, cached, wrappers)
getMouseMovementEvents(page) default method, returns mouse-move events json list about each container in the page.
#### optional params
`cached` -> default to `false`. If cached is `true`, library keep all records. If cached is `false`, records will be delete after we'll retrieve the data.
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.getMouseMovementEvents(indexPage,true);
   </script>
```
`wrappers` -> if you want retrieve mouse-move data about specific containers, you can specify containers. Example:
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.getMouseMovementEvents(indexPage,false,container1);
   </script>
```
It returns only container1 mouse-move events
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.getMouseMovementEvents(indexPage,false,container1,container2);
   </script>
```
It returns only container1 and container2 mouse-move events

### getMouseClickEvents(page, cached, wrappers)
getMouseClickEvents(page) default method, returns mouse-click events json list about each container in the page.
#### optional params
`cached` -> default to `false`. If cached is `true`, library keep all records. If cached is `false`, records will be delete after we'll retrieve the data.
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.getMouseClickEvents(indexPage,true);
   </script>
```
`wrappers` -> if you want retrieve mouse-click data about specific containers, you can specify containers. Example:
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.getMouseClickEvents(indexPage,false,container1);
   </script>
```
It returns only container1 mouse-click events
```javascript
   <script>
     var mouseTracker = new mouseTracker();
     mouseTracker.getMouseClickEvents(indexPage,false,container1,container2);
   </script>
```
It returns only container1 and container2 mouse-click events
