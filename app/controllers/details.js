var args = arguments[0] || {};

function back(e) {
    var win = Ti.UI.currentWindow;
    console.log(args);
    win.close();
}

function updateData(e) {
    //if there is something in the textbox
    if ($.updateTxtF.value != "" && $.updateTxtF.value != null) {
        var request = Ti.Network.createHTTPClient({
            onload : function(e) {
                alert(this.responseText);
            },
            onerror : function(e) {
                Ti.API.debug(e.error);
                alert('There was an error during the conexion');
            },
            timeout : 1000,
        });
        //Request the data from the web service, Here you have to change it for your local ip
        request.open("PUT", "http://localhost:3000/api/tasks/" + args._id);
              var params = ({title: $.updateTxtF.value});
        //      console.log ('lo que tiene params ', params);
        request.send(params);
    } else {
        alert("Please write something in the textbox");
    }
    $.updateTxtF.value = "";
};

// $.updateTxtF.value = args.value;

var request = Ti.Network.createHTTPClient({
    onload : function(e) {
        var json = JSON.parse(this.responseText);
        json = json.message;
        
        console.log('json en get con id vale: ', json);
        
        $.taskIdLabel.setText("Id: ");
        $.taskIdLabel.font = {
            fontSize: '16px',
            fontWeight: 'bold',
        };
        
        $.taskId.setText(json._id);
        
        $.taskTitleLabel.setText("Title: ");
        $.taskTitleLabel.font = {
            fontSize: '16px',
            fontWeight: 'bold',
        };
        
        $.taskTitle.setText(json.value);
    },
    onerror : function(e) {
        Ti.API.debug(e.error);
        alert('There was an error during the connection');
    },
    timeout : 1000,
});

request.open("GET", "http://localhost:3000/api/tasks/" + args._id);
request.send();