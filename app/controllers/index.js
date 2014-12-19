getTodoList("kiwi");
getTodoList("fresa");
getTodoList("pina");

var json1;
var json2;
var json3;

function getTodoList(fruta) {
    var dataArray = [];
    // Cliente para obtener todas las frutas
    var request = Ti.Network.createHTTPClient({
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('There was an error during the connection');
        },
        timeout : 1000,
    });
    
    request.open('GET', 'http://192.168.1.164:3000/api/frutas/'+fruta);
    request.send();
    
    request.onload = function(e) {
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
        
        //var json = json.message;
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
        
        for (var i = 0; i < tamano; i++) {
            if(fruta=="fresa"){
                var row = Ti.UI.createTableViewRow({
                    hasCheck : false,
                    color : '#ffffff',
                });
                
                // Boton para vender
                var vender =  Titanium.UI.createImageView({
                    image:"vender.png",
                    width:64,
                    height:64,
                    right:20,
                    top:-5
                });
                vender.id= json1[i].value._id;
                vender.addEventListener('click',function(e){
                    var request = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    var params = {"_id":e.source.id};
                    request.open('PUT', 'http://192.168.1.164:3000/api/frutas/venderfruta');
                    request.send(params);
                    
                    request.onload = function(e){
                        getTodoList(fruta);
                    };
                });
                
                // Boton que indica que fue vendido
                var noVender =  Titanium.UI.createImageView({
                    image:"_vender.png",
                    width:64,
                    height:64,
                    right:20,
                    top:-5
                });
                
                // Boton para despachar
                var despachar =  Titanium.UI.createImageView({
                    image:"despachar.png",
                    width:64,
                    height:64,
                    right:104,
                    top:-5
                }); 
                
                // Nombre que se muestra en la fila
                var nombre =  Titanium.UI.createLabel({
                    text:json1[i].value.fruta,
                    font:{fontSize:12,fontWeight:'bold'},
                    width:'auto',
                    textAlign:'left',
                    bottom:20,
                    left:20,
                    height:12
                });
                
                despachar.id=json1[i].value._id;
                despachar.addEventListener('click',function(e){
                    var request = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    console.log("El e es "+e);
                    
                    var params = {"_id":e.source.id};
                    request.open('PUT', 'http://192.168.1.164:3000/api/frutas/despacharfruta');
                    request.send(params);
                    
                    request.onload = function(e){
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
                
                row.id = vender.id;
                
                row.addEventListener('click', function(e) {
                    var request = Ti.Network.createHTTPClient({
                        onload: function(ee) {
                            var info = JSON.parse(this.responseText);
                            console.log('info1: ', info);
                            info = info.message;
                            
                            // Ventana de informacion
                            var infoWindow = Ti.UI.createWindow({
                                layout : 'vertical',
                                height : Titanium.UI.SIZE,
                                width : Titanium.UI.SIZE,
                                top: 0,
                                left: 0
                            });
                            
                            var name = Ti.UI.createLabel({
                                text : 'Fruta: ' + info.fruta,
                                color : '#000',
                                font : {fontSize:15},
                                height :Titanium.UI.SIZE,
                                width : Titanium.UI.SIZE,
                                top : 10,
                                left : 10,
                                textAlign : 'center'
                            });
                            
                            var status = Ti.UI.createLabel({
                                text : 'Estatus: ' + info.status,
                                color : '#000',
                                font : {fontSize:15},
                                height :Titanium.UI.SIZE,
                                width : Titanium.UI.SIZE,
                                top : 20,
                                left : 10,
                                textAlign : 'center'
                            });
                            
                            infoWindow.add(name);
                            infoWindow.add(status);
                            
                            var close = Ti.UI.createButton({
                                title : 'Cerrar',
                                height : 60,
                                width : 100,
                                top : 10,
                                right : 10
                            });
                         
                            close.addEventListener('click', function() {
                                infoWindow.close();
                            });
                            
                            infoWindow.add(close);
                            
                            infoWindow.open({
                                modal : true
                            });
                        },
                        onerror: function(e) {
                            Ti.API.debug(e.error);
                            alert('Ocurrio un error al cargar la información');
                        },
                        timeout: 1000
                    });
                    
                    request.open('GET', 'http://192.168.1.164:3000/api/frutas/fruta/' + e.source.id);
                    request.send();
                });
                
                dataArray.push(row);
                $.tableViewFresa.setData(dataArray);
            }
            else if(fruta=="pina"){
                var row = Ti.UI.createTableViewRow({
                    title : json2[i].value.fruta,
                    hasCheck : false,
                    color : '#ffffff',
                });
                
                // Boton para vender
                var vender =  Titanium.UI.createImageView({
                    image:"vender.png",
                    width:64,
                    height:64,
                    right:20,
                    top:-5
                });
                vender.id= json2[i].value._id;
                vender.addEventListener('click',function(e){
                    var request = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    
                    var params = {"_id":e.source.id};
                    request.open('PUT', 'http://192.168.1.164:3000/api/frutas/venderfruta');
                    request.send(params);
                    
                    request.onload = function(e){
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
                
                // Boton para despachar
                var despachar =  Titanium.UI.createImageView({
                    image:"despachar.png",
                    width:64,
                    height:64,
                    right:104,
                    top:-5
                }); 
                // Nombre que aparece en la fila
                var nombre =  Titanium.UI.createLabel({
                    text:json2[i].value.fruta,
                    font:{fontSize:12,fontWeight:'bold'},
                    width:'auto',
                    textAlign:'left',
                    bottom:20,
                    left:20,
                    height:12
                });
                despachar.id=json2[i].value._id;
                despachar.addEventListener('click',function(e){
                    var request = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    
                    
                    var params = {"_id":e.source.id};
                    request.open('PUT', 'http://192.168.1.164:3000/api/frutas/despacharfruta');
                    request.send(params);
                    
                    request.onload = function(e){
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
                
                // Boton para vender
                var vender =  Titanium.UI.createImageView({
                    image:'vender.png',
                    width:64,
                    height:64,
                    right:20,
                    top:-5
                });
                vender.id= json3[i].value._id;
                vender.addEventListener('click',function(e){
                    var request = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    
                    var params = {"_id":e.source.id};
                    request.open('PUT', 'http://192.168.1.164:3000/api/frutas/venderfruta');
                    request.send(params);
                    
                    request.onload = function(e){
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
                
                // Boton para despachar
                var despachar =  Titanium.UI.createImageView({
                    image:'despachar.png',
                    width:64,
                    height:64,
                    right:104,
                    top:-5
                }); 
                // Nombre que aparece en la fila
                var nombre =  Titanium.UI.createLabel({
                    text:json3[i].value.fruta,
                    font:{fontSize:12,fontWeight:'bold'},
                    width:'auto',
                    textAlign:'left',
                    bottom:20,
                    left:20,
                    height:12
                });
                despachar.id=json3[i].value._id;
                despachar.addEventListener('click',function(e){
                    var request = Ti.Network.createHTTPClient({
                        onerror : function(e) {
                            Ti.API.debug(e.error);
                            alert('There was an error during the connection');
                        },
                        timeout : 1000,
                    });
                    var params = {"_id":e.source.id};
                    request.open('PUT', 'http://192.168.1.164:3000/api/frutas/despacharfruta');
                    request.send(params);
                    
                    request.onload = function(e){
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

function solicitarKiwi() {
    var request = Ti.Network.createHTTPClient({
        onload : function(e) {
        //    alert(this.responseText);
        getTodoList("kiwi");
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('There was an error during the conexion');
        },
        timeout : 1000,
    });
    request.open("POST", "http://192.168.1.164:3000/api/frutas/kiwi/solicitarfrutas");
    //      var params = ({"id": $.inserTxtF.value});
    //      console.log ('lo que tiene params ', params);
    request.send();
}

function solicitarPina() {
    var request = Ti.Network.createHTTPClient({
        onload : function(e) {
        //    alert(this.responseText);
        getTodoList("pina");
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('There was an error during the conexion');
        },
        timeout : 1000,
    });
    request.open("POST", "http://192.168.1.164:3000/api/frutas/pina/solicitarfrutas");
    //      var params = ({"id": $.inserTxtF.value});
    //      console.log ('lo que tiene params ', params);
    request.send();
}

function solicitarFresa() {
    var request = Ti.Network.createHTTPClient({
        onload : function(e) {
        //    alert(this.responseText);
        getTodoList("fresa");
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('There was an error during the conexion');
        },
        timeout : 1000,
    });
    request.open("POST", "http://192.168.1.164:3000/api/frutas/fresa/solicitarfrutas");
    //      var params = ({"id": $.inserTxtF.value});
    //      console.log ('lo que tiene params ', params);
    request.send();
}

function producirPina() {
    var request = Ti.Network.createHTTPClient({
        onload : function(e) {
        //    alert(this.responseText);
        getTodoList("pina");
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('There was an error during the conexion');
        },
        timeout : 1000,
    });
    request.open("POST", "http://192.168.1.164:3000/api/frutas/roicel");
    var params = ({"type": "pina", "quantity": $.insertPina.value});
    request.send(params);
}

function producirKiwi() {
    var request = Ti.Network.createHTTPClient({
        onload : function(e) {
        //    alert(this.responseText);
        getTodoList("kiwi");
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('There was an error during the conexion');
        },
        timeout : 1000,
    });
    request.open("POST", "http://192.168.1.164:3000/api/frutas/roicel");
    var params = ({"type": "kiwi", "quantity": $.insertKiwi.value});
    request.send(params);
}

function producirFresa() {
    var request = Ti.Network.createHTTPClient({
        onload : function(e) {
        //    alert(this.responseText);
        getTodoList("fresa");
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('There was an error during the conexion');
        },
        timeout : 1000,
    });
    request.open("POST", "http://192.168.1.164:3000/api/frutas/roicel");
    var params = ({"type": "fresa", "quantity": $.insertFresa.value});
    request.send(params);
}

$.mainTabGroup.open();