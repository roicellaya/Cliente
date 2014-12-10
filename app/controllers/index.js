//Array to store the data from the todo list

//We execute the function to show the data for the first view
getTodoList("kiwi");
getTodoList("fresa");
getTodoList("pina");

var json1;
var json2;
var json3;

function getJsonCorrecto(fruta){
    if(fruta=="kiwi"){
        return json3;
    }
    if(fruta=="fresa"){
        return json1;
    }
    if(fruta=="pina"){
        return json2;
    }
}

function getTodoList(fruta) {
    var dataArray = [];
    //function to use HTTP to connect to a web server and transfer the data.
    var sendit = Ti.Network.createHTTPClient({
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('There was an error during the connection');
        },
        timeout : 1000,
    });
    
    //Here you have to change it for your local ip
    sendit.open('GET', 'http://localhost:3000/api/frutas/'+fruta);
    sendit.send();
    
    //Function to be called upon a successful response
    sendit.onload = function(e) {
        var json1 ;
        var json2 ;
        var json3 ;
        var tamano;
        if(fruta=="fresa"){
            json1 = JSON.parse(this.responseText);
            tamano = json1.length;
        }
        if(fruta=="pina"){
            json2 = JSON.parse(this.responseText);
            tamano = json2.length;
        }
        if(fruta=="kiwi"){
            json3 = JSON.parse(this.responseText);
            tamano = json3.length;
        }
        
        if (tamano == 0) {
            if(fruta=='fresa'){
                $.tableViewFresa.headerTitle = "There are no fruits in our "+fruta+" stock";
            }
            if(fruta=='pina'){
                $.tableViewPina.headerTitle = "There are no fruits in our "+fruta+" stock";
            }
            if(fruta=='kiwi'){
                $.tableViewKiwi.headerTitle = "There are no fruits in our "+fruta+" stock";
            }
            
        }
        //Emptying the data to refresh the view
        dataArray = [];
        
        //Insert the JSON data to the table view
        for (var i = 0; i < tamano; i++) {
            if(fruta=="fresa"){
                var row = Ti.UI.createTableViewRow({
                    hasCheck : false,
                    color : '#ffffff',
                }); 
                var vender =  Titanium.UI.createImageView({
                    image:"vender.png",
                    width:64,
                    height:64,
                    right:20,
                    top:-5
                });
                vender.miId= json1[i].value._id;
                vender.addEventListener('click',function(e){
                    var sendUpdate = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    console.log("El ID es "+e.source.miId);
                    sendUpdate.open('PUT', 'http://localhost:3000/api/frutas/'+e.source.miId);
                    sendUpdate.send();
                    
                    sendUpdate.onload = function(e){
                        getTodoList(fruta);
                    };
                });
                
                var noVender =  Titanium.UI.createImageView({
                    image:"_vender.png",
                    width:64,
                    height:64,
                    right:20,
                    top:-5
                });
                
                var despachar =  Titanium.UI.createImageView({
                    image:"despachar.png",
                    width:64,
                    height:64,
                    right:104,
                    top:-5
                }); 
                
                var nombre =  Titanium.UI.createLabel({
                    text:json1[i].value.fruta +"  "+ json1[i].value._id.substr(json1[i].value._id.length - 3),
                    font:{fontSize:12,fontWeight:'bold'},
                    width:'auto',
                    textAlign:'left',
                    bottom:20,
                    left:20,
                    height:12
                });
                
                despachar.miID=json1[i].value._id;
                despachar.addEventListener('click',function(e){
                    var sendDelete = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    console.log("El ID es "+e.source.miID);
                    sendDelete.open('DELETE', 'http://localhost:3000/api/frutas/' + e.source.miID);
                    sendDelete.send();
                    
                    sendDelete.onload = function(e){
                        getTodoList(fruta);
                    };
                });
                row.add(nombre);
                
                if(json1[i].value.status=="disponible"){
                    row.add(vender);
                }
                else{
                    row.add(noVender);
                    row.add(despachar);
                }
                dataArray.push(row);
                $.tableViewFresa.setData(dataArray);
            }
            else if(fruta=="pina"){
                var row = Ti.UI.createTableViewRow({
                    title : json2[i].value.fruta,
                    hasCheck : false,
                    color : '#ffffff',
                }); 
                var vender =  Titanium.UI.createImageView({
                    image:"vender.png",
                    width:64,
                    height:64,
                    right:20,
                    top:-5
                });
                vender.miId= json2[i].value._id;
                vender.addEventListener('click',function(e){
                    var sendUpdate = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    console.log("El ID es "+e.source.miId);
                    sendUpdate.open('PUT', 'http://localhost:3000/api/frutas/' + e.source.miId);
                    sendUpdate.send();
                    
                    sendUpdate.onload = function(e){
                        getTodoList(fruta);
                    };
                });
                
                var noVender =  Titanium.UI.createImageView({
                    image:"_vender.png",
                    width:64,
                    height:64,
                    right:20,
                    top:-5
                });
                
                var despachar =  Titanium.UI.createImageView({
                    image:"despachar.png",
                    width:64,
                    height:64,
                    right:104,
                    top:-5
                }); 
                var nombre =  Titanium.UI.createLabel({
                    text:json2[i].value.fruta +"  "+ json2[i].value._id.substr(json2[i].value._id.length - 3),
                    font:{fontSize:12,fontWeight:'bold'},
                    width:'auto',
                    textAlign:'left',
                    bottom:20,
                    left:20,
                    height:12
                });
                despachar.miID=json2[i].value._id;
                despachar.addEventListener('click',function(e){
                    var sendDelete = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    console.log("El ID es "+e.source.miID);
                    sendDelete.open('DELETE', 'http://localhost:3000/api/frutas/' + e.source.miID);
                    sendDelete.send();
                    
                    sendDelete.onload = function(e){
                        getTodoList(fruta);
                    };
                });
                row.add(nombre);
                
                if(json2[i].value.status=="disponible"){
                    row.add(vender);
                }
                else{
                    row.add(noVender);
                    row.add(despachar);
                }
                dataArray.push(row);
                $.tableViewPina.setData(dataArray);
            }
            else if(fruta=="kiwi"){
                var row = Ti.UI.createTableViewRow({
                    hasCheck : false,
                    color : '#ffffff',
                }); 
                
                var vender =  Titanium.UI.createImageView({
                    image:'vender.png',
                    width:64,
                    height:64,
                    right:20,
                    top:-5
                });
                vender.miId= json3[i].value._id;
                vender.addEventListener('click',function(e){
                    var sendUpdate = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    console.log("El ID es "+e.source.miId);
                    sendUpdate.open('PUT', 'http://localhost:3000/api/frutas/' + e.source.miId);
                    sendUpdate.send();
                    
                    sendUpdate.onload = function(e){
                        getTodoList(fruta);
                    };
                });
                
                var noVender =  Titanium.UI.createImageView({
                    image:"_vender.png",
                    width:64,
                    height:64,
                    right:20,
                    top:-5
                });
                
                var despachar =  Titanium.UI.createImageView({
                    image:'despachar.png',
                    width:64,
                    height:64,
                    right:104,
                    top:-5
                }); 
                var nombre =  Titanium.UI.createLabel({
                    text:json3[i].value.fruta +"  "+ json3[i].value._id.substr(json3[i].value._id.length - 3),
                    font:{fontSize:12,fontWeight:'bold'},
                    width:'auto',
                    textAlign:'left',
                    bottom:20,
                    left:20,
                    height:12
                });
                despachar.miID=json3[i].value._id;
                despachar.addEventListener('click',function(e){
                    var sendDelete = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    console.log("El ID es "+e.source.miId);
                    sendDelete.open('DELETE', 'http://localhost:3000/api/frutas/' + e.source.miID);
                    sendDelete.send();
                    
                    sendDelete.onload = function(e){
                        getTodoList(fruta);
                    };
                });
                row.add(nombre);
                if(json3[i].value.status=="disponible"){
                    row.add(vender);
                }
                else{
                    row.add(noVender);
                    row.add(despachar);
                }
                dataArray.push(row);
                $.tableViewKiwi.setData(dataArray);
            }
        };
    };
};

// Solicitar kiwis
function solicitarKiwi() {
    var request = Ti.Network.createHTTPClient({
        onload : function(e) {
            getTodoList("kiwi");
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('There was an error during the conexion');
        },
        timeout : 1000,
    });
    request.open("POST", "http://localhost:3000/api/frutas");
    
    var params = ({"type": "kiwi"});
    request.send(params);
}

// Solicitar pinas
function solicitarPina() {
    var request = Ti.Network.createHTTPClient({
        onload : function(e) {
            getTodoList("pina");
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('There was an error during the conexion');
        },
        timeout : 1000,
    });
    request.open("POST", "http://localhost:3000/api/frutas");
    var params = ({"type": "pina"});
    request.send(params);
}

function producirPina() {
    var request = Ti.Network.createHTTPClient({
        onload : function(e) {
            getTodoList("pina");
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('There was an error during the conexion');
        },
        timeout : 1000,
    });
    request.open("POST", "http://localhost:3000/api/frutas/roicel");
    var params = ({"type": "pina", "quantity": $.insertPina.value});
    request.send(params);
}


$.mainTabGroup.open();