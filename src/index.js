export default class MouseTracker {
      constructor() {}
    
      createPage(name){ //Creo la pagina   
        let page = new Page(name);
        return page;
      }
    
      createAnalysisWrapper(page, eventContainer){ //Creo il wrapper su cui abilito gli analytics
        let analysisWrapper = new AnalysisWrapper(page, eventContainer);
        return analysisWrapper;
      }
    
      getMouseEvents(page, cached = false, ...wrappers){
         return page.sendAllRegisteredData(cached, wrappers);
      }
    
      getMouseMovementEvents(page, cached = false, ...wrappers){
         return page.sendRegisteredMouseMovement(cached,wrappers); 
      }
      
      getMouseClickEvents(page, cached = false, ...wrappers){ //array di wrapper in input
          return page.sendRegisteredClick(cached, wrappers); 
      }
    
      addListener(wrapper, ...listeners){
          listeners.forEach(function(listener){
              switch(listener){
                  case 'click': wrapper.addClickListener();
                      break;
                  case 'mouseMovement': wrapper.addMouseMoveListener();
                      break;
                  default: console.error('listener '+listener+' is not available');
              }
          });
      }
      
      addAllListeners(wrapper){
           wrapper.addClickListener();
           wrapper.addMouseMoveListener();   
      }
}

class Inspector{
    constructor(){}
    
    static findElementSelected(eventContainerElement, event) {
          //prendo la distanza del path dell'elemento e la distanza del path container
          let pathDistanceElementSelected = Inspector.searchPathElementDistance(event);
          let pathElementDistanceContainer = Inspector.searchPathElementContainerDistance(event,eventContainerElement);
          let element = null;
        
          for(let i=pathDistanceElementSelected; i<pathElementDistanceContainer; i++){ //Ciclo fino a trovare il primo elemento che si vuole analizzare -> lo riconosciamo attraverso l'attributo mouseTracker
            if(event.path[i].attributes.mouseTracker !== undefined){
                    element = event.path[i];
                    break;
                }
          }
          if(element === null)
            return eventContainerElement;
          return element;
    }  //CLICK EVENT
    
    static searchPathElementDistance(node) {
            let tagAnalyticsElement = node.toElement.attributes.mouseTracker;
        // se l'elemento cliccato non ha tag analytics vado a prendermi il tagAnalytics del prima padre disponibile
            if(node.toElement.attributes.mouseTracker === undefined){
                tagAnalyticsElement = Inspector.searchFirtFatherAnalyticsTag(node);
            }
            
            for(let i=0; i<node.path.length;i++){
                if(node.path[i].attributes.mouseTracker !== undefined){
                    if(node.path[i].attributes.mouseTracker === tagAnalyticsElement){
                        return i;
                    }
                }
            }        
            return -1;
    }   

    static searchPathElementContainerDistance(node, eventContainerElement) {
        for(let i=0; i<node.path.length;i++){
            if(node.path[i].id === eventContainerElement.id){
                return i;
            }
        }
        return -1;  
    }
    
    static searchFirtFatherAnalyticsTag(node) { //  vado a prendermi il tagAnalytics del prima padre disponibile
        let tagAnalyticsElement;
        let nodeToFind = node;
        let find = false;
        while(!find){
            if(nodeToFind.toElement.parentNode.attributes.mouseTracker !== undefined){
                tagAnalyticsElement = nodeToFind.toElement.parentNode.attributes.mouseTracker;
                find = true;
            }else{
                nodeToFind = nodeToFind.toElement.parentNode;   
            }
        }
        return tagAnalyticsElement;
    }
    
    static containerIsInWrapperList(valueKey, myArray) {
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].name === valueKey) {
                return true;
            }
        }
        return false;
    }
    
    static getBrowser() {
        if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1 )
            return 'Opera';
        else if (navigator.userAgent.indexOf('Chrome') !== -1 )
            return 'Chrome';
        else if (navigator.userAgent.indexOf('Safari') !== -1)
            return 'Safari';
        else if (navigator.userAgent.indexOf('Firefox') !== -1 ) 
            return 'Firefox';
        else if ((navigator.userAgent.indexOf('MSIE') !== -1 )||(!!document.documentMode == true )) //IF IE > 10
            return 'IE'; 
        else 
            return 'unknown';
    }
}

class Page{
    constructor(name) {
        this.name = name;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.browser = Inspector.getBrowser();
        this.containers = []; //container all'interno della pagina
    }
    
    setHeight(height) {
        this.height = height;
    }
    
    setWidth(width) {
        this.width = width;
    }
    
    addContainer(container) { //container di tipo AnalysisWrapper
        this.containers.push(container);
    }
    
    sendAllRegisteredData(cached, wrappers) {
        let data = Sender.sendJsonAllData(this.containers, wrappers);
        if(!cached)
            this.emptyContainersTracementList(wrappers);
        return data;
    }
    
    sendRegisteredClick(cached, wrappers) {
        let clickData = Sender.sendJsonClickData(this.containers, wrappers);
        if(!cached)
            this.emptyClickContainers(wrappers);
        return clickData;
    }
    
    sendRegisteredMouseMovement(cached, wrappers) {
        let mouseMovementData = Sender.sendJsonMouseMovementsData(this.containers, wrappers);
        if(!cached)
            this.emptyMouseMovementContainers(wrappers);
        return mouseMovementData;
    }
    
    emptyContainersTracementList(wrappers) {
        this.containers.forEach( function(container){
            if(Inspector.containerIsInWrapperList(container.name, wrappers) || wrappers.length == 0){
                container.clickListener.clearList();
                container.mouseMovementListener.clearList();
            }  
        });
    }  
    
    emptyClickContainers(wrappers) {
        this.containers.forEach( function(container){
            if(Inspector.containerIsInWrapperList(container.name, wrappers) || wrappers.length == 0)
                container.clickListener.clearList();
        });
    }
    
    emptyMouseMovementContainers(wrappers) {
        this.containers.forEach( function(container){
            if(Inspector.containerIsInWrapperList(container.name, wrappers) || wrappers.length == 0)
                container.mouseMovementListener.clearList();
        });
    }
}

class ClickListener {
    constructor(wrapper) {
        this.clickList = [];
        this.wrapper = wrapper;
        this.wrapper.element.addEventListener('click', evt=>this.registerClick(evt));
    }
    
    registerClick(event) {
        this.wrapper.page.setHeight(window.innerHeight); // prendo altezza corrente della pagina browser
        this.wrapper.page.setWidth(window.innerWidth); // prendo larghezza corrente della pagina browser
        let click = new Click(this.wrapper, event); //con this gli passo l'oggetto AnalysisWrapper
        //click.showInfo();
        this.clickList.push(click);
    }
    
    clearList() {
        this.clickList.length = 0;
    }
    
    getClickList() {
        return this.clickList;
    }
}

class MouseMovementListener{
    constructor(wrapper) {
        this.movements = [];
        this.wrapper = wrapper;
        this.addListener();
    }
    
    addListener() {
        this.mouseIsOver = false;
        let self = this;
        //verifico se il mouse è sopra il wrapper per la registrazione della posizione
        this.wrapper.element.onmouseover = function () {
            self.mouseIsOver = true;
        }
        this.wrapper.element.onmouseout = function () {
            self.mouseIsOver = false;
        }
        //Vado a prendermi le coordinate del mouse ad ogni movimento del mouse nella pagina
        this.wrapper.element.addEventListener('mousemove', function(event){
            window.mouseX = event.clientX;
            window.mouseY = event.clientY;
        });
        //Registro la posizione del mouse solo ogni mezzo secondo
        window.setInterval(function(event){
            if(self.mouseIsOver){
                self.registerMouseMovement(event);
            }
        }, 500);
    }
    
    registerMouseMovement(event) {
        this.wrapper.page.setHeight(window.innerHeight); // prendo altezza corrente della pagina browser
        this.wrapper.page.setWidth(window.innerWidth); // prendo larghezza corrente della pagina browser
        let movement = new MouseMovement(this.wrapper, window.mouseX, window.mouseY); //con this gli passo l'oggetto AnalysisWrapper
       // movement.showInfo();
        this.movements.push(movement);
    }
    
    clearList() {
        this.movements.length = 0;
    }
    
    getList() {
        return this.movements;
    }
}

class AnalysisWrapper{
    /*
        CONTIENE LE DUE LISTE DI EVENTI : CLICK, MOVEMENT
    */
    
    constructor(page, wrapperName) { //page di tipo Page
        this.page = page;
        this.name = wrapperName;
        this.element = document.getElementById(wrapperName);
        this.page.addContainer(this);
    }
    
    addClickListener() {
        this.clickListener = new ClickListener(this);
    }
    
    addMouseMoveListener() {
        this.mouseMovementListener = new MouseMovementListener(this);
    }
}

class Click {
    constructor(wrapperElement, event) {
        this.wrapperElement = wrapperElement;
        this.dateTime = Date.now();
        this.x = event.x + window.pageXOffset;
        this.y = event.y + window.pageYOffset;
        this.selectedElement = Inspector.findElementSelected(this.wrapperElement.element, event); 
        this.nameSelectedElement = this.selectedElement.attributes.mouseTracker.nodeValue; //elemento specifico cliccato all'interno di containerElement (es. bottone)
    }
    
    showInfo() {
        let message = `Page ${this.wrapperElement.page.name} [width:${this.wrapperElement.page.width}, height: ${this.wrapperElement.page.height}] \n Container: ${this.wrapperElement.name} \n ### ${this.dateTime} - (x: ${this.x} y:${this.y}) ------ ${this.nameSelectedElement}`; 
        console.log(message);
    } 
}

class MouseMovement {
    constructor(wrapperElement, mouseX, mouseY) {
        this.wrapperElement = wrapperElement;
        this.dateTime = Date.now();
        this.x = mouseX + window.pageXOffset; 
        this.y = mouseY + window.pageYOffset;
    }
    
    showInfo() {
        /*let message = `Page ${this.wrapperElement.page.name} [width:${this.wrapperElement.page.width}, height: ${this.wrapperElement.page.height}] \n Container: ${this.wrapperElement.name} \n ### ${this.dateTime} - (x: ${this.x} y:${this.y})`;*/
        let message = `Page ${this.wrapperElement.page.name} ${this.wrapperElement.name} ### ${this.dateTime} - x: ${this.x} y:${this.y}`;
        console.log(message);
    }
}

class Sender{
    constructor() {};
    
    static sendJsonAllData(mouseTrackerList, wrappers) {
        let reporClicktToSend = JsonReport.createClickObjectToSend(mouseTrackerList, wrappers);
        let reporMouseMovementstToSend = JsonReport.createMouseMovementObjectToSend(mouseTrackerList, wrappers);
        return JSON.stringify(reporClicktToSend.concat(reporMouseMovementstToSend));
    }
    
    static sendJsonClickData(pageClickList, wrappers) {
        let reportToSend = JsonReport.createClickObjectToSend(pageClickList, wrappers);
        return JSON.stringify(reportToSend);
    }
    
    static sendJsonMouseMovementsData(movementsList, wrappers) {
        let reportToSend = JsonReport.createMouseMovementObjectToSend(movementsList, wrappers);
        return JSON.stringify(reportToSend);
    }
}

class JsonReport {
    constructor() {};
    
    static createMouseMovementObjectToSend(list, wrappers) { // arriva una lista di Container
        let array = [];
        list.forEach(function(container){
            if(Inspector.containerIsInWrapperList(container.name, wrappers) || wrappers.length == 0){ //verifica se il container selezionato è tra quelli richiesti dall'utente, se wrappers è vuoto vuol dire che l'utente vuole prendere tutti i wrappers della pagina e quindi l'if sarà sempre true
                container.mouseMovementListener.getList().forEach(function(ele){
                    let obj ={
                      type: 'move',
                      dateTime: ele.dateTime,
                      x: ele.x,
                      y: ele.y,
                      wrapperName: ele.wrapperElement.name,
                      browser: ele.wrapperElement.page.browser,
                      namePage: ele.wrapperElement.page.name,
                      heightPage: ele.wrapperElement.page.height,
                      widthPage: ele.wrapperElement.page.width,                    
                    }
                    array.push(obj);
                });
            }
        });
        return array;
    }
    
    static createClickObjectToSend(list, wrappers) {
       let array=[];
       list.forEach(function(container){
         if(Inspector.containerIsInWrapperList(container.name,wrappers) || wrappers.length == 0){ //verifica se il container selezionato è tra quelli richiesti dall'utente, se wrappers è vuoto vuol dire che l'utente vuole prendere tutti i wrappers della pagina e quindi l'if sarà sempre true
                container.clickListener.getClickList().forEach(function(ele){
                    let obj ={
                      type: 'click',
                      dateTime: ele.dateTime,
                      nameSelectedElement: ele.nameSelectedElement,
                      x: ele.x,
                      y: ele.y,
                      wrapperName: ele.wrapperElement.name,
                      browser: ele.wrapperElement.page.browser,
                      namePage: ele.wrapperElement.page.name,
                      heightPage: ele.wrapperElement.page.height,
                      widthPage: ele.wrapperElement.page.width
                    }
                    array.push(obj);
                }); 
         }
       });
      return array;
    }
}
