Simple express.js based webserver hosting a static index.html using the Javascript Webconsole-Client.

## Usage
* run `npm start`
* access the webserver on `localhost:4000`
* this opens a primitive console where you can type in commands and send them with ENTER

## Integration in your project
This is thought to be an example of how to use the Webconsole-Client. See [index.html](./public/index.html) for how to use/integrate the client module in your project.

<pre><code>
var webconsole_client = new Client(
    "http://my-backend:port",
    function() {
        // what to do on connect
    },
    function(data) {
        // what to do on receive
        // data contains a string containing the output of the previous send command
    }
);

webconsole_client.send("mycommand")
</code></pre>
